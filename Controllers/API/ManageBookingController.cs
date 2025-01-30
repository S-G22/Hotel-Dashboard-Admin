using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using Hotel_Project.Models;
using System.Dynamic;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/manageBooking")]

    public class ManageBookingController : ApiController
    {
        [HttpGet]
        [Route("GetManageBookdata")]
        public ExpandoObject GetManageBookdata(int dataBookingId)
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                /*var dataLists = (from bg in dbContext.BookingGuests
                                 join b in dbContext.Bookings
                                 on bg.BookingID equals b.BookingID
                                 join g in dbContext.Guests
                                 on bg.GuestID equals g.GuestID
                                 join r in dbContext.Rooms
                                 on bg.RoomID equals r.RoomID
                                 join abg in dbContext.AdditionalBookingDetails 
                                 on bg.BookingGuestID equals abg.BookingGuestId
                                 join s in dbContext.ServiceLists
                                 on abg.ServiceID equals s.ServiceID
                                 where bg.BookingID == dataBookingId
                                 select new
                                 {
                                    bookingID = b.BookingID,
                                    bookingCODE = b.BookingCode,
                                    guest = g.GuestID,
                                    guestNAME = g.GuestName,
                                    ROOMID = r.RoomID,
                                    roomNUMBER = r.RoomNumber,
                                    SERVICEID = s.ServiceID,
                                    serviceNAME = s.ServicesName,
                                    additionalBookingDetail = abg.AdditionalBookingDetailsID,
                                    serviceQuantity = abg.Quantity,
                                 }).ToList();*/

                var dataLists1 = (from bg in dbContext.BookingGuests
                                 join b in dbContext.Bookings
                                 on bg.BookingID equals b.BookingID
                                 join g in dbContext.Guests
                                 on bg.GuestID equals g.GuestID
                                 join r in dbContext.Rooms
                                 on bg.RoomID equals r.RoomID
                                 join abg in dbContext.AdditionalBookingDetails
                                 on bg.BookingGuestID equals abg.BookingGuestId into abgGroup
                                 from abg in abgGroup.DefaultIfEmpty()
                                 join s in dbContext.ServiceLists
                                 on abg.ServiceID equals s.ServiceID into sGroup
                                 from s in sGroup.DefaultIfEmpty()
                                 where bg.BookingID == dataBookingId
                                 select new
                                 {
                                     bookingID = b.BookingID,
                                     bookingCODE = b.BookingCode,
                                     guest = g.GuestID,
                                     guestNAME = g.GuestName,
                                     ROOMID = r.RoomID,
                                     roomNUMBER = r.RoomNumber,
                                     SERVICEID = abg != null ? abg.ServiceID : (int?)null,
                                     serviceNAME = s != null ? s.ServicesName : null,
                                     additionalBookingDetail = abg != null ? abg.AdditionalBookingDetailsID : (int?)null,
                                     serviceQuantity = abg != null ? abg.Quantity : (int?)null,
                                 }).ToList();


                response.DATAlists = dataLists1;
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