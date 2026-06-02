# Backend - Operativo Urbano API

API REST + Socket.io para Operativo Urbano: Unidad Táctica

## 🚀 Inicio Rápido

### Instalación

```bash
cd backend
npm install
```

### Configuración

Copia `.env.example` a `.env` y configura:

```bash
cp .env.example .env
```

Edita los valores según tu entorno:

```env
# Puerto
PORT=3000

# Ambiente
NODE_ENV=development

# Base de datos MongoDB
MONGODB_URI=mongodb://localhost:27017/operativo-urbano

# JWT
JWT_SECRET=tu_clave_super_secreta_cambiar_en_produccion
JWT_EXPIRES_IN=7d

# URLs
SERVER_URL=http://localhost:3000
CORS_ORIGIN=http://localhost:8080

# Socket.io
SOCKET_IO_CORS=http://localhost:8080

# Logging
LOG_LEVEL=debug
```

### Ejecutar

**Modo desarrollo** (con auto-reload):

```bash
npm run dev
```

**Modo producción**:

```bash
npm start
```

El servidor estará disponible en `http://localhost:3000`

### Salud del servidor

```bash
curl http://localhost:3000/health
```

## 📦 Estructura

```
src/
├── server.js              # Punto de entrada principal
├── app.js                 # Configuración de Express
├── config/
│   ├── db.js             # Conexión a MongoDB
│   └── env.js            # Variables de entorno
├── models/               # Mongoose schemas
│   ├── User.js
│   ├── PlayerProfile.js
│   ├── Mission.js
│   ├── Upgrade.js
│   └── MissionResult.js
├── controllers/          # Lógica de negocio
│   ├── authController.js
│   ├── playerController.js
│   ├── missionController.js
│   └── upgradeController.js
├── routes/               # Definición de rutas
│   ├── auth.js
│   ├── player.js
│   ├── missions.js
│   └── upgrades.js
├── middleware/           # Middleware personalizado
│   └── auth.js          # Autenticación JWT
└── sockets/             # Socket.io events
    └── gameSocket.js    # Eventos del juego
```

## 🔐 Autenticación

Usa JWT en header `Authorization`:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📊 Base de Datos

### Modelos

**User**
```javascript
{
  email: String (unique),
  passwordHash: String,
  nickname: String,
  createdAt: Date
}
```

**PlayerProfile**
```javascript
{
  userId: ObjectId (ref: User),
  money: Number,
  level: Number,
  xp: Number,
  rank: String,
  unlockedMissions: [ObjectId],
  completedMissions: [ObjectId],
  upgrades: [{
    upgradeId: ObjectId,
    level: Number
  }],
  stats: {
    totalArrest: Number,
    totalRescued: Number,
    totalMissions: Number,
    successRate: Number
  }
}
```

**Mission**
```javascript
{
  title: String,
  description: String,
  city: String,
  district: String,
  difficulty: String,
  objectives: [String],
  rewards: {
    money: Number,
    xp: Number
  },
  minPlayers: Number,
  maxPlayers: Number
}
```

**Upgrade**
```javascript
{
  key: String (unique),
  name: String,
  description: String,
  category: String,
  cost: Number,
  level: Number,
  maxLevel: Number,
  effect: Object
}
```

**MissionResult**
```javascript
{
  userId: ObjectId,
  missionId: ObjectId,
  arrested: Number,
  rescued: Number,
  casualties: Number,
  penalties: Number,
  moneyEarned: Number,
  xpEarned: Number,
  rank: String,
  duration: Number,
  completed: Boolean
}
```

## 🔌 Socket.io

Preparado para multiplayer online.

### Eventos Cliente → Servidor

```javascript
socket.emit('create-room', { missionId: String })
socket.emit('join-room', { roomId: String })
socket.emit('sync-position', { roomId, position, rotation })
socket.emit('sync-npc', { roomId, npcState })
```

### Eventos Servidor → Cliente

```javascript
socket.on('room-created', { roomId, room })
socket.on('player-joined', { players, count })
socket.on('player-position', { playerId, position, rotation })
socket.on('npc-update', { npcState })
socket.on('player-left', { playerId, players })
```

## 🧪 Testing

(Próximamente)

## 🚢 Deployment

### Heroku

```bash
heroku create operativo-urbano-api
heroku addons:create mongolab:sandbox
git push heroku main
```

### Docker

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

## 📝 Logs

Los logs se generan en la consola con diferentes niveles:
- `debug`: Información de debugging
- `info`: Información general
- `warn`: Advertencias
- `error`: Errores

Configura el nivel en `.env` con `LOG_LEVEL`

## 🐛 Troubleshooting

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo
- Comprueba la URI en `.env`
- Revisa credenciales si usas Atlas

### Error: "Port 3000 already in use"
- Cambia el puerto en `.env`
- O mata el proceso: `lsof -ti:3000 | xargs kill -9`

### Error: "JWT verify failed"
- Asegúrate de usar el token correcto
- Verifica que no haya expirado
- Comprueba el `JWT_SECRET` en `.env`

## 📚 Referencias

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Socket.io](https://socket.io/)
- [JWT](https://jwt.io/)

---

**Desarrollado para Operativo Urbano: Unidad Táctica** 🎮
