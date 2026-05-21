<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
    
    $lifetime = 60;
    session_set_cookie_params($lifetime);
}



// if user loggedIn redirect 
if (
    isset($_SESSION["loggedIn"])
    && $_SESSION["loggedIn"] == true
) {
    header("Location: /public/inhaltsverzeichniss.php");
}
?>

<html>

<head>
    <link rel="stylesheet" href="/style/styleLogin.css">
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
            <input type="submit" value="Bestätigen"/>
        </form>
    </div>

    <script src="login.js"></script>

</body>

</html>