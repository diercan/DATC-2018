using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace api_worker.Models
{
    public class ParcariModel
    {
        public int IdParcare { get; set; }
        public string LocatieParcare { get; set; }
        public int TotalLocuri { get; set; }
        public string StareLocuri { get; set; }
        public int LocuriDisponibile { get; set; }
    }
}