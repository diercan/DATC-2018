using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using IrrigationAPI.Models;
using Newtonsoft;
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace WebJob
{
    public class Functions
    {
        // This function will get triggered/executed when a new message is written 
        // on an Azure Queue called queue.
        public static void ProcessQueueMessage([QueueTrigger("queue")] string message, TextWriter log)
        {

            Value value = JsonConvert.DeserializeObject<Value>(message);
            double previousTemp = 0;

            //using (IrigationDBEntities context = new IrigationDBEntities())
            //{


            //    value.Senzori = context.Senzoris.Include(sen => sen.Values).Where(sen => sen.Id == value.Id).First();
            //    context.Values.Add(value);
            //     context.SaveChanges();
            //}

            using (SqlConnection conn1 = new SqlConnection("Data Source=databasehph.database.windows.net;Initial Catalog=IrigationDB;User ID=HPH-root;Password=********;Connect Timeout=30;Encrypt=True;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False"))
            {                                       
                //Verify data
                if(value.Umiditate>100)
                {
                    value.Umiditate = 100;
                }
                else if(value.Umiditate<0)
                {
                    value.Umiditate = 0;
                }

                if(previousTemp==0)
                {
                    previousTemp = (double)value.Temperatura;
                }
                else
                {
                    if (value.Temperatura < previousTemp - 10)
                    {
                        value.Temperatura = previousTemp - 10;
                        previousTemp =(double) value.Temperatura;
                    }
                    else if(value.Temperatura > previousTemp + 10 )
                    {
                        value.Temperatura = previousTemp + 10;
                        previousTemp = (double)value.Temperatura ;
                    }
                    else
                    {
                        previousTemp = (double)value.Temperatura;
                    }
                }
                
                SqlCommand cmd = new System.Data.SqlClient.SqlCommand();
                cmd.CommandType = System.Data.CommandType.Text;
                cmd.CommandText = "INSERT Values (Temperatura, Umiditate,Pompa) VALUES ("+value.Temperatura+","+value.Umiditate+",'"+value.Pompa+"')";
                cmd.Connection = conn1;

                conn1.Open();
                cmd.ExecuteNonQuery();
                conn1.Close();
            }
        }
    }
}
