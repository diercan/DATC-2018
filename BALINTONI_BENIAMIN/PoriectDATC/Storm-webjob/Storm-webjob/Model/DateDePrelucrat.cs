using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace storm_webjob.Model
{
    public class DateDePrelucrat
    {
        public int Zona { get; set; }
        
        public DateTime Data { get; set; }
        
        public double Temperature { get; set; }
        
        public double Humidity { get; set; }
    }
}
