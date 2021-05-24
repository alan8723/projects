var botonA;
var botonF;
var valor;
var porcentaje;
var resultado;
var cajitaFeliz;
//var calculadoraP = new CalculosPorcentjes();


cajitaFeliz = document.getElementById("resultado");

botonA = document.getElementById("aumento");
botonF = document.getElementById("descuento");
botonCasoA = document.getElementById("calcularCasoA");
botonCasoB = document.getElementById("calcularCasoB");

botonA.addEventListener("click", mostrarAumento);
botonF.addEventListener("click", mostrarDescuento);
botonCasoA.addEventListener("click", calcularCasoA);
botonCasoB.addEventListener("click", calcularCasoB);


function mostrarDescuento()
{
    var descuento;

    valor = document.getElementById("valor").value;
    valor = parseFloat (valor);

    while (valor == isNaN(valor))
    {
    valor = prompt("solo ingrese numeros");
    valor = parseFloat (valor)
    }
    porcentaje = document.getElementById("porcentaje").value;
    porcentaje = parseFloat (porcentaje);

    while (porcentaje == isNaN(porcentaje))
    {
    porcentaje = prompt("solo ingrese numeros");
    porcentaje = parseFloat (porcentaje)
    }
    console.log(porcentaje);

    porcentaje /= 100;
    descuento = valor * porcentaje;
    resultado = valor - descuento;
    console.log(resultado);

    cajitaFeliz = document.getElementById("resultado").value = resultado.toFixed(2);
    document.getElementById("resultado2").value = descuento.toFixed(2);
    }

function mostrarAumento()
{
    var aumento;

    valor = document.getElementById("valor").value;
    valor = parseFloat (valor);

    while (valor == isNaN(valor))
    {
        valor = prompt("solo ingrese numeros")
        valor = parseFloat (valor) 
    }

    porcentaje = document.getElementById("porcentaje").value;
    porcentaje = parseFloat (porcentaje);

    while (porcentaje == isNaN(porcentaje))
    {
        porcentaje = prompt("solo ingrese numeros")
        porcentaje = parseFloat (porcentaje)
    }

    porcentaje /= 100;
    aumento = valor * porcentaje;
    resultado = valor + aumento;

    cajitaFeliz = document.getElementById("resultado").value = resultado.toFixed(2);
    document.getElementById("resultado2").value = aumento.toFixed(2);

} 

function calcularCasoA(){
    var total = document.getElementById("totalCasoA").value;
    var cantidad = document.getElementById("cantidadCasoA").value;

    var cantidadAux = cantidad * 100
    var porcentaje = cantidadAux / total;
    document.getElementById("porcentajeCasoA").value = porcentaje.toFixed(2); 
}

function calcularCasoB(){
    var cantidad = document.getElementById("cantidadCasoB").value;
    var porcentaje = document.getElementById("porcentajeCasoB").value;

    var cantidadAux = cantidad / porcentaje;
    var total = cantidadAux * 100;
    document.getElementById("totalCasoB").value = total.toFixed(2);
}
//toString()