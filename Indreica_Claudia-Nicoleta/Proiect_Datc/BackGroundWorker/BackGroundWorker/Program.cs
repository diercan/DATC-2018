using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Data.SqlClient;

namespace BackGroundWorker
{
    class Program
    {

        static string UpdateHumidity(string parcelName, string humidity, string pumpStatus)
        {
            return @"UPDATE RealTimeValues 
            SET humidity=" + humidity + ", pumpStatus='" + pumpStatus + "' "
            + " WHERE parcelName='" + parcelName + "';";
        }

        static string InsertHumidity(string parcelName, string humidity)
        {
            return @"INSERT INTO RealTimeValues(parcelName, humidity) VALUES ('" + parcelName + "'," + humidity + ");";
        }

       

        


        
        static void Submit_Tsql_NonQuery(
         SqlConnection connection,
         string tsqlPurpose,
        // string tsqlSourceCode,
         string sqlCommandTxt,
         string parameterName = null,
         string parameterValue = null
         )
        {
            //Console.WriteLine();
            //Console.WriteLine("=================================");
            // Console.WriteLine("T-SQL to {0}...", tsqlPurpose);

            //   using (var command = new SqlCommand(tsqlSourceCode, connection))
            using (var command = new SqlCommand(sqlCommandTxt, connection))
            {
                /*if (parameterName != null)
                {
                    command.Parameters.AddWithValue(  // Or, use SqlParameter class.
                       parameterName,
                       parameterValue);
                }*/
                int rowsAffected = command.ExecuteNonQuery();
                //Console.WriteLine(rowsAffected + " = rows affected.");
            }
        }

        public static string CheckRealTimeVal(string parcelName)
        {
            return @"SELECT COUNT(humidity) FROM RealTimeValues WHERE parcelName=" + parcelName;
        }


        public static string SelectMinVal(int level)
        {
            return @"SELECT minVal FROM HumidityTresholds WHERE level=" + level;
        }

        public static string SelectMaxVal(int level)
        {
            return @"SELECT maxVal FROM HumidityTresholds WHERE level=" + level;
        }


        public static string SelectParcelLevel(string parcelName)
        {
            return @"SELECT parcelLevel FROM Parcels WHERE parcelName='" + parcelName + "';";
        }

        public static int GetParcelLevel(SqlConnection connection, string parcelName)
        {
            var command = new SqlCommand(SelectParcelLevel(parcelName), connection);
            SqlDataReader sdr = command.ExecuteReader();  //command.ExecuteNonQuery();
            int parcelLevel = 0;
            if (sdr.Read())
            {
                parcelLevel = Convert.ToInt32(sdr[0].ToString());
            }
            sdr.Close();
            return parcelLevel;

        }

        public static int GetMinVal(SqlConnection connection, string parcelName)
        {
            int parcelLevel = GetParcelLevel(connection, parcelName);
            Console.WriteLine("\n\n Parcel Level = " + parcelLevel);
            var command = new SqlCommand(SelectMinVal(parcelLevel), connection);
            SqlDataReader sdr = command.ExecuteReader();
            int minVal = 0;

            if (sdr.Read())
            {
                minVal = Convert.ToInt32(sdr[0].ToString());
            }
            sdr.Close();

            return minVal;
        }

        public static int GetMaxVal(SqlConnection connection, string parcelName)
        {
            int parcelLevel = GetParcelLevel(connection, parcelName);
            var command = new SqlCommand(SelectMaxVal(parcelLevel), connection);
            SqlDataReader sdr = command.ExecuteReader();
            int maxVal = 0;

            if (sdr.Read())
            {
                maxVal = Convert.ToInt32(sdr[0].ToString());
            }
            sdr.Close();

            return maxVal;
        }




        static void Main(string[] args)
        {
            //Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"D:\Downloads_\client_secret_945848652322-umiicd1fe7vp1s4roij18etrh5ojirau.apps.googleusercontent.com.json");
            //SQLAdminExample.Start();
            // string value = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
            // object obj = AuthImplicit("3ab8a4923fd8129d338ac4b3b9214c96c833a4cd");
            //FetchHumidityIntervals(); - //just once

            int minVal = 0;
            int maxVal = 0;
            string pumpStatus = String.Empty;

            try
            {
                var cb = new SqlConnectionStringBuilder();
                cb.DataSource = "irrigation-datc.database.windows.net";
                cb.UserID = "datc";
                cb.Password = "Proiect@2018";
                cb.InitialCatalog = "Irrigation";

                var sqlConnection = new SqlConnection(cb.ConnectionString);


                while (true)
                {
                    #region READ QUEUE
                    string message = "0";
                    var factory = new ConnectionFactory() { Uri = new Uri("amqp://psntfxdl:a7gzROOSUJ62v3AmFtmlH1E0VFej5j5Q@flamingo.rmq.cloudamqp.com/psntfxdl") };
                    using (var connection = factory.CreateConnection())
                    using (var channel = connection.CreateModel())
                    {
                        channel.QueueDeclare(queue: "irrigation",
                                             durable: false,
                                             exclusive: false,
                                             autoDelete: false,
                                             arguments: null);

                        var consumer = new EventingBasicConsumer(channel);
                        consumer.Received += (model, ea) =>
                        {
                            var body = ea.Body;
                            message = Encoding.UTF8.GetString(body);
                            Console.WriteLine(" \n [x] Received {0}", message);
                        };
                        channel.BasicConsume(queue: "irrigation",
                                             autoAck: true,
                                             consumer: consumer);
                    }
                    #endregion


                    //if (!message.Equals("0"))
                    //{
                    sqlConnection.Open();
                    minVal = GetMinVal(sqlConnection, "E");
                    maxVal = GetMaxVal(sqlConnection, "E");

                    Console.WriteLine("\n \n MinVal = " + minVal + "\n maxVal = " + maxVal + "\n Humidity = " + message);

                    message = message.Replace("\r\n", string.Empty);

                    int humidity = Convert.ToInt32(message);
                    if (humidity < minVal)
                    {
                        pumpStatus = "ON";
                    }
                    else if ((Convert.ToInt16(message)) > maxVal)
                    {
                        pumpStatus = "OFF";
                    }

                    Console.WriteLine("\n \n pump status = " + pumpStatus);


                    Submit_Tsql_NonQuery(sqlConnection, " Update-RealTimeValues",
                      UpdateHumidity("E", message, pumpStatus), //message),
                       "@csharpParmDepartmentName", "Accounting");
                    sqlConnection.Close();

                    //System.Threading.Thread.Sleep(5000);

                    // FetchRandomValues();

                    // CheckHumidityTresholds();

                    //RefreshHeatMap()
                    //
                }
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
            //Console.WriteLine("View the report output here, then press any key to end the program...");
            //Console.ReadKey();
            Console.ReadLine();
        }
    }
}