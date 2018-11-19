using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace api_worker.Models
{
    public class DatabaseContext : DbContext
    {
        public DbSet<ParcariTableModel> Parcari { get; set; }

        public DatabaseContext(string conn) : base(conn) { }
        public DatabaseContext() : base() { }
    }
}