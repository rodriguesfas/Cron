/**
* ****************************************************************************
  Sofware: Cronos
  Descricion:
  Versino: 0.0.1
  Date: 02 de junho de 2016
  By; RodroguesFAS
  Contact: <http:/rodriguesfas.com.br> || <franciscosouzaacer@gmail.com>

  Suport: Rogerio Alencar Filho
  Contact: http://www.github.com/rogerin

* ****************************************************************************
*/


var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
var control = null;

//

function inicio () {
	// so inicia se control nao existir.
	if(!control) {
		control = setInterval(cronometro,10);
		document.getElementById("inicio").disabled = true;
		document.getElementById("parar").disabled = false;
		document.getElementById("continuar").disabled = true;
		document.getElementById("reinicio").disabled = false;
	}
	
}

function parar () {
	// so para se existir
	if(control) {
		// paara interval
		clearInterval(control);
		control = null; // zera a variavel que tem o interval
		document.getElementById("parar").disabled = true;
		document.getElementById("continuar").disabled = false;
	}
}

function reinicio () {
	// dps aplica aqui a regra
	// mesmo q o de cima
	clearInterval(control);
	control = null;


	centesimas = 0;
	segundos = 0;
	minutos = 0;
	horas = 0;
	Centesimas.innerHTML = ":00";
	Segundos.innerHTML = ":00";
	Minutos.innerHTML = ":00";
	Horas.innerHTML = "00";
	document.getElementById("inicio").disabled = false;
	document.getElementById("parar").disabled = true;
	document.getElementById("continuar").disabled = true;
	document.getElementById("reinicio").disabled = true;
}

function cronometro () {
	if (centesimas < 99) {
		centesimas++;
		if (centesimas < 10) { centesimas = "0"+centesimas }
			Centesimas.innerHTML = ":"+centesimas;
	}
	if (centesimas == 99) {
		centesimas = -1;
	}
	if (centesimas == 0) {
		segundos ++;
		if (segundos < 10) { segundos = "0"+segundos }
			Segundos.innerHTML = ":"+segundos;
	}
	if (segundos == 59) {
		segundos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0) ) {
		minutos++;
		if (minutos < 10) { minutos = "0"+minutos }
			Minutos.innerHTML = ":"+minutos;
	}
	if (minutos == 59) {
		minutos = -1;
	}
	if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
		horas ++;
		if (horas < 10) { horas = "0"+horas }
			Horas.innerHTML = horas;
	}
}