using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;
using System.Threading;
using System.Data.SqlClient;

namespace SmartParking
{
    public partial class Form1 : Form
    {
        public static string conString = "Server=tcp:datcparkingserver.database.windows.net,1433;Initial Catalog=DB_Parking;Persist Security Info=False;User ID=niculinaserver;Password=Marina18!;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";
        public Form1()
        {
            InitializeComponent();

            backgroundWorker1.DoWork += backgroundWorker1_DoWork;
            backgroundWorker1.WorkerSupportsCancellation = true;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            backgroundWorker1.RunWorkerAsync();
        }


        /// <summary>
        /// Corrects erronated data
        /// </summary>
        /// <param name="value">The value returned by the sensor</param>
        /// <returns>0 if the lot is free and 1 if the lot is occupied</returns>
        public int correctingData(string value)
        {
            //possibly wrong value
            if (Convert.ToInt32(value) == 0)
            {
                return 1;
            }
            //lot is occupied
            else if (Convert.ToInt32(value) < 10)
            {
                return 1;
            }
            //lot is free
            else if (Convert.ToInt32(value) >= 10 && Convert.ToInt32(value) < 40)
            {
                return 0;
            }
            //possibly wrong value
            else
            {
                return 1;
            }
        }


        private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
        {
            SqlConnection conn = new SqlConnection(conString);

            int s1value = 0;
            int s2value = 0;
            int s3value = 0;

            while (true)
            {
                var HTTPrequest = (HttpWebRequest)WebRequest.Create("https://smartparking-a39bb.firebaseio.com/.json");
                var Response = (HttpWebResponse)HTTPrequest.GetResponse();
                var StreamReader = new StreamReader(Response.GetResponseStream()).ReadToEnd();
                var Data = JObject.Parse(StreamReader);

                textBox1.BeginInvoke(new Action(() =>
                {
                    textBox1.AppendText("------------------------");
                }));

                string s1 = Data["S1"].ToObject<string>();
                textBox1.BeginInvoke(new Action(() =>
                {
                    textBox1.AppendText("\n");
                    textBox1.AppendText("S1:    " + s1);
                }));

                if ((s1value = correctingData(s1)) == 1)
                {
                    textBox1.BeginInvoke(new Action(() =>
                    {
                        textBox1.AppendText("\n");
                        textBox1.AppendText("Result:    occupied");
                    }));
                }
                else
                {
                    textBox1.BeginInvoke(new Action(() =>
                    {
                        textBox1.AppendText("\n");
                        textBox1.AppendText("Result:    free");
                    }));
                }

                Thread.Sleep(1000);

                string s2 = Data["S2"].ToObject<string>();
                textBox1.BeginInvoke(new Action(() =>
                {
                    textBox1.AppendText("\n");
                    textBox1.AppendText("S2:    " + s2);
                }));

                if ((s2value = correctingData(s2)) == 1)
                {
                    textBox1.BeginInvoke(new Action(() =>
                    {
                        textBox1.AppendText("\n");
                        textBox1.AppendText("Result:    occupied");
                    }));
                }
                else
                {
                    textBox1.BeginInvoke(new Action(() =>
                    {
                        textBox1.AppendText("\n");
                        textBox1.AppendText("Result:    free");
                    }));
                }

                Thread.Sleep(1000);

                string s3 = Data["S3"].ToObject<string>();
                textBox1.BeginInvoke(new Action(() =>
                {
                    textBox1.AppendText("\n");
                    textBox1.AppendText("S3:    " + s3);
                }));

                if ((s3value = correctingData(s3)) == 1)
                {
                    textBox1.BeginInvoke(new Action(() =>
                    {
                        textBox1.AppendText("\n");
                        textBox1.AppendText("Result:    occupied");
                    }));
                }
                else
                {
                    textBox1.BeginInvoke(new Action(() =>
                    {
                        textBox1.AppendText("\n");
                        textBox1.AppendText("Result:    free");
                    }));
                }

                Thread.Sleep(1000);

                textBox1.BeginInvoke(new Action(() =>
                {
                    textBox1.AppendText("\n");
                }));

                conn = null;
                SqlCommand insertCommand = null;
                try
                {
                    conn = new SqlConnection(conString);
                    conn.Open();

                     string insertCmd = string.Format
                    (
                      "INSERT INTO dbo.parking (name, value) VALUES({0},{1})",
                      "'S1'", s1value);
                    insertCommand = new SqlCommand(insertCmd, conn);
                    insertCommand.ExecuteNonQuery();

                    insertCmd = string.Format
                    (
                      "INSERT INTO dbo.parking (name, value) VALUES({0},{1})",
                      "'S2'", s2value);
                    insertCommand = new SqlCommand(insertCmd, conn);
                    insertCommand.ExecuteNonQuery();

                    insertCmd = string.Format
                    (
                      "INSERT INTO dbo.parking (name, value) VALUES({0},{1})",
                      "'S3'", s3value);
                    insertCommand = new SqlCommand(insertCmd, conn);
                    insertCommand.ExecuteNonQuery();

                }
                catch (Exception exp)
                {
                    Console.WriteLine("Connection failed");
                }
                finally
                {
                    if (conn != null)
                        conn.Dispose();
                }

            }
        }
    }
}
