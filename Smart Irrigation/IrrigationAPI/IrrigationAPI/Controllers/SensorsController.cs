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
            List<Senzori> list = new List<Senzori>();
            using (IrigationDBEntities context = new IrigationDBEntities())
            {
                list = context.Senzoris.ToList();
                System.Diagnostics.Debugger.NotifyOfCrossThreadDependency();
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
