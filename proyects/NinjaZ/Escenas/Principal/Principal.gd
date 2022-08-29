extends Node2D
var puntos = 0
var engranesInicio = 5
var nivel = 0
var tiempo = 12

export (PackedScene) var Engrane #crear variabla para clase/ avisar que el jugador está en el banco

func _ready():#redy se ejecuta una vez al principio del programa
	$ContenedorAudios/AudioGeneral.play()
	OS.center_window()
	randomize()
	AX_instanciar_engranes()
	AX_interface()
	pass 


func AX_instanciar_engranes():
	#crear engranes
	for index in range(engranesInicio + nivel):
		var EngraneInstanciado = Engrane.instance() #instancia de objeto/ le desimos al jugador que tiene que precalentar
		EngraneInstanciado.set_position(Vector2(rand_range(53,430),rand_range(89,604)))#le decimos donde tiene que jugar
		$ContenedorEngranes.call_deferred("add_child", EngraneInstanciado) # sale e jugador a la cancha
	pass

func AX_interface():
	#actualiza la interfaz
	$Interfaz/Puntos.text = str(puntos)
	$Interfaz/Nivel.text = str(nivel)
	$Interfaz/Tiempo.text = str(tiempo)
	pass


func _on_Player_encontrado():
	
	puntos +=1
	$ContenedorAudios/AudioPuntos.play()
	if $ContenedorEngranes.get_child_count() <= 1:
		#Me fijo cuantos engranes hay, cuando queden 0 vuelvo a generar mas engranes y subo de nivel
		nivel += 1
		$ContenedorAudios/AudioLevel.play()
		$Interfaz/Mensaje.visible = true
		$ContenedorTimers/TimerMensaje.start()
		tiempo = 12
		AX_instanciar_engranes()
	AX_interface()
	pass 


func _on_TimerMensaje_timeout():
	$Interfaz/Mensaje.visible = false
	pass # Replace with function body.


func _on_TimerGeneral_timeout():
	tiempo -= 1
	if $ContenedorEngranes.get_child_count() <= 0:
		#Me fijo cuantos engranes hay, cuando queden 0 vuelvo a generar mas engranes y subo de nivel
		nivel += 1
		$ContenedorAudios/AudioLevel.play()
		$Interfaz/Mensaje.visible = true
		$ContenedorTimers/TimerMensaje.start()
		tiempo = 12
		AX_instanciar_engranes()
	AX_interface()
	if tiempo <=0:
		AX_gameover()
	pass # Replace with function body.

func AX_gameover():
	#audio game over
	$ContenedorAudios/AudioGeneral.stop()
	$ContenedorAudios/AudioGameOver.play()
	#Poner mensaje game over
	$Interfaz/Mensaje.text = "Game Over!!"
	$Interfaz/Mensaje.visible = true
	#Parar el tiempo
	$ContenedorTimers/TimerGeneral.stop()
	#Que deje de moverse el player
	#Animación de daño del player
	$Player.AX_gameover_player()
	#Mostrar puntos
	$Interfaz/Puntos.rect_scale = Vector2(2.7, 2.7)
	$Interfaz/Puntos.rect_position = Vector2(48, 65)
	#cambiar color fondo
	$Fondo.modulate = Color(1, 0.4, 0.4, 0.89)
	#Posibilidad de reiniciar
	$Interfaz/Button.visible = true
	#parar enemigo
	$Enemigo.AX_gameOver()
	pass


func _on_Button_pressed():
	get_tree().reload_current_scene()
	pass 


func _on_TimerEnemigo_timeout():
	var posi_player = $Player.get_position()
	$Enemigo.AX_direccion(posi_player)
	pass 


func _on_Player_tocado():
	AX_gameover()
	pass 


func _on_Player_escudado():
	puntos += 3
	$ContenedorAudios/AudioPowerUp.play()
	AX_interface()
	pass


func _on_Player_proteccion():
	$Enemigo.AX_rebote()
	pass # Replace with function body.
