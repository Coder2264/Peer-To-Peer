import socket
import sys
import hashlib
from pathlib import Path
import os

DELIMITER = "<END_META>"

def get_chunk_size(file_size):
    if file_size < 1 * 1024:  # < 1 KB
        return 1 * 1024       # 4 KB
    elif file_size < 100 * 1024:  # < 100 KB
        return 32 * 1024      # 32 KB
    elif file_size < 1 * 1024**2:  # < 1 MB
        return 128 * 1024     # 128 KB
    elif file_size < 100 * 1024**2:  # < 100 MB
        return 512 * 1024     # 512 KB
    elif file_size < 1 * 1024**3:  # < 1 GB
        return 1 * 1024**2    # 1 MB
    elif file_size < 10 * 1024**3:  # < 10 GB
        return 8 * 1024**2    # 8 MB
    else:  # >= 10 GB
        return 16 * 1024**2   # 16 MB

def get_downloads_directory():
    """
    Get the default Downloads directory for the current operating system.
    
    Returns:
        str: Path to the Downloads directory.
    """
    if os.name == "nt":  # Windows
        downloads_path = Path(os.environ["USERPROFILE"]) / "Downloads"
    elif os.name == "posix":  # macOS and Linux
        downloads_path = Path.home() / "Downloads"
    else:
        raise OSError("Unsupported operating system")
    
    if not downloads_path.exists():
        raise FileNotFoundError(f"Downloads directory not found: {downloads_path}")
    
    return str(downloads_path)

def receive_file(server_ip, file_size, server_port=5001):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((server_ip, server_port))
        
        # Buffer to hold metadata
        buffer = b""
        CHUNK_SIZE = get_chunk_size(file_size)
        
        # Receive and parse metadata
        while not buffer.endswith(DELIMITER.encode()):
            chunk = s.recv(CHUNK_SIZE)
            if not chunk:
                print("Connection closed unexpectedly while reading metadata.")
                return
            buffer += chunk
        
        # Split metadata from the actual file content
        meta_data, file_data = buffer.split(DELIMITER.encode(), maxsplit=1)
        try:
            file_name, file_size, expected_hash = meta_data.decode().split('|')
            file_size = int(file_size)
        except (ValueError, UnicodeDecodeError) as e:
            print(f"Metadata parsing failed: {e}")
            return

        print(f"Receiving {file_name} of size {file_size} bytes")
        
        # Get the Downloads directory
        try:
            downloads_directory = get_downloads_directory()
        except (OSError, FileNotFoundError) as e:
            print(f"Error locating Downloads directory: {e}")
            return

        # Prepare to write file and verify hash
        file_path = Path(downloads_directory) / file_name
        received_hash = hashlib.sha256()
        
        with open(file_path, 'wb') as f:
            # Write any file data received with metadata
            f.write(file_data)
            received_hash.update(file_data)
            bytes_received = len(file_data)
            
            # Continue receiving the remaining file content
            while bytes_received < file_size:
                chunk = s.recv(CHUNK_SIZE)
                if not chunk:
                    break
                f.write(chunk)
                received_hash.update(chunk)
                bytes_received += len(chunk)

        # Verify file integrity
        if received_hash.hexdigest() == expected_hash:
            print(f"File received successfully and saved to: {file_path}")
        else:
            print("File integrity check failed. Possible corruption.")
            print(f"Expected Hash: {expected_hash}")
            print(f"Received Hash: {received_hash.hexdigest()}")

# Sample usage: python receiver.py <server_ip> <file size>
if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python receiver.py <server_ip> <file size>")
        sys.exit(1)

    server_ip = sys.argv[1]
    file_size = int(sys.argv[2])
    receive_file(server_ip, file_size)
