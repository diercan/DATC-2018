#include <Wire.h> 

int redPin0=2;
int greenPin0=3;
int redPin1=4;
int greenPin1=5;
int redPin2=6;
int greenPin2=7;
int redPin3=8;
int greenPin3=9;
int redPin4=10;
int greenPin4=11;
int redPin5=12;
int greenPin5=13;
int citiredate0;
int citiredate1;
int citiredate2;
int citiredate3;
int citiredate4;
int citiredate5;
int procentumiditate_senzor0;
int procentumiditate_senzor1;
int procentumiditate_senzor2;
int procentumiditate_senzor3;
int procentumiditate_senzor4;
int procentumiditate_senzor5;
#define pinsenzor0 A0
#define pinsenzor1 A1
#define pinsenzor2 A2
#define pinsenzor3 A3
#define pinsenzor4 A4
#define pinsenzor5 A5

void setup()
{

Serial.begin(9600);
pinMode(redPin0, OUTPUT);
pinMode(greenPin0, OUTPUT);
pinMode(redPin1, OUTPUT);
pinMode(greenPin1, OUTPUT);
pinMode(redPin2, OUTPUT);
pinMode(greenPin2, OUTPUT);
pinMode(redPin3, OUTPUT);
pinMode(greenPin3, OUTPUT);
pinMode(redPin4, OUTPUT);
pinMode(greenPin4, OUTPUT);
pinMode(redPin5, OUTPUT);
pinMode(greenPin5, OUTPUT);
}

void loop()
{
citiredate0 = analogRead(pinsenzor0);
citiredate1 = analogRead(pinsenzor1);
citiredate2 = analogRead(pinsenzor2);
citiredate3 = analogRead(pinsenzor3);
citiredate4 = analogRead(pinsenzor4);
citiredate5 = analogRead(pinsenzor5);

procentumiditate_senzor0 = map(citiredate0, 1023,0,0,100);
if (procentumiditate_senzor0 < 10)
{
  setColor0(0,255);
  
  
}
else 
{
  setColor0(255,0);
 }

procentumiditate_senzor1 = map(citiredate1, 1023,0,0,100);
if (procentumiditate_senzor1 < 10)
{
  setColor1(0,255);
  
  
}
else 
{
  setColor1(255,0);

 }
 
procentumiditate_senzor2 = map(citiredate2, 1023,0,0,100);
if (procentumiditate_senzor2 < 10)
{
  setColor2(0,255);
  
  
}
else 
{
  setColor2(255,0);
 
 }
 
procentumiditate_senzor3 = map(citiredate3, 1023,0,0,100);
if (procentumiditate_senzor3 < 10)
{
  setColor3(0,255);

  
}
else 
{
  setColor3(255,0);
 
 }
 
procentumiditate_senzor4 = map(citiredate4, 1023,0,0,100);
if (procentumiditate_senzor4 < 10)
{
  setColor4(0,255);
 
  
}
else 
{
  setColor4(255,0);
 }
 
procentumiditate_senzor5 = map(citiredate5, 1023,0,0,100);
if (procentumiditate_senzor5 < 10)
{
  setColor5(0,255);

  
}
else 
{
  setColor5(255,0);

 }
 

//Serial.print("Humidity Senzor 0: ");
Serial.print(procentumiditate_senzor0);
Serial.print("%,");

Serial.println(" ");
//Serial.print("Humidity Senzor 1: ");
Serial.print(procentumiditate_senzor1);
Serial.print("%,");

Serial.println(" ");
//Serial.print("Humidity Senzor 2: ");
Serial.print(procentumiditate_senzor2);
Serial.print("%,");

Serial.println(" ");
//Serial.print("Humidity Senzor 3: ");
Serial.print(procentumiditate_senzor3);
Serial.print("%,");

Serial.println(" ");
//Serial.print("Humidity Senzor 4: ");
Serial.print(procentumiditate_senzor4);
Serial.print("%,");

Serial.println(" ");
//Serial.print("Humidity Senzor 5: ");
Serial.print(procentumiditate_senzor5);
Serial.print("%,");

Serial.println(" ");

delay(5000);  
}

void setColor0(int redValue,int greenValue){
  analogWrite(redPin0, redValue);
 
  analogWrite(greenPin0,greenValue);
  
}

void setColor1(int redValue,int greenValue){
  analogWrite(redPin1, redValue);
 
  analogWrite(greenPin1,greenValue);
  
}

void setColor2(int redValue,int greenValue){
  analogWrite(redPin2, redValue);
 
  analogWrite(greenPin2,greenValue);
  
}

void setColor3(int redValue,int greenValue){
  analogWrite(redPin3, redValue);
 
  analogWrite(greenPin3,greenValue);
  
}

void setColor4(int redValue,int greenValue){
  analogWrite(redPin4, redValue);
 
  analogWrite(greenPin4,greenValue);
  
}

void setColor5(int redValue,int greenValue){
  analogWrite(redPin5, redValue);
 
  analogWrite(greenPin5,greenValue);
  
}
