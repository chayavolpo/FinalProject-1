using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DAL;

namespace DTO
{
     public class AmountPeopleInShelterDTO
     {
        static DAL.DataBaseMMEntities db = new DAL.DataBaseMMEntities();
        public int AmountpplKey { get; set; }
        public int ShelterKey { get; set; }
        Nullable<int> _amountPPLSpeDH;
        public Nullable<int> AmountPPLSpeDH {
            get { return _amountPPLSpeDH; }
            set
            {
                _amountPPLSpeDH = value;
            }
        }
        public Nullable<System.DateTime> Date { get; set; }
        public Nullable<System.TimeSpan> Time { get; set; }

        public AmountPeopleInShelterDTO(DAL.AmountPeopleInShelter amountpplDAL)
        {
            AmountpplKey = amountpplDAL.AmountpplKey;
            ShelterKey = amountpplDAL.ShelterKey;
            AmountPPLSpeDH = amountpplDAL.AmountPPLSpeDH;
            Date = amountpplDAL.Date;
            Time = amountpplDAL.Time;
        }
        public AmountPeopleInShelterDTO()
        {

        }

        public static DAL.AmountPeopleInShelter DtoToDAL(AmountPeopleInShelterDTO amountPPLDTO)
        {
            DAL.AmountPeopleInShelter amountPPLDAL = new DAL.AmountPeopleInShelter();
            amountPPLDAL.AmountpplKey = amountPPLDTO.AmountpplKey;
            amountPPLDAL.ShelterKey = amountPPLDTO.ShelterKey;
            amountPPLDAL.AmountPPLSpeDH = amountPPLDTO.AmountPPLSpeDH;
            amountPPLDAL.Date = amountPPLDTO.Date;
            amountPPLDAL.Time = amountPPLDTO.Time;
            return amountPPLDAL;
        }

       

        
    }
}
