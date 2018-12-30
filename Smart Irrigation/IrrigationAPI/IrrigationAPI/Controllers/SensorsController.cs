using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Net.Http;
using System.Web.Http;
using IrrigationAPI.Models;
using System.Data.Entity;
using Newtonsoft.Json;
using Microsoft.ServiceBus.Messaging;


namespace IrrigationAPI.Controllers
{
    public class SensorsController : ApiController
    {
        public List<Senzori> Get()
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                var list = context.Senzoris.Include(val => val.Values).Include(val => val.Istorics).ToList();
                //var list = context.Senzoris.Include(s => s.Values).ToList();
                list.ForEach(x => x.Istorics = null);
                list.ForEach(x => x.Values = null);
              
                // var json = JsonConvert.SerializeObject(list);
                return list;
            }
        }

        public Senzori Get(int id)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                //var jsonString = Newtonsoft.Json.JsonConvert.SerializeObject(obj);
                // var s = context.Senzoris.Where(sen => sen.Id == id).First();
                Senzori s = context.Senzoris.Include(sen => sen.Values).Include(sen => sen.Istorics).Where(sen => sen.Id == id).First();
                return s;
            }
        }

        public Senzori Post(Senzori senzor)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                // value.Senzori = context.Senzoris.Include(sen => sen.Values).Include(sen => sen.Istorics).Where(sen => sen.Id == value.Id_senzor).First();
                context.Senzoris.Add(senzor);
                context.SaveChanges();
            }
            return senzor  ;
        }

        public void Put(int Id, string Locatie)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Senzori senzor = context.Senzoris.FirstOrDefault(s => s.Id == Id);
                senzor.Locatie = Locatie;
                context.SaveChanges();
            }
        }
        public void Put(Senzori sen)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Senzori senzor = context.Senzoris.FirstOrDefault(s => s.Id == sen.Id);
                senzor.Locatie = sen.Locatie;
                context.SaveChanges();
            }
        }


        public void Delete(int id)
        {
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                Senzori senzor = context.Senzoris.FirstOrDefault(s => s.Id == id);
                context.Senzoris.Remove(senzor);
                context.SaveChanges();
            }
        }

    }
}
