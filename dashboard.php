<?php
include "config.php";
if (!isset($_SESSION['uid'])) { header("Location: index.php"); exit; }
$latest = mysqli_fetch_assoc(mysqli_query($conn, "SELECT * FROM data ORDER BY id DESC LIMIT 1"));
?>
<!DOCTYPE html>
<html>
<head>
<title>Dashboard</title>
<script src="https://cdn.tailwindcss.com"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body class="bg-gray-100">

<div class="bg-blue-600 text-white p-4 flex justify-between">
    <h2 class="text-xl font-semibold">Smart IoT Dashboard</h2>
    <div>
        Logged in as <b><?php echo $_SESSION['user']; ?></b>
        <a href="logout.php" class="bg-red-500 ml-4 px-3 py-1 rounded hover:bg-red-600">Logout</a>
    </div>
</div>

<div class="p-6">
    <!-- LIVE CARDS -->
    <h3 class="text-xl mb-4 font-semibold">Live Readings</h3>
    <div class="grid grid-cols-4 gap-4 mb-6">
        <?php foreach($latest as $key => $val): if($key!='id' && $key!='date' && $key!='time'): ?>
        <div class="bg-white p-4 shadow rounded text-center">
            <p class="text-gray-500 text-sm"><?php echo strtoupper($key); ?></p>
            <p class="text-2xl font-bold text-blue-600"><?php echo $val; ?></p>
        </div>
        <?php endif; endforeach; ?>
    </div>

    <!-- FETCH GRAPH VALUES -->
    <?php
    $rows = mysqli_query($conn, "SELECT tempearture, humidity, soil_moisture, gases, distance, accelerometer, date 
                                 FROM data ORDER BY id DESC LIMIT 30");

    $temperature=[]; $humidity=[]; $soil=[]; $gases=[]; $distance=[];
    $accX=[]; $accY=[]; $accZ=[]; $accIntensity=[]; $dates=[];

    while($r = mysqli_fetch_assoc($rows)){
        $temperature[] = $r['tempearture'];
        $humidity[] = $r['humidity'];
        $soil[] = $r['soil_moisture'];
        $gases[] = $r['gases'];
        $distance[] = $r['distance'];

        list($x,$y,$z) = explode(",", $r['accelerometer']);
        $accX[] = $x;
        $accY[] = $y;
        $accZ[] = $z;
        $accIntensity[] = round(sqrt($x*$x + $y*$y + $z*$z), 2);

        $dates[] = $r['date'];
    }
    ?>

    <!-- MULTI SENSOR CHART -->
    <h3 class="text-xl mb-4 font-semibold">Sensor Trends</h3>
    <canvas id="multiChart" class="bg-white p-4 rounded shadow mb-10"></canvas>

    <!-- ACCELEROMETER CHART -->
    <h3 class="text-xl mb-4 font-semibold">Accelerometer (X / Y / Z / Intensity)</h3>
    <canvas id="accChart" class="bg-white p-4 rounded shadow mb-10"></canvas>

    <script>
        // Multi-Sensor Chart
        new Chart(document.getElementById("multiChart"), {
            type: 'line',
            data: {
                labels: <?php echo json_encode($dates); ?>,
                datasets: [
                    { label: "Temperature (°C)", data: <?php echo json_encode($temperature); ?>, borderWidth: 2 },
                    { label: "Humidity (%)", data: <?php echo json_encode($humidity); ?>, borderWidth: 2 },
                    { label: "Soil Moisture (%)", data: <?php echo json_encode($soil); ?>, borderWidth: 2 },
                    { label: "Gases (ppm)", data: <?php echo json_encode($gases); ?>, borderWidth: 2 },
                    { label: "Distance (cm)", data: <?php echo json_encode($distance); ?>, borderWidth: 2 }
                ]
            },
            options: { responsive: true }
        });

        // Accelerometer Chart
        new Chart(document.getElementById("accChart"), {
            type: 'line',
            data: {
                labels: <?php echo json_encode($dates); ?>,
                datasets: [
                    { label: "ACC X-axis", data: <?php echo json_encode($accX); ?>, borderWidth: 2 },
                    { label: "ACC Y-axis", data: <?php echo json_encode($accY); ?>, borderWidth: 2 },
                    { label: "ACC Z-axis", data: <?php echo json_encode($accZ); ?>, borderWidth: 2 },
                    { label: "Movement Intensity", data: <?php echo json_encode($accIntensity); ?>, borderWidth: 3 }
                ]
            },
            options: {
                responsive: true,
                tension: 0.3
            }
        });
    </script>

    <!-- SENSOR TABLE -->
    <h3 class="text-xl mb-4 font-semibold">Sensor Table</h3>
    <table class="w-full bg-white rounded shadow mb-20 text-sm">
        <tr class="bg-blue-600 text-white">
            <th>#</th><th>Temperature</th><th>Humidity</th><th>Soil Moisture</th><th>Gases</th>
            <th>Rain</th><th>Vibration</th><th>Distance</th><th>Accelerometer</th>
            <th>Time</th><th>Date</th><th>Location</th><th>Action</th>
        </tr>
        <?php
        $data = mysqli_query($conn, "SELECT * FROM data ORDER BY id DESC LIMIT 50");
        $sr=1;
        while($d = mysqli_fetch_assoc($data)){
            echo "<tr class='border-b text-center'>";
            echo "<td>".$sr++."</td>";
            echo "<td>{$d['tempearture']}°C</td>";
            echo "<td>{$d['humidity']}%</td>";
            echo "<td>{$d['soil_moisture']}%</td>";
            echo "<td>{$d['gases']} ppm</td>";
            echo "<td>{$d['rain_status']}</td>";
            echo "<td>{$d['vib_status']}</td>";
            echo "<td>{$d['distance']}cm</td>";
            echo "<td>{$d['accelerometer']}</td>";
            echo "<td>{$d['time']}</td>";
            echo "<td>{$d['date']}</td>";

            $loc = $d['lat'].",".$d['longg'];
            echo "<td>
                    <a href='https://www.google.com/maps?q=$loc' target='_blank' 
                    class='bg-green-600 px-2 py-1 text-white rounded hover:bg-green-700'>
                    View Map</a>
                  </td>";

            echo "<td>
                    <a onclick=\"return confirm('Delete this record?');\" 
                       class='text-red-600 font-bold' href='delete.php?id={$d['id']}'>Delete</a>
                  </td>";
            echo "</tr>";
        }
        ?>
    </table>

</div>
</body>
</html>
