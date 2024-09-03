from waitress import serve
from app import app
import os

if __name__ == "__main__":
    port = os.environ.get('PORT', '8000')  # Get port from environment variable, default to '8000'
    try:
        port = int(port)  # Convert to integer
    except ValueError:
        raise ValueError(f"Invalid PORT value: {port}. It must be an integer.")
    serve(app, host='0.0.0.0', port=port)
