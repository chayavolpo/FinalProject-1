using BL;
using DTO;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APIMM.Controllers
{
    [RoutePrefix("shelters")]
 
    public class SheltersController : ApiController
    {
       /// <summary>
       /// The function adds the shelter to the shelter table
       /// </summary>
       /// <param name="newShelter"></param>
       /// <returns></returns>
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

        /// <summary>
        /// The function updates the amount of people in specific shelter
        /// </summary>
        /// <param name="amountPPL"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("updateAmountPeopleInShelter/{addressToUpdateAmountPPL}")]
        public IHttpActionResult UpdateAmountPPLInShelter([FromBody]AmountPeopleInShelterDTO amountPeopleInShelter, [FromUri]string addressToUpdateAmountPPL)
        {
            try
            {
                return Ok(ShelterLogic.UpdateAmountPPLInShelter(amountPeopleInShelter, addressToUpdateAmountPPL));
            }
            catch(Exception ex)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// The function returns a list which contains the three nearest shelters going from nearest to less near
        /// </summary>
        /// <param name="city"></param>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <returns></returns>

        [HttpGet]
        [Route("getNearestShelter/{lat}/{lng}")]
        public IHttpActionResult GetNearestShelter( double lat, double lng)
        {
            try
            {
                return Ok(ShelterLogic.GetNearestShelter(lat, lng));
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// The funtion returns a list of all the shelters
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getAllShelters")]
        public IHttpActionResult GetAllShelters()
        {
            try
            {
                return Ok(ShelterLogic.GetAllShelters());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// The function updates the shelter according to the code of the shelter it recieved
        /// </summary>
        /// <param name="updatedShelter"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("updateShelter")]
        public IHttpActionResult UpdateShelter(ShelterDTO updatedShelter)
        {
            string message = "";
            ShelterDTO updateShelter = ShelterLogic.UpdateShelter(updatedShelter, ref message);
            if (updateShelter != null)
                return Ok(updateShelter);
            if (message != "")
                return BadRequest(message);
            var error = new
            {
                message = "העדכון נכשל"
            };
            return Content(HttpStatusCode.BadRequest, error);

        }

    }
}
