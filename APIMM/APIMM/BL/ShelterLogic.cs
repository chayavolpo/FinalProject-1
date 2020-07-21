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
        public static ShelterDTO AddNewShelter(ShelterDTO newShelter, ref string message)
        {
            return DTO.ShelterDTO.AddNewShelter(newShelter, ref message);
        }
        public static bool UpdateAmountPPLInShelter(AmountPeopleInShelterDTO amountPPL)
        {
            return DTO.AmountPeopleInShelterDTO.UpdateAmountPPLInShelter(amountPPL);
        }
    }
}
