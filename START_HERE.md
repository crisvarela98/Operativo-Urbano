```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║          🎯 OPERATIVO URBANO: UNIDAD TÁCTICA - v0.1.0 🎮                   ║
║                                                                               ║
║                  Juego Táctico Cooperativo para Mobile                       ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

# 🚀 BIENVENIDO, AGENTE

¡Gracias por descargar Operativo Urbano: Unidad Táctica!

Este archivo es tu punto de partida. Lee las secciones en orden.

---

## ⚡ Opción Rápida (5 minutos)

**Solo quiero jugar:**

```bash
# Terminal 1: Inicia MongoDB (si usas local)
mongod

# Terminal 2: Inicia backend
npm run backend:dev

# Terminal 3: Abre Godot
cd game
godot --path . --debug
# O abre Godot GUI manualmente

# Presiona F5 para jugar
```

**¿Listo?** ¡A jugar! 🎮

---

## 📚 Documentación Rápida

### Para Empezar
👉 **Lee primero**: [QUICKSTART.md](QUICKSTART.md) (5 min)

### Documentación Completa
- 📖 [README.md](README.md) - Todo lo que necesitas saber
- 🛠️ [DEVELOPMENT.md](DEVELOPMENT.md) - Setup y troubleshooting
- 🎮 [game/README.md](game/README.md) - Documentación de Godot
- 🔌 [backend/README.md](backend/README.md) - Documentación API
- 🤝 [CONTRIBUTING.md](CONTRIBUTING.md) - Cómo contribuir
- 📋 [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Resumen técnico

### Scripts Útiles
- `bash setup.sh` - Setup automático
- `bash verify.sh` - Verificar estructura
- `npm run backend:dev` - Iniciar backend
- `npm run docker:up` - Docker (si prefieres)

---

## ✅ Verificación Rápida

¿Está todo bien configurado?

```bash
bash verify.sh
```

Si ves ✅ en todos los checks, ¡estás listo!

---

## 📋 Estructura Principal

```
Operativo-Urbano/
├── /backend          ← API Node.js + MongoDB
├── /game             ← Proyecto Godot
├── QUICKSTART.md     ← ¡LEE PRIMERO!
├── README.md         ← Documentación completa
└── setup.sh          ← Setup automático
```

---

## 🎯 Flujo Recomendado

### 1️⃣ Si recién empiezas
```
QUICKSTART.md → setup.sh → npm run backend:dev → Abre Godot
```

### 2️⃣ Si necesitas configurar todo
```
DEVELOPMENT.md → Lee paso a paso → Configura .env → Inicia servicios
```

### 3️⃣ Si tienes problemas
```
Busca en DEVELOPMENT.md sección "Troubleshooting"
O abre un Issue en GitHub
```

### 4️⃣ Si quieres contribuir
```
CONTRIBUTING.md → Fork → Rama → Cambios → PR
```

---

## 🔥 Los 5 Pasos Finales

### Paso 1: Requisitos
- ✅ Node.js v16+
- ✅ MongoDB (local u online)
- ✅ Godot 4.0+
- ✅ Git

### Paso 2: Setup
```bash
bash setup.sh
```

### Paso 3: Backend
```bash
npm run backend:dev
```

### Paso 4: Juego
```bash
cd game
godot --path . --debug
```

### Paso 5: ¡Juega!
```
Presiona F5 en Godot
```

---

## 💡 Tips Importantes

1. **Los primeros 5 minutos son críticos**
   - Si te atascas → Lee QUICKSTART.md
   - Si aún tienes problemas → DEVELOPMENT.md

2. **El proyecto viene con datos de prueba**
   - No necesitas crear nada
   - Solo abre Godot y juega

3. **Backend auto-recarga**
   - Edita un archivo → Se recarga solo
   - Con nodemon, no necesitas reiniciar

4. **Godot también auto-recarga**
   - Presiona F5 para recargar escena
   - Cambios se aplican inmediatamente

5. **¿Dinero en juego?**
   - Comienzas con $5000
   - Completa misiones para ganar más
   - Compra mejoras en la tienda

---

## 🎮 Controles Básicos

**En Juego:**
- WASD = Movimiento
- Botones derechos = Acciones
- E = Arrestar/Rescatar
- Q = Orden
- F = Flash (granada)
- Espacio = Puerta

**UI:**
- Arriba a la izquierda: Stats (Arrestados, Rescatados, Tiempo)
- Arriba a la derecha: Botones de acción

---

## 📊 Que Está Incluido

✅ Backend API REST completo  
✅ Base de datos MongoDB lista  
✅ Juego Godot funcionando  
✅ 5 Escenas principales  
✅ Sistema de economía  
✅ IA para NPCs  
✅ Socket.io preparado para online  
✅ Documentación completa  

---

## 🚫 Lo Que NO Está Incluido (Aún)

⏳ Multiplayer online (en desarrollo)  
⏳ Animaciones complejas  
⏳ Audio/música (placeholder)  
⏳ Muchas misiones (ejemplo included)  
⏳ Tienda de plataforma  

---

## 🆘 Ayuda Rápida

| Problema | Solución |
|----------|----------|
| "Cannot connect MongoDB" | Ejecuta `mongod` en otra terminal |
| "Port 3000 already in use" | Cambia PORT en .env |
| "Godot no abre" | Verifica Godot v4.0+, reinicia |
| "API no responde" | Verifica `http://localhost:3000/health` |
| "Juego no inicia" | Presiona F5, revisa consola de Godot |

**¿Más ayuda?** → DEVELOPMENT.md sección "Troubleshooting"

---

## 🌟 Primeros Pasos Post-Setup

1. **Explora el código**
   - Backend: `backend/src/`
   - Juego: `game/scripts/`

2. **Modifica algo pequeño**
   - Cambia un color en `Colors.gd`
   - Ajusta la velocidad del jugador
   - Agrega una misión nueva

3. **Lee la documentación**
   - Entiende la arquitectura
   - Aprende el flujo de datos

4. **¡Desarrolla tu feature!**
   - Crea una rama
   - Haz cambios
   - Abre un PR

---

## 📞 Necesitas Ayuda?

1. **Documentación**: Lee los .md en orden
2. **Issues**: Busca si alguien ya preguntó
3. **GitHub**: Abre un Issue nuevo
4. **Discord**: (Próximamente)

---

## 🎓 Aprende Sobre

- **Node.js**: [nodejs.org](https://nodejs.org)
- **MongoDB**: [mongodb.com](https://www.mongodb.com)
- **Godot**: [godotengine.org](https://godotengine.org)
- **GDScript**: [Documentación Godot](https://docs.godotengine.org)
- **Socket.io**: [socket.io](https://socket.io)

---

## 🚀 Listo Para Empezar?

```bash
# Opción 1: Setup automático
bash setup.sh && npm run backend:dev

# Opción 2: Manual (Lee QUICKSTART.md primero)
npm run backend:dev

# Opción 3: Docker (Si lo prefieres)
docker-compose up -d
```

Luego abre Godot y presiona F5 😎

---

## 🎯 Tu Próximo Paso

👉 **Lee [QUICKSTART.md](QUICKSTART.md) AHORA** (5 minutos)

---

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║                                                                               ║
║                   ¡Bienvenido, Agente! 🎯                                    ║
║                  Mantén la táctica... ¡Y buena suerte!                        ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

**Versión**: 0.1.0  
**Estado**: Jugable y en desarrollo  
**Licencia**: MIT  
**Última actualización**: Junio 2024  
