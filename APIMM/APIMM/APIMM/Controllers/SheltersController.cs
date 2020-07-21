using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIMM.Controllers
{
    [RoutePrefix("shelters")]
    public class SheltersController : ApiController
    {
        [HttpPost]
        [Route("addShelter")]
        public IHttpActionResult AddShelter(ShelterDTO newShelter)
        {
            string message = "";
            ShelterDTO addShelter = ShelterLogic.AddNewShelter(newShelter, ref message);
            if (addShelter != null)
                return Ok(addShelter);
            if (message != "")
                return BadRequest(message);
            var error = new
            {
                message = "ההוספה נכשלה"
            };
            return Content(HttpStatusCode.BadRequest, error);

        }

        [HttpPost]
        [Route("updateAmountPeopleInShelter")]
        public bool UpdateAmountPPLInShelter(AmountPeopleInShelterDTO amountPPL)
        {
            return ShelterLogic.UpdateAmountPPLInShelter(amountPPL);
        }
    }
}
