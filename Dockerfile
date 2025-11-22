FROM python:3.12-slim

WORKDIR /app

# Copia tu aplicación
COPY . .

# Instala dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Construye Reflex en modo producción
RUN reflex export

# Railway usa la variable PORT automáticamente
ENV PORT=8000
EXPOSE 8000

# Arranca el servidor ASGI generado por Reflex
CMD ["uvicorn", ".web.main:app", "--host", "0.0.0.0", "--port", "8000"]
    

