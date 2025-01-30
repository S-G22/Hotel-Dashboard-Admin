using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Hotel_Project.Controllers
{
    public class NiceAdminController : Controller
    {
        // GET: NiceAdmin
        public ActionResult Index()
        {
            ViewBag.Title = "Index";
            return View();
        }
        public ActionResult Login()
        {
            ViewBag.Title = "Login";
            return View();
        }

        public ActionResult BookingGuest()
        {
            return View();
        }

        public ActionResult AdditionalService()
        {
            return View();
        }


        public ActionResult AllRoom()
        {
            return View();
        }

        public ActionResult RoomType()
        {
            return View();
        }

        public ActionResult ServiceList()
        {
            return View();
        }


        public ActionResult Customers()
        {
            return View();
        }


        public ActionResult Employee()
        {
            return View();
        }


        public ActionResult Payment()
        {
            return View();
        }


        public ActionResult Invoice()
        {
            return View();
        }

        public ActionResult InvoiceDetail()
        {
            return View();
        }


        public ActionResult ManageBooking()
        {
            return View();
        }


    }
}