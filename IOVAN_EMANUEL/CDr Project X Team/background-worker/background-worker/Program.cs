using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Data.SqlClient;
using System.Text;

namespace background_worker
{
    class Program
    {
        static private SqlConnection _conn = new SqlConnection();

        static void Main(string[] args)
        {
            _conn.ConnectionString = "Data Source=cdr-x-server.database.windows.net;" + "Initial Catalog=CDrXDB;" + "User id=cdrxadmin;" + "Password=cdrxpass1!;";
            var factory = new ConnectionFactory() { Uri = new Uri("amqp://yqbjpnzd:8kbRC7HVLXugAl8Qi8UPJA3MAvQljAUG@flamingo.rmq.cloudamqp.com/yqbjpnzd") };
            string string_message_received = "";
            QueueMessageModel model_message_received; 
            byte[] body;
            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "queue-cdr-x-project", durable: true, exclusive: false, autoDelete: false, arguments: null);
                channel.ExchangeDeclare(exchange: "queue-cdr-x-project", type: "direct");
                channel.QueueBind(queue: "queue-cdr-x-project", exchange: "queue-cdr-x-project", routingKey: "queue-cdr-x-project");
                do
                {
                    var consumer = new EventingBasicConsumer(channel);
                    consumer.Received += (model, ea) =>
                    {
                        body = ea.Body;
                        string_message_received = Encoding.UTF8.GetString(body);
                        if (string_message_received != "")
                        {
                            Console.WriteLine("\nReceived {0} \n", string_message_received);
                            model_message_received = JsonConvert.DeserializeObject<QueueMessageModel>(string_message_received);
                            UpdateDatabase(model_message_received);
                        }
                    };
                    channel.BasicConsume(queue: "queue-cdr-x-project", autoAck: true, consumer: consumer);
                } while (true);
            }
        }

        static void UpdateDatabase(QueueMessageModel model) {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "UPDATE Parcari SET STARE_PARCARE = '" + model.SituatieParcari + "' WHERE ID_PARCARE = " + model.ParcareId;
            cmd.Connection = _conn;
            _conn.Open();
            cmd.ExecuteNonQuery();
            _conn.Close();
        }
    }
}

class QueueMessageModel
{
    public int ParcareId { get; set; }
    public string SituatieParcari { get; set; }
}