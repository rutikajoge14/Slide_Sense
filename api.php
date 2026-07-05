<?php
header("Content-Type: application/json");
date_default_timezone_set("Asia/Kolkata");

include "config.php";   // db connection file

if ($_SERVER['REQUEST_METHOD'] === "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) {
        echo json_encode(["status" => "error", "msg" => "Invalid JSON"]);
        exit;
    }

    $temperature      = $data['tempearture'];
    $humidity         = $data['humidity'];
    $soil             = $data['soil_moisture'];
    $gas              = $data['gases'];
    $rain             = $data['rain_status'];
    $vibration        = $data['vib_status'];
    $distance         = $data['distance'];
    $accelerometer    = $data['accelerometer'];
    $lat              = $data['lat'];
    $long             = $data['longg'];

    $time = date("h:i:s A");
    $date = date("d-m-Y");

    $query = "INSERT INTO data(tempearture, humidity, soil_moisture, gases, rain_status, vib_status, distance, accelerometer, time, date, lat, longg) 
              VALUES ('$temperature','$humidity','$soil','$gas','$rain','$vibration','$distance','$accelerometer','$time','$date','$lat','$long')";

    if (mysqli_query($conn, $query)) {

        // ⭐ EMAIL PORTION START ⭐
        $to = "harshr.meshram@gmail.com";
        $subject = "📡 New IoT Sensor Update • $date $time";

        $message = "
        <html>
        <body style='font-family: Arial, sans-serif; background:#f4f6fa; padding:20px;'>
            <div style='max-width:600px; margin:auto; background:white; padding:20px; border-radius:10px; box-shadow:0 0 12px rgba(0,0,0,0.1);'>
                <h2 style='text-align:center; color:#0052cc;'>🔔 SlideSense Update Received</h2>
                <p style='text-align:center; font-size:14px; margin-bottom:30px;'>Automated data alert from SlideSense IoT Dashboard</p>

                <table style='width:100%; border-collapse:collapse;'>
                    <tr><td><b>Temperature:</b></td><td>$temperature °C</td></tr>
                    <tr><td><b>Humidity:</b></td><td>$humidity %</td></tr>
                    <tr><td><b>Soil Moisture:</b></td><td>$soil %</td></tr>
                    <tr><td><b>Gas Level:</b></td><td>$gas ppm</td></tr>
                    <tr><td><b>Rain Status:</b></td><td>$rain</td></tr>
                    <tr><td><b>Vibration Status:</b></td><td>$vibration</td></tr>
                    <tr><td><b>Distance:</b></td><td>$distance cm</td></tr>
                    <tr><td><b>Accelerometer:</b></td><td>$accelerometer</td></tr>
                </table>

                <hr style='margin:25px 0;'>

                <p><b>📍 Geo Location:</b></p>
                <a href='https://www.google.com/maps?q=$lat,$long' 
                   style='display:inline-block; background:#28a745; color:white; padding:10px 16px; border-radius:6px; text-decoration:none;'>
                   🌍 View on Google Maps
                </a>

                <p style='margin-top:25px; font-size:14px; color:#444;'>⏱ <b>Time:</b> $time<br>📅 <b>Date:</b> $date</p>

                <p style='margin-top:30px; font-size:12px; color:#777; text-align:center;'>
                    Email sent automatically from IoT Cloud • slidesense.ashishvegan.com
                </p>
            </div>
        </body>
        </html>
        ";

        $headers  = "MIME-Version: 1.0\r\n";
        $headers .= "Content-type: text/html; charset=UTF-8\r\n";
        $headers .= "From: SlideSense IoT <slidesense@ashishvegan.com>\r\n";

        mail($to, $subject, $message, $headers);
        // ⭐ EMAIL PORTION END ⭐

        echo json_encode(["status" => "success", "msg" => "Data inserted"]);
    } else {
        echo json_encode(["status" => "error", "msg" => mysqli_error($conn)]);
    }
}
?>
