## Classes.gd
## Definiciones de clases y estructuras de datos

## Estructura de Misión
class_name Mission
var id: String
var title: String
var description: String
var city: String
var district: String
var difficulty: String
var objectives: Array[String]
var rewards: Dictionary

## Estructura de Perfil de Jugador
class_name PlayerProfile
var user_id: String
var money: int
var level: int
var xp: int
var rank: String
var upgrades: Array
var stats: Dictionary

## Estructura de Mejora
class_name Upgrade
var id: String
var name: String
var description: String
var category: String
var cost: int
var level: int
var max_level: int
var effect: Dictionary

## Estructura de Resultado de Misión
class_name MissionResult
var mission_id: String
var arrested: int
var rescued: int
var casualties: int
var penalties: int
var money_earned: int
var xp_earned: int
var rank: String
var duration: int
var completed: bool

func _init() -> void:
	money_earned = 0
	xp_earned = 0
	rank = "C"
	completed = false
