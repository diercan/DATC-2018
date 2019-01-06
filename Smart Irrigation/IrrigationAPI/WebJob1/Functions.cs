using System.IO;
using System.Linq;
using Microsoft.Azure.WebJobs;
using Newtonsoft.Json;
using IrrigationAPI.Models;
using System.Data.Entity;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Azure.ServiceBus;
using Microsoft.ServiceBus.Messaging;
using System;
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
            try {
                //byte[] msg = message.Body;
                //string json = Encoding.UTF8.GetString(msg);
                //var json = Encoding.Unicode.GetString(message);
                //Value value = message.GetBody<Value>();

                // Value value = JsonConvert.DeserializeObject<Value>(json);
                // Console.WriteLine($"Received message: SequenceNumber:{message.SystemProperties.SequenceNumber} Body:{Encoding.UTF8.GetString(message.Body)}");

                Value value = new Value();
                value.Temperatura = (double)message.Properties["Temperatura"];
                value.Umiditate = (double)message.Properties["Umiditate"];
                value.Pompa = message.Properties["Pompa"].ToString();
                value.Id_senzor = (int)message.Properties["Id_senzor"];
                message.Complete();

                double previousTemp = 0;
                double tempTreshold = 10;
                double tempMax = 50;
                double tempMin = -50;
                double umidityTreshhold = 35;
                double umidityUpLimit = 80;

                using (IrrigationAPI.Models.IrigationDBEntities1 context = new IrigationDBEntities1())
                {
                    Value previousvalue = context.Values.Include(val => val.Senzori).Where(s => s.Id_senzor == value.Id_senzor).ToList().LastOrDefault();
                    if (previousvalue != null)
                    {
                       
                        previousTemp = (double)previousvalue.Temperatura;
                    }
                    else
                    {
                        previousTemp = 0;

                    }

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
                    else if(value.Umiditate > umidityUpLimit)
                    {
                        value.Pompa = "Off";
                    }

                    if (previousTemp == 0)
                    {
                        if (value.Temperatura > tempMax)
                        {
                            previousTemp = tempMax;
                        }
                        else if (value.Temperatura < tempMin)
                        {
                            previousTemp = tempMin;
                        }
                        else
                        {
                            previousTemp = (double)value.Temperatura;
                        }
                    }
                    
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
                   

                    //value.Senzori = context.Senzoris.Include(sen => sen.Values).Where(sen => sen.Id == value.Id_senzor).First();
                    value.Timestemp = DateTime.Now;
                    context.Values.Add(value);
                    context.SaveChanges();
                   // Thread.Sleep(5000);

                }

            }

            catch (Exception e)
            {
               // Thread.Sleep(5000);
                //message.RenewLock();
            }
        }
        
    }
}
