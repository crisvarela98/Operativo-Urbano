# Guía de Desarrollo - Operativo Urbano

Guía completa para configurar el entorno de desarrollo local.

## 🖥️ Requisitos Previos

### Node.js y npm

Descarga desde [nodejs.org](https://nodejs.org/) (v16 o superior):

```bash
node --version
npm --version
```

### MongoDB

#### Opción 1: Local (recomendado para desarrollo)

Descarga desde [mongodb.com](https://www.mongodb.com/try/download/community):

```bash
# macOS (con Homebrew)
brew install mongodb-community
brew services start mongodb-community

# Linux
sudo apt-get install -y mongodb

# Windows
# Descarga el instalador y ejecuta
```

Verifica que está corriendo:

```bash
mongo --version
mongosh  # Consola de MongoDB
```

#### Opción 2: MongoDB Atlas (Cloud)

1. Ve a [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta gratuita
3. Crea un cluster
4. Obtén la cadena de conexión
5. Copia en `.env`:

```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/operativo-urbano
```

### Godot Engine

Descarga desde [godotengine.org](https://godotengine.org/) (v4.0 o superior):

```bash
# Verifica que esté en el PATH
godot --version
```

### Git

```bash
git --version
```

## 🚀 Configuración Inicial

### 1. Clonar Repositorio

```bash
git clone https://github.com/crisvarela98/Operativo-Urbano.git
cd Operativo-Urbano
```

### 2. Configurar Backend

```bash
cd backend

# Instalar dependencias
npm install

# Copiar archivo de configuración
cp .env.example .env

# Editar .env con tus valores
nano .env  # o tu editor preferido
```

**Archivo `.env` básico:**

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/operativo-urbano
JWT_SECRET=dev-secret-key-change-in-production
JWT_EXPIRES_IN=7d
SERVER_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:8080
SOCKET_IO_CORS=http://localhost:8080
LOG_LEVEL=debug
```

### 3. Iniciar Backend

En una terminal:

```bash
cd backend
npm run dev
```

Deberías ver:

```
✓ MongoDB conectado: localhost
✓ Servidor iniciado en puerto 3000
```

### 4. Verificar API

En otra terminal:

```bash
curl http://localhost:3000/health
```

Respuesta esperada:

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "environment": "development"
}
```

### 5. Abrir Proyecto Godot

```bash
cd game
godot --path . --debug
```

O usa la interfaz gráfica de Godot:
1. Abre Godot
2. Selecciona "Open Project"
3. Navega a `game/project.godot`

## 🧪 Testing Local

### Probar Autenticación

```bash
# Registro
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "agente@test.com",
    "password": "password123",
    "nickname": "Agente01"
  }'

# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "agente@test.com",
    "password": "password123"
  }'

# Guarda el token devuelto
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### Probar Rutas Protegidas

```bash
# Obtener perfil
curl http://localhost:3000/player/profile \
  -H "Authorization: Bearer $TOKEN"

# Ver misiones
curl http://localhost:3000/missions

# Completar misión
curl -X POST http://localhost:3000/missions/complete \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "missionId": "mission_001",
    "arrested": 2,
    "rescued": 1,
    "casualties": 0,
    "penalties": 0
  }'
```

## 📚 Estructura de Carpetas

```
Operativo-Urbano/
├── backend/                      # API Node.js
│   ├── src/
│   │   ├── server.js            # Punto de entrada
│   │   ├── app.js               # Express app
│   │   ├── config/
│   │   ├── models/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── sockets/
│   ├── package.json
│   ├── .env.example
│   ├── .env                     # NO SUBIR A GIT
│   ├── README.md
│   └── node_modules/            # NO SUBIR A GIT
│
├── game/                         # Proyecto Godot
│   ├── project.godot
│   ├── scenes/
│   ├── scripts/
│   ├── assets/
│   ├── .godot/                  # NO SUBIR A GIT
│   └── README.md
│
├── .gitignore
├── README.md
└── DEVELOPMENT.md              # Este archivo
```

## 🔧 Troubleshooting

### Error: "Cannot connect to MongoDB"

**Solución:**
1. Verifica que MongoDB está corriendo:
   ```bash
   mongosh
   ```
2. Si no funciona, inicia MongoDB:
   ```bash
   mongod
   ```

### Error: "Port 3000 already in use"

**Solución:**
```bash
# MacOS/Linux - Encuentra y mata el proceso
lsof -ti:3000 | xargs kill -9

# O cambia el puerto en .env
PORT=3001
```

### Error: "Cannot find module"

**Solución:**
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Godot no abre el proyecto

**Solución:**
1. Verifica que `project.godot` existe
2. Godot versión 4.0 o superior
3. Reinicia Godot
4. Copia el proyecto a otra carpeta

## 📦 Variables de Entorno

### Backend (.env)

| Variable | Descripción | Valor Defecto |
|----------|-------------|---------------|
| PORT | Puerto del servidor | 3000 |
| NODE_ENV | Ambiente (dev/prod) | development |
| MONGODB_URI | Conexión a MongoDB | localhost:27017 |
| JWT_SECRET | Clave secreta JWT | dev-secret |
| CORS_ORIGIN | CORS permitido | http://localhost:8080 |
| LOG_LEVEL | Nivel de logs | debug |

## 🎮 Desarrollo de Juego

### Crear Nueva Escena

1. En Godot, clic derecho en `scenes/`
2. New Scene
3. Guarda como `MyScene.tscn`
4. Asigna un script `MyScene.gd`

### Editar Script

1. Clic derecho en nodo
2. Attach Script
3. Selecciona `scripts/ui/` o donde corresponda
4. Nombra el script

### Probar Escena

- Clic derecho en la escena → Play Scene
- O presiona **Ctrl+Shift+F5**

### Debugging en Godot

```gdscript
# Mostrar en consola
print("Hola mundo")

# Con nivel de detalle
print_debug("Debug detallado: ", variable)

# Assertion
assert(valor != null, "Valor no puede ser null")
```

## 🚀 Flujo de Trabajo Recomendado

1. **Antes de empezar:**
   - Pull desde main: `git pull origin main`
   - Crea rama: `git checkout -b feature/nombre-feature`

2. **Durante desarrollo:**
   - Tests locales constantemente
   - Commits frecuentes: `git commit -m "descripción clara"`
   - Actualiza .env si es necesario

3. **Antes de hacer PR:**
   - `git pull origin main` (sync)
   - Verifica que todo funciona
   - Push: `git push origin feature/nombre-feature`
   - Abre PR en GitHub

## 📋 Checklist Inicial

- [ ] Node.js v16+ instalado
- [ ] MongoDB corriendo localmente
- [ ] Godot 4.0+ instalado
- [ ] Repositorio clonado
- [ ] Backend `npm install` completado
- [ ] `.env` configurado
- [ ] Backend corriendo en http://localhost:3000
- [ ] API `/health` respondiendo
- [ ] Proyecto Godot abierto
- [ ] Escena principal (`MainMenu.tscn`) funciona

## 🎓 Tips Pro

### Terminal tmux/screen (múltiples terminales)

```bash
# Inicia tmux
tmux

# Crea ventana nueva
Ctrl+B, C

# Cambia entre ventanas
Ctrl+B, 1  # Ventana 1
Ctrl+B, 2  # Ventana 2

# Divide vertical
Ctrl+B, %

# Divide horizontal
Ctrl+B, "
```

### VS Code Setup

**Extensiones recomendadas:**
- REST Client (prueba API)
- MongoDB for VS Code
- Godot Tools
- Git Graph

**Settings (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[gdscript]": {
    "editor.defaultFormatter": "null"
  }
}
```

### Agregar Scripts a Package.json

```json
{
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js",
    "lint": "eslint src/",
    "test": "jest",
    "seed": "node scripts/seed.js"
  }
}
```

## 🔐 Seguridad en Desarrollo

⚠️ **IMPORTANTE:**
- NUNCA commits `.env` con secretos reales
- Usa valores diferentes en producción
- Cambia `JWT_SECRET` en producción
- Usa contraseña fuerte en MongoDB Atlas

## 📞 Soporte

Si tienes problemas:
1. Revisa el [README principal](../README.md)
2. Lee los READMEs específicos (`backend/README.md`, `game/README.md`)
3. Abre un [Issue en GitHub](https://github.com/crisvarela98/Operativo-Urbano/issues)

---

**¡Happy coding, agente! 🎯**
