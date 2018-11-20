using System;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;

namespace Send
{
    class Send
{
    public static void Main()
    {
        var factory = new ConnectionFactory() { Uri = new Uri ("amqp://yacbyufq:993Vn_xi8xxWsgYKXtD4UqJ4NHHvdQw_@flamingo.rmq.cloudamqp.com/yacbyufq") };
        string messageToSend="";


        using(var connection = factory.CreateConnection())
        {

while(true)
{

 //receive:
        using(var channel2 = connection.CreateModel())
        {
            channel2.QueueDeclare(queue: "hello2", durable: true, exclusive: false, autoDelete: false, arguments: null);

            var consumer = new EventingBasicConsumer(channel2);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body;
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine(" [x] Received {0}", message);
            };
            channel2.BasicConsume(queue: "hello2", autoAck: true, consumer: consumer);

            //Console.WriteLine(" Enter Message: \n");
           
           //messageToSend = Console.ReadLine();
        }


        //send:
        using(var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: "hello",
                                 durable: false,
                                 exclusive: false,
                                 autoDelete: false,
                                 arguments: null);

        Console.WriteLine(" Enter Message:");
        messageToSend = Console.ReadLine();

           // string message = "Hello World!";
            var body = Encoding.UTF8.GetBytes(messageToSend);

            channel.BasicPublish(exchange: "",
                                 routingKey: "hello",
                                 basicProperties: null,
                                 body: body);
            Console.WriteLine(" [x] Sent {0}", messageToSend);
        }

        //Console.WriteLine(" Press [enter] to exit.");
        //Console.ReadLine();

       
}
        }
    }
}
}
