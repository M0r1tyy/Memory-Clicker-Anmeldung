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
<button id="nav-toggle" onclick="toggleNav()">☰</button>
 

<div id="nav-panel">
  <h3>Navigation</h3>
  <a href="http://localhost:8000/public/inhaltsverzeichniss.php">🏠 Startseite</a>
  <a href="http://localhost:8000/public/memory.html">🃏 Memory</a>
  <a href="http://localhost:8000/public/statistik.html">📊 Statistik</a>
</div>
 
<script>
  function toggleNav() {
    const panel = document.getElementById("nav-panel");
    panel.classList.toggle("open");
  }
 
  // aktive seite markieren
  const links = document.querySelectorAll("#nav-panel a");
  links.forEach(link => {
    if (link.href === window.location.href) {
      link.classList.add("aktiv");
    }
  });
 
  // klick außerhalb schließt panel
  document.addEventListener("click", function(e) {
    const panel  = document.getElementById("nav-panel");
    const toggle = document.getElementById("nav-toggle");
    if (!panel.contains(e.target) && !toggle.contains(e.target)) {
      panel.classList.remove("open");
    }
  });
</script>

</body>
</html>