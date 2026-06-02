## MainMenu.gd
## Script del menú principal

extends Control

@onready var play_button = $VBoxContainer/PlayButton
@onready var training_button = $VBoxContainer/TrainingButton
@onready var equipment_button = $VBoxContainer/EquipmentButton
@onready var upgrades_button = $VBoxContainer/UpgradesButton

func _ready() -> void:
	print("✓ Menú Principal Cargado")
	
	play_button.pressed.connect(_on_play_pressed)
	training_button.pressed.connect(_on_training_pressed)
	equipment_button.pressed.connect(_on_equipment_pressed)
	upgrades_button.pressed.connect(_on_upgrades_pressed)

## Ir a selección de misiones
func _on_play_pressed() -> void:
	print("▶ Iniciando juego...")
	get_tree().change_scene_to_file("res://scenes/BriefingScreen.tscn")

## Ir a entrenamiento
func _on_training_pressed() -> void:
	print("⚙ Iniciando entrenamiento...")
	# Cargar misión de tutorial
	get_tree().change_scene_to_file("res://scenes/BriefingScreen.tscn")

## Ir a equipo
func _on_equipment_pressed() -> void:
	print("🛡 Abriendo equipo...")
	# Implementar pantalla de equipo

## Ir a mejoras
func _on_upgrades_pressed() -> void:
	print("⬆ Abriendo mejoras...")
	get_tree().change_scene_to_file("res://scenes/UpgradeScreen.tscn")
