## NetworkManager.gd
## Autoload que gestiona conexiones socket.io

extends Node

var socket: Object = null
var room_id: String = ""
var is_connected: bool = false

func _ready() -> void:
	print("✓ NetworkManager inicializado")

## Conectar al servidor Socket.IO
func connect_to_server(server_url: String) -> void:
	# Aquí se inicializaría socket.io
	print("🔌 Conectando a servidor: ", server_url)

## Crear sala de juego
func create_room(mission_id: String) -> void:
	# Emitir evento create-room
	print("🏠 Creando sala para misión: ", mission_id)

## Unirse a sala
func join_room(room_id_param: String) -> void:
	room_id = room_id_param
	# Emitir evento join-room
	print("👥 Uniéndose a sala: ", room_id)

## Sincronizar posición de jugador
func sync_player_position(position: Vector2, rotation: float) -> void:
	if is_connected:
		# Emitir evento sync-position
		pass

## Sincronizar estado de NPCs
func sync_npc_state(npc_state: Dictionary) -> void:
	if is_connected:
		# Emitir evento sync-npc
		pass
