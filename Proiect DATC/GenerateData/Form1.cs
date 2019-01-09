using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Data.SqlClient;
using GMap.NET.MapProviders;
using GMap;
using GMap.NET;



namespace GenerateData
{
    public partial class Form1 : Form
    {
        public List<PointLatLng> _points;
        public SqlConnection cnn;
        public GMap.NET.WindowsForms.GMapOverlay polygon1s = new GMap.NET.WindowsForms.GMapOverlay();
        public int PARKING_SPOTS_COUNTER = 9;

        public Form1()
        {
            InitializeComponent();
            _points = new List<PointLatLng>();
            set_coordonates();

        }

        public void reload_Parking_Spot_Status()
        {
            for (int i = 0; i < polygon1s.Polygons.Count(); i++)
            {
                string query = "SELECT spotStatus FROM park WHERE spotID = " + i;

                using (SqlCommand command = new SqlCommand(query, cnn))
                    try
                    {
                        //int s = command.ExecuteNonQuery(); //Update
                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                if (Convert.ToBoolean(reader["spotStatus"]) == true) //Ocupat
                                {
                                    polygon1s.Polygons[i].Fill = new SolidBrush(Color.Red);
                                }
                                else
                                {
                                    polygon1s.Polygons[i].Fill = new SolidBrush(Color.GreenYellow);
                                }
                            }
                        }
                    }
                    catch
                    {

                    }
            }
            map.Overlays.Clear();
            map.Overlays.Add(polygon1s);
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            map.DragButton = MouseButtons.Left;
            map.MouseWheelZoomEnabled = true;
            map.MouseWheelZoomType = GMap.NET.MouseWheelZoomType.ViewCenter;
            timer1.Start();
            string connetionString;
            connetionString = @"Data Source=smartparkingupt.database.windows.net;Initial Catalog=smartParking;User ID=;Password=";
            cnn = new SqlConnection(connetionString);
            cnn.Open();
            MessageBox.Show("Connection Open  !");
            map.MapProvider = GMapProviders.GoogleSatelliteMap;
            double lat = 45.7469724380169;
            double longt = 21.2366393208504;

            map.Position = new GMap.NET.PointLatLng(lat, longt);
            map.Zoom = 10;
            map.MinZoom = 5;
            map.MaxZoom = 1000;

            reload_Parking_Spot_Status();

        }


        private void timer1_Tick(object sender, EventArgs e)
        {
            int status = -1;
            Random rnd = new Random();
            int parkingSpot1 = rnd.Next(0, 9);
            string query = "SELECT spotStatus FROM park WHERE spotID = " + parkingSpot1;
            using (SqlCommand command = new SqlCommand(query, cnn))
                try
                {
                    //int s = command.ExecuteNonQuery(); //Update
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            status = Convert.ToInt16(reader["spotStatus"]);
                        }
                    }
                }
                catch
                {

                }

            if (status == 1)
            {
                status = 0;
            }
            else
            {
                status = 1;
            }

            if (status == 1)
                MessageBox.Show("Parking spot nr. " + (parkingSpot1 + 1) + " is now BUSY!");
            else
                MessageBox.Show("Parking spot nr. " + (parkingSpot1 + 1) + " is now AVAILABLE!");


            query = "UPDATE park SET spotStatus = " + status + " WHERE spotID = " + parkingSpot1;
            using (SqlCommand command = new SqlCommand(query, cnn))
                try
                {
                    //int s = command.ExecuteNonQuery(); //Update
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            status = Convert.ToInt16(reader["spotStatus"]);
                        }
                    }
                }
                catch
                {

                }

            reload_Parking_Spot_Status();
        }

        private void map_Load(object sender, EventArgs e)
        {

        }

        private void set_coordonates()
        {
            //Parkin spot 1
            PointLatLng spot1Coord1 = new PointLatLng(45.7470154875921, 21.2366098165512);
            PointLatLng spot1Coord2 = new PointLatLng(45.7470351406479, 21.2366661429405);
            PointLatLng spot1Coord3 = new PointLatLng(45.7470145517321, 21.2366822361946);
            PointLatLng spot1Coord4 = new PointLatLng(45.7469939628086, 21.2366232275963);
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon1 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon1")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s = new GMap.NET.WindowsForms.GMapOverlay("polygon1");
            polygon1s.Polygons.Add(polygon1);
            map.Overlays.Add(polygon1s);

            //Parkins spot 2
            spot1Coord1 = new PointLatLng(45.7469724380169, 21.2366393208504);
            spot1Coord2 = new PointLatLng(45.7469930269483, 21.2366963177919);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon2 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon2")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon2);
            map.Overlays.Add(polygon1s);

            //Parking spot 3
            spot1Coord3 = new PointLatLng(45.746971268191, 21.2367120757699);
            spot1Coord4 = new PointLatLng(45.7469513811474, 21.2366537377238);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon3 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon3")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon3);
            map.Overlays.Add(polygon1s);

            //Parking spot 4
            spot1Coord2 = new PointLatLng(45.7469504452863, 21.2367268279195);
            spot1Coord1 = new PointLatLng(45.7469293884085, 21.2366688251495);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon4 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon4")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon4);
            map.Overlays.Add(polygon1s);

            //Parking Spot 5
            spot1Coord3 = new PointLatLng(45.7469284525471, 21.2367412447929);
            spot1Coord4 = new PointLatLng(45.7469083315228, 21.2366829067469);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon5 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon5")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon5);
            map.Overlays.Add(polygon1s);

            //Parking spot 6
            spot1Coord2 = new PointLatLng(45.746907395661, 21.2367559969425);
            spot1Coord1 = new PointLatLng(45.7468872746291, 21.2366983294487);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon6 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon6")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon6);
            map.Overlays.Add(polygon1s);

            //Parking spot 7
            spot1Coord3 = new PointLatLng(45.7468854029048, 21.2367720901966);
            spot1Coord4 = new PointLatLng(45.746865281865, 21.2367130815983);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon7 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon7")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon7);
            map.Overlays.Add(polygon1s);

            //Parking spot 8
            spot1Coord2 = new PointLatLng(45.7468638780712, 21.2367865070701);
            spot1Coord1 = new PointLatLng(45.7468435230579, 21.236728169024);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon8 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon8")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon8);
            map.Overlays.Add(polygon1s);

            //Parking spot 9
            spot1Coord3 = new PointLatLng(45.7468423532293, 21.2368010915816);
            spot1Coord4 = new PointLatLng(45.7468221151911, 21.2367429211736);
            _points.Clear();
            _points.Add(spot1Coord1);
            _points.Add(spot1Coord2);
            _points.Add(spot1Coord3);
            _points.Add(spot1Coord4);
            var polygon9 = new GMap.NET.WindowsForms.GMapPolygon(_points, "polygon9")
            {
                Stroke = new Pen(Color.DarkBlue, 2),
                Fill = new SolidBrush(Color.BurlyWood)
            };
            polygon1s.Polygons.Add(polygon9);
            map.Overlays.Add(polygon1s);

        }
    }
}

