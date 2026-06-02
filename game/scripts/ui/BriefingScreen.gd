## BriefingScreen.gd
## Script de briefing de misión

extends Control

@onready var back_button = $VBoxContainer/HBoxContainer/BackButton
@onready var start_button = $VBoxContainer/HBoxContainer/StartButton

var current_mission: Mission = null

func _ready() -> void:
	print("✓ Pantalla de Briefing Cargada")
	
	back_button.pressed.connect(_on_back_pressed)
	start_button.pressed.connect(_on_start_pressed)
	
	# Crear misión de ejemplo
	setup_mission()

## Configurar misión
func setup_mission() -> void:
	current_mission = Mission.new()
	current_mission.id = "mission_001"
	current_mission.title = "Edificio Tomado"
	current_mission.description = "Una unidad táctica necesita rescatar civiles"
	current_mission.city = "Buenos Aires"
	current_mission.district = "Zona Sur"
	current_mission.difficulty = "Normal"
	current_mission.objectives = [
		"Reducir sospechosos",
		"Arrestar al menos 2",
		"Rescatar rehén",
		"Evitar bajas civiles"
	]
	current_mission.rewards = {
		"money": 2500,
		"xp": 250
	}
	
	GameManager.set_current_mission(current_mission)

## Volver al menú
func _on_back_pressed() -> void:
	print("◀ Volviendo al menú...")
	get_tree().change_scene_to_file("res://scenes/MainMenu.tscn")

## Iniciar misión
func _on_start_pressed() -> void:
	print("▶ Iniciando misión...")
	get_tree().change_scene_to_file("res://scenes/Game.tscn")
