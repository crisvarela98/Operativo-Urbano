# Operativo Urbano: Unidad Táctica

**Juego Táctico Cooperativo para Mobile - v0.1.0**

![Versión](https://img.shields.io/badge/versión-0.1.0-blue)
![Estado](https://img.shields.io/badge/estado-En%20Desarrollo-yellow)
![Licencia](https://img.shields.io/badge/licencia-MIT-green)

## 🎮 Descripción

**Operativo Urbano: Unidad Táctica** es un juego táctico cooperativo inspirado en SWAT, Bullet Echo y Door Kickers. Controla un operador de la Unidad Táctica en operaciones urbanas nocturnas, rescata civiles, arresta sospechosos y gana dinero para mejorar tu equipo.

### Características Principales

- 🎯 **Gameplay Táctico** - No es FPS, es estrategia pura
- 🌙 **Visión Nocturna** - Linterna con cono de visión realista
- 👥 **NPCs Dinámicos** - Sospechosos y rehenes con IA
- 💰 **Sistema de Economía** - Gana dinero, compra mejoras
- 📋 **Misiones Variadas** - Diferentes objetivos y dificultades
- 🔌 **Preparado para Online** - Socket.io integrado para futuro multiplayer

## 🚀 Inicio Rápido

### Requisitos

- **Backend**: Node.js 16+, MongoDB
- **Juego**: Godot 4.x

### Instalación del Backend

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` con tus credenciales de MongoDB:

```env
MONGODB_URI=mongodb://localhost:27017/operativo-urbano
JWT_SECRET=tu_clave_super_secreta
```

Inicia MongoDB (en otra terminal):

```bash
mongod
```

Inicia el servidor:

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

### Instalación del Juego

1. Abre Godot 4.x
2. Importa el proyecto en `/game`
3. Presiona **Play** o `F5` para ejecutar

## 📁 Estructura del Proyecto

```
/operative-urbano
├── /backend                    # API REST + Socket.io
│   ├── src/
│   │   ├── server.js          # Punto de entrada
│   │   ├── app.js             # Configuración Express
│   │   ├── config/
│   │   │   ├── db.js          # Conexión MongoDB
│   │   │   └── env.js         # Variables de entorno
│   │   ├── models/            # Mongoose schemas
│   │   │   ├── User.js
│   │   │   ├── PlayerProfile.js
│   │   │   ├── Mission.js
│   │   │   ├── Upgrade.js
│   │   │   └── MissionResult.js
│   │   ├── controllers/       # Lógica de negocio
│   │   ├── routes/            # Rutas API
│   │   ├── middleware/        # Autenticación
│   │   └── sockets/           # Socket.io events
│   ├── .env.example
│   └── package.json
│
└── /game                       # Proyecto Godot
    ├── project.godot
    ├── scenes/
    │   ├── MainMenu.tscn
    │   ├── BriefingScreen.tscn
    │   ├── Game.tscn
    │   ├── ResultScreen.tscn
    │   └── UpgradeScreen.tscn
    ├── scripts/
    │   ├── player/
    │   │   └── Player.gd
    │   ├── npc/
    │   │   └── NPC.gd
    │   ├── ui/
    │   │   ├── MainMenu.gd
    │   │   ├── BriefingScreen.gd
    │   │   ├── ResultScreen.gd
    │   │   └── UpgradeScreen.gd
    │   ├── systems/
    │   │   ├── GameManager.gd
    │   │   ├── GameLevel.gd
    │   │   ├── NetworkManager.gd
    │   │   ├── UIManager.gd
    │   │   └── Classes.gd
    ├── assets/
    │   └── ui_theme.tres
    └── README.md
```

## 🎮 Cómo Jugar

### Menú Principal
- **Jugar**: Inicia una misión
- **Entrenamiento**: Modo práctica
- **Equipo**: Ver equipo actual
- **Mejoras**: Comprar mejoras con dinero ganado

### En Juego

**Controles:**
- **Joystick Izquierdo**: Movimiento
- **Botones Derechos**: Acciones

**Acciones:**
- **ARRESTAR**: Esposa a sospechosos rendidos
- **RESCATAR**: Rescata rehenes
- **ORDEN**: Da órdenes a NPCs
- **FLASH**: Activa granada aturdidora
- **PUERTA**: Abre/cierra puertas

### Objetivos

Cada misión tiene objetivos que cumplir:

✅ Reduce sospechosos  
✅ Arresta al menos 2  
✅ Rescata rehén  
❌ Evita bajas civiles  

### Ranking

El desempeño se califica:

| Rango | Requisitos |
|-------|-----------|
| **S** | 0 bajas + 4+ objetivos |
| **A** | 0 bajas + 3 objetivos |
| **B** | ≤1 baja + 2 objetivos |
| **C** | 1+ objetivo completado |
| **F** | Sin objetivos |

## 💰 Sistema de Economía

### Moneda: Pesos Operativos ($)

Gana dinero completando misiones:
- **Rango S**: +50% de reward
- **Rango A**: +25% de reward
- **Rango B**: +10% de reward
- Penalizaciones: -$100 por infracciones tácticas

### Mejoras Disponibles

| Mejora | Costo | Máx. Nivel | Efecto |
|--------|-------|-----------|--------|
| Chaleco Antibalas | $500 | 3 | Armadura +15 |
| Granada Aturdidora | $300 | 5 | Aturdimiento 3s |
| Boost de Velocidad | $400 | 4 | Velocidad +20% |
| Comunicaciones | $600 | 3 | Orden +30% |

## 🔧 API REST

### Autenticación

```bash
# Registro
POST /auth/register
{
  "email": "operativo@example.com",
  "password": "contraseña",
  "nickname": "Agente01"
}

# Login
POST /auth/login
{
  "email": "operativo@example.com",
  "password": "contraseña"
}
```

### Jugador

```bash
# Obtener perfil
GET /player/profile
Authorization: Bearer <token>

# Obtener estadísticas
GET /player/stats
Authorization: Bearer <token>

# Agregar dinero
POST /player/money
Authorization: Bearer <token>
{
  "amount": 1000
}
```

### Misiones

```bash
# Listar misiones
GET /missions

# Obtener misión
GET /missions/:id

# Completar misión
POST /missions/complete
Authorization: Bearer <token>
{
  "missionId": "...",
  "arrested": 2,
  "rescued": 1,
  "casualties": 0,
  "penalties": 0
}
```

### Mejoras

```bash
# Listar mejoras
GET /upgrades

# Comprar mejora
POST /upgrades/buy
Authorization: Bearer <token>
{
  "upgradeId": "..."
}
```

## 🔌 Socket.io (Preparado para Online)

### Eventos

```javascript
// Cliente → Servidor
socket.emit('create-room', { missionId: '...' })
socket.emit('join-room', { roomId: '...' })
socket.emit('sync-position', { roomId, position, rotation })
socket.emit('sync-npc', { roomId, npcState })

// Servidor → Cliente
socket.on('room-created', (data) => {})
socket.on('player-joined', (data) => {})
socket.on('player-position', (data) => {})
socket.on('npc-update', (data) => {})
socket.on('player-left', (data) => {})
```

## 🎨 Estética Visual

### Paleta de Colores

| Elemento | Hex | RGB |
|----------|-----|-----|
| Fondo | #0B1020 | 11, 16, 32 |
| Piso | #1B2440 | 27, 36, 64 |
| Pared | #05070D | 5, 7, 13 |
| Operador | #1E6BFF | 30, 107, 255 |
| Sospechoso | #FF2A2A | 255, 42, 42 |
| Rehén | #FFD166 | 255, 209, 102 |
| UI Dorado | #C9A227 | 201, 162, 39 |
| Texto | #F2F2F2 | 242, 242, 242 |

### Inspiración Visual

- **Bullet Echo** (mecánicas de visión)
- **Door Kickers** (táctico)
- **SWAT (juego)** (estética policial)
- **Noche urbana argentina** (ambiente)

## 📚 Documentación

- [Backend API](./backend/README.md)
- [Guía de Desarrollo](./DEVELOPMENT.md)

## 🛠 Desarrollo

### Stack

**Backend:**
- Node.js 16+
- Express.js 4.x
- MongoDB 4.x
- Socket.io 4.x
- JWT para autenticación
- Bcrypt para contraseñas

**Juego:**
- Godot 4.x
- GDScript
- Mobile-first (vertical)

### Próximas Features

- [ ] Multiplayer cooperativo online
- [ ] Editor de misiones
- [ ] Sistema de clanes/equipos
- [ ] Tienda de armas
- [ ] Mapas procedurales
- [ ] Modos especiales (Supervivencia, Reto)
- [ ] Tabla de clasificación global
- [ ] Sistema de logros

## 🐛 Reportar Errores

Si encuentras un bug, abre un [Issue](https://github.com/crisvarela98/Operativo-Urbano/issues).

## 📝 Licencia

MIT - Ver [LICENSE](LICENSE) para más detalles

## 👥 Créditos

**Desarrollado por**: Equipo de Operativo Urbano  
**Inspiración**: SWAT, Grupo Halcón Argentina, Bullet Echo, Door Kickers

---

**¿Preguntas?** Abre una Issue o contacta al equipo.

**¡Mantén la táctica, agente!** 🎯