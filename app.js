
let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let oportunidades = 3;


function generarNumeroSecreto() {
  let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

  if (listaNumerosSorteados.length == numeroMaximo) { //si ya sorteamos todos los numeros
    asignarTextoElemento("p", "Ya se sortearon todos los numero");
  } else {
    if (listaNumerosSorteados.includes(numeroGenerado)) {//si el numero generado estaincluido en la lista //includes recorre el arreglo
      return generarNumeroSecreto(); //recursividad
    } else {
      listaNumerosSorteados.push(numeroGenerado);
      return numeroGenerado;
    }
  }
}

function asignarTextoElemento(Elemento, texto) {
  let titulo = document.querySelector(Elemento);
  titulo.innerHTML = texto;
  return;
}

function limpiarCaja() {
  document.querySelector("#valorUsuario").value = "";
}

function reiniciar_juego() {
  limpiarCaja(); //limpiar caja
  CondicionesIniciales(); //generar el numero aleatorio
  document.querySelector("#reiniciar").setAttribute("disabled", "true"); //deshabilitar el boton de nuevo juego
}

function CondicionesIniciales() {
  asignarTextoElemento("h1", "Juego del Numero Secreto");
  asignarTextoElemento("p", `Coloca un numero entre 1 - ${numeroMaximo}`);
  numeroSecreto = generarNumeroSecreto();
  intentos = 1;
  // document.getElementById('reiniciar').removeAttribute('disabled');
  document.querySelector("#reiniciar").setAttribute("disabled", "true"); //cambiamos el atributo a disabled
}

function verificar_intento() {
  let numUsuario = parseInt(document.getElementById("valorUsuario").value); //parse Int cambia a tipo entero el valor

  if (numeroSecreto === numUsuario) {
    asignarTextoElemento(
      "p",
      `Acertaste el numero en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }`
    );
    document.getElementById("reiniciar").removeAttribute("disabled"); // habilitamos en boton nuevo juego removiendo el atributo disabled que tiene en el html
  } else {
    if (intentos == oportunidades) {
      alert(
        "Lo hiciste bien, pero se te acabaron los intentos, Vuelve a participar"
      );
      CondicionesIniciales();
      intentos=0;
    } else {
      //Sl usuario no acerto
      if (numUsuario > numeroSecreto) {
        asignarTextoElemento("p", "El numero secreto es Menor");
      } else {
        asignarTextoElemento("p", "El numero secreto es Mayor");
      }
    }
    intentos++;
    limpiarCaja();
  }

  return;
}

verificar_intento();
CondicionesIniciales();
