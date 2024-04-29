<?php
  if (session_status() == PHP_SESSION_NONE) {
    session_start();
  }
  // include_once($_SERVER['DOCUMENT_ROOT'] . "/helpers/session_init.php");
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0"/>
  <meta property="og:image" content="/presentation/img/screenshot.png" />        
  <link rel="image_src" href="/presentation/img/screenshot.png" />

  <title>
    <?php echo localize("p_name", $_SESSION["language"])?>
  </title>

  <!-- CSS  -->
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link href="/presentation/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection"/>
  <link href="/presentation/css/style.css" type="text/css" rel="stylesheet" media="screen,projection"/>
</head>
<body>
<?php // *** DEBUG *** print_r($_SESSION); ?>


