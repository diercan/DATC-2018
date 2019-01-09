using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using storm_webjob.Controller;
using Microsoft.Azure.WebJobs;
using Microsoft.WindowsAzure.Storage.Queue;

namespace storm_webjob
{
    // To learn more about Microsoft Azure WebJobs SDK, please see https://go.microsoft.com/fwlink/?LinkID=320976
    class Program
    {
        static void Main()
        {
            ExecuteInBackground();
        }

        static void ExecuteInBackground()
        {
            BackgroundTask task = new BackgroundTask();
            //task.IrigationLogic();

            AsyncronousMessaging asyncMsg = new AsyncronousMessaging();
            asyncMsg.SendDateDePrelucratIsEmpty("date-de-prelucrat-is-empty");

            CloudQueueMessage messsageFromDataGenerator = asyncMsg.ReceiveDateDePrelucratIsReady();

            if (messsageFromDataGenerator.AsString == "date-de-prelucrat-is-ready") 
            {
                task.IrigationLogic();
            }

            asyncMsg.SendDateDePrelucratIsEmpty("date-de-prelucrat-is-empty");
        }
    }
}
