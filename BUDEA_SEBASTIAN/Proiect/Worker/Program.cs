using System;
using System.Collections.Generic;
using System.IO.Ports;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;

namespace ConsoleApp1
{
    class Program
    {
        public static void Main()
        {
            int read_id=0;
            string[] rand_ultim = new string[11];
            string[] rand_penultim = new string[11];
            string[] rand_antepenultim = new string[11];
            //string query;
            //string temp;
            string MySQLConnectionString = "datasource=192.168.43.134;port=3306;username=root;password=;database=datc";
            MySqlConnection databaseConnection = new MySqlConnection(MySQLConnectionString);
            MySqlCommand commandDatabase = databaseConnection.CreateCommand();

            //databaseConnection.Open();



            while (true)
            {

                if(last_id() > read_id)
                { 
                    databaseConnection.Open();
                    //commandDatabase.CommandText = "INSERT INTO irrigations (id, temp1, humi1, temp2, humi2, temp3, humi3, temp4, humi4, temp5, humi5, created_at) VALUES (NULL, '" + temps[0] + "', '" + humidity[0] + "', '" + temps[1] + "', '" + humidity[1] + "', '" + temps[2] + "', '" + humidity[2] + "', '" + temps[3] + "', '" + humidity[3] + "', '" + temps[4] + "', '" + humidity[4] + "', CURRENT_TIMESTAMP);";
                    commandDatabase.CommandText = "SELECT * FROM stacks WHERE id = (SELECT max(id)-2 FROM stacks);";
                    //commandDatabase.CommandText = "SELECT * FROM irrigations;";
                    MySqlDataReader myReader2 = commandDatabase.ExecuteReader();
                    myReader2.Read();
                    rand_antepenultim[1] = myReader2["temp1"].ToString();
                    rand_antepenultim[2] = myReader2["humi1"].ToString();
                    rand_antepenultim[3] = myReader2["temp2"].ToString();
                    rand_antepenultim[4] = myReader2["humi2"].ToString();
                    rand_antepenultim[5] = myReader2["temp3"].ToString();
                    rand_antepenultim[6] = myReader2["humi3"].ToString();
                    rand_antepenultim[7] = myReader2["temp4"].ToString();
                    rand_antepenultim[8] = myReader2["humi4"].ToString();
                    rand_antepenultim[9] = myReader2["temp5"].ToString();
                    rand_antepenultim[10] = myReader2["humi5"].ToString();

                    for (int i = 1; i <= 10; i++)
                        Console.WriteLine(rand_antepenultim[i]);

                    Console.WriteLine("");
                    //Console.ReadLine();
                    databaseConnection.Close();

                    //------------------------------------------------------------------

                    databaseConnection.Open();
                    commandDatabase.CommandText = "SELECT * FROM stacks WHERE id = (SELECT max(id)-1 FROM stacks);";
                    //commandDatabase.CommandText = "SELECT * FROM irrigations;";
                    MySqlDataReader myReader1 = commandDatabase.ExecuteReader();
                    myReader1.Read();
                    rand_penultim[1] = myReader1["temp1"].ToString();
                    rand_penultim[2] = myReader1["humi1"].ToString();
                    rand_penultim[3] = myReader1["temp2"].ToString();
                    rand_penultim[4] = myReader1["humi2"].ToString();
                    rand_penultim[5] = myReader1["temp3"].ToString();
                    rand_penultim[6] = myReader1["humi3"].ToString();
                    rand_penultim[7] = myReader1["temp4"].ToString();
                    rand_penultim[8] = myReader1["humi4"].ToString();
                    rand_penultim[9] = myReader1["temp5"].ToString();
                    rand_penultim[10] = myReader1["humi5"].ToString();

                    for (int i = 1; i <= 10; i++)
                        Console.WriteLine(rand_penultim[i]);

                    Console.WriteLine("");
                    //Console.ReadLine();
                    databaseConnection.Close();

                    //------------------------------------------------------------------

                    databaseConnection.Open();
                    commandDatabase.CommandText = "SELECT * FROM stacks WHERE id = (SELECT max(id) FROM stacks);";
                    //commandDatabase.CommandText = "SELECT * FROM irrigations;";
                    MySqlDataReader myReader = commandDatabase.ExecuteReader();
                    myReader.Read();
                    rand_ultim[1] = myReader["temp1"].ToString();
                    rand_ultim[2] = myReader["humi1"].ToString();
                    rand_ultim[3] = myReader["temp2"].ToString();
                    rand_ultim[4] = myReader["humi2"].ToString();
                    rand_ultim[5] = myReader["temp3"].ToString();
                    rand_ultim[6] = myReader["humi3"].ToString();
                    rand_ultim[7] = myReader["temp4"].ToString();
                    rand_ultim[8] = myReader["humi4"].ToString();
                    rand_ultim[9] = myReader["temp5"].ToString();
                    rand_ultim[10] = myReader["humi5"].ToString();

                    for (int i = 1; i <= 10; i++)
                        Console.WriteLine(rand_ultim[i]);

                    Console.WriteLine("\n");
                    read_id = Convert.ToInt32(myReader["id"]);
                    Console.WriteLine(read_id);

                    Console.WriteLine("\n");
                    //Console.ReadLine();
                    databaseConnection.Close();


                    for (int i = 1; i <= 10; i++)
                        if ((Convert.ToInt32(rand_ultim[i]) > Convert.ToInt32(rand_penultim[i]) + 5) || (Convert.ToInt32(rand_ultim[i]) < Convert.ToInt32(rand_penultim[i]) - 5))
                            //picat  ->  corectare
                            rand_ultim[i] = rand_penultim[i];
                        else if ((Convert.ToInt32(rand_ultim[i]) > Convert.ToInt32(rand_antepenultim[i]) + 5) || (Convert.ToInt32(rand_ultim[i]) < Convert.ToInt32(rand_antepenultim[i]) - 5))
                            //picat  ->  corectare
                            rand_ultim[i] = rand_antepenultim[i];
                        else
                        {
                            //scrie in baza de date tabela irigatii
                            insert_into_irigatii(rand_ultim);
                        }



                }
                    /*
                    databaseConnection.Open();
                    query = "INSERT INTO irrigations (id, temp1, humi1, temp2, humi2, temp3, humi3, temp4, humi4, temp5, humi5, created_at) VALUES (NULL, '" + temps[0] + "', '" + humidity[0] + "', '" + temps[1] + "', '" + humidity[1] + "', '" + temps[2] + "', '" + humidity[2] + "', '" + temps[3] + "', '" + humidity[3] + "', '" + temps[4] + "', '" + humidity[4] + "', CURRENT_TIMESTAMP);";
                    MySqlCommand commandDatabase = new MySqlCommand(query, databaseConnection);
                    commandDatabase.CommandTimeout = 60;
                    MySqlDataReader myReader = commandDatabase.ExecuteReader();
                    databaseConnection.Close();
                    */
                //}
                
            }
        }

