using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Hotel_Project.Models
{
    public class LogIn
    {
     public string Username { get; set; }
     public string Password { get; set; }

    }


    public class BookGuest
    {
        public int GuestID { get; set; }
        public int EmployeeID { get; set; }
        public string GuestName { get; set; }
        public string Email { get; set; }
        public string AddressDetail { get; set; }
        public string StateName { get; set; }
        public string AadhaarNumber { get; set; }
        public string MobileNumber { get; set; }
        public DateTime CheckIn {  get; set; }
        public int Num_Of_Guest { get; set; }
        public int RoomID { get; set; }
        public int RoomNum { get; set; }
        public List<BookGuest> AdditionalGuestsList { get; set; }

    }

    public class PropsModel
    { 
        public int PropID { get; set; }
        public int id { get; set; }
        public string name { get; set; }
        public int age { get; set; }

    }

   
}