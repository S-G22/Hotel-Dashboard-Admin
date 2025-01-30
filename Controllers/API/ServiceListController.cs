using Hotel_Project.Models;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Web.Http;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/ServiceList")]
    public class ServiceListController : ApiController
    {
        [HttpGet]
        [Route("GetServiceList")]

        public ExpandoObject GetServiceList()
        {
            HOTELEntities dataContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                var ServiceList = (from s in dataContext.ServiceLists
                                   select new
                                   {
                                       SERVICEID = s.ServiceID,
                                       SERVICENAME = s.ServicesName,
                                       DESCRIPTIONS = s.Descriptions,
                                       PRICE = s.Price,
                                   }).ToList();

                response.serviceList = ServiceList;
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }


        [HttpPost]
        [Route("PostServiceList")]

        public ExpandoObject PostServiceList (ServiceList obj)
        {
            HOTELEntities dbcontext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                ServiceList sl = new ServiceList();
                sl.ServicesName = obj.ServicesName;
                sl.Descriptions = obj.Descriptions;
                sl.Price = obj.Price;

                dbcontext.ServiceLists.Add(sl);
                dbcontext.SaveChanges();

                response.Message = "Success";
            }
            catch(Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }





        [HttpPost]
        [Route("UpdateServiceList")]

        public ExpandoObject UpdateServiceList (ServiceList obj)
        {
            HOTELEntities dbcontext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                if (obj.ServiceID > 0)
                {
                    ServiceList sl = new ServiceList();
                    sl = dbcontext.ServiceLists.Where(x => x.ServiceID == obj.ServiceID).FirstOrDefault();
                    sl.ServicesName = obj.ServicesName;
                    sl.Descriptions = obj.Descriptions;
                    sl.Price = obj.Price;

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
                response.Message = ex.Message;
            }
            return response;
        }





        [HttpPost]
        [Route("DeleteServiceList")]

        public ExpandoObject DeleteServiceList(ServiceList obj)
        {
            HOTELEntities dataBcontext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                if (obj.ServiceID >0)
                {
                    ServiceList sl = new ServiceList();
                    sl  = dataBcontext.ServiceLists.Where(x => x.ServiceID == obj.ServiceID).FirstOrDefault();
                    dataBcontext.ServiceLists.Remove(sl);
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
    }
}