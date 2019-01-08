using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    public class DateDePrelucrat
    {
        [JsonProperty("Field")]
        public int Field { get; set; }

        [JsonProperty("Date_Time")]
        public string Date_Time { get; set; }

        [JsonProperty("Temperature")]
        public double Temperature { get; set; }

        [JsonProperty("Humidity")]
        public double Humidity { get; set; }

    }
}