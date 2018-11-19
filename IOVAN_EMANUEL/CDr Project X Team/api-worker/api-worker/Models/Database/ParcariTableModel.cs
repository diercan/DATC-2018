using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace api_worker.Models
{
    [Table("Parcari")]
    public class ParcariTableModel
    {
        [Key]
        public int ID_PARCARE { get; set; }
        public string LOCATIE { get; set; }
        public int LOCURI_TOTALE { get; set; }
        public string STARE_PARCARE { get; set; }
    }
}