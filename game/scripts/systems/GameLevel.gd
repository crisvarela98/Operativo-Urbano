## GameLevel.gd
## Script de control del nivel/mapa

class_name GameLevel
extends Node2D

# Variables de misión
var current_mission: Mission = null
var player: Player = null
var npcs: Array[NPC] = []
var doors: Array = []

# Estado de misión
var arrested_count: int = 0
var rescued_count: int = 0
var casualties: int = 0
var start_time: float = 0.0

# UI
@onready var hud: CanvasLayer = $HUD

func _ready() -> void:
	print("✓ Nivel inicializado")
	start_time = Time.get_ticks_msec() / 1000.0
	
	# Obtener referencias
	player = find_child("Player", true, false)
	
	# Encontrar todos los NPCs
	for npc in find_children("*", "NPC"):
		npcs.append(npc)
	
	# Cargar misión actual
	if GameManager.current_mission:
		current_mission = GameManager.current_mission
		update_hud()

func _process(delta: float) -> void:
	# Actualizar visión del jugador
	if player:
		var visible_objects = player.cast_vision_ray()
		for obj in visible_objects:
			if obj is NPC:
				obj.detect_player(player.global_position, player.get_vision_direction())

func _physics_process(delta: float) -> void:
	# Verificar si se completó la misión
	check_mission_completion()

## Actualizar HUD
func update_hud() -> void:
	if hud:
		hud.get_node("Stats/Arrested").text = "Arrestados: " + str(arrested_count)
		hud.get_node("Stats/Rescued").text = "Rescatados: " + str(rescued_count)
		hud.get_node("Stats/Time").text = format_time(Time.get_ticks_msec() / 1000.0 - start_time)

## Formatear tiempo
func format_time(seconds: float) -> String:
	var minutes = int(seconds) / 60
	var secs = int(seconds) % 60
	return "%02d:%02d" % [minutes, secs]

## Verificar completitud de misión
func check_mission_completion() -> void:
	if current_mission == null:
		return
	
	# Verificar si se completaron todos los objetivos
	var total_objectives = arrested_count + rescued_count
	
	if total_objectives >= 3:  # Ejemplo de condición
		end_mission()

## Finalizar misión
func end_mission() -> void:
	var duration = (Time.get_ticks_msec() / 1000.0) - start_time
	
	# Crear resultado
	var result = MissionResult.new()
	result.arrested = arrested_count
	result.rescued = rescued_count
	result.casualties = casualties
	result.duration = int(duration)
	
	print("✓ Misión completada")
	print("  Arrestados: ", arrested_count)
	print("  Rescatados: ", rescued_count)
	print("  Duración: ", format_time(duration))
	
	# Ir a pantalla de resultados
	get_tree().change_scene_to_file("res://scenes/ResultScreen.tscn")

## Arrestar NPC
func arrest_npc(npc: NPC) -> void:
	if npc.current_state == NPC.State.SURRENDERED:
		npc.set_state(NPC.State.ARRESTED)
		arrested_count += 1
		update_hud()
		print("🔗 Sospechoso arrestado")

## Rescatar rehén
func rescue_hostage(hostage: NPC) -> void:
	if hostage.npc_type == NPC.NPCType.HOSTAGE:
		hostage.set_state(NPC.State.RESCUED)
		rescued_count += 1
		update_hud()
		print("🛡️ Rehén rescatado")
