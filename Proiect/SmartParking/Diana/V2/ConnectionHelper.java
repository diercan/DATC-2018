package com.example.nitu.test;

import android.annotation.SuppressLint;
import android.os.StrictMode;
import android.util.Log;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnectionHelper {
    @SuppressLint("NewApi")
    public Connection connections()
    {
        StrictMode.ThreadPolicy policy=new StrictMode.ThreadPolicy.Builder().permitAll().build();
        StrictMode.setThreadPolicy(policy);
        Connection connection=null;
        String ConnectionURL=null;
        try
        {
            Class.forName("net.sourceforge.jtds.jdbc.Driver");
            ConnectionURL="jdbc:jtds:sqlserver://serverparcare.database.windows.net:1433;DatabaseName=Parcare;user=azureuser@serverparcare;password=Azure1234567;encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";
            connection = DriverManager.getConnection(ConnectionURL);
            Log.d("bun", "E bn");
        }
        catch (SQLException se)
        {
            Log.e("error here 1", se.getMessage());
        }
        catch (ClassNotFoundException e)
        {
            Log.e("error here 2", e.getMessage());
        }
        catch (Exception e)
        {
            Log.e("error here 3", e.getMessage());
        }
        return  connection;
    }
}
