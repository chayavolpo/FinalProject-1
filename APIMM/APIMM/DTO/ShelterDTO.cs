using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class ShelterDTO
    {
        static DAL.DataBaseMMEntities db = new DAL.DataBaseMMEntities();
        public int ShelterKey { get; set; }
        public double LatShelter { get; set; }
        public double LngShelter { get; set; }
        public Nullable<int> MaxPeople { get; set; }
        public string ShelterDescription { get; set; }

        public ShelterDTO(DAL.Shelter shelterDAL)
        {
            ShelterKey = shelterDAL.ShelterKey;
            LatShelter = shelterDAL.LatShelter;
            LngShelter = shelterDAL.LngShelter;
            MaxPeople = shelterDAL.MaxPeople; ;
            ShelterDescription = shelterDAL.ShelterDescription;
        }
        public ShelterDTO()
        {

        }
        public static DAL.Shelter DtoToDAL(ShelterDTO shelterDTO)
        {
            DAL.Shelter shelterDAL = new DAL.Shelter();
            shelterDAL.ShelterKey = shelterDTO.ShelterKey;
            shelterDAL.LatShelter = shelterDTO.LatShelter;
            shelterDAL.LngShelter = shelterDTO.LngShelter;
            shelterDAL.MaxPeople = shelterDTO.MaxPeople;
            shelterDAL.ShelterDescription = shelterDTO.ShelterDescription;
            return shelterDAL;
        }
        public static ShelterDTO AddNewShelter(ShelterDTO newShelter, ref string message)
        {
            DAL.Shelter ifLatExists = db.Shelters.FirstOrDefault(s => s.LatShelter == newShelter.LatShelter);
            DAL.Shelter ifLngExists = db.Shelters.FirstOrDefault(s => s.LngShelter == newShelter.LngShelter);
            if (ifLatExists != null && ifLngExists != null)
            {
                message = "מקלט זה קיים במערכת";
                return null;
            }
            DAL.Shelter shelterDAL = DtoToDAL(newShelter);
            db.Shelters.Add(shelterDAL);
            db.SaveChanges();
            return newShelter;
        }


    }
}
