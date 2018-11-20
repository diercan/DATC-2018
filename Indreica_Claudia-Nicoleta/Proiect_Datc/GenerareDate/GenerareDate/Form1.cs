using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace GenerareDate
{
    public partial class Form1 : Form
    {
        

        public Form1()
        {            
            InitializeComponent();
        }

        private void BtnSend_Click(object sender, EventArgs e)
        {
            string msgToSend = txtid.Text + ";"+txthumid.Text;


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
                lblstatus.Text+=" \n -- Sent: " + msgToSend;
            }

        }
    }
}
