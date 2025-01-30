using System;
using Hotel_Project.Models;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Linq.Expressions;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/AdditionalService")]
    public class AdditionalServicesController : ApiController
    {

        [HttpGet]
        [Route("getAdditionalService")]

        public ExpandoObject getAdditionalService()

        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                var Servicelist = (from s in dbContext.ServiceLists
                                   select new
                                   {
                                       SERVICEID = s.ServiceID,
                                       SERVICENAME= s.ServicesName,

                                   }).ToList();

                response.serviceList = Servicelist;
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }



        [HttpGet]
        [Route("getAddititonalServicedata")]

        public ExpandoObject getAddititonalServicedata()
        {
            HOTELEntities dbcontext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                var listAdditionalService = (from abs in dbcontext.AdditionalBookingDetails
                                             join s in dbcontext.ServiceLists 
                                             on abs.ServiceID equals s.ServiceID
                                             join g in dbcontext.Guests
                                             on abs.GuestID equals g.GuestID
                                             select new
                                             {
                                                 ADDITIONALBOOKINGDETAILID = abs.AdditionalBookingDetailsID,
                                                 BOOKINGGUESTID = abs.BookingGuestId,
                                                 GUESTID = g.GuestID,
                                                 GUESTNAME = g.GuestName,
                                                 SERVICEID = abs.ServiceID,
                                                 SERVICENAME = s.ServicesName,
                                                 QUANTITY = abs.Quantity,
                                             }).ToList();

                response.additionalBookingDetails = listAdditionalService;
                response.Message = "Success";
            }
            catch(Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }



        [HttpPost]
        [Route("postAdditionalService")]

        public ExpandoObject postAdditionalService(AdditionalBookingDetail obj)
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                AdditionalBookingDetail abd = new AdditionalBookingDetail();
                abd.BookingGuestId = obj.BookingGuestId;
                abd.ServiceID = obj.ServiceID;
                abd.Quantity = obj.Quantity;

                dbContext.AdditionalBookingDetails.Add(abd);
                dbContext.SaveChanges();

                response.Message= "Success";

            }
            catch(Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }




        [HttpPost]
        [Route("updateAdditionalService")]

        public ExpandoObject updateAdditionalService(AdditionalBookingDetail obj)
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();
            try
            {
                if (obj.AdditionalBookingDetailsID >0)
                {
                    AdditionalBookingDetail abs = new AdditionalBookingDetail();
                    abs = dbContext.AdditionalBookingDetails.Where(x => x.AdditionalBookingDetailsID == obj.AdditionalBookingDetailsID).FirstOrDefault();
                    //abs.BookingGuestId = obj.BookingGuestId;
                    abs.ServiceID = obj.ServiceID;
                    //abs.ServicesName = obj.ServicesName;
                    abs.Quantity = obj.Quantity;
                    dbContext.SaveChanges();
                }
                else
                {
                    response.Message = "Can't Upadte";
                    return response;
                }
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
                return response;
            }
            return response;
        }

        [HttpPost]
        [Route("DeleteAdditionalService")]

        public ExpandoObject DeleteAdditionalService(AdditionalBookingDetail obj)
        {
            HOTELEntities dataBcontext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                if (obj.AdditionalBookingDetailsID >0)
                {
                    AdditionalBookingDetail abs = new AdditionalBookingDetail();
                    abs  = dataBcontext.AdditionalBookingDetails.Where(x => x.AdditionalBookingDetailsID == obj.AdditionalBookingDetailsID).FirstOrDefault();
                    dataBcontext.AdditionalBookingDetails.Remove(abs);
                    dataBcontext.SaveChanges();
                }
                else
                {
                    response.Message = "Can't DELETE!";
                    return response;
                }
                response.Message ="Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;

        }


        [HttpGet]
        [Route("hotelBookingid")]

        public ExpandoObject hotelBookingid(int datavariable)
        {
            HOTELEntities db = new HOTELEntities();
            dynamic response = new ExpandoObject();
            try
            {
                var dataLISTS = (from abd in db.AdditionalBookingDetails
                                 join s in db.ServiceLists
                                 on abd.ServiceID equals s.ServiceID
                                 join g in db.Guests
                                 on abd.GuestID equals g.GuestID
                                 join bg in db.BookingGuests
                                 on abd.BookingGuestId equals bg.BookingGuestID
                                 where bg.BookingGuestID == datavariable 
                                 select new
                                 {
                                     ABDid = abd.AdditionalBookingDetailsID,
                                     gId = g.GuestID,
                                     gName = g.GuestName,
                                     sID = s.ServiceID,
                                     sName = s.ServicesName,
                                     sQt = abd.Quantity,

                                 }).ToList();
              /*  var g  = (from bg in db.BookingGuests
                          join g in db.Guests
                          on g.guestid equals bg.guestid
                          join )*/


                response.listsData = dataLISTS;
                response.Message = "Success";

            }

            catch(Exception e)
            {
                response.Message = e.Message;
            }
            return response;
        }

    }
}