const juegoCanvas = document.getElementById("juego-canvas");

const ctx = juegoCanvas.getContext("2d");

const LIMITEY = juegoCanvas.height;
const LIMITEX = juegoCanvas.width;
const CUADROSMAX = 30;
const MOVIMIENTO = 10;
const DIRECIONES = {
    ARRIBA: 1,
    ABAJO: 2,
    IZQUIERDA: 3,
    DERECHA: 4
};

var direccion = 0;
var ultimaDireccion = 0;
var manzana = generarManzana();
var serpiente = [
    { posX: 10, posY: 10 },
    { posX: 20, posY: 10 }
];
var cabeza = serpiente.length-1;

function dibujarSerpiente(){
    for(let unidadSerpiente of serpiente){
        ctx.beginPath();
        ctx.rect(unidadSerpiente.posX, unidadSerpiente.posY, MOVIMIENTO, MOVIMIENTO);
        ctx.stroke();
    }
}

function dibujarUnidadSerpiente(x, y){
    ctx.beginPath();
    ctx.rect(x, y, MOVIMIENTO, MOVIMIENTO)
    ctx.stroke();
}

function ajustarPosicion(){
    for(var i = 0; i < cabeza; i++){
        serpiente[i].posY = serpiente[i+1].posY;
        serpiente[i].posX = serpiente[i+1].posX;
    };
}

function moverSerpiente(){

    if(direccion === DIRECIONES.DERECHA) {
        ajustarPosicion();
        serpiente[cabeza].posX += MOVIMIENTO;
    }
    else if(direccion === DIRECIONES.IZQUIERDA){
        ajustarPosicion();
        serpiente[cabeza].posX -= MOVIMIENTO;
    } 
    else if(direccion === DIRECIONES.ABAJO){
        ajustarPosicion();
        serpiente[cabeza].posY += MOVIMIENTO
    }

    else if(direccion === DIRECIONES.ARRIBA) {
        ajustarPosicion();
        serpiente[cabeza].posY -= MOVIMIENTO;
    }

    else throw new Error("direccion tiene un valor invalido");
}

function limpiarCanvas() {
    ctx.clearRect(0, 0, juegoCanvas.clientWidth, juegoCanvas.height);
}

function revisarColision(){
    if(serpiente[cabeza].posX < 0 || serpiente[cabeza].posY < 0 || serpiente[cabeza].posX == LIMITEX || serpiente[cabeza].posY == LIMITEY){
        clearInterval(loopJuego);
        alert("colision");
        return;
    }
    for(var i = 0; i < cabeza; i++){
        if(serpiente[cabeza].posX == serpiente[i].posX && serpiente[cabeza].posY == serpiente[i].posY){
            clearInterval(loopJuego);
            alert("colision");
            return;
        }
    }
    if( manzana.positionX == serpiente[cabeza].posX && manzana.positionY == serpiente[cabeza].posY){
        manzana = generarManzana();
        agregarUnidadSerpiente();
    }

}
function generarManzana(){
       var posY = Math.ceil(Math.random()* CUADROSMAX-1) * MOVIMIENTO;
       var posX = Math.ceil(Math.random()* CUADROSMAX-1) * MOVIMIENTO;
       console.log(posY + "Y antes");
       console.log(posX + "X antes");
        for(var i = 0; i < cabeza; i++){
            while(posY == serpiente[i].posY && posX == serpiente[i].posX){
                posY = Math.ceil(Math.random()* CUADROSMAX-1) * MOVIMIENTO;
                posX = Math.ceil(Math.random()* CUADROSMAX-1) * MOVIMIENTO;
                console.log(posY + "Y durante")
                console.log(posX + "X durante")
            }
        }
        var manzana = {
            positionY : posY,
            positionX : posX
        };
        return manzana;
}
function agregarUnidadSerpiente(){
    if(serpiente[0].posX < serpiente[1].posX){
        serpiente.push({posX: serpiente[0].posX -MOVIMIENTO, posY:serpiente[0].posY, })
        cabeza = serpiente.length-1;
        acomodarUnidadSerpiente(serpiente);
    }else if(serpiente[0].posX > serpiente[1].posX){
        serpiente.push({posX: serpiente[0].posX +MOVIMIENTO, posY:serpiente[0].posY, })
        cabeza = serpiente.length-1;
        acomodarUnidadSerpiente(serpiente);
    }else if(serpiente[0].posY < serpiente[1].posY){
        serpiente.push({posX: serpiente[0].posX, posY: serpiente.posY - MOVIMIENTO})
        cabeza = serpiente.length-1;
        acomodarUnidadSerpiente(serpiente);
    }else if(serpiente[0].posY > serpiente[1].posY){
        serpiente.push({posX: serpiente[0].posX, posY: serpiente.posY + MOVIMIENTO})
        cabeza = serpiente.length-1;
        acomodarUnidadSerpiente(serpiente)
    }
}
function acomodarUnidadSerpiente(array){
    var aux = array[array.length -1] 
    for(var i = array.length -1; i >= 0 ; i--){
        array[i] = array[i-1]
    }
    array[0] = aux;
}

document.addEventListener("keyup", (e) => {
    if (e.code === "ArrowUp") {
        if(direccion != DIRECIONES.ABAJO){
            direccion = DIRECIONES.ARRIBA; 
        }  
    }else if (e.code === "ArrowDown"){
        if(direccion != DIRECIONES.ARRIBA){
            direccion = DIRECIONES.ABAJO;
        }
    }else if (e.code === "ArrowLeft"){
        if(direccion != DIRECIONES.DERECHA){
            direccion = DIRECIONES.IZQUIERDA;
        }
    }else if (e.code === "ArrowRight"){
        if(direccion != DIRECIONES.IZQUIERDA){
            direccion = DIRECIONES.DERECHA;
        }
    } else return;


});
var loopJuego = setInterval(()=>{   
    limpiarCanvas();
    moverSerpiente();
    dibujarSerpiente();
    revisarColision();
    dibujarUnidadSerpiente(manzana.positionX, manzana.positionY);}, 100)
