## GameManager.gd
## Autoload que gestiona estado global del juego

extends Node

# Variables de estado
var current_mission: Mission = null
var player_profile: PlayerProfile = null
var current_level: int = 1
var is_online: bool = false

# API backend
var api_url: String = "http://localhost:3000"
var auth_token: String = ""

func _ready() -> void:
	print("✓ GameManager inicializado")

## Cargar perfil del jugador
func load_player_profile(token: String) -> void:
	auth_token = token
	# Aquí se conectaría al API real

## Establecer misión actual
func set_current_mission(mission: Mission) -> void:
	current_mission = mission
	print("📋 Misión establecida: ", mission.title)

## Completar misión
func complete_mission(result: MissionResult) -> void:
	# Aquí se enviaría el resultado al API
	print("✓ Misión completada")
