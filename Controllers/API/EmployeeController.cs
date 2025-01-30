using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Dynamic;
using System.Web.Http;
using Hotel_Project.Models;
using System.Diagnostics;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/Employee")]
    public class EmployeeController : ApiController
    {
        [HttpGet]
        [Route("GetEmployee")]

       
       public ExpandoObject GetEmployee()
       {
            
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                var EmployeeList = (from e in dbContext.Employees
                                    select new
                                    {
                                        EMPLOYEEID = e.EmployeeID,
                                        EMPLOYEENAME = e.EmployeeName,
                                        EMAIL = e.Email,
                                        AADHAARNUM = e.AadhaarNumber,
                                        JOBROLE = e.JobRole,
                                        MOBILE = e.MobileNumber,
                                    }).ToList();

                response.employeeList = EmployeeList;
                response.Message = "Success";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
       }



        [HttpPost]
        [Route("PostEmployeeData")]

        public ExpandoObject PostEmployee(Employee obj)
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                Employee e = new Employee();
                //e.EmployeeID = obj.EmployeeID;
                e.EmployeeName = obj.EmployeeName;
                e.Email = obj.Email;
                e.AadhaarNumber = obj.AadhaarNumber;
                e.JobRole = obj.JobRole;
                e.MobileNumber = obj.MobileNumber;
                e.Passwords = obj.Passwords;
                e.Status = (byte) EmployeeStatus.InActive;
                dbContext.Employees.Add(e);
                dbContext.SaveChanges();

                response.Message = "Success";

            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }

            return response;
        }




        [HttpPost]
        [Route("UpdateEmployeeList")]

        public ExpandoObject UpdateEmployeeList(Employee obj)
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();

            try
            {
                if(obj.EmployeeID > 0)
                {
                    Employee e = new Employee();
                    e = dbContext.Employees.Where(x => x.EmployeeID == obj.EmployeeID).FirstOrDefault();
                    e.EmployeeName = obj.EmployeeName;
                    e.Email = obj.Email;
                    e.AadhaarNumber = obj.AadhaarNumber;
                    e.JobRole = obj.JobRole;
                    e.MobileNumber = obj.MobileNumber;

                    dbContext.SaveChanges();
                }

                else
                {
                    response.Message = "Can't Update";
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
        [Route("DeleteEmployeeList")]

        public ExpandoObject DeleteEmployee(Employee obj)
        {
            HOTELEntities dbContext = new HOTELEntities();
            dynamic response = new ExpandoObject();
            {
                try
                {
                    if(obj.EmployeeID > 0)
                    {
                        Employee e = new Employee();
                        e = dbContext.Employees.Where(x => x.EmployeeID == obj.EmployeeID).FirstOrDefault();
                        dbContext.Employees.Remove(e);
                        dbContext.SaveChanges();
                    }
                    else
                    {
                        response.Message = "Can't Delete";
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
        }
    } 
} 