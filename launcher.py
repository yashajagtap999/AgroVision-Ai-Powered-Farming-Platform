import subprocess
import sys
import os

def start_servers():
    port = int(os.environ.get("PORT", 8000))
    print(f"Starting AgroVision Backend on port {port}...")
    
    # Check if running on cloud environment (Render)
    if "PORT" in os.environ or "RENDER" in os.environ:
        try:
            print(f"Launching Gunicorn on 0.0.0.0:{port}...")
            cmd = ["gunicorn", "backend.main:app", "--bind", f"0.0.0.0:{port}"]
            subprocess.run(cmd)
        except Exception as e:
            print(f"Gunicorn fallback to python main.py: {e}")
            cmd = [sys.executable, "-m", "backend.main"]
            subprocess.run(cmd)
    else:
        # Local development execution
        print(f"Starting Flask Backend locally on http://localhost:{port}...")
        backend_proc = subprocess.Popen([sys.executable, "-m", "backend.main"])
        try:
            backend_proc.wait()
        except KeyboardInterrupt:
            print("\nStopping server...")
            backend_proc.terminate()

if __name__ == "__main__":
    start_servers()
