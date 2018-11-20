using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace BackGroundWorker
{
    class Program
    {

        public static object AuthImplicit(string projectId)
        {
            // If you don't specify credentials when constructing the client, the
            // client library will look for credentials in the environment.
            var credential = GoogleCredential.GetApplicationDefault();
            var storage = StorageClient.Create(credential);
            // Make an authenticated API request.
            var buckets = storage.ListBuckets(projectId);
            foreach (var bucket in buckets)
            {
                Console.WriteLine(bucket.Name);
            }
            return null;
        }


        static void Main(string[] args)
        {

            //Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"F:\SCOALA\Facultate\An_4_Sem_1\DATC\LABORATOR\Datc-5dd71698add6.json");
            // string value = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
            // object obj = AuthImplicit("3ab8a4923fd8129d338ac4b3b9214c96c833a4cd");


            //FetchHumidityIntervals(); - //just once

            while (true)
            {
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
                        var message = Encoding.UTF8.GetString(body);
                        Console.WriteLine(" \n [x] Received {0}", message);
                    };
                    channel.BasicConsume(queue: "irrigation",
                                         autoAck: true,
                                         consumer: consumer);

                    Console.WriteLine("\n \n Press [enter] to exit.");
                    Console.ReadLine();
                }





                // FetchRandomValues();

                // CheckHumidityTresholds();

                //RefreshHeatMap()
            }


        }
    }
}
