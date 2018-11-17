using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace generator_parcare
{
    public partial class Form1 : Form
    {
        private SqlConnection _conn = new SqlConnection();
        private static Random _rnd = new Random();
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {            
            _conn.ConnectionString = "Data Source=cdr-x-server.database.windows.net;" + "Initial Catalog=CDrXDB;" + "User id=cdrxadmin;" + "Password=cdrxpass1!;";            
        }

        private void btn_generare_Click(object sender, EventArgs e)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "INSERT Parcari (LOCATIE, LOCURI_TOTALE, STARE_PARCARE) VALUES ('" + txt_locatie.Text + "', " + nr_total_locuri.Value + ", '" + this.GenereazaLocuriAleator(Convert.ToInt16(nr_total_locuri.Value)) + "')";
            cmd.Connection = _conn;
            _conn.Open();
            cmd.ExecuteNonQuery();
            _conn.Close();
        }

        private void btn_update_locuri_Click(object sender, EventArgs e)
        {
            SqlCommand cmd = new SqlCommand();
            cmd.CommandType = System.Data.CommandType.Text;
            cmd.CommandText = "UPDATE Parcari SET STARE_PARCARE = '" + this.GenereazaLocuriAleator(Convert.ToInt16(nr_total_locuri_regenerare.Value)) + "' WHERE ID_PARCARE = " + txt_id_parcare.Text;
            cmd.Connection = _conn;
            _conn.Open();
            cmd.ExecuteNonQuery();
            _conn.Close();
        }

        private string GenereazaLocuriAleator(int nr_locuri)
        {
            string locuri = "";
            for (var i = 0; i < nr_locuri; i++) {
                locuri += _rnd.Next(2) + ",";
            }
            
            return locuri.Substring(0, locuri.Length - 1); ;
        }
    }
}
