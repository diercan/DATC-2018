#include <Servo.h>
#include <EEPROM.h>
Servo myservo;
int p1, p2, p3, p4;

void setup() {                
  Serial.begin(9600);
  pinMode( 4, INPUT);
  pinMode( 5, INPUT);
  pinMode( 6, INPUT);
  pinMode( 7, INPUT);
  myservo.attach(9);
}

void loop() {
  p1 = digitalRead( 4) == 1 ? 0 : 1;
  if(p1 != EEPROM.read(0)){
    EEPROM.write(0, p1); 
    printStareParcare();  
  }

  p2 = digitalRead( 5) == 1 ? 0 : 1;
  if(p2 != EEPROM.read(1)){
    EEPROM.write(1, p2); 
    printStareParcare();     
  }
  p3 = digitalRead( 6) == 1 ? 0 : 1;
  if(p3 != EEPROM.read(2)){
    EEPROM.write(2, p3);    
    printStareParcare();  

  }

  p4 = digitalRead( 7) == 1 ? 0 : 1;
  if(p4 != EEPROM.read(3)){
    EEPROM.write(3, p4);  
    printStareParcare();   
  }



  if(p1 == 1 && p2 == 1 && p3 == 1 & p4 == 1)
   myservo.write(20);
  else
   myservo.write(80);
  delay(1000);

}

void printStareParcare(){
  Serial.print("P1:");
  Serial.print(p1, DEC); 

  Serial.print("P2:");
  Serial.print(p2, DEC); 

  Serial.print("P3:");
  Serial.print(p3, DEC); 

  Serial.print("P4:");
  Serial.print(p4, DEC); 
  Serial.print("\n");
    
}
