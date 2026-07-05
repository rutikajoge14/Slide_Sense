<?php
include "config.php";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name  = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = md5($_POST['password']);

    $exists = mysqli_query($conn, "SELECT id FROM users WHERE email='$email'");
    if (mysqli_num_rows($exists)) {
        $msg = "<p class='text-red-600 text-center'>Email already exists</p>";
    } else {
        mysqli_query($conn, "INSERT INTO users(name,email,password) VALUES('$name','$email','$password')");
        $msg = "<p class='text-green-600 text-center'>Account created! <a href='index.php' class='text-blue-800'>Login</a></p>";
    }
}
?>
<!DOCTYPE html>
<html>
<head>
<title>Register</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-200 flex justify-center items-center h-screen">

<div class="bg-white shadow-lg p-8 rounded w-96">
    <h2 class="text-2xl font-bold text-center mb-5 text-green-600">User Registration</h2>
    <?php if(!empty($msg)) echo $msg; ?>

    <form method="POST">
        <input type="text" name="name" class="w-full border p-2 rounded mb-3" placeholder="Full Name" required>
        <input type="email" name="email" class="w-full border p-2 rounded mb-3" placeholder="Email" required>
        <input type="password" name="password" class="w-full border p-2 rounded mb-3" placeholder="Password" required>
        <button class="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded">Register</button>
    </form>
</div>
</body>
</html>
