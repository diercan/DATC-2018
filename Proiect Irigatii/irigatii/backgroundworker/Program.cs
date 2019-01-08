using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Queue;

namespace backgroundworker
{
    class Program
    {
        static void Main(string[] args)
        {
           // Baza database = new Baza();
           var connectionString = @"Server=tcp:sistemirigatii.database.windows.net,1433;Initial Catalog=SistemIrigatiiDb;Persist Security Info=False;User ID=echipa404;Password=ste5woUnces;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
               SqlConnection connections = new SqlConnection(connectionString);
                SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
                 builder.DataSource = "sistemirigatii.database.windows.net"; 
                 builder.UserID = "echipa404";            
                 builder.Password = "ste5woUnces";     
                 builder.InitialCatalog = "SistemIrigatiiDb";
               connections.Open();
                while (true)
                {
                    
                    string message = "0";
                    var factory = new ConnectionFactory() { Uri = new Uri("amqp://dtthmyhq:BCddowD70aoyhu-TlMtx1_GNVetm-OhQ@hornet.rmq.cloudamqp.com/dtthmyhq") };
                    using (var connection = factory.CreateConnection())
                    using (var channel = connection.CreateModel())
                    {
                        channel.QueueDeclare(queue: "irigatii",
                                             durable: false,
                                             exclusive: false,
                                             autoDelete: false,
                                             arguments: null);
 
                        var consumer = new EventingBasicConsumer(channel);
                        consumer.Received += (model, b) =>
                        {
                            var body = b.Body;
                            message = Encoding.UTF8.GetString(body);
                            Console.WriteLine(" \n [x] Received {0}", message);
                        };
                        channel.BasicConsume(queue: "irigatii",
                                             autoAck: true,
                                             consumer: consumer);
                    }
                    

                   

                    message = message.Replace("\r\n", string.Empty);
                    Console.WriteLine(message);
                    string[] humidity = message.Split(',');
                   

                     string sqlCommandTxt =  @"UPDATE sistemirigatii set umiditate= " +message+" where locatie='civic'";
                //     string sqlCommandTxt= @"UPDATE sistemirigatii set umiditate=25 where locatie='botanic'";
                      var command = new SqlCommand(sqlCommandTxt, connections);
                     int rowsAffected = command.ExecuteNonQuery();
                

                   
                }
            }
        
            
        }
        
    }

