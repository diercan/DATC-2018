#include <wiringPi.h>
#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#define MAXTIMINGS 85
#define DHTPIN1 7
#define DHTPIN2 8
#define DHTPIN3 15
#define DHTPIN4 9
int dht11_dat[5] = {0, 0, 0, 0, 0};

void WriteData(int dth0, int dth1, int dth2, int dth3, int id);

void read_dht11_dat(int DHTPIN, int id)
{
	uint8_t laststate = HIGH;
	uint8_t counter = 0;
	uint8_t j = 0, i;
	float f;

	dht11_dat[0] = dht11_dat[1] = dht11_dat[2] = dht11_dat[3] = dht11_dat[4] = 0;

	pinMode(DHTPIN, OUTPUT);
	digitalWrite(DHTPIN, LOW);
	delay(18);
	digitalWrite(DHTPIN, HIGH);
	delayMicroseconds(40);
	pinMode(DHTPIN, INPUT);

	for (i = 0; i < MAXTIMINGS; i++)
	{
		counter = 0;
		while (digitalRead(DHTPIN) == laststate)
		{
			counter++;
			delayMicroseconds(1);
			if (counter == 255)
			{
				break;
			}
		}
		laststate = digitalRead(DHTPIN);

		if (counter == 255)
			break;

		if ((i >= 4) && (i % 2 == 0))
		{
			dht11_dat[j / 8] <<= 1;
			if (counter > 50)
				dht11_dat[j / 8] |= 1;
			j++;
		}
	}

	if ((j >= 40) &&
		(dht11_dat[4] == ((dht11_dat[0] + dht11_dat[1] + dht11_dat[2] + dht11_dat[3]) & 0xFF)))
	{
		f = dht11_dat[2] * 9. / 5. + 32;
		printf("Humidity = %d.%d %% Temperature = %d.%d C (%.1f F) ID=%d\n",
			   dht11_dat[0], dht11_dat[1], dht11_dat[2], dht11_dat[3], f, id);
		WriteData(dht11_dat[2], dht11_dat[3], dht11_dat[0], dht11_dat[1], id);
	}
	else
	{
		printf("Data not good, skip\n");
	}
}
void WriteData(int dth0, int dth1, int dth2, int dth3, int id)
{
	FILE *f = fopen("/home/pi/WorkArea/DHT11/data.txt", "w");
	if (f == NULL)
	{
		printf("Error opening file!\n");
		exit(1);
	}

	fprintf(f, "%d %d.%d %d.%d ", id, dth2, dth3, dth0, dth1);

	fclose(f);
}

int main(void)
{
	printf("Raspberry Pi wiringPi DHT11 Temperature test program\n");

	if (wiringPiSetup() == -1)
		exit(1);

	while (1)
	{
		read_dht11_dat(DHTPIN1, 1);
		delay(1000);
		read_dht11_dat(DHTPIN2, 2);
		delay(1000);
		read_dht11_dat(DHTPIN3, 3);
		delay(1000);
		read_dht11_dat(DHTPIN4, 4);
		delay(1000);
	}

	return (0);
}
