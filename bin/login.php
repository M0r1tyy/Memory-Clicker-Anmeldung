<?php
session_start();




if ($_SERVER["REQUEST_METHOD"] != "POST") {
    header("Location: /public/login.php");
    exit;
}



// TODO: chek login and if redirect to inh.html
if (
    isset($_SESSION["loggedIn"])
    && $_SESSION["loggedIn"] == true
) {
    header("Location: /public/inhaltsverzeichniss.php");
}

$email = $_POST["email"] ?? null;
$passwort = $_POST["passwort"] ?? null;

echo ($email);
echo ($passwort);

$rightEmail = "hager@mogic.de";
$rightPasswort = "123";

// die();

if ($email == $rightEmail && $passwort == $rightPasswort) {

    $_SESSION["loggedIn"] = true;
    $_SESSION["email"] = $email;

    header("Location: /public/inhaltsverzeichniss.php");
    exit;

} else {
    // Login falsch
    $_SESSION["loggedIn"] = false;
    header("Location: /public/login.php");
    exit;
}


// build simple login check


// pw and username can be hardcoded

// when login
//  ok => redirect to inhalt

//  not ok => // redirect to login with message

