﻿using DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL
{
    public static class ClerkLogic
    {
        public static ClerkDTO LoginClerk(ClerkDTO clerk)
        {
            return DTO.ClerkDTO.ClerkExsits(clerk);
        }

        public static ClerkDTO AddNewClerk(ClerkDTO newClerk, ref string message)
        {
            return DTO.ClerkDTO.AddNewClerk(newClerk, ref message);
        }
    }
}
