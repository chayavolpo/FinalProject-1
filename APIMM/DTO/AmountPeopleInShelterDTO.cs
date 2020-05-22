using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
     public class AmountPeopleInShelterDTO
     {
        public int AmountpplKey { get; set; }
        public int ShelterKey { get; set; }
        public Nullable<int> AmountPPLSpeDH { get; set; }
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

    }
}
