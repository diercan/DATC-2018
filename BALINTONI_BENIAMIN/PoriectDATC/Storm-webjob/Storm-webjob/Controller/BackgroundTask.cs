using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using storm_webjob.Model;
using Newtonsoft.Json;

namespace storm_webjob.Controller
{
    public class BackgroundTask
    {
        public static string _connectionString = "Server=tcp:stormdatc.database.windows.net,1433;Initial Catalog=DATC;Persist Security Info=False;User ID=demo;Password=/Sqladmin;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;";

        public List<DateDePrelucrat> GetInfoDateDePrelucrat()
        {
            SqlConnection DBConn = new SqlConnection(_connectionString);
            SqlCommand getCommand = null;
            SqlDataReader reader;
            List<DateDePrelucrat> dataFromTableDateDePrelucrat = new List<DateDePrelucrat>();
           
                DBConn.Open();
                string getDataFromDateTable = "SELECT * FROM DateDePrelucrat";
                getCommand = new SqlCommand(getDataFromDateTable, DBConn);
                reader = getCommand.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        dataFromTableDateDePrelucrat.Add(new DateDePrelucrat
                        {
                            Zona = Convert.ToInt32(reader["Zona"]),
                            Data = Convert.ToDateTime(reader["Data"]),
                            Temperature = Convert.ToDouble(reader["Temperature"]),
                            Humidity = Convert.ToDouble(reader["Humidity"])
                        });
                    }
                }
            
            //var serializedJson = JsonConvert.SerializeObject(dataFromTableDateDePrelucrat);

