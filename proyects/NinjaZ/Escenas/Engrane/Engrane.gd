extends Area2D


func _ready():
	pass 
	
	
func AX_borrar():
	call_deferred("queue_free")
	pass
