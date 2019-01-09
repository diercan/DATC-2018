package com.example.nitu.test;

import android.graphics.Color;
import android.os.AsyncTask;
import android.os.StrictMode;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.PolygonOptions;
import com.google.android.gms.maps.model.Polygon;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import android.annotation.SuppressLint;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.List;
import java.util.Map;

//AsyncTask<String, String, String>

public class ParkingLot1 extends AppCompatActivity implements OnMapReadyCallback {

    public Connection con;
    private GoogleMap mMap;
    int idLocation;
    LatLng pLot1;
    LatLng pLot2;
    LatLng pLot3;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_parking_lot1);

        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

      String ilie="ceva";
      GetData llo=new GetData();
      ilie=llo.getData();
       Toast.makeText(getApplicationContext(),ilie, Toast.LENGTH_SHORT).show();
       //Log.d("il", ilie);


        setTitle("Car parking");
        idLocation=getIntent().getIntExtra("id", 0);

        if(idLocation==1)
        {
            pLot1=getIntent().getParcelableExtra("parkinglot1");
        }
        else if(idLocation==2){
            pLot2=getIntent().getParcelableExtra("parkinglot2");
        }
        else if(idLocation==3)
        {
            pLot3=getIntent().getParcelableExtra("parkinglot3");
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu){
        MenuInflater inflater = getMenuInflater();
        inflater.inflate(R.menu.map_options, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Change the map type based on the user's selection.
        switch (item.getItemId()) {
            case R.id.normal_map:
                mMap.setMapType(GoogleMap.MAP_TYPE_NORMAL);
                return true;
            case R.id.hybrid_map:
                mMap.setMapType(GoogleMap.MAP_TYPE_HYBRID);
                return true;
            case R.id.satellite_map:
                mMap.setMapType(GoogleMap.MAP_TYPE_SATELLITE);
                return true;
            case R.id.terrain_map:
                mMap.setMapType(GoogleMap.MAP_TYPE_TERRAIN);
                return true;
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        int z=20;

        if(idLocation==1)
        {
            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(pLot1,z));

            double lat, lng;
            lat =  pLot1.latitude;
            lng = pLot1.longitude;

            double x;
            x=0.000130;

            LatLng MyPos1=new LatLng(lat,lng);
            LatLng MyPos2=new LatLng(lat,lng+x);
            LatLng MyPos3=new LatLng(lat+x,lng+x);
            LatLng MyPos4=new LatLng(lat+x,lng);
            LatLng MyPos5=new LatLng(lat-x,lng);
            LatLng MyPos6=new LatLng(lat-x,lng+x);
            LatLng MyPos7=new LatLng(lat,lng-x);
            LatLng MyPos8=new LatLng(lat+x,lng-x);
            LatLng MyPos9=new LatLng(lat-x,lng-x);
            //LatLng MyPos10=new LatLng(lat+x,lng-x);

            Polygon poly1,poly2,poly3,poly4;
            poly1=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos2).add(MyPos3).add(MyPos4).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));
            poly2=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos5).add(MyPos6).add(MyPos2).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));
            poly3=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos7).add(MyPos8).add(MyPos4).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));
            poly4=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos7).add(MyPos9).add(MyPos5).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));

            //poly1.setFillColor(Color.argb(80,255,0,0));
        }
        else if(idLocation==2)
        {
            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(pLot2,z));

            double lat, lng;
            lat =  pLot2.latitude;
            lng = pLot2.longitude;

            double x;
            x=0.000130;

            LatLng MyPos1=new LatLng(lat,lng);
            LatLng MyPos2=new LatLng(lat,lng+x);
            LatLng MyPos3=new LatLng(lat+x,lng+x);
            LatLng MyPos4=new LatLng(lat+x,lng);
            LatLng MyPos5=new LatLng(lat-x,lng);
            LatLng MyPos6=new LatLng(lat-x,lng+x);
            LatLng MyPos7=new LatLng(lat,lng-x);
            LatLng MyPos8=new LatLng(lat+x,lng-x);

            Polygon poly1,poly2,poly3;
            poly1=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos2).add(MyPos3).add(MyPos4).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));
            poly2=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos5).add(MyPos6).add(MyPos2).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));
            poly3=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos7).add(MyPos8).add(MyPos4).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));

            //poly1.setFillColor(Color.argb(80,255,0,0));
        }
        else if(idLocation==3)
        {
            mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(pLot3,z));

            //45.747547, 21.229880

            double lat, lng;
            lat=pLot3.latitude;
            lng=pLot3.longitude;

            double x;
            x=0.000130;

            LatLng MyPos1=new LatLng(lat,lng);
            LatLng MyPos2=new LatLng(lat,lng+x);
            LatLng MyPos3=new LatLng(lat+x,lng+x);
            LatLng MyPos4=new LatLng(lat+x,lng);
            LatLng MyPos5=new LatLng(lat,lng-x);
            LatLng MyPos6=new LatLng(lat+x,lng-x);

            Polygon poly1,poly2;
            poly1=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos2).add(MyPos3).add(MyPos4).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));
            poly2=mMap.addPolygon(new PolygonOptions().add(MyPos1).add(MyPos5).add(MyPos6).add(MyPos4).fillColor(Color.argb(255,255,255,255)).strokeColor(Color.BLACK).strokeWidth(7));
        }
    }
}
