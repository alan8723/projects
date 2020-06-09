var botonA;
var botonF;
var valor;
var porcentaje;
var resultado;
var cajitaFeliz;

cajitaFeliz = document.getElementById("resultado");

botonA = document.getElementById("aumento");
botonF = document.getElementById("descuento");

botonA.addEventListener("click", mostrarAumento)
botonF.addEventListener("click", mostrarDescuento)


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

    cajitaFeliz = document.getElementById("resultado").value = resultado;
    document.getElementById("resultado2").value = descuento;
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

    cajitaFeliz = document.getElementById("resultado").value = resultado;
    document.getElementById("resultado2").value = aumento;

} //toString()