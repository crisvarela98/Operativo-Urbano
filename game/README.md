# Operativo Urbano - Juego Godot

Proyecto Godot 4.x del juego táctico Operativo Urbano: Unidad Táctica

## 🎮 Requisitos

- **Godot Engine 4.0+**
- **Resolución target**: 1080x1920 (mobile vertical)

## 📂 Estructura del Proyecto

```
game/
├── project.godot                # Configuración del proyecto
├── scenes/                      # Escenas del juego
│   ├── MainMenu.tscn           # Menú principal
│   ├── BriefingScreen.tscn     # Briefing de misión
│   ├── Game.tscn               # Escena principal del juego
│   ├── ResultScreen.tscn       # Pantalla de resultados
│   └── UpgradeScreen.tscn      # Tienda de mejoras
├── scripts/
│   ├── player/                 # Scripts del jugador
│   │   └── Player.gd           # Controlador del jugador
│   ├── npc/                    # Scripts de NPCs
│   │   └── NPC.gd             # Controlador de sospechosos/rehenes
│   ├── ui/                     # Scripts de interfaz
│   │   ├── MainMenu.gd         # Menú principal
│   │   ├── BriefingScreen.gd   # Briefing
│   │   ├── ResultScreen.gd     # Resultados
│   │   └── UpgradeScreen.gd    # Mejoras
│   ├── systems/                # Sistemas globales
│   │   ├── GameManager.gd      # Autoload - Gestor de juego
│   │   ├── NetworkManager.gd   # Autoload - Socket.io
│   │   ├── GameLevel.gd        # Control de nivel
│   │   ├── UIManager.gd        # Control de UI
│   │   └── Classes.gd          # Definiciones de clases
└── assets/
    ├── ui_theme.tres           # Tema de UI
    └── placeholder/            # Assets placeholder
```

## 🚀 Primeros Pasos

### Abrir el Proyecto

1. Abre **Godot 4.x**
2. Click en **"Open Project"**
3. Navega a la carpeta `game/`
4. Selecciona `project.godot`
5. Click en **"Open"**

### Ejecutar el Juego

**Desde el editor:**
- Presiona **F5** o click en el botón ▶ Play

**En terminal:**
```bash
godot --path . --debug
```

## 🎯 Escenas Principales

### MainMenu.tscn
Menú principal con opciones:
- Jugar
- Entrenamiento
- Equipo
- Mejoras
- Online (próximamente)

**Script**: `scripts/ui/MainMenu.gd`

### BriefingScreen.tscn
Pantalla de briefing con:
- Nombre de misión
- Ubicación
- Objetivos
- Dificultad

**Script**: `scripts/ui/BriefingScreen.gd`

### Game.tscn
Escena principal de gameplay:
- Mapa con habitaciones
- Jugador (azul)
- Sospechosos (rojo)
- Rehenes (amarillo)
- UI de cabecera con estadísticas

**Script**: `scripts/systems/GameLevel.gd`

### ResultScreen.tscn
Pantalla de resultados:
- Rango obtenido
- Estadísticas
- Dinero ganado
- Opciones: Reintentar / Menú

**Script**: `scripts/ui/ResultScreen.gd`

### UpgradeScreen.tscn
Tienda de mejoras:
- Lista de equipos disponibles
- Costo y nivel
- Dinero actual

**Script**: `scripts/ui/UpgradeScreen.gd`

## 🎮 Controles

### En Juego

| Acción | Control |
|--------|---------|
| Movimiento | WASD / Joystick |
| Rotar | Mouse / Toque |
| Arrestar | Click derecho / Botón |
| Rescatar | E / Botón |
| Orden | Q / Botón |
| Flash | F / Botón |
| Puerta | E / Botón |

### Debug

| Tecla | Acción |
|-------|--------|
| F1 | Toggle HUD |
| F2 | Toggle Physics Debug |
| F11 | Fullscreen |

## 📊 Sistema de Clases

Definidas en `scripts/systems/Classes.gd`:

```gdscript
class_name Mission
class_name PlayerProfile
class_name Upgrade
class_name MissionResult
```

## 🔄 Autoload

Servicios globales accesibles desde cualquier script:

### GameManager
```gdscript
GameManager.current_mission
GameManager.player_profile
GameManager.auth_token
GameManager.set_current_mission(mission)
GameManager.complete_mission(result)
```

