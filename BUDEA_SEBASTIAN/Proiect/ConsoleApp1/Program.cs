using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ConsoleApp1
{
    class Program
    {
        static SerialPort _serialPort;
        public static void Main()
        {
            
            string[] temps = new string[5];
            string[] humidity = new string[5];
            _serialPort = new SerialPort();
            _serialPort.PortName = "COM21";
            _serialPort.BaudRate = 9600;
            _serialPort.Open();
           
            string query;
            string MySQLConnectionString = "datasource=192.168.43.134;port=3306;username=root;password=;database=datc";
            MySqlConnection databaseConnection = new MySqlConnection(MySQLConnectionString);
            
            
            //databaseConnection.Open();



            while (true)
            {

                
                string a = _serialPort.ReadTo("\n");
                string[] all = a.Split(' ');
                if (all.Length == 12)
                {
                    temps[0] = all[1];
                    temps[1] = all[2];
                    temps[2] = all[3];
                    temps[3] = all[4];
                    temps[4] = all[5];
                    humidity[0] = all[6];
                    humidity[1] = all[7];
                    humidity[2] = all[8];
                    humidity[3] = all[9];
                    humidity[4] = all[10];
                    Console.WriteLine(a);
                    Console.WriteLine(temps[0]);
                    Console.WriteLine(temps[1]);
                    Console.WriteLine(temps[2]);
                    Console.WriteLine(temps[3]);
                    Console.WriteLine(temps[4]);
                    Console.WriteLine(humidity[0]);
                    Console.WriteLine(humidity[1]);
                    Console.WriteLine(humidity[2]);
                    Console.WriteLine(humidity[3]);
                    Console.WriteLine(humidity[4]);

                    databaseConnection.Open();
                    query = "INSERT INTO irrigations (id, temp1, humi1, temp2, humi2, temp3, humi3, temp4, humi4, temp5, humi5, created_at) VALUES (NULL, '" + temps[0] + "', '" + humidity[0] + "', '" + temps[1] + "', '" + humidity[1] + "', '" + temps[2] + "', '" + humidity[2] + "', '" + temps[3] + "', '" + humidity[3] + "', '" + temps[4] + "', '" + humidity[4] + "', CURRENT_TIMESTAMP);";
                    MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
                    commandDatabase.CommandTimeout = 60;
                    MySqlDataReader myReader = commandDatabase.ExecuteReader();
                    databaseConnection.Close();
                }
                
            }
        }
    }
}

