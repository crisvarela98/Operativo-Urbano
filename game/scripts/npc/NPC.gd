## NPC.gd
## Script base para NPCs (sospechosos y rehenes)

class_name NPC
extends CharacterBody2D

# Tipos de NPC
enum NPCType { SUSPECT, HOSTAGE }

# Estados de NPC
enum State { IDLE, ALERT, FLEEING, SURRENDERED, ARRESTED, RESCUED }

# Variables
@export var npc_type: NPCType = NPCType.SUSPECT
@export var move_speed: float = 150.0
@export var detection_range: float = 400.0

# Estado
var current_state: State = State.IDLE
var target_position: Vector2 = Vector2.ZERO
var is_detected: bool = false
var current_velocity: Vector2 = Vector2.ZERO

# Referencias
@onready var sprite: Sprite2D = $Sprite2D
@onready var animation_player: AnimationPlayer = $AnimationPlayer

func _ready() -> void:
	# Establecer color según tipo
	if npc_type == NPCType.SUSPECT:
		sprite.modulate = Color.from_string("#FF2A2A", Color.WHITE)  # Rojo
	else:
		sprite.modulate = Color.from_string("#FFD166", Color.WHITE)  # Amarillo
	
	print("✓ NPC inicializado: ", "Sospechoso" if npc_type == NPCType.SUSPECT else "Rehén")

func _physics_process(delta: float) -> void:
	match current_state:
		State.IDLE:
			idle_behavior(delta)
		State.ALERT:
			alert_behavior(delta)
		State.SURRENDERED:
			surrendered_behavior(delta)
		State.ARRESTED:
			arrested_behavior(delta)
		State.RESCUED:
			rescued_behavior(delta)
	
	velocity = current_velocity
	move_and_slide()

## Comportamiento Idle
func idle_behavior(delta: float) -> void:
	current_velocity = current_velocity.move_toward(Vector2.ZERO, 500.0 * delta)

## Comportamiento Alertado
func alert_behavior(delta: float) -> void:
	# Moverse hacia dirección aleatoria
	if target_position == Vector2.ZERO or global_position.distance_to(target_position) < 50:
		target_position = global_position + Vector2.from_angle(randf() * TAU) * 200
	
	var direction = (target_position - global_position).normalized()
	current_velocity = current_velocity.move_toward(direction * move_speed, 1000.0 * delta)

## Comportamiento Rendido
func surrendered_behavior(delta: float) -> void:
	current_velocity = current_velocity.move_toward(Vector2.ZERO, 500.0 * delta)
	if animation_player:
		animation_player.play("surrender")

## Comportamiento Arrestado
func arrested_behavior(delta: float) -> void:
	current_velocity = Vector2.ZERO

## Comportamiento Rescatado
func rescued_behavior(delta: float) -> void:
	current_velocity = Vector2.ZERO
	if animation_player:
		animation_player.play("rescued")

## Cambiar estado
func set_state(new_state: State) -> void:
	current_state = new_state
	print("🔄 NPC cambió estado a: ", State.keys()[new_state])

## Detectar jugador
func detect_player(player_pos: Vector2, player_vision: Vector2) -> bool:
	var distance = global_position.distance_to(player_pos)
	
	if distance < detection_range:
		var direction_to_player = (player_pos - global_position).normalized()
		var dot_product = direction_to_player.dot(player_vision)
		
		if dot_product > 0:  # El jugador está en rango
			is_detected = true
			set_state(State.ALERT)
			return true
	
	return false
