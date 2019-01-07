package com.example.nitu.test;

import android.content.Intent;
import android.os.StrictMode;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;
import android.widget.Toast;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptor;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.GroundOverlay;
import com.google.android.gms.maps.model.GroundOverlayOptions;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PointOfInterest;

import android.annotation.SuppressLint;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


public class MapsActivity extends AppCompatActivity implements OnMapReadyCallback{

    private GoogleMap mMap;
    public  int id;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);


    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
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


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */

    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        LatLng TMcenter= new LatLng(45.752135, 21.228251);

        final LatLng parkinglot1=new LatLng(45.756822, 21.261240);
        final LatLng parkinglot2=new LatLng(45.747547, 21.226232);
        final LatLng parkinglot3=new LatLng(45.747547, 21.229880);
        float zoom=15;

        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(TMcenter,zoom));

        mMap.addMarker(new MarkerOptions()
        .position(parkinglot1)
        .title("Cezar Bolliac")
        .icon(BitmapDescriptorFactory.fromResource(R.drawable.psign)));

        mMap.addMarker(new MarkerOptions()
                .position(parkinglot2)
                .title("UPT")
                .icon(BitmapDescriptorFactory.fromResource(R.drawable.psign)));

        mMap.addMarker(new MarkerOptions()
                .position(parkinglot3)
                .title("UVT")
                .icon(BitmapDescriptorFactory.fromResource(R.drawable.psign)));

       mMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(final LatLng parkinglot) {

                mMap.setOnMarkerClickListener(new GoogleMap.OnMarkerClickListener()
                {
                    @Override
                    public boolean onMarkerClick(Marker marker) {
                        if(marker.getPosition().equals(parkinglot1))
                        {
                            id=1;
                        } else if(marker.getPosition().equals(parkinglot2))
                        {
                            id=2;
                        }
                        else if(marker.getPosition().equals(parkinglot3))
                        {
                            id=3;
                        }

                        Intent PL1=new Intent(MapsActivity.this, ParkingLot1.class);
                        if(id==1) {
                            PL1.putExtra("id", id);
                            Bundle args=new Bundle();
                            args.putParcelable("parkinglot1", parkinglot1);
                            PL1.putExtras(args);
                            startActivity(PL1);
                        } else if(id==2) {
                            PL1.putExtra("id", id);
                            Bundle args=new Bundle();
                            args.putParcelable("parkinglot2", parkinglot2);
                            PL1.putExtras(args);
                            startActivity(PL1);
                        } else if(id==3) {
                            PL1.putExtra("id", id);
                            Bundle args=new Bundle();
                            args.putParcelable("parkinglot3", parkinglot3);
                            PL1.putExtras(args);
                            startActivity(PL1);
                        }

                        return false;
                    }
                });
            }
                        //return false;
            });

              /*  mMap.setOnGroundOverlayClickListener(new GoogleMap.OnGroundOverlayClickListener() {
                    @Override
                    public void onGroundOverlayClick(GroundOverlay groundOverlay) {*/

      //  });
    }

    //function for setting a marker on a long touch on the screen
    //NOT CALLED
    private void setMapLongClick(final GoogleMap map) {
        map.setOnMapLongClickListener(new GoogleMap.OnMapLongClickListener() {
            @Override
            public void onMapLongClick(LatLng latLng) {
                map.addMarker(new MarkerOptions().position(latLng));

            }
        });
    }

    //function for setting a POI=point of interest
    //NOT CALLED
    private void setPoiClick(final GoogleMap map) {
        map.setOnPoiClickListener(new GoogleMap.OnPoiClickListener() {
            @Override
            public void onPoiClick(PointOfInterest poi) {
                Marker poiMarker = mMap.addMarker(new MarkerOptions()
                        .position(poi.latLng)
                        .title(poi.name));

                poiMarker.showInfoWindow();
            }

        });
    }





}
