package com.example.nitu.test;

import android.content.Intent;
import android.support.v4.app.FragmentActivity;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.Menu;
import android.view.MenuInflater;
import android.view.MenuItem;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.BitmapDescriptorFactory;
import com.google.android.gms.maps.model.GroundOverlay;
import com.google.android.gms.maps.model.GroundOverlayOptions;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.Marker;
import com.google.android.gms.maps.model.MarkerOptions;
import com.google.android.gms.maps.model.PointOfInterest;


public class MapsActivity extends AppCompatActivity implements OnMapReadyCallback{

    private GoogleMap mMap;

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
        LatLng parkinglot1=new LatLng(45.756822, 21.261240);
        LatLng parkinglot2=new LatLng(45.747547, 21.226232);
        LatLng parkinglot3=new LatLng(45.747547, 21.229880);
        float zoom=15;

        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(parkinglot1,zoom));
        //setMapLongClick(mMap);
        //setPoiClick(mMap);

        //adding an image (a parking in this case) over the map
        GroundOverlayOptions ParkingLotOverlay1 = new GroundOverlayOptions();
        ParkingLotOverlay1.image(BitmapDescriptorFactory.fromResource(R.drawable.parkingsign));
        ParkingLotOverlay1.position(parkinglot1,100);
        mMap.addGroundOverlay(ParkingLotOverlay1);


        //second: 45.747547, 21.226232
        GroundOverlayOptions ParkingLotOverlay2 = new GroundOverlayOptions();
        ParkingLotOverlay2.image(BitmapDescriptorFactory.fromResource(R.drawable.parkingsign));
        ParkingLotOverlay2.position(parkinglot2,100);
        mMap.addGroundOverlay(ParkingLotOverlay2);

        //third: 45.747291, 21.229880
        GroundOverlayOptions ParkingLotOverlay3 = new GroundOverlayOptions();
        ParkingLotOverlay3.image(BitmapDescriptorFactory.fromResource(R.drawable.parkingsign));
        ParkingLotOverlay3.position(parkinglot3,100);
        mMap.addGroundOverlay(ParkingLotOverlay3);

        mMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(LatLng parkinglot1) {
                Intent PL1=new Intent(MapsActivity.this, ParkingLot1.class);
                startActivity(PL1);
            }
        });

        mMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(LatLng parkinglot2) {
                Intent PL2=new Intent(MapsActivity.this, ParkingLot2.class);
                startActivity(PL2);
            }
        });

        mMap.setOnMapClickListener(new GoogleMap.OnMapClickListener() {
            @Override
            public void onMapClick(LatLng parkinglot3) {
                Intent PL3=new Intent(MapsActivity.this, ParkingLot3.class);
                startActivity(PL3);
            }
        });
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
