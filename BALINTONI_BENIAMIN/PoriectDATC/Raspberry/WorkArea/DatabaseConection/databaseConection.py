#!/usr/bin/python
import pyodbc
import time
while True:
    conn = pyodbc.connect('DRIVER=FreeTDS;SERVER=stormdatc.database.windows.net;PORT=1433;DATABASE=DATC;UID=demo;PWD=/Sqladmin;TDS_Version=8.0;')
    cursor = conn.cursor()

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
    sql_text="INSERT INTO dbo.[DateDePrelucrat] values('"+field+"','"+date+"','"+temp+"','"+hum+"')"
    cursor.execute(sql_text)
    conn.commit()
    words[0]=0
    words[1]=0
    words[2]=0
