using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Net.Http;
using System.Web.Http;
using IrrigationAPI.Models;
using System.Data.Entity;
using Newtonsoft;
using Newtonsoft.Json;
using Microsoft.Azure.ServiceBus;
using Microsoft.ServiceBus.Messaging;

namespace IrrigationAPI.Controllers
{
    public class ValuesController : ApiController
    {
        const string ServiceBusConnectionString = "Endpoint=sb://datc2018.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=DIU6B8J2ZwMcqDj1nb6gm3fbiCPIWx8LdxW73PUaOHY=";
        const string QueueName = "queue";
        static IQueueClient queueClient;
        
        public List<Value> Get()
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {               
               var list = context.Values.Include(val => val.Senzori).ToList();
               list.ForEach(x => x.Senzori = null);
               return list;
            }
        }

        // GET api/values/05-Dec-18 7:33:57 PM
        public Value Get(DateTime timestemp)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Value value = context.Values.Include(val=>val.Senzori).FirstOrDefault(v => v.Timestemp.Equals(timestemp));
                value.Senzori = null;
                return value;  
            }
        }

        // GET api/values/5
    
        public Value Get(int id)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Value value = context.Values.Include(val => val.Senzori).Where(s=>s.Id_senzor==id).ToList().LastOrDefault();               
                //Value value = context.Values.Include(sel => sel.Senzori).Where(val => val.Id == id).First();
                value.Senzori = null;
                return value;
            }
        }


        // POST api/values
        public Value Post(Value value)
        {
            //queueClient = new QueueClient(ServiceBusConnectionString, QueueName);
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {                       
                value.Timestemp = DateTime.Now;

                //string json = JsonConvert.SerializeObject(value);
                // byte[] messageBody = Encoding.Unicode.GetBytes(json);
                // queueClient.SendAsync(new Message(messageBody));
                if (value.Pompa == null)
                {
                    value.Pompa = "Off";
                }
                Microsoft.ServiceBus.Messaging.QueueClient client2 = Microsoft.ServiceBus.Messaging.QueueClient.CreateFromConnectionString(ServiceBusConnectionString, QueueName);
                Microsoft.ServiceBus.Messaging.BrokeredMessage message = new Microsoft.ServiceBus.Messaging.BrokeredMessage();
                message.Properties["Temperatura"] = value.Temperatura;
                message.Properties["Umiditate"] = value.Umiditate;
                message.Properties["Pompa"] = value.Pompa;            
                message.Properties["Id_senzor"] = value.Id_senzor;
                client2.SendAsync(message);


                //value.Senzori = context.Senzoris.Include(sen => sen.Values).Include(sen => sen.Istorics).Where(sen => sen.Id == value.Id_senzor).First();
                //context.Values.Add(value);
                //context.SaveChanges();
            }
            return value;
        }

        // PUT api/values/5
        public void Put(int id,string pompa)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Value value = context.Values.FirstOrDefault(v => v.Id == id);
                value.Timestemp = DateTime.Now;
                // value.Temperatura = temp;
                //value.Umiditate = umiditate;
                value.Pompa = pompa;
                context.SaveChanges();
            }
        }
        public void Put(Value value)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Value value2 = context.Values.FirstOrDefault(v => v.Id == value.Id);
                value2.Timestemp = DateTime.Now;
                if (value.Temperatura != null)
                {
                    value2.Temperatura = value.Temperatura;
                }
                if (value.Umiditate != null)
                {
                    value2.Umiditate = value.Umiditate;
                }
                if (value.Pompa != null)
                {
                    value2.Pompa = value.Pompa;
                }
                
                context.SaveChanges();
            }
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Value value = context.Values.Include(val => val.Senzori).FirstOrDefault(v => v.Id == id);
                context.Values.Remove(value);
                context.SaveChanges();
            }
        }

        // DELETE api/values/05-Dec-18 7:33:57 PM
        public void Delete(DateTime timestemp)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                //istorics = context.Istorics.Include(i => i.Senzori).Where(i => i.Data.Equals(datetime)).ToList<Istoric>();
               // istorics.ForEach(x => x.Senzori = null);
                Value value = context.Values.Include(val => val.Senzori).FirstOrDefault(v => v.Timestemp == timestemp);
                context.Values.Remove(value);
                context.SaveChanges();
            }
        }
    }
}
