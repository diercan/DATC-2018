#include <dht.h>

dht t1, t2, t3, t4, t5;
int u1, u2, u3, u4, u5;

#define t1_pin 10
#define t2_pin 9
#define t3_pin 8
#define t4_pin 12
#define t5_pin 11
#define u1_pin A5
#define u2_pin A4
#define u3_pin A3
#define u4_pin A2
#define u5_pin A1

int id = 0;

void setup()
{
  Serial.begin(9600);
}

void read_temperatures()
{
  t1.read11(t1_pin);
  t2.read11(t2_pin);
  t3.read11(t3_pin);
  t4.read11(t4_pin);
  t5.read11(t5_pin);
}

void read_soil_moisture()
{
  u1 = analogRead(u1_pin);
  u1 = map(u1, 550, 0, 0, 100);
  u2 = analogRead(u2_pin);
  u2 = map(u2, 550, 0, 0, 100);
  u3 = analogRead(u3_pin);
  u3 = map(u3, 550, 0, 0, 100);
  u4 = analogRead(u4_pin);
  u4 = map(u4, 550, 0, 0, 100);
  u5 = analogRead(u5_pin);
  u5 = map(u5, 550, 0, 0, 100);
}

void send_values()
{
  Serial.print(id);
  Serial.print(" ");
  Serial.print(t1.temperature);
  Serial.print(" ");
  Serial.print(t2.temperature);
  Serial.print(" ");
  Serial.print(t3.temperature);
  Serial.print(" ");
  Serial.print(t4.temperature);
  Serial.print(" ");
  Serial.print(t5.temperature);
  Serial.print(" ");
  Serial.print(u1);
  Serial.print("% ");
  Serial.print(u2);
  Serial.print("% ");
  Serial.print(u3);
  Serial.print("% ");
  Serial.print(u4);
  Serial.print("% ");
  Serial.print(u5);
  Serial.print("% ");
  Serial.println();
  id++;
}

void loop()
{
  read_temperatures();
  read_soil_moisture();
  send_values();
  delay(3000);
}
