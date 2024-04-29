<?php
  include("../../helpers/addr.php");
  include("../../db/execute_query.php");
  session_start();
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

  $name = $_POST["name"];
  $email = $_POST["email"];

  // check if username or e-mail are in use
  $sql = "SELECT * FROM partners
          WHERE email = '$email' or name = '$name'";

  $partner = null;
  try {
    $partner = executeQuery($sql)->fetch();
  } catch (Exception $e) {
    $_SESSION["errorMessage"] =
      localize("checking_credentials_error", $_SESSION["language"]);
    redirectToPage("/presentation/authentication/signup.php");
  }

  // ******
  if ($partner) {
    $_SESSION["errorMessage"] =
    localize("name_or_email_already_exists", $_SESSION["language"]);

    redirectToPage("/presentation/authentication/signup.php");
  }

  // create new partner
  $passwordHash = password_hash($_POST["password"], PASSWORD_BCRYPT);
  $partnerCreationQuery = "INSERT INTO partners (name, email, passwordHash)
          VALUES ('$name', '$email', '$passwordHash')";
  $queueCreationQuery = "INSERT INTO queues (partnerName, isActive)
          VALUES ('$name', 0)";

  try {
    executeQuery($partnerCreationQuery);
    executeQuery($queueCreationQuery);

    $_SESSION["partnerName"] = $name;
    $_SESSION["email"] = $email;
    $_SESSION["errorMessage"] = null;
    redirectToPage("/presentation/partner/partner_home.php");
  }
  catch(Exception $e) {
    $_SESSION["errorMessage"] = 
    localize("creating_user_error", $_SESSION["language"]); // $e->getMessage();
    redirectToPage("/presentation/authentication/signup.php");
  }
?>
