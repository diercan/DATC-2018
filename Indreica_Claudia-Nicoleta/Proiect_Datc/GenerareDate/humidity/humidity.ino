void setup() {
  // put your setup code here, to run once:
  pinMode(3, OUTPUT);
  pinMode(A0, INPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  int value = analogRead(A0);
  int result;
  result = map(value, 1023, 0, 0, 255);
  //analogWrite(3, result);
  int humidity = map(value, 1023, 0, 0, 100);
  Serial.println(humidity);
  delay(15000);
}
