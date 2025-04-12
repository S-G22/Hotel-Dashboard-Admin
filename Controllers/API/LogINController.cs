using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Dynamic;
using System.Security.Cryptography;
using Hotel_Project;
using Hotel_Project.Models;
using System.Web.UI.WebControls;
using System.Web.Helpers;
using System.Text;

namespace Hotel_Project.Controllers.API
{
    [RoutePrefix("api/Login")]
    public class SystemLoginController : ApiController
    {


        [HttpPost]
        [Route("AdminLogIn")]
        public ExpandoObject AdminLogIn(LogIn obj)
        {

            HOTELEntities dataContext = new HOTELEntities();
            dynamic response = new ExpandoObject();
            try
            {

                var SystemLoginList = (from s in dataContext.Employees
                                       where s.Email == obj.Username
                                       select new
                                       {
                                           Employeeid = s.EmployeeID,
                                           Username = s.Email,
                                           Password = s.Passwords,
                                       }).ToList();
                if (SystemLoginList.Any())
                {
                    string encPass = HashPassword(SystemLoginList.First().Password);
                    if (encPass== obj.Password)
                    {
                        response.Message = "Success";
                        response.UserDetails=new { Name = SystemLoginList.First().Username, EmployeeId = SystemLoginList.First().Employeeid };
                    }
                    else
                        response.Message="Invalid Credentials!";
                }
                else
                    response.Message="Invalid Credentials!";
            }
            catch (Exception ex)
            {
                response.Message = ex.Message;
            }
            return response;
        }

        public static string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                StringBuilder builder = new StringBuilder();
                foreach (byte b in bytes)
                {
                    builder.Append(b.ToString("x2"));
                }
                return builder.ToString();
            }
        }

    }
}
