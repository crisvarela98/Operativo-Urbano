## UIManager.gd
## Gestiona elementos de interfaz

class_name UIManager
extends CanvasLayer

# Referencias a elementos de UI
@onready var arrested_label = $VBoxContainer/Stats/Arrested
@onready var rescued_label = $VBoxContainer/Stats/Rescued
@onready var time_label = $VBoxContainer/Stats/Time

@onready var arrest_button = $HBoxContainer/VBoxContainer/ArrestBtn
@onready var rescue_button = $HBoxContainer/VBoxContainer/RescueBtn
@onready var order_button = $HBoxContainer/VBoxContainer/OrderBtn
@onready var flash_button = $HBoxContainer/VBoxContainer/FlashBtn
@onready var door_button = $HBoxContainer/VBoxContainer/DoorBtn

func _ready() -> void:
	print("✓ UIManager inicializado")
	
	# Conectar botones
	if arrest_button:
		arrest_button.pressed.connect(_on_arrest_pressed)
	if rescue_button:
		rescue_button.pressed.connect(_on_rescue_pressed)
	if order_button:
		order_button.pressed.connect(_on_order_pressed)
	if flash_button:
		flash_button.pressed.connect(_on_flash_pressed)
	if door_button:
		door_button.pressed.connect(_on_door_pressed)

func _on_arrest_pressed() -> void:
	print("🔗 Botón arrestar presionado")
	# Lógica de arrestar

func _on_rescue_pressed() -> void:
	print("🛡️ Botón rescatar presionado")
	# Lógica de rescatar

func _on_order_pressed() -> void:
	print("📢 Botón orden presionado")
	# Lógica de dar órdenes

func _on_flash_pressed() -> void:
	print("💥 Botón flash presionado")
	# Lógica de granada aturdidora

func _on_door_pressed() -> void:
	print("🚪 Botón puerta presionado")
	# Lógica de abrir puertas

## Actualizar estadísticas mostradas
func update_stats(arrested: int, rescued: int, time_str: String) -> void:
	if arrested_label:
		arrested_label.text = "Arrestados: " + str(arrested)
	if rescued_label:
		rescued_label.text = "Rescatados: " + str(rescued)
	if time_label:
		time_label.text = "Tiempo: " + time_str
