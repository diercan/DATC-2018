using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace storm_webjob.Model
{
    public class Date
    {
        public double Lat { get; set; }
        
        public double Lng { get; set; }
        
        public double Temperature { get; set; }
        
        public double Humidity { get; set; }
        
        public DateTime Data { get; set; }
        
        public string NeedIrigation { get; set; }
    }
}
