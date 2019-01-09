using Newtonsoft.Json;

namespace WebAPI.Controllers
{
    public class IntervalDeDate
    {
        [JsonProperty("TemperatureMin")]
        public int TemperatureMin { get; set; }

        [JsonProperty("TemperatureMax")]
        public int TemperatureMax { get; set; }

        [JsonProperty("HumidityMin")]
        public int HumidityMin { get; set; }

        [JsonProperty("HumidityMax")]
        public int HumidityMax { get; set; }
    }
}