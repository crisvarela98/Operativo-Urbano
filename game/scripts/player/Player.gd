## Player.gd
## Script del jugador - Maneja movimiento, visión y acciones

class_name Player
extends CharacterBody2D

# Velocidad
@export var max_speed: float = 300.0
@export var acceleration: float = 2000.0
@export var friction: float = 1500.0

# Rotación
@export var rotation_speed: float = 8.0

# Visión
@export var flashlight_range: float = 300.0
@export var fov_angle: float = PI / 3.0  # 60 grados

# Referencias
@onready var sprite: Sprite2D = $Sprite2D
@onready var flashlight: CanvasLight2D = $Flashlight
@onready var flashlight_ray: RayCast2D = $FlashlightRay

# Estado
var current_velocity: Vector2 = Vector2.ZERO
var target_angle: float = 0.0
var is_moving: bool = false

func _ready() -> void:
	# Colorear jugador de azul
	if sprite:
		sprite.modulate = Color.from_string("#1E6BFF", Color.WHITE)
	
	print("✓ Jugador inicializado")

func _physics_process(delta: float) -> void:
	# Obtener input del joystick virtual
	var input_vector = get_input_vector()
	
	# Actualizar movimiento
	update_movement(input_vector, delta)
	
	# Actualizar rotación
	update_rotation(input_vector, delta)
	
	# Aplicar movimiento
	velocity = current_velocity
	move_and_slide()

## Obtener vector de input
func get_input_vector() -> Vector2:
	var input = Vector2.ZERO
	input.x = Input.get_axis("ui_left", "ui_right")
	input.y = Input.get_axis("ui_up", "ui_down")
	return input.normalized()

## Actualizar movimiento
func update_movement(input_vector: Vector2, delta: float) -> void:
	if input_vector != Vector2.ZERO:
		current_velocity = current_velocity.move_toward(
			input_vector * max_speed, 
			acceleration * delta
		)
		is_moving = true
	else:
		current_velocity = current_velocity.move_toward(
			Vector2.ZERO, 
			friction * delta
		)
		is_moving = false

## Actualizar rotación
func update_rotation(input_vector: Vector2, delta: float) -> void:
	if input_vector != Vector2.ZERO:
		target_angle = input_vector.angle()
		rotation = lerp_angle(rotation, target_angle, rotation_speed * delta)

## Encender/Apagar linterna
func toggle_flashlight(enabled: bool) -> void:
	if flashlight:
		flashlight.enabled = enabled
	print("🔦 Linterna: ", "ON" if enabled else "OFF")

## Obtener posición de visión
func get_vision_direction() -> Vector2:
	return Vector2.from_angle(rotation)

## Disparar rayo de visión
func cast_vision_ray() -> Array:
	var visible_objects = []
	if flashlight_ray:
		# Aquí se detectarían objetos en el cono de visión
		pass
	return visible_objects
