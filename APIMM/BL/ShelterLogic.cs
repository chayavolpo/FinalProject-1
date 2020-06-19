using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
   public class ShelterLogic
    {
        public static bool AddNewShelter(ShelterDTO newShelter)
        {
            return DTO.ShelterDTO.AddNewShelter(newShelter);
        }
        public static bool UpdateAmountPPLInShelter(AmountPeopleInShelterDTO amountPPL)
        {
            return DTO.AmountPeopleInShelterDTO.UpdateAmountPPLInShelter(amountPPL);
        }
    }
}
