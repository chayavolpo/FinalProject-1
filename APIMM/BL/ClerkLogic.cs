using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class ClerkLogic
    {

        static DAL.DataBaseMMEntities db = new DAL.DataBaseMMEntities();
        public static ClerkDTO LoginClerk(ClerkDTO clerk)
        {
            return new ClerkDTO(db.Clerks.FirstOrDefault(p => p.ClerkPassword == clerk.ClerkPassword && p.ClerkFName == clerk.ClerkFName));
        }

        public static ClerkDTO AddNewClerk(ClerkDTO newClerk, ref string message)
        {
            DAL.Clerk IfPasswordExists = db.Clerks.FirstOrDefault(c => c.ClerkPassword == newClerk.ClerkPassword);
            if (IfPasswordExists != null)
            {
                message = "סיסמא זו קיימת במערכת, אנא הקש סיסמא חדשה";
                return null;
            }
            DAL.Clerk clerkDAL =ClerkDTO.DtoToDAL(newClerk);
            db.Clerks.Add(clerkDAL);
            db.SaveChanges();
            return newClerk;
        }

        public static List<ClerkDTO> GetAllClerks()
        {
            return db.Clerks.AsEnumerable().Select(x => new ClerkDTO(x)).ToList();
        }

        public static ClerkDTO UpdateClerk(ClerkDTO updatedClerk, ref string message)
        {

            DAL.Clerk clerkToUpdate = db.Clerks.FirstOrDefault(c => c.ClerkKey == updatedClerk.ClerkKey);
            if (clerkToUpdate == null)
            {
                message = "לא נמצא משתמש מבוקש";
                return null;
            }
            else
            {
                clerkToUpdate.ClerkFName = updatedClerk.ClerkFName;
                clerkToUpdate.ClerkLName = updatedClerk.ClerkLName;
                clerkToUpdate.ClerkPassword = updatedClerk.ClerkPassword;
                db.SaveChanges();
            }
            return updatedClerk;

        }
    }
}
