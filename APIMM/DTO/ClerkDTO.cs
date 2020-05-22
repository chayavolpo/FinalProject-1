using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ClerkDTO
    {
        static DAL.DBMMEntities db = new DAL.DBMMEntities();

        public int    ClerkKey { get; set; }
        public string ClerkFName { get; set; }
        public string ClerkLName { get; set; }
        public string ClerkPassword { get; set; }
        public bool   IfManager { get; set; }

        public static ClerkDTO ClerkExsits(ClerkDTO clerk)
        {
            return new ClerkDTO(db.Clerks.FirstOrDefault(p => p.ClerkPassword == clerk.ClerkPassword));
        }
        public ClerkDTO(DAL.Clerk clerkDAL)
        {
            ClerkKey = clerkDAL.ClerkKey;
            ClerkFName = clerkDAL.ClerkFName;
            ClerkLName = clerkDAL.ClerkLName;
            ClerkPassword = clerkDAL.ClerkPassword;
            IfManager = clerkDAL.IfManager;
        }
        public ClerkDTO()
        {

        }
     
    }

}
