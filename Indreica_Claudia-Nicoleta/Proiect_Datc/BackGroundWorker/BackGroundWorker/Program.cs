using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using System;

namespace BackGroundWorker
{
    class Program
    {

        public static object AuthImplicit(string projectId)
        {
            // If you don't specify credentials when constructing the client, the
            // client library will look for credentials in the environment.
            var credential = GoogleCredential.GetApplicationDefault();
            var storage = StorageClient.Create(credential);
            // Make an authenticated API request.
            var buckets = storage.ListBuckets(projectId);
            foreach (var bucket in buckets)
            {
                Console.WriteLine(bucket.Name);
            }
            return null;
        }


        static void Main(string[] args)
        {

            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", @"F:\SCOALA\Facultate\An_4_Sem_1\DATC\LABORATOR\Datc-5dd71698add6.json");
            string value = Environment.GetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS");
            object obj = AuthImplicit("3ab8a4923fd8129d338ac4b3b9214c96c833a4cd");

            /*
                        while (true)
                        {
                            // FetchRandomValues();

                            // CheckHumidityTresholds();

                            //RefreshHeatMap()
                        }*/

            Console.ReadLine();

        }
    }
}
