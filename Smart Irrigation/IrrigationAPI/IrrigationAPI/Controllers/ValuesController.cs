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

namespace IrrigationAPI.Controllers
{
    public class ValuesController : ApiController
    {
        const string ServiceBusConnectionString = "Endpoint=sb://irrigation.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=EM1mmXaWccHBM5+iSnBhUbaTT2e1pfd97Th/d9ODKzE=";
        const string QueueName = "queue";
        static IQueueClient queueClient;
        
        public List<Value> Get()
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                var list = context.Values.Include(val => val.Senzori).ToList();
                list.ForEach(x => x.Senzori = null);
               return list;
            }
        }

        // GET api/values/05-Dec-18 7:33:57 PM
        public Value Get(DateTime timestemp)
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                Value value = context.Values.FirstOrDefault(v => v.Timestemp== timestemp);
                return value;
            }
        }

        // GET api/values/5
    
        public Value Get(int id)
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                Value value = context.Values.Include(sel => sel.Senzori).Where(val => val.Id_value == id).First();
                return value;
            }
        }

        // POST api/values
        public Value Post(Value value)
        {
            queueClient = new QueueClient(ServiceBusConnectionString, QueueName);
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                                             
                value.Timestemp = DateTime.Now;

                string json = JsonConvert.SerializeObject(value);
                byte[] messageBody = Encoding.Unicode.GetBytes(json);
                queueClient.SendAsync(new Message(messageBody));


                //value.Senzori = context.Senzoris.Include(sen => sen.Values).Where(sen => sen.Id == value.Id).First();
               // context.Values.Add(value);
               // context.SaveChanges();
            }
            return value;
        }

        // PUT api/values/5
        public void Put(int id, Double temp,Double umiditate)
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                Value value = context.Values.FirstOrDefault(v => v.Id == id);
                value.Temperatura = temp;
                value.Umiditate = umiditate;
                context.SaveChanges();
            }
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                Value value = context.Values.FirstOrDefault(v => v.Id == id);
                context.Values.Remove(value);
                context.SaveChanges();
            }
        }

        // DELETE api/values/05-Dec-18 7:33:57 PM
        public void Delete(DateTime timestemp)
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                Value value = context.Values.FirstOrDefault(v => v.Timestemp == timestemp);
                context.Values.Remove(value);
                context.SaveChanges();
            }
        }
    }
}
