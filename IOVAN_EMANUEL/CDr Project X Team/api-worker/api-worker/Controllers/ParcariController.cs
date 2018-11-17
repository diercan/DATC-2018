using api_worker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace api_worker.Controllers
{
    public class ParcariController : ApiController
    {
        private DatabaseContext dbContext = new DatabaseContext("Data Source=cdr-x-server.database.windows.net;" + "Initial Catalog=CDrXDB;" + "User id=cdrxadmin;" + "Password=cdrxpass1!;");

        // GET api/parcari
        [Route("api/get/parcari")]
        public IEnumerable<ParcariModel> Get()
        {
            var parcari = dbContext.Parcari.Select(s => new ParcariModel
            {
                IdParcare = s.ID_PARCARE,
                LocatieParcare = s.LOCATIE,
                TotalLocuri = s.LOCURI_TOTALE,
                StareLocuri = s.STARE_PARCARE
            }).ToList();         
            return parcari;
        }

        // GET api/parcari/5
        [Route("api/get/parcari/{id:int}")]
        public ParcariModel Get(int id)
        {
            var parcare = dbContext.Parcari.Where(w => w.ID_PARCARE == id).Select(s => new ParcariModel
            {
                IdParcare = s.ID_PARCARE,
                LocatieParcare = s.LOCATIE,
                TotalLocuri = s.LOCURI_TOTALE,
                StareLocuri = s.STARE_PARCARE
            }).SingleOrDefault();
            return parcare;
        }

        // POST api/values
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        public void Delete(int id)
        {
        }
    }
}
