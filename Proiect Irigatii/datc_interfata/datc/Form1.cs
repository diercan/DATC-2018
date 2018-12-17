

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO.Ports;
using System.Threading;
using System.Timers;

namespace datc
{

    public partial class Form1 : Form
    {
        System.Windows.Forms.Timer timer = new System.Windows.Forms.Timer();
           
        
        public static System.IO.Ports.SerialPort port;
        delegate void SetTextCallback(string text);
      
        // This BackgroundWorker is used to demonstrate the 
        // preferred way of performing asynchronous operations.
        private BackgroundWorker hardWorker;

        private Thread readThread = null;

        public Form1()
        {
            InitializeComponent();
         

            hardWorker = new BackgroundWorker();
        }

        private void groupBox3_Enter(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            foreach (string s in SerialPort.GetPortNames())
            {
                comPort.Items.Add(s);
            }
            comPort.SelectedIndex = 0;


            baudRate.Items.Add("9600");


            baudRate.SelectedIndex = 0;

        }

        private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
        {

        }

        private void btnConnect_Click(object sender, EventArgs e)
        {
            System.ComponentModel.IContainer components =
                new System.ComponentModel.Container();
            port = new System.IO.Ports.SerialPort(components);
            port.PortName = comPort.SelectedItem.ToString();
            port.BaudRate = Int32.Parse(baudRate.SelectedItem.ToString());
            port.DtrEnable = true;
            port.ReadTimeout = 5000;
            port.WriteTimeout = 500;
            port.Open();

            readThread = new Thread(new ThreadStart(this.Read));
            readThread.Start();
            this.hardWorker.RunWorkerAsync();

            btnConnect.Text = "<Connected>";

            btnConnect.Enabled = false;
            comPort.Enabled = false;

        }



        async Task UseDelay()
        {
            await Task.Delay(50000); // wait for 1 second
        }

        private void SetText(string text)
        {
            // InvokeRequired required compares the thread ID of the
            // calling thread to the thread ID of the creating thread.
            // If these threads are different, it returns true.
            if (this.receiveText.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetText);
              
                this.Invoke(d, new object[] { text });
            }
            else
            {

                this.receiveText.Text += text;
                this.receiveText.Text += "\n";
  
 
            }

        }
/*
        public void scrielabel()
        {
            string[] data;
            data = receiveText.Text.Split(',', ',', ',', ',', ',');
            label1.Text = data[0];
            label2.Text = data[1];
            label3.Text = data[2];
            label4.Text = data[3];
            label5.Text = data[4];
            label6.Text = data[5];

        }
  */
        public void Read()
        {
            while (port.IsOpen)
            {
                try
                {
                    string message = port.ReadLine();
                      this.SetText(message);
                   
                }
                catch (TimeoutException) { }
            }
        }

        private void button1_Click(object sender, EventArgs e)
        {
            
           

                string[] data;
                data = receiveText.Text.Split(',', ',', ',', ',', ',');
                label1.Text = data[0];
                label2.Text = data[1];
                label3.Text = data[2];
                label4.Text = data[3];
                label5.Text = data[4];
                label6.Text = data[5];
                receiveText.Clear();
                    
        }

       /* private void Timer_Tick(object sender, EventArgs e)
        {
            timer.Interval = 5000;
            timer.Tick += Timer_Tick;
            timer.Start();
            //  throw new NotImplementedException();
            button1.PerformClick();

        }
        */
      




        private void groupBox1_Enter(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void button1_MouseClick(object sender, MouseEventArgs e)
        {

        }

        
        private void timer1_Tick(object sender, EventArgs e)
        {
            

        }
    }
}
