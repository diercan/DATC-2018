const int trigPin_1 = 3;
const int echoPin_1 = 2;
const int trigPin_2 = 5;
const int echoPin_2 = 4;
const int trigPin_3 = 9;
const int echoPin_3 = 8;
const int trigPin_4 = 10;
const int echoPin_4 = 11;
// defines variables
long duration_1;
int distance_1;

long duration_2;
int distance_2;

long duration_3;
int distance_3;

long duration_4;
int distance_4;
void setup()
{
pinMode(trigPin_1, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin_1, INPUT); // Sets the echoPin as an Input
pinMode(trigPin_2, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin_2, INPUT); // Sets the echoPin as an Input
pinMode(trigPin_3, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin_3, INPUT); // Sets the echoPin as an Input
pinMode(trigPin_4, OUTPUT); // Sets the trigPin as an Output
pinMode(echoPin_4, INPUT); // Sets the echoPin as an Input
Serial.begin(9600); // Starts the serial communication
}
void loop() 
{
digitalWrite(trigPin_1, LOW);
digitalWrite(trigPin_1, HIGH);
digitalWrite(trigPin_1, LOW);
duration_1 = pulseIn(echoPin_1, HIGH);
distance_1 = duration_1 * 0.034/2;
String Loc1 = "1 ";
String sDistance1 = Loc1 + distance_1;
Serial.println(sDistance1);
//Serial.println(distance_1);
delay(500);

digitalWrite(trigPin_2, LOW);
digitalWrite(trigPin_2, HIGH);
digitalWrite(trigPin_2, LOW);
duration_2 = pulseIn(echoPin_2, HIGH);
distance_2 = duration_2 * 0.034/2;
String Loc2 = "2 ";
String sDistance2 = Loc2 + distance_2;
Serial.println(sDistance2);
//Serial.println(distance_2);
delay(500);

digitalWrite(trigPin_3, LOW);
digitalWrite(trigPin_3, HIGH);
digitalWrite(trigPin_3, LOW);
duration_3 = pulseIn(echoPin_3, HIGH);
distance_3 = duration_3 * 0.034/2;
String Loc3 = "3 ";
String sDistance3 = Loc3 + distance_3;
Serial.println(sDistance3);
//Serial.println(distance_3);
delay(500);

digitalWrite(trigPin_4, LOW);
digitalWrite(trigPin_4, HIGH);
digitalWrite(trigPin_4, LOW);
duration_4 = pulseIn(echoPin_4, HIGH);
distance_4 = duration_4 * 0.034/2;
String Loc4 = "4 ";
String sDistance4 = Loc4 + distance_4;
Serial.println(sDistance4);
//Serial.println(distance_4);
delay(500);

delay(1000);
}
