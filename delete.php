<?php
include "config.php";
if (!isset($_SESSION['uid'])) { header("Location: index.php"); exit; }
if(isset($_GET['id'])) { mysqli_query($conn, "DELETE FROM data WHERE id=".(int)$_GET['id']); }
header("Location: dashboard.php");
?>
