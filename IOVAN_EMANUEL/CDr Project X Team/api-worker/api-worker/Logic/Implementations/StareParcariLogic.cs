using api_worker.Logic.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;

namespace api_worker.Logic.Implementations
{
    public class StareParcariLogic : IStareParcariLogic
    {
        private static Random _rnd = new Random();

        public int SituatieLocuri(string stare, string val) {
            return Regex.Matches(stare, val).Count;
        }

        public string UpdateSituatieParcare(string stare, int pozitie, string valoare)
        {
            string nouaStare = "";
            string[] arrStari = stare.Split(',');
            arrStari[pozitie] = valoare;

            foreach(var s in arrStari)
            {
                nouaStare += s + ",";
            }

            return nouaStare.Substring(0, nouaStare.Length - 1);
        }

        public string GenereazaLocuriAleator(int nrLocuri)
        {
            string locuri = "";
            for (var i = 0; i < nrLocuri; i++)
            {
                locuri += _rnd.Next(2) + ",";
            }

            return locuri.Substring(0, locuri.Length - 1);
        }
    }
}