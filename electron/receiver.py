#Sample receiver
#just dummy
import sys

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python receiver.py <server_ip> <file size>")
        sys.exit(1)

    server_ip = sys.argv[1]
    file_size = int(sys.argv[2])
    print(f"Receiving file of size {file_size} bytes from {server_ip}")