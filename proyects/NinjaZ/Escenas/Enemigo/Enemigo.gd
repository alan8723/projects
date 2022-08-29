extends Area2D

var posi_enemigo = Vector2(100, 100)
var movimiento = Vector2()
var ver_atras = false
const VELOCIDAD = 150

func _ready():
	AX_animacion()
	set_position(posi_enemigo)
	print(posi_enemigo)
	pass
	
func _process(delta):
	posi_enemigo += movimiento * VELOCIDAD * delta
#	posi_enemigo.x = clamp(posi_enemigo.x, 53, 430)
#	posi_enemigo.y = clamp(posi_enemigo.y, 89, 604)
	if posi_enemigo.x <= 53 || posi_enemigo.x >= 430:
		movimiento.x *= -1
	if posi_enemigo.y <= 89 || posi_enemigo.y >= 604:
		movimiento.y *= -1
	if movimiento.x < 0:
		 $SpriteEnemigo.set_flip_h(true)
		 ver_atras = true
	if movimiento.x >0:
		 $SpriteEnemigo.set_flip_h(false)
		 ver_atras = false
	
	set_position(posi_enemigo)
	pass

func AX_direccion(posi_player):
	#movimiento = destino - inicio
	var destino = posi_player
	var inicio = get_position()
	movimiento = destino - inicio
	movimiento = movimiento.normalized()
	pass

func AX_gameOver():
	set_process(false)
	pass
	
func AX_rebote():
	movimiento *= -1
	if(ver_atras == true):
		$SpriteEnemigo.set_flip_h(true)
	else:
		$SpriteEnemigo.set_flip_h(false)
	pass
func AX_animacion():
	$SpriteEnemigo.set_animation("ZWalck")
