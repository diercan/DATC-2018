using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api_worker.Logic.Interfaces
{
    public interface IStareParcariLogic
    {
        int SituatieLocuri(string stare, string valoare);
        string UpdateSituatieParcare(string stare, int pozitie, string valoare);
        string GenereazaLocuriAleator(int nrLocuri);
    }
}
