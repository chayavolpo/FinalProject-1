using DTO;
using DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.IO;
using Newtonsoft.Json.Linq;

namespace BL
{
    public class ShelterLogic
    {
        static DAL.DataBaseMMEntities db = new DAL.DataBaseMMEntities();
        public static ShelterDTO AddNewShelter(ShelterDTO newShelter, ref string message)
        {

            //DAL.Shelter ifCityExists = db.Shelters.FirstOrDefault(s => s.City == newShelter.City);
            //DAL.Shelter ifStreetExists = db.Shelters.FirstOrDefault(s => s.ShelterStreet == newShelter.ShelterStreet);
            //DAL.Shelter ifStreetNumberExists = db.Shelters.FirstOrDefault(s => s.StreetNumber == newShelter.StreetNumber);
            bool ifExists = false;
            foreach (var shelter in db.Shelters)
            {
                if(shelter.City == newShelter.City)
                {
                    if(shelter.ShelterStreet == newShelter.ShelterStreet)
                    {
                        if(shelter.StreetNumber == newShelter.StreetNumber)
                        {
                            ifExists = true;
                            break;
                        }
                    }
                }
            }
            if (ifExists)
            {
                message = "מקלט זה קיים במערכת";
                return null;
            }
            DAL.Shelter shelterDAL = ShelterDTO.DtoToDAL(newShelter);
            db.Shelters.Add(shelterDAL);
            try
            {
                db.SaveChanges();
                return newShelter;
            }
            catch (Exception ex)
            {
                return null;
            }
            
        }
        public static AmountPeopleInShelterDTO UpdateAmountPPLInShelter(AmountPeopleInShelterDTO amountPPL, string addressToUpdateAmountPPL)
        {
            int shelterKey = GetShelterKey(addressToUpdateAmountPPL);
            if (shelterKey != 0)
            {
                amountPPL.ShelterKey = shelterKey;
                amountPPL.Date = DateTime.Now;
                amountPPL.Time = DateTime.Now.TimeOfDay;
                DAL.AmountPeopleInShelter amountPPLDAL = DTO.AmountPeopleInShelterDTO.DtoToDAL(amountPPL);
                db.AmountPeopleInShelters.Add(amountPPLDAL);
                db.SaveChanges();
            }
            return amountPPL;
        }

        /// <summary>
        /// The function returns a list of the three nearest shelters according to the duration of each shelter that returns from the function GetDurationOfShelter(...)
        /// </summary>
        /// <param name="city"></param>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <returns></returns>
        public static List<ShelterDTO> GetNearestShelter( double lat, double lng)
        {
            int minDuration2=0;
            int minDuration3=0;
            List<ShelterDTO> nearestShelters = new List<ShelterDTO>();
            ShelterDTO nearestShelter = new ShelterDTO();
            ShelterDTO nearestShelter2 = new ShelterDTO();
            ShelterDTO nearestShelter3 = new ShelterDTO();
            List<ShelterDTO> allSheltersDTO = GetAllShelters();
            var lowDuration = 1000;
            foreach(var shelter in allSheltersDTO)
            {
                var minDuration = GetDurationOfShelter(shelter, lat, lng);
                if(minDuration < lowDuration)
                {
                    minDuration3 = minDuration2;
                    minDuration2 = lowDuration;
                    lowDuration = minDuration;
                    nearestShelter3 = nearestShelter2;
                    nearestShelter2 = nearestShelter;
                    nearestShelter = shelter;
                    nearestShelter.DurationValue = lowDuration;
                }
                else
                {
                    if(minDuration < minDuration2)
                    {
                        minDuration3 = minDuration2;
                        minDuration2 = minDuration;
                        nearestShelter3 = nearestShelter2;
                        nearestShelter2 = shelter;
                        nearestShelter2.DurationValue = minDuration2;
                    }
                    else
                    {
                        if (minDuration < minDuration3)
                        {
                            minDuration3 = minDuration;
                            nearestShelter3 = shelter;
                            nearestShelter3.DurationValue = minDuration3;
                        }   
                    }
                }
            }
            nearestShelters.Add(nearestShelter);
            nearestShelters.Add(nearestShelter2);
            nearestShelters.Add(nearestShelter3);
            return nearestShelters;
        }

        /// <summary>
        /// The function calculates the walking time duration in minutes from the user's location to the specific shelter. 
        /// </summary>
        /// <param name="shelter"></param>
        /// <param name="lat"></param>
        /// <param name="lng"></param>
        /// <returns></returns>
        public static int GetDurationOfShelter(ShelterDTO shelter, double lat, double lng)
        {
            
            string shelterAddress = shelter.City +"%20"+ shelter.ShelterStreet+"%20" +shelter.StreetNumber;
            string source = lat + ","+ lng; 
            string url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins="
            +source + "&destinations=" + shelterAddress + "&mode=walking" + "&key=your key";
            WebRequest request = WebRequest.Create(url);
            WebResponse response = request.GetResponse();
            Stream data = response.GetResponseStream();
            StreamReader reader = new StreamReader(data);
            string responseFromServer = reader.ReadToEnd();

            JObject results = JObject.Parse(responseFromServer);
            int seconds = Convert.ToInt32(results["rows"].First["elements"].First["duration"]["value"]);
            double tmp = (double)seconds / 60;
            int minDuration;
            if (seconds / 60 != tmp)

                minDuration = seconds / 60 + 1;
            else
                minDuration = seconds / 60;

            reader.Close();
            data.Close();
            response.Close();
            return minDuration;
        }

        public static List<ShelterDTO> GetAllShelters()
        {
            return db.Shelters.AsEnumerable().Select(x => new ShelterDTO(x)).ToList();
        }

        public static ShelterDTO UpdateShelter(ShelterDTO updatedShelter, ref string message)
        {

            DAL.Shelter shelterToUpdate = db.Shelters.FirstOrDefault(s => s.ShelterKey == updatedShelter.ShelterKey);
            if (shelterToUpdate == null)
            {
                message = "לא נמצא מקלט מבוקש";
                return null;
            }
            else
            {
                shelterToUpdate.City = updatedShelter.City;
                shelterToUpdate.ShelterStreet = updatedShelter.ShelterStreet;
                shelterToUpdate.StreetNumber = updatedShelter.StreetNumber;
                shelterToUpdate.MaxPeople = updatedShelter.MaxPeople;
                shelterToUpdate.ShelterDescription = updatedShelter.ShelterDescription;
                db.SaveChanges();
            }
            return updatedShelter;
            
        }

        public static int GetShelterKey(string addressToUpdateAmountPPL)
        {
            List<ShelterDTO> allSheltersDTO = GetAllShelters();
            foreach (var shelter in allSheltersDTO)
            {
                var address = shelter.ShelterStreet + " " + shelter.StreetNumber + " " + shelter.City;
                if (address == addressToUpdateAmountPPL)
                    return shelter.ShelterKey;
            }
            return 0;
        }
    }
}
