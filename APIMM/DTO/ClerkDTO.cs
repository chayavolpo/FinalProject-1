using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ClerkDTO
    {
        static DAL.DataBaseMMEntities db = new DAL.DataBaseMMEntities();

        public int ClerkKey { get; set; }
        public string ClerkFName { get; set; }
        public string ClerkLName { get; set; }
        public string ClerkPassword { get; set; }
        public bool IfManager { get; set; }

        public ClerkDTO(DAL.Clerk clerkDAL)
        {
            if (clerkDAL == null)
            {
                clerkDAL = new DAL.Clerk();
            };
            ClerkKey = clerkDAL.ClerkKey;
            ClerkFName = clerkDAL.ClerkFName;
            ClerkLName = clerkDAL.ClerkLName;
            ClerkPassword = clerkDAL.ClerkPassword;
            IfManager = clerkDAL.IfManager;
        }

        public ClerkDTO()
        {

        }

        public static ClerkDTO ClerkExsits(ClerkDTO clerk)
        {
            return new ClerkDTO(db.Clerks.FirstOrDefault(p => p.ClerkPassword == clerk.ClerkPassword));
        }

        public static DAL.Clerk DtoToDAL(ClerkDTO clerkDTO)
        {
            DAL.Clerk clerkDAL = new DAL.Clerk();
            clerkDAL.ClerkKey = clerkDTO.ClerkKey;
            clerkDAL.ClerkFName = clerkDTO.ClerkFName;
            clerkDAL.ClerkLName = clerkDTO.ClerkLName;
            clerkDAL.ClerkPassword = clerkDTO.ClerkPassword;
            clerkDAL.IfManager = clerkDTO.IfManager;
            return clerkDAL;
        }
        public static bool AddNewClerk(ClerkDTO newClerk)
        {
            DAL.Clerk clerkDAL = DtoToDAL(newClerk);
            try
            {
                db.Clerks.Add(clerkDAL);
                db.SaveChanges();
                return true;
            }
            catch (Exception e)
            {
                return false;
            }


        }

    }

}
