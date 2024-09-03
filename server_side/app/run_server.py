from waitress import serve
from app import app
import os

if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))  # Get port from environment variable, default to 8000
    serve(app, host='0.0.0.0', port=port)
