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


namespace IrrigationAPI.Controllers
{
    public class SensorsController : ApiController
    {
        public List<Senzori> Get()
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                var list = context.Senzoris.Include(s => s.Values).ToList();
               // list.ForEach(x => x.Senzori = null);
                return list;
            }
        }

        public Senzori Get(int id)
        {
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                var s = context.Senzoris.Include(sen => sen.Values).Where(sen => sen.Id == id).First();
                return s;
            }
        }
    }
}
