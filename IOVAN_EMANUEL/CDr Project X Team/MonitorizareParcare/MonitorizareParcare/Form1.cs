using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MonitorizareParcare
{
    public partial class Form1 : Form
    {
        private SqlConnection _conn = new SqlConnection();
        public int[] locuri = new int[4];
        public string stare;

        public Form1()
        {
            InitializeComponent();
            string[] ArrayComPortsNames = null;
            ArrayComPortsNames = System.IO.Ports.SerialPort.GetPortNames();
            cb_port.Items.Clear();
            foreach (string portName in ArrayComPortsNames)
            {
                cb_port.Items.Add(portName);
            }
            _conn.ConnectionString = "Data Source=cdr-x-server.database.windows.net;" + "Initial Catalog=CDrXDB;" + "User id=cdrxadmin;" + "Password=cdrxpass1!;";
            label1.Text = "Deconectat";
            label1.ForeColor = Color.Red;

        }

        private void serialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            string line = serialPort1.ReadLine();
            this.BeginInvoke(new LineReceivedEvent(LineReceived), line);
        }
        private delegate void LineReceivedEvent(string line);
        private void LineReceived(string line)
        {
            if (line.Length > 0)
            {
                if (line.Length == 16)
                {
                    locuri[0] = Convert.ToInt16(line.Substring(3, 1));
                    locuri[1] = Convert.ToInt16(line.Substring(7, 1));
                    locuri[2] = Convert.ToInt16(line.Substring(11, 1));
                    locuri[3] = Convert.ToInt16(line.Substring(15, 1));

                    sendDataToQueue();
                }
            }
        }

        private void sendDataToQueue()
        {
            var factory = new ConnectionFactory() { Uri = new Uri("amqp://yqbjpnzd:8kbRC7HVLXugAl8Qi8UPJA3MAvQljAUG@flamingo.rmq.cloudamqp.com/yqbjpnzd") };
            string message_to_send = JsonConvert.SerializeObject(new QueueMessageModel {
                ParcareId = 22,
                SituatieParcari = locuri[0] + "," + locuri[1] + "," + locuri[2] + "," + locuri[3]
            });

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "queue-cdr-x-project", durable: true, exclusive: false, autoDelete: false, arguments: null);
                channel.ExchangeDeclare(exchange: "queue-cdr-x-project", type: "direct");
                channel.QueueBind(queue: "queue-cdr-x-project", exchange: "queue-cdr-x-project", routingKey: "queue-cdr-x-project");
                var body = Encoding.UTF8.GetBytes(message_to_send);
                channel.BasicPublish(exchange: "queue-cdr-x-project", routingKey: "queue-cdr-x-project", basicProperties: null, body: body);
                connection.Close();
            }
        }

        private void updateText(Label label, string stare)
        {
            if (stare == "0")
            {
                label.Text = "O";
                label.ForeColor = Color.Red;
            }
            else if (stare == "1")
            {
                label.Text = "L";
                label.ForeColor = Color.Green;
            }


        }

        private void btn_connect_Click(object sender, EventArgs e)
        {
            connect();
        }
        void connect()
        {
            serialPort1.PortName = cb_port.Text;
            serialPort1.BaudRate = 9600;
            serialPort1.Open();
            label1.Text = "Conectat";
            label1.ForeColor = Color.Green;
        }

        private void timer1_Tick(object sender, EventArgs e)
        {

        }
    }
}
