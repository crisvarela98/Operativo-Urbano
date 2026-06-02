## UpgradeScreen.gd
## Script de pantalla de mejoras

extends Control

@onready var upgrades_list = $VBoxContainer/ScrollContainer/UpgradesList
@onready var back_button = $VBoxContainer/BackButton
@onready var money_label = $VBoxContainer/MoneyLabel

var upgrades: Array[Upgrade] = []
var player_money: int = 5000

func _ready() -> void:
	print("✓ Pantalla de Mejoras Cargada")
	
	back_button.pressed.connect(_on_back_pressed)
	
	load_upgrades()
	update_ui()

## Cargar mejoras disponibles
func load_upgrades() -> void:
	upgrades.clear()
	
	# Crear mejoras de ejemplo
	var upgrade1 = Upgrade.new()
	upgrade1.id = "armor_1"
	upgrade1.name = "Chaleco Antibalas"
	upgrade1.description = "Protección corporal mejorada"
	upgrade1.category = "armor"
	upgrade1.cost = 500
	upgrade1.level = 1
	upgrade1.max_level = 3
	upgrade1.effect = {"armor": 15}
	upgrades.append(upgrade1)
	
	var upgrade2 = Upgrade.new()
	upgrade2.id = "flash_1"
	upgrade2.name = "Granada Aturdidora"
	upgrade2.description = "Equipo táctico de aturdimiento"
	upgrade2.category = "equipment"
	upgrade2.cost = 300
	upgrade2.level = 1
	upgrade2.max_level = 5
	upgrade2.effect = {"stun_time": 3}
	upgrades.append(upgrade2)
	
	var upgrade3 = Upgrade.new()
	upgrade3.id = "speed_1"
	upgrade3.name = "Boost de Velocidad"
	upgrade3.description = "Aumenta velocidad de movimiento"
	upgrade3.category = "skills"
	upgrade3.cost = 400
	upgrade3.level = 1
	upgrade3.max_level = 4
	upgrade3.effect = {"speed": 1.2}
	upgrades.append(upgrade3)
	
	var upgrade4 = Upgrade.new()
	upgrade4.id = "comms_1"
	upgrade4.name = "Comunicaciones Tácticas"
	upgrade4.description = "Mejora la efectividad de órdenes"
	upgrade4.category = "tactical"
	upgrade4.cost = 600
	upgrade4.level = 1
	upgrade4.max_level = 3
	upgrade4.effect = {"command_effectiveness": 1.3}
	upgrades.append(upgrade4)

## Actualizar UI
func update_ui() -> void:
	money_label.text = "Pesos Operativos: $" + str(player_money)
	
	# Limpiar lista
	for child in upgrades_list.get_children():
		child.queue_free()
	
	# Crear items de mejora
	for upgrade in upgrades:
		create_upgrade_item(upgrade)

## Crear item de mejora
func create_upgrade_item(upgrade: Upgrade) -> void:
	var panel = PanelContainer.new()
	panel.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	
	var hbox = HBoxContainer.new()
	hbox.add_theme_constant_override("separation", 10)
	panel.add_child(hbox)
	
	# Info
	var vbox_info = VBoxContainer.new()
	vbox_info.size_flags_horizontal = Control.SIZE_EXPAND_FILL
	hbox.add_child(vbox_info)
	
	var name_label = Label.new()
	name_label.text = upgrade.name
	name_label.add_theme_font_size_override("font_size", 20)
	vbox_info.add_child(name_label)
	
	var desc_label = Label.new()
	desc_label.text = upgrade.description
	desc_label.add_theme_font_size_override("font_size", 16)
	vbox_info.add_child(desc_label)
	
	# Nivel
	var level_label = Label.new()
	level_label.text = "Nivel: %d/%d" % [upgrade.level, upgrade.max_level]
	level_label.add_theme_font_size_override("font_size", 16)
	hbox.add_child(level_label)
	
	# Botón comprar
	var buy_button = Button.new()
	buy_button.text = "COMPRAR - $%d" % upgrade.cost
	buy_button.add_theme_font_size_override("font_size", 16)
	buy_button.pressed.connect(func(): _on_buy_upgrade(upgrade, buy_button))
	hbox.add_child(buy_button)
	
	upgrades_list.add_child(panel)

## Comprar mejora
func _on_buy_upgrade(upgrade: Upgrade, button: Button) -> void:
	if player_money >= upgrade.cost:
		player_money -= upgrade.cost
		upgrade.level += 1
		
		if upgrade.level > upgrade.max_level:
			upgrade.level = upgrade.max_level
			button.disabled = true
		
		update_ui()
		print("✓ Mejora comprada: ", upgrade.name)
	else:
		print("✗ Dinero insuficiente")

## Volver
func _on_back_pressed() -> void:
	print("◀ Volviendo al menú...")
	get_tree().change_scene_to_file("res://scenes/MainMenu.tscn")
