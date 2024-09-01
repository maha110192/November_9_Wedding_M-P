# Usa una imagen base de Python ligera
FROM python:3.12-alpine

# Instala dependencias necesarias para construir paquetes
RUN apk add --no-cache gcc musl-dev

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de configuración y el código
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 8000

# Comando para iniciar la aplicación usando Gunicorn
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "app.app:app"]