### NetworkManager
```gdscript
NetworkManager.connect_to_server(url)
NetworkManager.create_room(mission_id)
NetworkManager.join_room(room_id)
NetworkManager.sync_player_position(position, rotation)
```

## 🎨 Colores y Tema

Paleta definida en `assets/ui_theme.tres`:

```
Fondo:        #0B1020
Piso:         #1B2440
Pared:        #05070D
Operador:     #1E6BFF (azul)
Sospechoso:   #FF2A2A (rojo)
Rehén:        #FFD166 (amarillo)
UI Dorado:    #C9A227
Texto:        #F2F2F2
```

## 🔧 Cómo Extender

### Agregar una Nueva Escena

1. Crea `scenes/MyScene.tscn`
2. Crea `scripts/ui/MyScene.gd`
3. Asigna el script a la escena
4. Agrega la transición en otro script:
```gdscript
get_tree().change_scene_to_file("res://scenes/MyScene.tscn")
```

### Agregar un NPC

1. Instancia un `CharacterBody2D`
2. Asigna el script `scripts/npc/NPC.gd`
3. Configura `npc_type` (SUSPECT o HOSTAGE)
4. Añade al nodo raíz `NPCs`

### Conectar al Backend

En `GameManager.gd`:

```gdscript
func load_player_profile(token: String) -> void:
    auth_token = token
    # Implementar HTTP call al API
    
    # Ejemplo con HTTPRequest:
    var http_request = HTTPRequest.new()
    add_child(http_request)
    http_request.request(
        api_url + "/player/profile",
        ["Authorization: Bearer " + token]
    )
```

## 🐛 Debugging

### Mostrar Colliders

En la esquina superior derecha de la ventana de juego, haz click en **"Gizmos"** y activa **"Collision Shapes"**.

### Logs

Usa `print()` en GDScript:

```gdscript
print("Debug: Jugador en ", global_position)
print_debug("Información detallada")
```

Los logs aparecen en la pestaña **"Output"** de Godot.

## 📱 Opciones de Exportación

### Android

1. Configura el SDK en **Proyecto → Configuración del Proyecto → Exportación**
2. Crea perfil de exportación para Android
3. Click en **Exportar APK**

### HTML5

1. Crea perfil HTML5
2. Exporta y abre en navegador
3. ¡Juega en la web!

## 🎬 Animaciones

Sistema de animaciones en `AnimationPlayer`:

```gdscript
# Reproducir animación
animation_player.play("nombre_animacion")

# Esperar a que termine
await animation_player.animation_finished
```

Animaciones disponibles:
- `surrender`: Sospechoso rinde armas
- `rescued`: Rehén siendo rescatado
- `arrest`: Arresto de sospechoso

## 📚 Referencia Rápida de GDScript

```gdscript
# Obtener referencia a nodo
@onready var sprite = $Sprite2D

# Acceder a Autoload
GameManager.current_mission
NetworkManager.connect_to_server("http://...")

# Conectar señales
button.pressed.connect(_on_button_pressed)

# Mover nodo
position += velocity * delta

# Rotar hacia dirección
rotation = Vector2.from_angle(angle)

# Cambiar escena
get_tree().change_scene_to_file("res://scenes/NextScene.tscn")

# Emitir evento personalizado
mission_completed.emit(result)
```

## 🤝 Contribuir

Para agregar features:

1. Crea una rama: `git checkout -b feature/nueva-feature`
2. Haz tus cambios
3. Commit: `git commit -m "Add nueva-feature"`
4. Push: `git push origin feature/nueva-feature`
5. Abre un PR

## 📖 Recursos Útiles

- [Documentación Godot 4](https://docs.godotengine.org/en/stable/)
- [GDScript Reference](https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/index.html)
- [2D Rendering](https://docs.godotengine.org/en/stable/tutorials/2d/index.html)
- [Signals in Godot](https://docs.godotengine.org/en/stable/tutorials/best_practices/godot_signals.html)

## 🎓 Tips de Desarrollo

- Usa **autoload** para servicios globales
- Mantén scripts enfocados en una responsabilidad
- Usa **signals** para comunicación entre nodos
- Prefiere `@onready` para referencias de nodos
- Documenta con comentarios `##` para auto-doc

## 📝 Licencia

MIT - Ver [LICENSE](../LICENSE)

---

**¡Bienvenido a Operativo Urbano!** 🎯
