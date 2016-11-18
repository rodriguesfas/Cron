/**
* ****************************************************************************
  Sofware: Cronos
  Descricion:
  Versino: 0.0.1
  Date: 02 de junho de 2016
  By; RodroguesFAS
  Contact: <http:/rodriguesfas.com.br> || <franciscosouzaacer@gmail.com>
* ****************************************************************************
*/

 // Express é um framework que permite cria app web com facilidade com node.js.
 var app = require("express")();
 var express = require("express");

 // Na pasta public é onde colocaremos o arquivo Chart.js
 app.use(express.static(__dirname + '/public'));

 var http = require("http").Server(app);

 // Socket.io é um biblioteca que permite estabelecer concexão cliente servidor em tempo ral.
 var io = require("socket.io")(http);

 var serialport = require("serialport");
 var SerialPort = serialport.SerialPort;

 var mySocket;

/**
 * app.get - 
 */
 app.get("/", function(req, res){
 	res.sendfile("view/index.html");
 });

/**
 * mySerial - cria uma porta serial para comunicação com o Arduíno, define a velocidade de 
 * comunicação e interpreta o pular linha.
 * Onde eu estou colocando "/dev/ttyACM8" você deve substituir essa informação pela sua porta 
 * serial, onde o seu Arduíno está conectado. 
 */
 var mySerial = new SerialPort("/dev/ttyACM0", {//ttyUSB0
 	baudrate : 9600,
 	parser : serialport.parsers.readline("\n")
 });

/**
 * mySerial.on - Verifiica conexão com o arduino e informa no console.
 */
 mySerial.on("open", function(){
 	console.log("Arduino conexão estabelecida!");
 });

/**
 * mySerial.on -
 */
 mySerial.on("data", function(data){
 	// Recebe os dados enviados pelo arduino e exibe no console.
 	console.log(data);
 	
 	io.emit("dadosArduino", { // Emite um evento e o objeto data recebe valor.
 		valor: data
 	});
 });

 var usuarios = 0;

/**
 * io.on - Recebe conexão de cliente.
 */
 io.on("connection", function(socket){
 	console.log("Usuário Conectado!");
 	usuarios++;
 	
 	io.emit("usuarios online", usuarios);
 	socket.on("mensagem", function(msg){
 		io.emit("mensagem", msg);
 	});

 	socket.on("disconnect", function(){
 		console.log("Usuário Desconectado!");
 		usuarios--;
 		io.emit("users", usuarios);
 	});

 });

/**
 * http.linten -  
 */
 http.listen("3000", function(){
 	console.log("Servidor on-line em http://localhost:3000 - para sair Ctrl+C.");
 });