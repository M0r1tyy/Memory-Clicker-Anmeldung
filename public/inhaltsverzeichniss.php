<?php
    if (session_status() === PHP_SESSION_NONE) {
        session_start();
    }

    if (
        isset($_SESSION["loggedIn"]) == false
        || $_SESSION["loggedIn"] != true
    ) {
        header("Location: /public/login.php");
    }
?>

<html>
<head>
    <link rel="stylesheet" href="/style/styleInhaltsverzeichniss.css">

</head>

<body>
<a href="/bin/logout.php" class="top-btn"> Logout </a>
<div class="container">
    <div class="header"> <h1> - Spiele - </h1></div>
    <div class="main">Hauptspiel</div>
    <div class="undermain">
        <div> <a href="http://localhost:8000/public/memory.html">Memory</a> </div>
        <div> Spiel 2 </div>
    </div>

    <div class="footer"> <a href="statistik.html"> Statistik </a></div>
</div>

 <head>
    <link rel="stylesheet" href="http://localhost:8000/style/panel.css">
  </head>
  
<script src="http://localhost:8000/js/panel.js"></script>
</body>
</html>