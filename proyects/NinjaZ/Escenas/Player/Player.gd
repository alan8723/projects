extends Area2D

signal encontrado
signal tocado
signal escudado
signal proteccion


var movimiento = Vector2()
var posicPlayer = Vector2(240, 352)
const DESPLASAMIENTO = 150
var escudo = false
#onready var animacion = $SpritePlayer


func _ready():
	#la función _ready se ejecuta solo una ves al inicio del programa
	set_position(Vector2(posicPlayer))
	pass 

func _process(delta):
	#la función _process se ejecuta de manera constante
	AX_movimiento()
	AX_animacion()
	posicPlayer = posicPlayer + movimiento * DESPLASAMIENTO * delta
#	if (posicPlayer.x < 53):
#		posicPlayer.x = 53
#	if(posicPlayer.x > 430):
#		posicPlayer.x = 430
		
	posicPlayer.x = clamp(posicPlayer.x, 53, 430)
	posicPlayer.y = clamp(posicPlayer.y, 75, 628)
	set_position(posicPlayer)
	
	pass
	


func AX_movimiento():
	#mueve el robot con las flechitas
	movimiento = Vector2()
	
	if Input.is_action_pressed("ui_right"):
		movimiento.x += 1
	if Input.is_action_pressed("ui_left"):
		movimiento.x -= 1
	if Input.is_action_pressed("ui_down"):
		movimiento.y += 1
	if Input.is_action_pressed("ui_up"):
		movimiento.y -= 1
	movimiento = movimiento.normalized()
	pass
	
func AX_animacion():
	#
	if (movimiento.x > 0):
		$SpritePlayer.set_flip_h(false)
	if (movimiento.x < 0):
		$SpritePlayer.set_flip_h(true)
	if(movimiento == Vector2()):
		$SpritePlayer.set_animation("Idle")
	if(movimiento != Vector2()):
		$SpritePlayer.set_animation("Run")
		
	pass
#movimiento = movimiento +1 // movimiento +=1
#movimiento++ // movimiento +1


func _on_Player_area_entered(area):
	if area.is_in_group("Engrane"):
		area.AX_borrar()
		emit_signal("encontrado")
	if area.is_in_group("Enemigo") && escudo == false:
		emit_signal("tocado")
	if area.is_in_group("Enemigo") && escudo == true:
		$Escudo.visible = false
		escudo = false
		emit_signal("proteccion")
	if area.is_in_group("Bateria"):
		#vamos a contar puntos
		emit_signal("escudado")
		#hace visible el escudo
		$Escudo.visible = true
		#que no nos mate la motocierra
		escudo = true
		#apagar escudo
		area.AX_salir()
	pass # Replace with function body.
	
func AX_gameover_player():
	#Que deje de moverse el player
	set_process(false)
	#Animación de daño de player
	$SpritePlayer.set_animation("Hurt")
	pass
