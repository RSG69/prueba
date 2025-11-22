FROM python:3.12-slim

# Install system dependencies
RUN apt-get update && apt-get install -y unzip curl && apt-get clean

# Set workdir
WORKDIR /app

# Copy project files
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Build Reflex app
RUN reflex export

# Expose port
ENV PORT=8000
EXPOSE 8000

# Run Reflex in production mode
CMD ["reflex", "run", "--env", "prod", "--host", "0.0.0.0", "--port", "8000"]
