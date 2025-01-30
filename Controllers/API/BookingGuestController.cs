using Hotel_Project.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Http;
/*using PagedList;
using PagedList.Mvc;*/

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/BookingGuest")]
    public class BookingGuestController : ApiController
    {
        [HttpPost]
        [Route("PostBookGuest")]

        public ExpandoObject PostBookGuest(BookGuest Obj)
        {
            HOTELEntities dataBContext = new HOTELEntities();
          /*BookGuest ObjB = new BookGuest();*/
            dynamic response = new ExpandoObject();
            try
            {
                Booking b = new Booking();
                b.CheckIn = DateTime.Now;
                b.Num_Of_Guest = Obj.Num_Of_Guest;
                b.EmployeeID = Obj.EmployeeID;
                b.BookingCode = genBookCode.GenerateBookingCode(dataBContext);
                dataBContext.Bookings.Add(b);
                dataBContext.SaveChanges();

                Guest g = new Guest();
                g.GuestName = Obj.GuestName;
                g.Email = Obj.Email;
                g.AddressDetail = Obj.AddressDetail;
                g.StateName = Obj.StateName;
                g.MobileNumber = Obj.MobileNumber;
                g.AadhaarNumber = Obj.AadhaarNumber;
                g.EmployeeID = Obj.EmployeeID;
                dataBContext.Guests.Add(g);
                dataBContext.SaveChanges();

                BookingGuest bgo = new BookingGuest();
                bgo.GuestID = g.GuestID;
                bgo.RoomID = Obj.RoomID;
                bgo.EmployeeID = Obj.EmployeeID;
                bgo.BookingID = b.BookingID;
                dataBContext.BookingGuests.Add(bgo);
                dataBContext.SaveChanges();

                if(Obj.AdditionalGuestsList != null)
                {
                    foreach (var x in Obj.AdditionalGuestsList)
                    {
                        Guest gh = new Guest();
                        gh.GuestName = x.GuestName;
                        gh.Email = x.Email;
                        gh.AddressDetail = x.AddressDetail;
                        gh.StateName = x.StateName;
                        gh.MobileNumber = x.MobileNumber;
                        gh.AadhaarNumber = x.AadhaarNumber;
                        gh.EmployeeID = Obj.EmployeeID;
                        dataBContext.Guests.Add(gh);
                        dataBContext.SaveChanges();

                        BookingGuest bg = new BookingGuest();
                        bg.RoomID = x.RoomNum;
                        bg.EmployeeID = Obj.EmployeeID;
                        bg.BookingID = b.BookingID; // please isko samjho (smjhna ye hai ki jo primary key, foreign key bann kr pass ho rha toh usko save bhi krwaynge na or paas hoga tb na save hoga, bs itta sa hi)  ":)"
                        bg.GuestID = gh.GuestID;
                        dataBContext.BookingGuests.Add(bg) ;
                        dataBContext.SaveChanges();
                    }
                }
                dataBContext.SaveChanges();

                response.Message = "Success";

            }

            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return response;


        }


        //Saveprop
        [HttpPost]
        [Route("Saveprop")]

        public ExpandoObject Saveprop(List<PropsModel> data  )
        {
            HOTELEntities dataBContext = new HOTELEntities();

            dynamic response = new ExpandoObject();
            try
            {
                foreach(var x in data)
                {
                    Prop prop = new Prop();
                    prop.ID = x.id;
                    prop.Names = x.name;
                    prop.Age = x.age;

                    dataBContext.Props.Add(prop);

                }

                dataBContext.SaveChanges();

                response.Message = "Success";

            }

            catch (Exception e)
            {
                response.Message = e.Message;
            }
            return response;


        }



        [HttpGet]
        [Route("GetBookList")]
        public ExpandoObject GetBookList()
        {
            HOTELEntities dbContext = new HOTELEntities(); 
            dynamic response = new ExpandoObject();

            try
            {
                var BookingList = (from bg in dbContext.BookingGuests
                                   join b in dbContext.Bookings
                                   on bg.BookingID equals b.BookingID
                                   join g in dbContext.Guests
                                   on bg.GuestID equals g.GuestID
                                   join r in dbContext.Rooms
                                   on bg.RoomID equals r.RoomID
                                   orderby bg.GuestID descending
                                   select new
                                   {
                                       BOOKINGUESTID = bg.BookingGuestID,
                                       BOOKINGID = b.BookingID,
                                       BOOKINGCODE = b.BookingCode,
                                       GUESTID = g.GuestID,
                                       GUESTNAME = g.GuestName,
                                       MOBILENUM = g.MobileNumber,
                                       ROOMID = r.RoomID,
                                       ROOMNUM = r.RoomNumber,

                                   }).ToList();             /* .ToPagedList(i ?? 1,10);*/
                response.manageList = BookingList;
                response.Message = "Success";
            }
            catch (Exception ex)
            {
              response.Message = ex.Message;
            }
            return response;
        }





        [HttpGet]
        [Route("getService")]

        public ExpandoObject getAdditionalService()

        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                var ServicelistData = (from s in dbContext.ServiceLists
                                   select new
                                   {
                                       SERVICEID = s.ServiceID,
                                       SERVICENAME = s.ServicesName,
                                       DESCRIPTIONS = s.Descriptions,
                                       PRICE = s.Price,

                                   }).ToList();

                response.serviceListdata = ServicelistData;
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }





        [HttpGet]
        [Route("GetGuest")]
        public ExpandoObject GetGuest(int BookId)
        {

            HOTELEntities databContext = new HOTELEntities();
            dynamic response = new ExpandoObject();
            try
            {
                var GuestList = (from g in databContext.Guests
                                 join e in databContext.Employees
                                 on g.EmployeeID equals e.EmployeeID
                                 join bg in databContext.BookingGuests
                                 on g.GuestID equals bg.GuestID
                                 where bg.BookingID == BookId
                                 select new
                                 {
                                     GUESTID = g.GuestID,
                                     NAME = g.GuestName,

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



    /*    public class DTO: AdditionalBookingDetail
        {
            public string BookingCode { get; set; }
        }*/


        [HttpPost]
        [Route("PostAddService")]

        public ExpandoObject PostAddService(AdditionalBookingDetail obj)
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                AdditionalBookingDetail abd = new AdditionalBookingDetail();
              /*  int bookingId = dbContext.Bookings.First(x => x.BookingCode == obj.BookingCode).BookingID;*/
                abd.BookingGuestId = obj.BookingGuestId;
                abd.ServiceID = obj.ServiceID;
                /*abd.ServicesName = obj.ServicesName;*/
                abd.Quantity = obj.Quantity;
                abd.GuestID = obj.GuestID;
               /* abd.GuestName = obj.GuestName;*/
                abd.TotalBill = obj.TotalBill;
                dbContext.AdditionalBookingDetails.Add(abd);
                dbContext.SaveChanges();

                response.Message = "Success";

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }



      
    }
}