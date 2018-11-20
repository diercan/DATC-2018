using System;
using System.Collections.Generic;
using System.Text;

namespace BackGroundWorker
{
    class Methods
    {
        //Fetch Random Values from Random Data generator  through queues
        public void ReceiveHumidValues()
        {
            // Receive queue from cloud amqp and store in some global variables
        }

        //Fetch pumps status from DataBase through an API
        public void FetchHumidityIntervals()
        {

        }

        //Update pumps status from DataBase through an API
        public void UpdatePumpsStatus()
        {

        }
               
        public void ManageIrrigationPumps()
        {
            FetchHumidityIntervals();

            bool condition = false;

            if (condition)
            {

            }
            else if (!condition)
            {
                UpdatePumpsStatus();
            }
        }
       
        //Make decisions based on fetched data
        public void CheckHumidityTresholds()
        {
            bool condition1 = false;
            bool condition2 = false;
            ReceiveHumidValues();

            if (condition1)
            {

            }
            else if (condition2)
            {
                ManageIrrigationPumps();
            }
        }

        //Update HeatMap if any data changed: area status or pump status
        public void RefreshHeatMap()
        {
            CheckHumidityTresholds();
            bool condition = false;

            if (condition)
            {

            }
            else if (!condition)
            {

            }
        }
    }
}