            return dataFromTableDateDePrelucrat;
        }
        
        public void DeleteInfoDateDePrelucrat()
        {
            SqlConnection DBConn = new SqlConnection(_connectionString);
            SqlCommand getCommand = null;
            List<DateDePrelucrat> dataFromTable = new List<DateDePrelucrat>();
           
                DBConn.Open();
                string getDataFromDateTable = "DELETE FROM DateDePrelucrat";
                getCommand = new SqlCommand(getDataFromDateTable, DBConn);
                getCommand.ExecuteNonQuery();
           
        }
        
        public List<IntervalDeDate> GetInfoIntervaleDeDate()
        {
            SqlConnection DBConn = new SqlConnection(_connectionString);
            SqlCommand getCommand = null;
            SqlDataReader reader;
            List<IntervalDeDate> dataFromTable = new List<IntervalDeDate>();
           
                DBConn.Open();
                string getDataFromDateTable = "SELECT * FROM IntervalDeDate";
                getCommand = new SqlCommand(getDataFromDateTable, DBConn);
                reader = getCommand.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        dataFromTable.Add(new IntervalDeDate
                        {
                            TemperatureMin = Convert.ToDouble(reader["TemperatureMin"]),
                            TemperatureMax = Convert.ToDouble(reader["TemperatureMax"]),
                            HumidityMin = Convert.ToDouble(reader["HumidityMin"]),
                            HumidityMax = Convert.ToDouble(reader["HumidityMax"])
                        });
                    }
                }
           
           // var serializedJson = JsonConvert.SerializeObject(dataFromTable);

            return dataFromTable;        
        }

        public void DeleteInfoIntervaleDeDate()
        {
            SqlConnection DBConn = new SqlConnection(_connectionString);
            SqlCommand getCommand = null;
            List<IntervalDeDate> dataFromTable = new List<IntervalDeDate>();
            
                DBConn.Open();
                string getDataFromDateTable = "DELETE FROM IntervalDeDate";
                getCommand = new SqlCommand(getDataFromDateTable, DBConn);
                getCommand.ExecuteNonQuery();
            
        }

        public List<Zone> GetInfoZone(int nrZona)
        {
            SqlConnection DBConn = new SqlConnection(_connectionString);
            SqlCommand getCommand = null;
            SqlDataReader reader;
            List<Zone> dataFromTable = new List<Zone>();
            
                DBConn.Open();
                string getDataFromZoneTable = "SELECT * FROM Zone WHERE Zona = " + nrZona;
                getCommand = new SqlCommand(getDataFromZoneTable, DBConn);
                reader = getCommand.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        dataFromTable.Add(new Zone
                        {
                            Zona = Convert.ToInt32(reader["Zona"]),
                            Latitude = Convert.ToDouble(reader["Latitude"]),
                            Longitude = Convert.ToDouble(reader["Longitude"])
                        });
                    }
                }
           
            // var serializedJson = JsonConvert.SerializeObject(dataFromTable);

            return dataFromTable;
        }

        public string GetInfoSenzorStricat(int i, List<IntervalDeDate> ListaIntervale)
        {
            bool senzorTemperaturaStricat = false;
            bool senzorUmiditateStricat = false;

            SqlConnection DBConn = new SqlConnection(_connectionString);
            SqlCommand getCommand = null;
            SqlDataReader reader;
            List<DateDePrelucrat> dataFromTableDateDePrelucrat = new List<DateDePrelucrat>();
            
                DBConn.Open();
                string getDataFromDateTable = "SELECT * FROM DateDePrelucrat WHERE Zona =" + i;
                getCommand = new SqlCommand(getDataFromDateTable, DBConn);
                reader = getCommand.ExecuteReader();
                if (reader.HasRows)
                {
                    while (reader.Read())
                    {
                        dataFromTableDateDePrelucrat.Add(new DateDePrelucrat
                        {
                            Zona = Convert.ToInt32(reader["Zona"]),
                            Data = Convert.ToDateTime(reader["Data"]),
                            Temperature = Convert.ToDouble(reader["Temperature"]),
                            Humidity = Convert.ToDouble(reader["Humidity"])
                        });
                    }
                }
           
            foreach (var item in dataFromTableDateDePrelucrat)
            {
                if (item.Humidity > ListaIntervale[0].HumidityMax || item.Humidity < ListaIntervale[0].HumidityMin)
                {
                    senzorUmiditateStricat = true;
                    break;
                }                    
            }
            foreach (var item in dataFromTableDateDePrelucrat)
            {
                if (item.Temperature > ListaIntervale[0].TemperatureMax || item.Temperature < ListaIntervale[0].TemperatureMin)
                {
                    senzorTemperaturaStricat = true;
                    break;
                }
            }
            if (senzorUmiditateStricat == true && senzorTemperaturaStricat == true)
                return "AmbiiSenzoriStricati";
            else if (senzorUmiditateStricat == true)
                return "SenzorUmiditateStricat";
            else if (senzorTemperaturaStricat == true)
                return "SenzorTemperaturaStricat";
            else
                return "OK";
        }

        public void IrigationLogic()
        {
            SqlConnection DBConn = new SqlConnection(_connectionString);
            SqlCommand getCommand = null;
            SqlDataReader reader;
            List<Date> colectedDataForInsertion = new List<Date>();

            var ListaIntervale = GetInfoIntervaleDeDate();

            
                for (int i = 0; i <= 1; i++)
                {
                    DBConn.Open();
                    double avg_temp = -30;
                    double avg_umidit = 0;
                    DateTime data_masuratoare = DateTime.Now;
                    string NeedWater = String.Empty;
                    
                    string getDataFromDateDePrelucratTable = "SELECT AVG(Temperature) AS avg_temp, AVG(Humidity) AS avg_umidit, max(Data) AS DataMasuratoare FROM DateDePrelucrat WHERE Zona = " + i;
                    getCommand = new SqlCommand(getDataFromDateDePrelucratTable, DBConn);
                    reader = getCommand.ExecuteReader();
                    if (reader.HasRows)
                    {
                        while (reader.Read())
                        {
                            avg_temp = Convert.ToDouble(reader["avg_temp"]);
                            avg_umidit = Convert.ToDouble(reader["avg_umidit"]);
                            data_masuratoare = Convert.ToDateTime(reader["DataMasuratoare"]);
                        }
                    }
                    
                    NeedWater = GetInfoSenzorStricat(i, ListaIntervale);

                    var ListaZone = GetInfoZone(i);
                    if(NeedWater == "OK")
                    {
                        if (avg_umidit < 50)
                        {
                            NeedWater = "YES";
                        }
                        else
                        {
                            NeedWater = "NO";
                        }
                    }
                    colectedDataForInsertion.Add(new Date
                    {
                        Data = data_masuratoare,
                        Lng = ListaZone[0].Longitude,
                        Temperature = avg_temp,
                        Lat = ListaZone[0].Latitude,
                        Humidity = avg_umidit,
                        NeedIrigation = NeedWater
                    });
                    DBConn.Close();
                }
                foreach (var item in colectedDataForInsertion)
                {
                    InsertDataIntoDateTable(item);
                }
                DeleteInfoDateDePrelucrat();
           
        }

        public void InsertDataIntoDateTable(Date item)
        {
            SqlConnection DBConn = null;
            SqlCommand insertCommand = null;
            try
            {
                DBConn = new SqlConnection(_connectionString);
                DBConn.Open();

                var l = item.Lat.ToString().Split(',');
                var L = item.Lng.ToString().Split(',');
                var t = item.Temperature.ToString().Split(',');
                var h = item.Humidity.ToString().Split(',');
                var temperatura = String.Empty;
                var umiditate = String.Empty;
                try
                {
                    temperatura = t[0] + "." + t[1].Substring(0, 2);
                }
                catch
                {
                    try
                    {
                        temperatura = t[0] + "." + t[1].Substring(0, 1);
                    }
                    catch
                    {
                        temperatura = t[0];
                    }
                }

                try
                {
                    umiditate = h[0] + "." + h[1].Substring(0, 2);
                }
                catch
                {
                    try
                    {
                        umiditate = h[0] + "." + h[1].Substring(0, 1);
                    }
                    catch
                    {

                        umiditate = h[0];
                    }
                }

                string insertCmd = string.Format
                        (
                          "INSERT INTO Date VALUES({0},{1},{2},{3},'{4}','{5}')",
                          l[0] + "." + l[1],
                          L[0] + "." + L[1],
                          temperatura,
                          umiditate,
                          item.Data.ToString("yyyy-MM-dd hh:mm:ss"), 
                          item.NeedIrigation.ToString()
                        );
            
                insertCommand = new SqlCommand(insertCmd, DBConn);
                insertCommand.ExecuteNonQuery();
            }
            catch (Exception) { }
            finally
            {
                if (DBConn != null)
                    DBConn.Dispose();
            }
        }        
    }
}
