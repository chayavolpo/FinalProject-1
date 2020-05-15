using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace APIMM.Controllers
{
    [RoutePrefix("users")]
    public class UsersController : ApiController
    {
        [Route("login")]
        public User Login(User loginUser)
        {
            return new User();
        }

    }
}
