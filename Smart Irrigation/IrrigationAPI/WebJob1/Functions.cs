using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Newtonsoft;
using Newtonsoft.Json;
using System.Data.SqlClient;
using IrrigationAPI.Models;
using System.Data.Entity;
using Microsoft.ServiceBus.Messaging;
//using System.Data.Entity.Infrastructure;
//using System.Net.Http;
//using System.Web.Http;


namespace WebJob1
{
    public class Functions
    {
        // This function will get triggered/executed when a new message is written 
        // on an Azure Queue called queue.
        public static void ProcessQueueMessage([ServiceBusTrigger("queue")] BrokeredMessage message, TextWriter log)
        {
           // byte [] msg=message.to
           /// var json = Encoding.Unicode.GetString(message);
           Value value = JsonConvert.DeserializeObject<Value>(message.ToString());
            double previousTemp = 0;
            double tempTreshold=10;
            double umidityTreshhold = 35;  

            using (IrrigationAPI.Models.IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Value previousvalue =  context.Values.Include(val => val.Senzori).Where(s => s.Id_senzor == value.Id_senzor).ToList().LastOrDefault();
                previousTemp = (double) previousvalue.Temperatura;

                //  Verify data
                if (value.Umiditate > 100)
                {
                    value.Umiditate = 100;
                }
                else if (value.Umiditate < 0)
                {
                    value.Umiditate = 0;
                }

                //Start pompa if umiditate is below umidityTreshhold
                if (value.Umiditate < umidityTreshhold)
                {
                    value.Pompa = "On";
                }

                if (previousTemp == 0)
                {
                    previousTemp = (double) value.Temperatura;
                }
                else
                {
                    if (value.Temperatura < previousTemp - tempTreshold)
                    {
                        value.Temperatura = previousTemp - tempTreshold;
                        previousTemp = (double)value.Temperatura;
                    }
                    else if (value.Temperatura > previousTemp + tempTreshold)
                    {
                        value.Temperatura = previousTemp + tempTreshold;
                        previousTemp = (double)value.Temperatura;
                    }
                    else
                    {
                        previousTemp = (double)value.Temperatura;
                    }
                }

                //value.Senzori = context.Senzoris.Include(sen => sen.Values).Where(sen => sen.Id == value.Id_senzor).First();
               context.Values.Add(value);
               context.SaveChanges();
            }


            //using (SqlConnection conn1 = new SqlConnection("Server=tcp:datc2018.database.windows.net,1433;Initial Catalog=IrigationDB;Persist Security Info=False;User ID=HPH-root;Password=DATC-2018;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"))
            //{
            //    //Verify data
            //    if (value.Umiditate > 100)
            //    {
            //        value.Umiditate = 100;
            //    }
            //    else if (value.Umiditate < 0)
            //    {
            //        value.Umiditate = 0;
            //    }

            //    if (previousTemp == 0)
            //    {
            //        previousTemp = (double)value.Temperatura;
            //    }
            //    else
            //    {
            //        if (value.Temperatura < previousTemp - treshold)
            //        {
            //            value.Temperatura = previousTemp - treshold;
            //            previousTemp = (double)value.Temperatura;
            //        }
            //        else if (value.Temperatura > previousTemp + treshold)
            //        {
            //            value.Temperatura = previousTemp + treshold;
            //            previousTemp = (double)value.Temperatura;
            //        }
            //        else
            //        {
            //            previousTemp = (double)value.Temperatura;
            //        }
            //    }

            //    SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
            //    cmd.CommandType = System.Data.CommandType.Text;
            //    cmd.CommandText = "INSERT Values (Temperatura, Umiditate,Pompa) VALUES (" + value.Temperatura + "," + value.Umiditate + ",'" + value.Pompa + "')";
            //    cmd.Connection = conn1;

            //    conn1.Open();
            //    cmd.ExecuteNonQuery();
            //    conn1.Close();
            //}
            //log.WriteLine(message);
        }
    }
}
