using BL;
using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace APIMM.Controllers
{
    [RoutePrefix("clerks")]

    public class UsersController : ApiController
    {
        /// <summary>
        /// The function checks if the user exists
        /// </summary>
        /// <param name="loginUser"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("login")]
        public IHttpActionResult Login(ClerkDTO loginUser)
        {
            try
            {
                return Ok(ClerkLogic.LoginClerk(loginUser));
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// The function adds the clerk to the clerk table
        /// </summary>
        /// <param name="newClerk"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("addClerk")]
        public IHttpActionResult AddClerk(ClerkDTO newClerk)
        {
            string message = "";
            ClerkDTO addClerk = ClerkLogic.AddNewClerk(newClerk, ref message);
            if (addClerk != null)
                return Ok(addClerk);
            if (message != "")
                return BadRequest(message);
            var error = new
            {
                message = "ההוספה נכשלה"
            };
            return Content(HttpStatusCode.BadRequest, error);
        }

        /// <summary>
        /// The function returns a list of all the clerks
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("getAllClerks")]
        public IHttpActionResult GetAllClerks()
        {
            try
            {
                return Ok(ClerkLogic.GetAllClerks());
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// The function updates the clerk according to the code of the clerk it recieved
        /// </summary>
        /// <param name="updatedClerk"></param>
        /// <returns></returns>
        [HttpPut]
        [Route("updateClerk")]
        public IHttpActionResult UpdateClerk(ClerkDTO updatedClerk)
        {
            string message = "";
            ClerkDTO updateClerk = ClerkLogic.UpdateClerk(updatedClerk, ref message);
            if (updatedClerk != null)
                return Ok(updatedClerk);
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
