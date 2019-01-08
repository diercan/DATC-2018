using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace storm_webjob.Model
{
    public class IntervalDeDate
    {
        public double TemperatureMin { get; set; }
        
        public double TemperatureMax { get; set; }
        
        public double HumidityMin { get; set; }
        
        public double HumidityMax { get; set; }
    }
}
