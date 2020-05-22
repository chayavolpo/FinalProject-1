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
       

    }
}
