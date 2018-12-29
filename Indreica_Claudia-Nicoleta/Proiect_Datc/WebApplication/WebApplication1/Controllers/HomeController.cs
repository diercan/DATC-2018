using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Models;
using System.Data.SqlClient;
using RabbitMQ.Client;

namespace WebApplication1.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            
            int level = database();
            ViewData["Message"] = "Your application description page." + "\nLEVEL:"+level;
            return View();
        }


        public IActionResult HeatMap()
        {
            ViewData["Message"] = "HEAT MAP.";

            return View();
        }
        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public int database()
        {
            //public static SqlConnection sqlConnection;



            var cb = new SqlConnectionStringBuilder();
            cb.DataSource = "irrigation-datc.database.windows.net";
            cb.UserID = "datc";
            cb.Password = "Proiect@2018";
            cb.InitialCatalog = "Irrigation";

            var sqlConnection = new SqlConnection(cb.ConnectionString);

            sqlConnection.Open();

            var command = new SqlCommand(@"SELECT humidity FROM RealTimeValues WHERE parcelName='" + "B" + "';", sqlConnection);
            SqlDataReader sdr = command.ExecuteReader();
            int parcelLevel = 0;
            if (sdr.Read())
            {
                parcelLevel = Convert.ToInt32(sdr[0].ToString());
            }
            sdr.Close();
            return parcelLevel;
        }
    }
}
