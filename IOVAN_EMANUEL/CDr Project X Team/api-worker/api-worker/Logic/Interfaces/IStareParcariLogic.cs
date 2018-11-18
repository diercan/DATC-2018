using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api_worker.Logic.Interfaces
{
    public interface IStareParcariLogic
    {
        /// <summary>
        /// Returneaza situatia locurilor dintr-o parcare pe baza starii (un sir de valori separate prin virgula).
        /// </summary>
        /// <param name="stare"></param>
        /// <param name="valoare"></param>
        /// <returns></returns>
        int SituatieLocuri(string stare, string valoare);

        /// <summary>
        /// Updateaza situatia parcarii pe baza pozitiei.
        /// </summary>
        /// <param name="stare"></param>
        /// <param name="pozitie"></param>
        /// <param name="valoare"></param>
        /// <returns></returns>
        string UpdateSituatieParcare(string stare, int pozitie, string valoare);

        /// <summary>
        /// Genereaza aleator valori de 0 sau 1 pentru un numar dat de locuri.
        /// </summary>
        /// <param name="nrLocuri"></param>
        /// <returns></returns>
        string GenereazaLocuriAleator(int nrLocuri);
    }
}
