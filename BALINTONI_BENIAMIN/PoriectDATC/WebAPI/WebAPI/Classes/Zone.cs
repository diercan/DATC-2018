using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    public class Zone
    {
        [JsonProperty("Zona")]
        public int Zona { get; set; }

        [JsonProperty("Latitude")]
        public double Latitude { get; set; }

        [JsonProperty("Longitude")]
        public double Longitude { get; set; }
    }
}