//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DAL
{
    using System;
    using System.Collections.Generic;
    
    public partial class Shelter
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Shelter()
        {
            this.AmountPeopleInShelters = new HashSet<AmountPeopleInShelter>();
        }
    
        public int ShelterKey { get; set; }
        public double LatShelter { get; set; }
        public double LngShelter { get; set; }
        public Nullable<int> MaxPeople { get; set; }
        public string ShelterDescription { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<AmountPeopleInShelter> AmountPeopleInShelters { get; set; }
    }
}