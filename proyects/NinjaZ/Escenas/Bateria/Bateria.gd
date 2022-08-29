extends Area2D

var posic_bateria = Vector2(-100, -100)

func _ready():
	randomize()
	pass 
	
	

func _on_TimerBateria_timeout():
	posic_bateria = Vector2(rand_range(53,430),rand_range(89,604))
	position = posic_bateria
	$TimerBateriaSalida.start()
	pass

func AX_salir():
	posic_bateria = Vector2(-100, -100)
	position = posic_bateria
	pass


func _on_TimerBateriaSalida_timeout():
	AX_salir()
	pass #
