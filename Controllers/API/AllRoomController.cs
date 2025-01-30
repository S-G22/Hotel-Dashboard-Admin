using Hotel_Project.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.UI.WebControls;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/allRoom")]
    public class AllRoomController : ApiController
    {
        [HttpGet]
        [Route("GetAllRoom")]

        public ExpandoObject GetAllRoom()
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();
            try
            {
                var roomList = (from r in dbContext.Rooms
                                join rt in dbContext.RoomTypes
                                on r.RoomTypeID equals rt.RoomTypeID
                                select new
                                {
                                   ROOMID = r.RoomID, 
                                   ROOMTYPE = rt.RoomTypeName,
                                   ROOMNUM = r.RoomNumber,
                                   FLOORNUM = r.FloorNumber,
                                   maxOCCUPANCY = rt.MaxOccupancy,
                                }).ToList();

                response.ROOMlists = roomList;
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