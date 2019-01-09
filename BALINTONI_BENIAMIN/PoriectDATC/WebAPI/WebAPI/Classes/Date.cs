using Newtonsoft.Json;
using System;

namespace WebAPI.Controllers
{
    public class Date
    {
        [JsonProperty("Latitude")]
        public double Latitude { get; set; }

        [JsonProperty("Longitude")]
        public double Longitude { get; set; }

        [JsonProperty("Temperature")]
        public double Temperature { get; set; }

        [JsonProperty("Humidity")]
        public double Humidity { get; set; }

        [JsonProperty("Data")]
        public DateTime Data { get; set; }

        [JsonProperty("NeedIrigation")]
        public string NeedIrigation { get; set; }
    }
}