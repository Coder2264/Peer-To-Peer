import socket
import os
import hashlib
import sys

def get_chunk_size(file_size):
    if file_size < 1 * 1024:  # < 1 KB
        return 4 * 1024       # 4 KB
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


DELIMITER = "<END_META>"  # Unique delimiter for metadata separation.

def get_file_hash(file_path):
    hasher = hashlib.sha256()
    CHUNK_SIZE = get_chunk_size(os.path.getsize(file_path))
    with open(file_path, 'rb') as f:
        while chunk := f.read(CHUNK_SIZE):
            hasher.update(chunk)
    return hasher.hexdigest()

def send_file(file_path, host='0.0.0.0', port=5001):
    file_size = os.path.getsize(file_path)
    file_hash = get_file_hash(file_path)
    CHUNK_SIZE = get_chunk_size(file_size)
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((host, port))
        s.listen(5)
        print(f"Server listening on {host}:{port}...")
        
        conn, addr = s.accept()
        with conn:
            print(f"Connected by {addr}")
            
            # Send file metadata with a delimiter
            metadata = f"{os.path.basename(file_path)}|{file_size}|{file_hash}{DELIMITER}"
            conn.sendall(metadata.encode())

            # Send file in chunks
            with open(file_path, 'rb') as f:
                while chunk := f.read(CHUNK_SIZE):
                    conn.sendall(chunk)
        
        print("File sent successfully.")


# Sample usage: python receiver.py <server_ip>
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python receiver.py <server_ip>")
        sys.exit(1)

    filepath=sys.argv[1]
    send_file(filepath)
    