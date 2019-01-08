using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Auth;
using Microsoft.WindowsAzure.Storage.Queue;

namespace storm_webjob
{
    public class AsyncronousMessaging
    {
        public static string StorageAccountName = "thestorm";
        public static string StorageAccountKey = "Guc8319cX97GRl2lc8TwDbIX0BYM5eFo6C9jOFm8Xe4ZQMVPB2y6pD7WldyGEV4/cia3lHMzZc5UOGFGjL2mfw==";

        public CloudQueueMessage ReceiveDateDePrelucratIsReady()
        {
            var storageAccount = new CloudStorageAccount(
                new StorageCredentials(StorageAccountName, StorageAccountKey), true);
            var client = storageAccount.CreateCloudQueueClient();
            var queue = client.GetQueueReference("date-de-prelucrat-is-ready");
            queue.CreateIfNotExists();

            var messsageFromDataGenerator = String.Empty;
            while (true)
            {
                var message = queue.GetMessage();
                if (message != null)
                {
                    queue.Clear();
                    return message;
                }
            }            
        }

        public void SendDateDePrelucratIsEmpty(String message)
        {
            var storageAccount = new CloudStorageAccount(
                new StorageCredentials(StorageAccountName, StorageAccountKey), true);
            var client = storageAccount.CreateCloudQueueClient();
            var queue = client.GetQueueReference("date-de-prelucrat-is-empty");
            queue.CreateIfNotExists();

            queue.AddMessage(new CloudQueueMessage(message));
        }
    }
}
