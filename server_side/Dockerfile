# Utiliza una imagen base de Python más ligera
FROM python:3.12-alpine

# Instala dependencias necesarias para compilar paquetes
RUN apk add --no-cache gcc musl-dev

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo el archivo requirements.txt
COPY /app/requirements.txt .

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia el resto de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecutará
EXPOSE 5000

# Comando para iniciar la aplicación con el worker predeterminado
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
