 <?php
 if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == true) {
        header("Location: /public/loginphp");
    }
?>


<html>
<head>
<style>
.container {
    display: grid;
    grid-template-areas:
        "header header"
        "main main"
        "undermain undermain"
        "footer footer";
    background-color: black;
    gap: 1px;
    font-size: xx-large;

}

.container div {
    background-color: white;

}

.header {
    grid-area: header;
    text-align: center;
    font-size: large;
}

.main {
    grid-area: main;
    text-align: center;
    height: 25vh;
}

.undermain {
    display: grid;
    grid-area: undermain;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-items: center;
    height: 25vh;
}

.footer {
    grid-area: footer;
    text-align: center;
    height: 10vh;
}
</style>
</head>

<body>
<a href="login.php" class="top-btn"> Logout </a>
<div class="container">
    <div class="header"> <h1> - Spiele - </h1></div>
    <div class="main">Hauptspiel</div>
    <div class="undermain">
        <div> Spiel 1 </div>
        <div> Spiel 2 </div>
    </div>

    <div class="footer"> <a href="statistik.html"> Statistik </a></div>
</div>

</body>
</html>