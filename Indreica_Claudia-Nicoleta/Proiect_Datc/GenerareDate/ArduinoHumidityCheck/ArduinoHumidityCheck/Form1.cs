using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Threading;
using RabbitMQ.Client;


namespace ArduinoHumidityCheck
{
   
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            serialPort1.BaudRate = 9600;
            serialPort1.PortName = "COM3";    //"COM7";
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void buttonStart_Click(object sender, EventArgs e)
        {
            try
            {
                serialPort1.Open();
                MessageBox.Show("Started!");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "Error!!!");
            }
        }

        private void Read_Click(object sender, EventArgs e)
        {
            serialPort1.WriteLine("1");
        }

        private void serialPort1_DataReceived(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
           
        }

        private void serialPort1_DataReceived_1(object sender, System.IO.Ports.SerialDataReceivedEventArgs e)
        {
            string msgToSend = "";
            msgToSend = serialPort1.ReadExisting().ToString();
            //msgToSend = "humidity=" + msgToSend;
            if (richTextBox1.InvokeRequired)
            {
                richTextBox1.Invoke((MethodInvoker)delegate ()
                {
                    richTextBox1.Text = richTextBox1.Text + "\t" + msgToSend;
                });
            }
            var factory = new ConnectionFactory() { Uri = new Uri("amqp://psntfxdl:a7gzROOSUJ62v3AmFtmlH1E0VFej5j5Q@flamingo.rmq.cloudamqp.com/psntfxdl") };

            using (var connection = factory.CreateConnection())
            using (var channel = connection.CreateModel())
            {
                channel.QueueDeclare(queue: "irrigation",
                                     durable: false,
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                var body = Encoding.UTF8.GetBytes(msgToSend);

                channel.BasicPublish(exchange: "",
                                     routingKey: "irrigation",
                                     basicProperties: null,
                                     body: body);               
            }
        }
    }
}
