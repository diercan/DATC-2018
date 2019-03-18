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
                if (line.Length > 2)
                {
                    switch (line.Substring(0, 3))
                    {
                        case "P1:": stare = line.Substring(3,1);
                            locuri[0] = Convert.ToInt16(stare);
                            updateText(label1, stare); 
                            updateDB();
                            break;
                        case "P2:":
                            stare = line.Substring(3, 1);
                            locuri[1] = Convert.ToInt16(stare);
                            updateText(label1, stare);
                            updateDB();
                            break;
                        case "P3:":
                            stare = line.Substring(3, 1);
                            locuri[2] = Convert.ToInt16(stare);
                            updateText(label1, stare);
                            updateDB();
                            break;
                        case "P4:":
                            stare = line.Substring(3, 1);
                            locuri[3] = Convert.ToInt16(stare);
                            updateText(label1, stare);
                            updateDB();
                            break;
                    }
                }
            }
        }

        private void updateDB()
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "UPDATE Parcari SET STARE_PARCARE = '" + locuri[0] + "," + locuri[1] + "," + locuri[2] + "," + locuri[3] + "'" + " WHERE ID_PARCARE = " + "1";
            cmd.Connection = _conn;
            _conn.Open();
            cmd.ExecuteNonQuery();
            _conn.Close();
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

            
        }

        private void timer1_Tick(object sender, EventArgs e)
        {

        }
    }
}
