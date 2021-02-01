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
        public string City { get; set; }
        public string ShelterStreet { get; set; }
        public string StreetNumber { get; set; }
        public Nullable<int> MaxPeople { get; set; }
        public string ShelterDescription { get; set; }
        public int DurationValue { get; set; }

        public ShelterDTO(DAL.Shelter shelterDAL)
        {
            ShelterKey = shelterDAL.ShelterKey;
            City= shelterDAL.City;
            ShelterStreet = shelterDAL.ShelterStreet;
            StreetNumber = shelterDAL.StreetNumber;
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
            shelterDAL.City = shelterDTO.City;
            shelterDAL.ShelterStreet = shelterDTO.ShelterStreet;
            shelterDAL.StreetNumber = shelterDTO.StreetNumber;
            shelterDAL.MaxPeople = shelterDTO.MaxPeople;
            shelterDAL.ShelterDescription = shelterDTO.ShelterDescription;
            return shelterDAL;
        }

    }
}
