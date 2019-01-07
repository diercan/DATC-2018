package com.example.nitu.test;

import android.support.annotation.VisibleForTesting;
import android.util.Log;
import android.widget.Toast;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class GetData {
    Connection connect;
    String ConnectionResult="";
    Boolean isSuccess=false;

    public String getData()
    {
        String data=null;
        //data=new ArrayList<Map<String, String>>();

        try {
            ConnectionHelper connectionHelper = new ConnectionHelper();
            connect = connectionHelper.connections();

            if (connect == null) {
                ConnectionResult = "Check your Internet Access";
            } else {
                String query = "SELECT * FROM Parcare";
                Statement stmt = connect.createStatement();
                ResultSet rs = stmt.executeQuery(query);

                while (rs.next()) {
                    //ap<String, String> datanum = new HashMap<String, String>();
                   // datanum.put("LP", rs.getString("LocParcare"));
                    data = rs.getString("LocParcare");
                  //  Log.d("Loc", LocParcare);
                   // data.add(datanum);
                }
                //Toast.makeText(getApplicationContext(),z,Toast.LENGTH_SHORT);
                ConnectionResult = "query successfull";
                isSuccess = true;
                //Toast.makeText(getApplicationContext(),z,Toast.LENGTH_SHORT);
                connect.close();
            }
        }
        catch(Exception ex)
        {
            isSuccess=false;
            ConnectionResult=ex.getMessage();
            //Toast.makeText(getApplicationContext(),z,Toast.LENGTH_SHORT);

        }
    return data;
        }
    }

