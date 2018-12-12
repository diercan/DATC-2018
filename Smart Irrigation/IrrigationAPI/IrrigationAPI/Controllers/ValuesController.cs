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



namespace IrrigationAPI.Controllers
{
    public class ValuesController : ApiController
    {
        public List<Value> Get()
        {
            List<Value> list = new List<Value>();
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
               list = context.Values.ToList();
                System.Diagnostics.Debugger.NotifyOfCrossThreadDependency();
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
                Value value = context.Values.Include(val => val.Senzori).FirstOrDefault(val => val.Id_value == id);
                return value;
            }
        }

        // POST api/values
        public Value Post(Value value)
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                value.Timestemp = DateTime.Now;
                value.Senzori = context.Senzoris.Include(sen => sen.Values).Where(sen => sen.Id == value.Id).First();
                context.Values.Add(value);
                context.SaveChanges();
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
