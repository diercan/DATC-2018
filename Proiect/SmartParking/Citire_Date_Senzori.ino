const int trigPin_slot1 = 9;
const int echoPin_slot1 = 10;
const int trigPin_slot2 = 8;
const int echoPin_slot2 = 7;
long duration_slot1;
int distance_slot1;
long duration_slot2;
int distance_slot2;
void setup() {
pinMode(trigPin_slot1, OUTPUT);
pinMode(echoPin_slot1, INPUT); 
pinMode(trigPin_slot2, OUTPUT); 
pinMode(echoPin_slot2, INPUT);
Serial.begin(9600); 
}
void loop() {
digitalWrite(trigPin_slot1, LOW);
digitalWrite(trigPin_slot1, HIGH);
digitalWrite(trigPin_slot1, LOW);
duration_slot1 = pulseIn(echoPin_slot1, HIGH);
distance_slot1 = duration_slot1 * 0.034/2;
if(distance_slot1 < 20 )
    {
    Serial.println("Locul 1 este ocupat");
    }
 else
  {
    Serial.println("Locul 1 este liber");
  }
  delay(1000);
digitalWrite(trigPin_slot2, LOW);
digitalWrite(trigPin_slot2, HIGH);
digitalWrite(trigPin_slot2, LOW);
duration_slot2 = pulseIn(echoPin_slot2, HIGH);
distance_slot2= duration_slot2 * 0.034/2;
if(distance_slot2 < 20 )
  {
    Serial.println("Locul 2 este ocupat");
  }
  else
  {
    Serial.println("Locul 2 este liber");
  }
  delay(1000);
}