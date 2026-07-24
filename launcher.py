import subprocess
import time
import sys
import os
import signal
import socket

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('localhost', port)) == 0

def start_servers():
    print("Starting Smart Scheme Navigator...")
    
    # 1. Start Backend
    if is_port_in_use(8000):
        print("Port 8000 is already in use. Assuming backend is already running.")
        backend_proc = None
    else:
        print("Starting Flask Backend on port 8000...")
        backend_proc = subprocess.Popen(
            [sys.executable, "-m", "backend.main"]
        )
        # Give it a moment to start
        time.sleep(2)
        if backend_proc.poll() is not None:
            print("Backend failed to start.")
            return

    # 2. Start Frontend Notification
    print("\nServer is running!")
    print("Web App & Backend API: http://localhost:8000")
    print("API Documentation: http://localhost:8000/docs")
    print("\nPress Ctrl+C to stop the server.")

    try:
        while True:
            # Check if process is still alive
            if backend_proc and backend_proc.poll() is not None:
                print("\nBackend process died. Exiting...")
                break
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping server...")
    finally:
        if backend_proc:
            backend_proc.terminate()
        print("Goodbye!")

if __name__ == "__main__":
    start_servers()
