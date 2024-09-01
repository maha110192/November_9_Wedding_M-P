# Use a lighter Python base image
FROM python:3.12-alpine

# Install dependencies necessary for building packages
RUN apk add --no-cache gcc musl-dev

# Set the working directory
WORKDIR /app

# Copy only the requirements.txt first for better caching
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application
COPY . .

# Expose the port the application will run on
EXPOSE 5000

# Command to start the application using Gunicorn
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
