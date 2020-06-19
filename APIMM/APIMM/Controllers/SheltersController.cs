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
        public bool AddShelter(ShelterDTO newShelter)
        {
            return ShelterLogic.AddNewShelter(newShelter);
        }

        [HttpPost]
        [Route("updateAmountPeopleInShelter")]
        public bool UpdateAmountPPLInShelter(AmountPeopleInShelterDTO amountPPL)
        {
            return ShelterLogic.UpdateAmountPPLInShelter(amountPPL);
        }
    }
}
