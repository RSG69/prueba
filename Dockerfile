# ================================
# BUILD FRONTEND + INSTALL PYTHON
# ================================
FROM python:3.10-slim as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies for building
RUN apt-get update && apt-get install -y \
    curl nodejs npm build-essential \
    && rm -rf /var/lib/apt/lists/*

# ===========
# APP SETUP
# ===========
WORKDIR /app

COPY . /app

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

# ===========
# EXPORT BUILD
# ===========
RUN reflex export --frontend-only --no-zip && \
    reflex export --backend-only --no-zip

# ===========
# RUNTIME
# ===========
FROM python:3.10-slim

WORKDIR /app

COPY --from=base /app /app

RUN pip install --upgrade pip && \
    pip install -r requirements.txt

EXPOSE 8000

CMD ["reflex", "run", "--no-frontend", "--env", "prod"]



    

