# Usa una imagen base de Python ligera
FROM python:3.12-alpine

# Instala dependencias necesarias para construir paquetes
RUN apk add --no-cache gcc musl-dev

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo el archivo requirements.txt primero para un mejor caching
COPY server_side/requirements.txt .

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de los archivos de la aplicación al contenedor
COPY server_side/app /app

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8000

# Comando para iniciar la aplicación usando Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app:app"]
