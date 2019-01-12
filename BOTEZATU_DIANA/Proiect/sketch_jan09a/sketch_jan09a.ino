#include<ESP8266WiFi.h> 

String incoming;   // for incoming serial data
const char* ssid = "BlackBerry BBD100-1 58a3"; //your WiFi Name
const char* password = "minim 8 ";  //Your Wifi Password

IPAddress server(192,168,43,98);       // the fix IP address of the server
WiFiClient client;

void setup()
{
  Serial.begin(9600);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) 
  {
    Serial.print(".");
    delay(500);
  }
  client.connect(server, 6000);   // Connection to the server
}

void loop()
{
  // send data only when you receive data:
  if(Serial.available() > 0) 
  {
    incoming = Serial.readStringUntil('\n');
    client.println(incoming);  // sends the message to the server
  }
}