        static int last_id()
        {
            int id;
            string MySQLConnectionString = "datasource=192.168.43.134;port=3306;username=root;password=;database=datc";
            MySqlConnection databaseConnection = new MySqlConnection(MySQLConnectionString);
            MySqlCommand commandDatabase = databaseConnection.CreateCommand();

            databaseConnection.Open();
            commandDatabase.CommandText = "SELECT * FROM stacks WHERE id = (SELECT max(id) FROM stacks);";
            //commandDatabase.CommandText = "SELECT * FROM irrigations;";
            MySqlDataReader myReader = commandDatabase.ExecuteReader();
            myReader.Read();
            id = Convert.ToInt32(myReader["id"]);
            databaseConnection.Close();

            return (id);
        }

        static void insert_into_irigatii(string[] rand_ultim)
        {
            string MySQLConnectionString = "datasource=192.168.43.134;port=3306;username=root;password=;database=datc";
            MySqlConnection databaseConnection = new MySqlConnection(MySQLConnectionString);
            MySqlCommand commandDatabase = databaseConnection.CreateCommand();

            databaseConnection.Open();
            commandDatabase.CommandText = "INSERT INTO irrigations (id, temp1, humi1, temp2, humi2, temp3, humi3, temp4, humi4, temp5, humi5, created_at) VALUES (NULL, '" + rand_ultim[1] + "', '" + rand_ultim[2] + "', '" + rand_ultim[3] + "', '" + rand_ultim[4] + "', '" + rand_ultim[5] + "', '" + rand_ultim[6] + "', '" + rand_ultim[7] + "', '" + rand_ultim[8] + "', '" + rand_ultim[9] + "', '" + rand_ultim[10] + "', CURRENT_TIMESTAMP);";
            //commandDatabase.CommandText = "INSERT INTO irrigations (id, temp1, humi1, temp2, humi2, temp3, humi3, temp4, humi4, temp5, humi5, created_at) VALUES (NULL, '33', '22', '33', '22', '33', '22', '33', '22', '33', '22', CURRENT_TIMESTAMP);";
            commandDatabase.ExecuteNonQuery();
            databaseConnection.Close();
        }

    }
}

