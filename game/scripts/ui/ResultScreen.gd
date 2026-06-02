## ResultScreen.gd
## Script de pantalla de resultados

extends Control

@onready var rank_label = $VBoxContainer/RankLabel
@onready var arrested_value = $VBoxContainer/StatsContainer/ArrestedValue
@onready var rescued_value = $VBoxContainer/StatsContainer/RescuedValue
@onready var time_value = $VBoxContainer/StatsContainer/TimeValue
@onready var reward_value = $VBoxContainer/StatsContainer/RewardValue
@onready var retry_button = $VBoxContainer/HBoxContainer/RetryButton
@onready var menu_button = $VBoxContainer/HBoxContainer/MenuButton

var mission_result: MissionResult = null

func _ready() -> void:
	print("✓ Pantalla de Resultados Cargada")
	
	retry_button.pressed.connect(_on_retry_pressed)
	menu_button.pressed.connect(_on_menu_pressed)
	
	# Simular resultado de misión
	load_result()

## Cargar resultado de misión
func load_result() -> void:
	mission_result = MissionResult.new()
	mission_result.arrested = 2
	mission_result.rescued = 1
	mission_result.casualties = 0
	mission_result.penalties = 100
	mission_result.duration = 323  # 5:23
	mission_result.money_earned = 2500
	
	# Calcular rango
	var total_objectives = mission_result.arrested + mission_result.rescued
	if mission_result.casualties == 0 and total_objectives >= 4:
		mission_result.rank = "S"
	elif mission_result.casualties == 0 and total_objectives >= 3:
		mission_result.rank = "A"
	elif mission_result.casualties <= 1 and total_objectives >= 2:
		mission_result.rank = "B"
	elif total_objectives >= 1:
		mission_result.rank = "C"
	else:
		mission_result.rank = "F"
	
	update_display()

## Actualizar pantalla
func update_display() -> void:
	rank_label.text = "RANGO: " + mission_result.rank
	arrested_value.text = str(mission_result.arrested)
	rescued_value.text = str(mission_result.rescued)
	time_value.text = format_time(mission_result.duration)
	reward_value.text = "$" + str(mission_result.money_earned)
	
	# Cambiar color del rango según la clasificación
	match mission_result.rank:
		"S":
			rank_label.add_theme_color_override("font_color", Color.GOLD)
		"A":
			rank_label.add_theme_color_override("font_color", Color.from_string("#FFD166", Color.WHITE))
		"B":
			rank_label.add_theme_color_override("font_color", Color.CYAN)
		"C":
			rank_label.add_theme_color_override("font_color", Color.WHITE)
		"F":
			rank_label.add_theme_color_override("font_color", Color.RED)

## Formatear tiempo
func format_time(seconds: int) -> String:
	var minutes = seconds / 60
	var secs = seconds % 60
	return "%02d:%02d" % [minutes, secs]

## Reintentar
func _on_retry_pressed() -> void:
	print("🔄 Reintentar misión...")
	get_tree().change_scene_to_file("res://scenes/Game.tscn")

## Ir al menú
func _on_menu_pressed() -> void:
	print("◀ Ir al menú principal...")
	get_tree().change_scene_to_file("res://scenes/MainMenu.tscn")
