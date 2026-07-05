<?php
include "config.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = md5($_POST['password']);

    $query = mysqli_query($conn, "SELECT * FROM users WHERE email='$email' AND password='$password' LIMIT 1");

    if (mysqli_num_rows($query) == 1) {
        $row = mysqli_fetch_assoc($query);
        $_SESSION['uid']  = $row['id'];
        $_SESSION['user'] = $row['name'];
        header("Location: dashboard.php");
        exit;
    }
    $error = "Invalid Email or Password";
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Login</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-200 flex justify-center items-center h-screen">

<div class="bg-white shadow-lg p-8 rounded w-96">
    <h2 class="text-2xl font-bold text-center mb-5 text-blue-600">Smart IoT Login</h2>

    <?php if(!empty($error)) echo "<p class='text-red-500 text-center mb-3'>$error</p>"; ?>

    <form method="POST">
        <input type="email" name="email" class="w-full border p-2 rounded mb-3" placeholder="Email" required>
        <input type="password" name="password" class="w-full border p-2 rounded mb-3" placeholder="Password" required>
        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">Login</button>
    </form>
    <p class="mt-4 text-center">
        No account? <a href="registration.php" class="text-blue-600 font-semibold">Register</a>
    </p>
</div>
</body>
</html>
