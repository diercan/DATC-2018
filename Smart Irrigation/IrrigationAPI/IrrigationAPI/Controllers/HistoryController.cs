using IrrigationAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;

namespace IrrigationAPI.Controllers
{
    public class HistoryController : ApiController
    {
        public List<Istoric> Get()
        {
            List<Istoric> istorics;
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {                
                istorics = context.Istorics.Include(i => i.Senzori).ToList<Istoric>();
                istorics.ForEach(x => x.Senzori = null);
            }
            return istorics;
        }

        public List<Istoric> Get(int id)
        {
            List<Istoric> istorics;
            using (IrigationDBEntities1 context =new IrigationDBEntities1())
            {
                istorics= context.Istorics.Include(i => i.Senzori).Where(i=>i.Id_senzor==id).ToList<Istoric>();
                istorics.ForEach(x => x.Senzori = null);
            }
            return istorics;
        }

        public List<Istoric> Get(DateTime datetime)
        {
            List<Istoric> istorics;
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                 istorics = context.Istorics.Include(i => i.Senzori).Where(i => i.Data.Equals(datetime)).ToList<Istoric>();
                 istorics.ForEach(x => x.Senzori = null);
            }

            return istorics;
        }

        public Istoric Get(int id, DateTime datetime)
        {
            Istoric istoric;
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                 istoric = context.Istorics.Include(i => i.Senzori).Where(h=>h.Id_senzor==id).Where(i => i.Data.Equals(datetime)).ToList<Istoric>().LastOrDefault();
                 istoric.Senzori = null;
            }
            return istoric;
        }



    }
}
