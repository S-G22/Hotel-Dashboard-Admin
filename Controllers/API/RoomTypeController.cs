using Hotel_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Dynamic;
using System.Web.Http;
using Microsoft.Ajax.Utilities;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/roomType")]
    public class RoomTypeController : ApiController
    {
        [HttpGet]
        [Route("GetRoomType")]

        public ExpandoObject GetRoomType ()
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                var RoomTypeList = (from rt in dbContext.RoomTypes
                                    select new
                                    {
                                        ROOMTYPEID = rt.RoomTypeID,
                                        ROOMTYPENAME = rt.RoomTypeName,
                                        PRICE = rt.BaseRate,
                                        MAXOCCUPANCY = rt.MaxOccupancy,
                                        DESCRIPTIONS = rt.Descriptions,

                                    }).ToList();
                response.roomTypeList = RoomTypeList;
                response.Message= "Success";

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }





        [HttpPost]
        [Route("postRoomType")]

        public ExpandoObject postRoomType(RoomType obj)
        {
            HOTELEntities dbContext = new HOTELEntities ();
            dynamic response = new ExpandoObject();

            try
            {
                RoomType rt = new RoomType();
                rt.RoomTypeName = obj.RoomTypeName;
                rt.BaseRate = obj.BaseRate;
                rt.MaxOccupancy = obj.MaxOccupancy;
                rt.Descriptions =obj.Descriptions;

                dbContext.RoomTypes.Add(rt);
                dbContext.SaveChanges();
                response.Message = "Success";
            }
            catch(Exception ex)
            {
                response.Message = ex.Message ;
            }
            return response;
        }


        [HttpPost]
        [Route("updateRoomType")]

        public ExpandoObject updateRoomType(RoomType obj)
        {
            HOTELEntities dbcontext = new HOTELEntities ();
            dynamic response = new ExpandoObject();

            try
            {
                if(obj.RoomTypeID > 0)
                {
                    RoomType rt = new RoomType();
                    rt = dbcontext.RoomTypes.Where(r => r.RoomTypeID == obj.RoomTypeID).FirstOrDefault();
                    rt.RoomTypeName = obj.RoomTypeName;
                    rt.BaseRate = obj.BaseRate;
                    rt.MaxOccupancy = obj.MaxOccupancy;
                    rt.Descriptions =obj.Descriptions;

                    dbcontext.SaveChanges();

                }
                else
                {
                    response.Message = "Can't Update!";
                    return response;
                }
                response.Message = "Success";

               
            }
            catch(Exception ex)
            {
                response.Message = ex.Message ;
            }
            return response;
        }


        [HttpPost]
        [Route("deleteRoomType")]

        public ExpandoObject deleteRoomType(RoomType obj)
        {
            HOTELEntities dbcontext = new HOTELEntities ();
            dynamic response = new ExpandoObject();

            try
            {
                if(obj.RoomTypeID > 0)
                {
                    RoomType rt = new RoomType();
                    rt = dbcontext.RoomTypes.Where(r => r.RoomTypeID == obj.RoomTypeID).FirstOrDefault();
                    dbcontext.RoomTypes.Remove(rt);
                    dbcontext.SaveChanges();
                }
                else
                {
                    response.Message = "Can't Delete!";
                    return response;
                }
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message ;
            }
            return response;
        }
    }
}