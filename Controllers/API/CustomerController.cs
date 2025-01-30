using Hotel_Project.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/CustomerDetail")]
    public class CustomerController : ApiController
    {
        [HttpGet]
        [Route("GetGuest")]

        public ExpandoObject GetGuest()
        {

            HOTELEntities databContext = new HOTELEntities();
            dynamic response = new ExpandoObject();
            try
            {
                var GuestList = (from g in databContext.Guests
                                 join e in databContext.Employees
                                 on g.EmployeeID equals e.EmployeeID
                                 orderby g.GuestID descending
                                 select new
                                 {
                                     GUESTID = g.GuestID,
                                     //BOOKINGID = bg.BookingID,
                                     EMPLOYEENAME = e.EmployeeName,
                                     EMPLOYEEID = g.EmployeeID,
                                     NAME = g.GuestName,
                                     EMAIL = g.Email,
                                     ADDRESSDETAIL = g.AddressDetail,
                                     STATENAME = g.StateName,
                                     AADHAARNUMBER = g.AadhaarNumber,
                                     MOBILENUMBER = g.MobileNumber,

                                 }).ToList();
                response.guestList = GuestList;
                response.Message = "Success";
            }

            catch (Exception ex)
            {
                response.Message= ex.Message;
            }

            return response;

        }



        [HttpPost]
        [Route("PostGuest")]

        public ExpandoObject PostGuest(Guest obj)
        {

            HOTELEntities databContext = new HOTELEntities();
            dynamic response = new ExpandoObject();
            try
            {
                Guest g = new Guest();
                g.EmployeeID = obj.EmployeeID;
                g.GuestName = obj.GuestName;
                g.Email = obj.Email;
                g.AddressDetail = obj.AddressDetail;
                g.StateName = obj.StateName;
                g.AadhaarNumber = obj.AadhaarNumber;
                g.MobileNumber = obj.MobileNumber;

                databContext.Guests.Add(g);
                databContext.SaveChanges();

                response.Message = "Success";
            }

            catch (Exception e)
            {
                response.Message= e.Message;
            }
            return response;

        }


    }
}
