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
    [RoutePrefix("clerks")]
    public class UsersController : ApiController
    {
        [HttpPost]
        [Route("login")]
        public ClerkDTO Login(ClerkDTO loginUser)
        {
            return ClerkLogic.LoginClerk(loginUser);
        }

    }
}
