# Dockerfile para backend de Operativo Urbano

FROM node:18-alpine

WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm ci --only=production && npm install -g nodemon

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar
CMD ["npm", "run", "dev"]
