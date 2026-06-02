# Contribuir a Operativo Urbano

¡Gracias por tu interés en contribuir a Operativo Urbano: Unidad Táctica!

## 🤝 Cómo Contribuir

### Reportar Bugs

1. Verifica si el bug ya fue reportado en [Issues](https://github.com/crisvarela98/Operativo-Urbano/issues)
2. Si no existe, abre un nuevo Issue con:
   - Descripción clara del problema
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Screenshots/videos si es posible
   - Tu entorno (SO, versiones)

### Sugerir Features

1. Abre un Issue con etiqueta `enhancement`
2. Describe la feature claramente
3. Explica por qué sería útil
4. Proporciona ejemplos si es posible

### Enviar Pull Requests

1. **Fork** el repositorio
2. **Crea una rama** para tu feature:
   ```bash
   git checkout -b feature/descripcion-clara
   ```

3. **Haz cambios** siguiendo el estilo del código
4. **Commit** frecuentemente:
   ```bash
   git commit -m "type: descripción clara"
   ```
   
   **Tipos de commits:**
   - `feat:` - Nueva feature
   - `fix:` - Corrección de bug
   - `docs:` - Cambios en documentación
   - `style:` - Formato, whitespace, etc
   - `refactor:` - Refactorización sin cambios de funcionalidad
   - `test:` - Agregar/actualizar tests
   - `chore:` - Dependencias, build, etc

5. **Push** a tu fork:
   ```bash
   git push origin feature/descripcion-clara
   ```

6. **Abre Pull Request** con:
   - Descripción clara de cambios
   - Referencia a Issues relacionados
   - Screenshots/videos si aplica
   - Checklist completado

### Checklist para Pull Requests

```markdown
- [ ] Mi código sigue el estilo del proyecto
- [ ] He actualizado la documentación relevante
- [ ] No he agregado dependencias innecesarias
- [ ] He probado en local (backend y juego)
- [ ] Mi rama está actualizada con main
- [ ] No hay conflictos de merge
- [ ] He incluído comentarios donde es complejo
```

## 📋 Estándares de Código

### Node.js / JavaScript

```javascript
// Variables con camelCase
const playerHealth = 100;
const maxPlayers = 4;

// Funciones descriptivas
function calculateRankBonus(rank) {
  // Código...
}

// Comentarios útiles
// Calcular dinero ganado según rango
const bonus = baseReward * rankMultiplier;

// Use const por defecto, let si cambia
const config = { /* */ };
let counter = 0;
```

### GDScript

```gdscript
# Clases con PascalCase
class_name PlayerManager
extends Node

# Variables miembro con snake_case
var current_health: int = 100
var max_health: int = 100

# Funciones descriptivas
func take_damage(amount: int) -> void:
	current_health -= amount

## Documentar con ##
## Realiza acción importante
func do_action() -> void:
	pass
```

## 🏗️ Estructura de Carpetas

**Backend:**
```
src/
├── controllers/     # Lógica de negocio
├── models/         # Esquemas MongoDB
├── routes/         # Rutas API
├── middleware/     # Middleware custom
├── services/       # Servicios reutilizables
└── sockets/        # Socket.io handlers
```

**Game:**
```
scripts/
├── player/         # Scripts del jugador
├── npc/            # Scripts de NPCs
├── ui/             # Scripts de interfaz
└── systems/        # Sistemas globales
```

## 🧪 Testing

Antes de hacer PR, asegúrate de:

1. **Backend:**
   ```bash
   cd backend
   npm install
   npm run dev
   # Prueba rutas manualmente o con tests
   ```

2. **Game:**
   - Abre Godot
   - F5 para jugar
   - Prueba flujo completo
   - Verifica no hay errores en consola

## 📚 Documentación

- Actualiza README si cambias funcionalidad pública
- Comenta código complejo
- Documenta funciones públicas
- Mantén DEVELOPMENT.md actualizado

## ⚠️ Reglas Importantes

**NO hagas:**
- ❌ Commits de `.env` con secretos
- ❌ Commits de `node_modules/`
- ❌ Commits de `.godot/` o archivos compilados
- ❌ Cambios de estructura sin discusión
- ❌ PRs sin descripción clara

**SIEMPRE:**
- ✅ Sincroniza con main antes de hacer PR
- ✅ Prueba localmente
- ✅ Sigue el estilo existente
- ✅ Sé respetuoso en comentarios
- ✅ Responde a review requests

## 🎯 Prioridades del Proyecto

1. **Core Gameplay** - Mecánicas principales funcionales
2. **Performance** - Juego fluido en mobile
3. **Polish** - Animaciones, sonidos, feedback
4. **Features Avanzadas** - Multiplayer, mapas procedurales, etc

## 🚀 Proceso de Merge

1. Code review aprobado
2. Tests pasando (si existen)
3. Rama actualizada con main
4. Maintainer hace merge
5. Rama borrada después del merge

## 🎓 Recursos

- [GitHub Flow](https://guides.github.com/introduction/flow/)
- [Commit Conventions](https://www.conventionalcommits.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [Godot Documentation](https://docs.godotengine.org/)

## 💬 Comunidad

- Preguntas: Abre una Discussion
- Bugs: Issues
- Sugerencias: Issues con label `enhancement`
- Chat: (Discord/Slack - próximamente)

## 📖 Licencia

Al contribuir, aceptas que tu código sea bajo licencia MIT.

---

**¡Gracias por contribuir a Operativo Urbano!** 🎮🎯
