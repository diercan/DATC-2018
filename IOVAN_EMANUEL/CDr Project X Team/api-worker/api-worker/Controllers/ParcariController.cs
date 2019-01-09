using api_worker.Logic.Implementations;
using api_worker.Logic.Interfaces;
using api_worker.Models;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace api_worker.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class ParcariController : ApiController
    {
        private readonly IParcariLogic _parcariLogic;

        public ParcariController()
        {
            _parcariLogic = new ParcariLogic();
        }

        // GET api/get/parcari
        [HttpGet]
        [Route("api/get/parcari")]
        [ResponseType(typeof(IEnumerable<ParcariModel>))]
        public IHttpActionResult GetParcari()
        {
            var parcari = _parcariLogic.GetParcari();
            return Ok(parcari);
        }

        // GET api/get/parcari/1
        [HttpGet]
        [Route("api/get/parcari/{id:int}")]
        [ResponseType(typeof(ParcariModel))]
        public IHttpActionResult GetParcare(int id)
        {
            var parcare = _parcariLogic.GetParcare(id);
            return Ok(parcare);
        }

        // POST api/post/parcari
        [HttpPost]
        [Route("api/post/parcari")]
        [ResponseType(typeof(int))]
        public IHttpActionResult InsertParcare([FromBody]ParcariModel parcare)
        {
            var id = _parcariLogic.InsertParcare(parcare);
            return Ok(id);
        }

        // PUT api/put/parcari/1/pozitie/2/valoare/1
        [HttpPut]
        [Route("api/put/parcari/{id:int}/pozitie/{pozitie:int}/valoare/{valoare}")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult UpdateSituatieParcare(int id, int pozitie, string valoare)
        {
            var update = _parcariLogic.UpdateSituatieParcare(id, pozitie, valoare);

            if (update == false) return NotFound();

            return Ok(update);
        }

        // DELETE api/delete/parcari/1
        [HttpDelete]
        [Route("api/delete/parcari/{id:int}")]
        [ResponseType(typeof(bool))]
        public IHttpActionResult StergeParcare(int id)
        {
            var sterge = _parcariLogic.StergeParcare(id);

            if (sterge == false) return NotFound();

            return Ok(sterge);
        }
    }
}
