using api_worker.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace api_worker.Logic.Interfaces
{
    public interface IParcariLogic
    {
        /// <summary>
        /// Returneaza toate parcarile existente.
        /// </summary>
        /// <returns></returns>
        IEnumerable<ParcariModel> GetParcari();

        /// <summary>
        /// Returneaza informatiile despre parcarea data ca si parametru id.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ParcariModel GetParcare(int id);

        /// <summary>
        /// Updateaza parcarea cu id-ul dat, la pozitia data cu valoarea precizata
        /// </summary>
        /// <param name="id"></param>
        /// <param name="pozitie"></param>
        /// <param name="valoare"></param>
        /// <returns>True in cazul in care s-a updatat, si false in caz contrar</returns>
        bool UpdateSituatieParcare(int id, int pozitie, string valoare);

        /// <summary>
        /// Insereaza o noua parcare
        /// </summary>
        /// <param name="parcare"></param>
        /// <returns>ID-ul noii parcari inserate</returns>
        int InsertParcare(ParcariModel parcare);

        /// <summary>
        /// Sterge o parcare
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Tru in cazul in care s-a sters, si false in caz contrar</returns>
        bool StergeParcare(int id);
    }
}
