using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using IrrigationAPI.Models;
using System.Data.Entity;
using System.Collections.Generic;
using System.Linq;

namespace FunctionApp1
{
    public static class Function1
    {
        [FunctionName("Function1")]
        public static void Run([TimerTrigger("0 0 0 * * *")]TimerInfo myTimer, TraceWriter log)
        {

            double tempmin, tempmax, tempavg, umidmin, umidmax, umidavg;
            int count;
            using (IrigationDBEntities1 context = new IrigationDBEntities1())
            {
                //                                         .Include(val => val.Values).Include(val => val.Istorics)
                List<Senzori> senzoriList = context.Senzoris.ToList();
                foreach (Senzori s in senzoriList)
                {
                    tempmin = 100;
                    tempmax = -100;
                    tempavg = 0;
                    umidmin = 100;
                    umidmax = 0;
                    umidavg = 0;
                    List<Value> valuesList = context.Values.Include(val=>val.Senzori).Where(v => v.Id_senzor == s.Id).ToList();
                    valuesList.ForEach(x => x.Senzori = null);
                    count = valuesList.Count;
                    foreach (Value v in valuesList)
                    {
                        tempavg += (double)v.Temperatura;
                        umidavg += (double)v.Umiditate;
                        if (v.Umiditate > umidmax)
                        {
                            umidmax = (double)v.Umiditate;
                        }
                        if (v.Temperatura > tempmax)
                        {
                            tempmax = (double)v.Temperatura;
                        }
                        if (v.Umiditate < umidmin)
                        {
                            umidmin = (double)v.Umiditate;
                        }
                        if (v.Temperatura < tempmin)
                        {
                            tempmin = (double)v.Temperatura;
                        }
                        //delete value 
                        context.Values.Remove(v);
                        context.SaveChanges();
                    }
                    umidavg /= count;
                    tempavg /= count;
                    Istoric istoric = new Istoric();
                    istoric.Id_senzor = s.Id;
                    istoric.MaxTemperatura = tempmax;
                    istoric.MinTemperatura = tempmin;
                    istoric.MedieTemperatura = tempavg;
                    istoric.MaxUmiditate = umidmax;
                    istoric.MaxUmiditate = umidmax;
                    istoric.MedieUmiditate = umidavg;
                    istoric.Data = DateTime.Now.Date;
                    context.Istorics.Add(istoric);
                    context.SaveChanges();
                }
            }
            //log.Info($"C# Timer trigger function executed at: {DateTime.Now}");
        }
    }
}
