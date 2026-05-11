<?php
    // if user loggedIn redirect 
    if (isset($_SESSION["loggedIn"]) && $_SESSION["loggedIn"] == true) {
        header("Location: /public/inhaltsverzeichniss.php");
    }
?>

<html>

<head>
    <link rel="stylesheet" href="/style/style.css">
    <title>Hager games</title>
</head>

<body>



    <h1>LOGIN</h1>
    <div class="container">
        <form id="login" method="POST" action="/bin/login.php">
            <input name="email" id="email" type="email" placeholder="Email">
            <br><br>
            <input name="passwort" id="passwort" type="password" placeholder="Passwort">
            <br><br>
            <input type="submit" value="Bestätigen" />
            <!-- <button type="submit">Bestätigen</button> -->
        </form>
    </div>

    <script src="login.js"></script>

</body>

</html>