# Use a lightweight Python base image
FROM python:3.12-alpine

# Install necessary dependencies for building packages
RUN apk add --no-cache gcc musl-dev

# Set the working directory
WORKDIR /app

# Copy the dependency configuration and install dependencies
COPY server_side/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the project files
COPY server_side/app /app

# Expose the port the app will run on
EXPOSE 8000

# Command to start the application using Gunicorn with create_app
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app.app:app)"]
