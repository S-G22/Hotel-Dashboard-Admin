using Hotel_Project.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/Index")]
    public class IndexController : ApiController
    {
        [HttpGet]
        [Route("GetDashboardStats")]
        public DashboardStatsDTO GetDashboardStats()
        {
            HOTELEntities dbContext = new HOTELEntities();
            DashboardStatsDTO response = new DashboardStatsDTO();

            try
            {
                response.TotalBookings = dbContext.BookingGuests
                                            .Select(bg => bg.BookingID)
                                            .Distinct()
                                            .Count();

                response.TotalServices = dbContext.ServiceLists.Count();
                response.TotalEmployees = dbContext.Employees.Count();
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }

    }

    public class DashboardStatsDTO
        {
            public int TotalBookings { get; set; }
            public int TotalServices { get; set; }
            public int TotalEmployees { get; set; }
            public string Message { get; set; }
        }

    }
