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

#include <NewPing.h>
#include <ThreadController.h>
#include <Thread.h>
#include <LiquidCrystal.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(13, 12, 11, 10, 9, 8);

/* Utilizado para  configurar o sonar. */
#define MAX_DISTANCE 60  /* Distancia Máxima realizada pelo ping (em centimetros). distancis Máxima que o sensor verifica é 500cm, acima disso mutio erro nas leituras. */

/* NewPing configura os pinosde envio, recebimento, e distancia máxima. */
NewPing sonarBegin(3, 2, MAX_DISTANCE);
NewPing sonarEnd(5, 4, MAX_DISTANCE);

/* Declara uma thread "raiz ou mãe" um controle que agrupa as thread's filhas.. */
ThreadController cpu;

/* Declara os objetos ultrasônico do tipo Thread's.. */
Thread threadSonarBegin;
Thread threadSonarEnd;

/**
  setup -
*/
void setup() {
  Serial.begin(9600);

  // set up the LCD's number of columns and rows:
  lcd.begin(20, 4);
  // Print a message to the LCD.
  lcd.setCursor(3, 0);
  lcd.print("II ROBOTS 2016");

  /* Configura as Threads dos Objetos.. */
  threadSonarBegin.setInterval(33);      /* Define o tempo em que irá ser executada a thread.. */
  threadSonarBegin.onRun(readPingSonarBegin); /* Define qual função irá ser execultada pela thread.. */

  threadSonarEnd.setInterval(33);
  threadSonarEnd.onRun(readPingSonarEnd);

  /* Adiciona as thread's filhas a thread raiz ou mãe.. */
  cpu.add(&threadSonarBegin);
  cpu.add(&threadSonarEnd);
}

/**
  loop -
*/
void loop() {
  /* Start a thread raiz.. */
  cpu.run();
}

/**
  readPingSonarBegin -
*/
void readPingSonarBegin() {
  unsigned int uS = sonarBegin.ping(); /* Enviar ping, recebe ping tempo em microsegundos (uS). */
  uS = uS / US_ROUNDTRIP_CM;           /* Converte ping tempo para uma distância e centimetros cm. */

  if (uS > 3 && uS <= 12) {
    lcd.setCursor(1, 2);
    lcd.clear();
    lcd.print("ROBO ENTROU!");
    Serial.println(1); // Entrou robo no labirinto
  }

  //Serial.print("Sonar1: ");
  //Serial.print(uS);
  //Serial.print("cm");
  //Serial.println(" ");
}

/**
  readPingSonarEnd -
*/
void readPingSonarEnd() {
  unsigned int uS = sonarEnd.ping();
  uS = uS / US_ROUNDTRIP_CM;

  if (uS > 3 && uS <= 12) {
    lcd.setCursor(1, 2);
    lcd.clear();
    lcd.print("ROBO SAIU!");
    Serial.println(0); // Saiu robo do labirinto 
  }

  //Serial.print("Sonar2: ");
  //Serial.print(uS);
  //Serial.print("cm");
  //Serial.println(" ");
}
