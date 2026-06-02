# ⚡ Inicio Rápido

Guía rápida para empezar a jugar y desarrollar Operativo Urbano.

## 🎮 Solo Quiero Jugar

### Requisitos Mínimos
- **Godot 4.0+** ([Descargar](https://godotengine.org))
- **Backend**: La API debe estar corriendo (ver abajo)

### Pasos

1. **Instala Godot** si no lo tienes
2. **Abre el proyecto**:
   - File → Open Project
   - Navega a `game/project.godot`
   - Click Open
3. **Presiona F5** o Click Play

¡Listo! El juego usa datos locales de prueba.

---

## 🚀 Quiero Desarrollar

### 1️⃣ Requisitos

- Node.js 16+ ([nodejs.org](https://nodejs.org))
- MongoDB local u online
- Godot 4.0+
- Git

### 2️⃣ Setup Automático (Recomendado)

```bash
# En la raíz del proyecto
bash setup.sh
```

### 3️⃣ Setup Manual

```bash
# 1. Instalar dependencias del backend
cd backend
npm install

# 2. Crear archivo .env
cp .env.example .env

# 3. Editar .env con tus valores
# MONGODB_URI=mongodb://localhost:27017/operativo-urbano
# JWT_SECRET=tu-clave-secreta

# 4. Volver a raíz
cd ..
```

### 4️⃣ Iniciar Services

**Terminal 1 - MongoDB** (si es local):
```bash
mongod
```

**Terminal 2 - Backend API**:
```bash
npm run backend:dev
```

Deberías ver:
```
✓ MongoDB conectado: localhost
🚀 Servidor iniciado en puerto 3000
```

**Terminal 3 - Godot**:
```bash
cd game
godot --path . --debug
```

O simplemente abre Godot GUI y presiona F5.

---

## ✅ Verificación

### ¿Backend funciona?

```bash
curl http://localhost:3000/health
```

Respuesta esperada:
```json
{
  "status": "ok",
  "timestamp": "...",
  "environment": "development"
}
```

### ¿Godot carga?

- Se abre la ventana de Godot
- Ves el menú principal "OPERATIVO URBANO"
- Presiona Play y ves la escena de briefing

---

## 🎯 Flujo de Desarrollo

### 1. Modificar Backend

```bash
# Editar archivos en backend/src/
# El servidor auto-recarga con nodemon
# Prueba con curl o Postman
```

### 2. Modificar Juego

```bash
# Editar scripts en game/scripts/
# Cambios guardan automáticamente
# F5 o Play para recargar
```

### 3. Commit y Push

```bash
git checkout -b feature/mi-feature
# ... haz cambios ...
git commit -m "feat: descripción"
git push origin feature/mi-feature
# Abre PR en GitHub
```

---

## 📁 Estructura Esencial

```
/Operativo-Urbano
├── /backend          ← API Node.js
│   ├── src/
│   ├── .env          ← Edita esto ⚠️
│   └── package.json
├── /game             ← Proyecto Godot
│   ├── project.godot ← Abre esto
│   └── scripts/
└── README.md         ← Documentación completa
```

---

## 🔗 Rutas Útiles

| Ruta | URL |
|------|-----|
| API Health | http://localhost:3000/health |
| Misiones | http://localhost:3000/missions |
| Backend Code | ./backend/src |
| Game Code | ./game/scripts |
| Documentación | ./README.md |
| Desarrollo | ./DEVELOPMENT.md |

---

## 🆘 Problemas Comunes

### "Cannot connect to MongoDB"
```bash
# Inicia MongoDB en otra terminal
mongod
```

### "Port 3000 already in use"
```bash
# Cambia el puerto en backend/.env
PORT=3001
```

### "Godot no abre el proyecto"
```bash
# Verifica que Godot es v4.0+
godot --version

# O copia project.godot a otra carpeta
```

---

## 📚 Más Información

- 📖 [README Completo](README.md) - Todo lo que necesitas saber
- 🛠️ [Guía de Desarrollo](DEVELOPMENT.md) - Configuración detallada
- 🎮 [Game README](game/README.md) - Documentación de Godot
- 🔌 [Backend README](backend/README.md) - API REST
- 🤝 [Guía de Contribución](CONTRIBUTING.md) - Cómo contribuir

---

## 💡 Tips

1. **Auto-reload**: Backend recarga solo, Godot también
2. **Logs**: Mira la consola de ambos para debug
3. **Datos**: Cada vez que inicia, se seed la BD con misiones de ejemplo
4. **Hot reload**: En Godot presiona F5 para recargar escena

---

## 🎯 Checklist Inicial

- [ ] Node.js instalado
- [ ] Godot 4.0+ instalado
- [ ] Backend `npm install` hecho
- [ ] `.env` configurado
- [ ] MongoDB corriendo (si es local)
- [ ] Backend responde en http://localhost:3000/health
- [ ] Godot abre sin errores
- [ ] Juego corre y ve menú principal

---

¡Listo para desarrollar? Abre tu editor favorito y comienza! 🚀

**¡Mantén la táctica, agente!** 🎯
