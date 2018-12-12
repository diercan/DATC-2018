int fsr[4] = {0, 1, 2, 3};  //4 senzori de greutate
int fsrReading; //valoarea senzorului(test)
int fsrParkValue = 80; //aici valoarea minima de greutate pe senzor
int parkArray[4] = {0, 0, 0, 0}; //serial buf

void setup() 
{  
  Serial.begin(9600);
  
}

void loop() 
{
  int i;
  
  fsrReading = analogRead(fsr[0]);
  Serial.println(fsrReading);
  
  if (fsrReading > fsrParkValue)
  {
    Serial.write(1);
  }
  else
  {
    Serial.write(0);
  }
/*
  for(i = 0; i < 4; i++)
  {
    parkArray[i] = (analogRead(fsr[i] > fsrParkValue ? 1 : 0))
  }
  Serial.write(parkArray, sizeof(parkArray));
  */
  delay(500);
}
