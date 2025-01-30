using Hotel_Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.WebPages;

namespace Hotel_Project
{
    public class genBookCode
    {
        public static string GenerateBookingCode(HOTELEntities databaseContext)
        {
            int SlNo = 0;
            var bookingCode = databaseContext.Bookings.OrderByDescending(z => z.BookingCode).Select(z => z.BookingCode).FirstOrDefault();
            if(bookingCode != null)
            {
                SlNo = Convert.ToInt16(bookingCode.ToString().Substring(11));
                //001
                SlNo++;
            }
            else 
            {
                SlNo++;
            }

            string orderNo = "BOK" + DateTime.Now.ToString("yyyyMMdd").ToString() + SlNo.ToString("D3");
            return orderNo;

        }
    }
}