using api_worker.Logic.Interfaces;
using api_worker.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace api_worker.Logic.Implementations
{
    public class ParcariLogic : IParcariLogic
    {
        private DatabaseContext dbContext = new DatabaseContext("Data Source=cdr-x-server.database.windows.net;" + "Initial Catalog=CDrXDB;" + "User id=cdrxadmin;" + "Password=cdrxpass1!;");
        private readonly IStareParcariLogic _stareParcariLogic;

        public ParcariLogic()
        {
            _stareParcariLogic = new StareParcariLogic();
        }

        public IEnumerable<ParcariModel> GetParcari()
        {
            var parcari = dbContext.Parcari.Select(s => new ParcariModel
            {
                IdParcare = s.ID_PARCARE,
                LocatieParcare = s.LOCATIE,
                TotalLocuri = s.LOCURI_TOTALE,
                StareLocuri = s.STARE_PARCARE
            }).ToList();

            foreach(var p in parcari)
            {
                p.LocuriDisponibile = _stareParcariLogic.SituatieLocuri(p.StareLocuri, "0");
            }

            return parcari;
        }

        public ParcariModel GetParcare(int id)
        {
            var parcare = dbContext.Parcari.Where(w => w.ID_PARCARE == id).Select(s => new ParcariModel
            {
                IdParcare = s.ID_PARCARE,
                LocatieParcare = s.LOCATIE,
                TotalLocuri = s.LOCURI_TOTALE,
                StareLocuri = s.STARE_PARCARE
            }).SingleOrDefault();

            parcare.LocuriDisponibile = _stareParcariLogic.SituatieLocuri(parcare.StareLocuri, "0");

            return parcare;
        }

        public bool UpdateSituatieParcare(int id, int pozitie, string valoare)
        {
            var parcare = dbContext.Parcari.Where(w => w.ID_PARCARE == id).SingleOrDefault();

            if (parcare == null) return false;

            parcare.STARE_PARCARE = _stareParcariLogic.UpdateSituatieParcare(parcare.STARE_PARCARE, pozitie, valoare);

            dbContext.Entry(parcare).State = EntityState.Modified;
            dbContext.SaveChanges();

            return true;
        }

        public int InsertParcare(ParcariModel parcare)
        {
            var p = new ParcariTableModel
            {
                LOCATIE = parcare.LocatieParcare,
                LOCURI_TOTALE = parcare.TotalLocuri,
                STARE_PARCARE = _stareParcariLogic.GenereazaLocuriAleator(parcare.TotalLocuri)
            };

            dbContext.Parcari.Add(p);
            dbContext.SaveChanges();

            return p.ID_PARCARE;
        }

        public bool StergeParcare(int id)
        {
            var parcare = dbContext.Parcari.Where(w => w.ID_PARCARE == id).SingleOrDefault();

            if (parcare == null) return false;

            dbContext.Parcari.Remove(parcare);
            dbContext.SaveChanges();

            return true;
        }
    }
}