// using System.Data.SqlClient;
// using System;

// using System.Data;
// using RabbitMQ.Client;
// using RabbitMQ.Client.Events;
// using Microsoft.WindowsAzure.Storage;
// using Microsoft.WindowsAzure.Storage.Auth;
// using Microsoft.WindowsAzure.Storage.Queue;
// using System.Data.SqlTypes;
// using System.Linq;
// using System.Collections.Generic;
// using System.Text;



// namespace backgroundworker
// {

//      class Baza
// {
//    private static void senzori()
       
//            {
//             try 
//             { 
                
//                  var connectionString = @"Server=tcp:sistemirigatii.database.windows.net,1433;Initial Catalog=SistemIrigatiiDb;Persist Security Info=False;User ID={your_username};Password={your_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30";
                
//                 SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder();
//                 builder.DataSource = "sistemirigatii.database.windows.net"; 
//                 builder.UserID = "echipa404";            
//                 builder.Password = "ste5woUnces";     
//                 builder.InitialCatalog = "SistemIrigatiiDb";
//                 SqlConnection connection = new SqlConnection(connectionString);
//                 connection.Open();
                
//                 string sqlCommandTxt =  @"UPDATE sistemirigatii set umiditate=10 where locatie='civic'";
                  
              
//                 var command = new SqlCommand(sqlCommandTxt, connection);
//                 int rowsAffected = command.ExecuteNonQuery();

//                  connection.Close();
//                 // using (SqlConnection connection = new SqlConnection(builder.ConnectionString))
//                 // {
//                 //     Console.WriteLine("\nQuery data example:");
//                 //     Console.WriteLine("=========================================\n");

//                 //     connection.Open();       
//                 //     StringBuilder sb = new StringBuilder();
//                 //     sb.Append("SELECT TOP 20 pc.Name as CategoryName, p.name as ProductName ");
//                 //     sb.Append("FROM [SalesLT].[ProductCategory] pc ");
//                 //     sb.Append("JOIN [SalesLT].[Product] p ");
//                 //     sb.Append("ON pc.productcategoryid = p.productcategoryid;");
//                 //     String sql = sb.ToString();

//                 //     using (SqlCommand command = new SqlCommand(sql, connection))
//                 //     {
//                 //         using (SqlDataReader reader = command.ExecuteReader())
//                 //         {
//                 //             while (reader.Read())
//                 //             {
//                 //                 Console.WriteLine("{0} {1}", reader.GetString(0), reader.GetString(1));
//                 //             }
//                 //         }
//                 //     }                    
//                 // }
//             }
//             catch (SqlException e)
//             {
//                 Console.WriteLine(e.ToString());
//             }
//             Console.ReadLine();
//         }
//     }
// }
