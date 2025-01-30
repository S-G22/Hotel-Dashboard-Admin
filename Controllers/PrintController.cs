using CrystalDecisions.CrystalReports.Engine;
using CrystalDecisions.Shared;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Hotel_Project.Models;
using System.Configuration;

namespace Hotel_Project.Controllers
{
    public class PrintController : Controller
    {
        public static byte[] ReadFully(Stream input)
        {
            byte[] buffer = new byte[16 * 1024];
            using (MemoryStream ms = new MemoryStream())
            {
                int read;
                while ((read = input.Read(buffer, 0, buffer.Length)) > 0)
                {
                    ms.Write(buffer, 0, read);
                }
                return ms.ToArray();
            }
        }
        public ActionResult PrintAdmitCard()
        {
            try
            {
                ReportDocument rp = new ReportDocument();
                rp.Load(Server.MapPath("~/Report/CustomerListReport.rpt"));

                HOTELEntities dataContext = new HOTELEntities();
                //SqlConnection connection = new SqlConnection(ConfigurationManager.ConnectionStrings["HOTELEntities"].ConnectionString);
                SqlConnection connection = new SqlConnection(dataContext.Database.Connection.ConnectionString);
                DataSet ds = new DataSet();

                DataTable guestsDataTable = new DataTable("Guests");
                SqlCommand gdt = new SqlCommand("select * from Guests" , connection);
                SqlDataAdapter dataAdapter = new SqlDataAdapter(gdt);
                dataAdapter.Fill(guestsDataTable);
                ds.Tables.Add(guestsDataTable);
                dataAdapter.Dispose();
                gdt.Dispose();

                DataTable bookingDataTable = new DataTable("Booking");
                SqlCommand bdt = new SqlCommand("select * from Booking", connection);
                SqlDataAdapter bookdataAdapter = new SqlDataAdapter(bdt);
                bookdataAdapter.Fill(bookingDataTable);
                ds.Tables.Add(bookingDataTable);
                bookdataAdapter.Dispose();
                bdt.Dispose();

                DataTable bookingGuestsDataTable = new DataTable("BookingGuest");
                SqlCommand bgdt = new SqlCommand("select * from BookingGuest where BookingGuestID >127", connection);
                SqlDataAdapter bgdataAdapter = new SqlDataAdapter(bgdt);
                bgdataAdapter.Fill(bookingGuestsDataTable);
                ds.Tables.Add(bookingGuestsDataTable);
                bgdataAdapter.Dispose();
                bgdt.Dispose();


                rp.SetDataSource(ds);
                Stream ms = rp.ExportToStream(ExportFormatType.PortableDocFormat);
                if (rp != null)
                {
                    rp.Close();
                    rp.Dispose();
                    GC.Collect();
                }
                Response.Clear();
                Response.Buffer = true;
                Response.ContentType = "application/pdf";
                Response.AddHeader("content-length", ms.Length.ToString());
                Response.BinaryWrite(ReadFully(ms));
                Response.End();
            }
            catch (Exception ex)
            {
                ViewBag.Message = ex.Message;
            }
            return View();
        }
    }
}