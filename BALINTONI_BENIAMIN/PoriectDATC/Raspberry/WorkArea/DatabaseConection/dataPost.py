#!/usr/bin/python
import time
import requests
while True:
    with open("/home/pi/WorkArea/DHT11/data.txt", "r") as ins:
        array = []
        for line in ins:
	   array.append(line)
	   words = line.split();

    field=words[0]
    temp=words[1]
    hum=words[2]
    date=str(time.strftime("%d/%m/%Y"))
    from time import sleep
    sleep(0.5) # Time in seconds.
    r = requests.post("https://stormwebapi.azurewebsites.net/api/values", data={'Field': 'field', 'Date_Time': 'date', 'Temperature': 'temp', '[Humidity]': 'hum'})
    print(r.status_code, r.reason)
    words[0]=0
    words[1]=0
    words[2]=0
