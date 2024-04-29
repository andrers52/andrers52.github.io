<?php
  include("../../helpers/addr.php");
  include("../../db/execute_query.php");
  session_start();
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");
  
  //$name = $_POST["name"];
  $email = $_POST["email"];
  $passwordHash = password_hash($_POST["password"], PASSWORD_BCRYPT);
  $sql = "SELECT * FROM partners 
          WHERE email = '$email'";
  
  $partner = null;
  try {
    $partner = executeQuery($sql)->fetch();
  } catch (Exception $e) {
    $_SESSION["errorMessage"] = $e->getMessage();
    // return to login
    redirectToPage("/presentation/authentication/login.php");
  }
  if (
    password_verify($_POST["password"], $partner['passwordHash'])
  ) {

    $_SESSION["partnerName"] = $partner['name'];
    $_SESSION["email"] = $email;
    $_SESSION["errorMessage"] = null;
    redirectToPage("/presentation/partner/partner_home.php");
  }
  else {
    // return to login
    $_SESSION["errorMessage"] = 
      localize("user_or_passwd_incorrect", $_SESSION["language"]);
    redirectToPage("/presentation/authentication/login.php");
  }
?>
