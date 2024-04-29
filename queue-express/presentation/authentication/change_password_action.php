<?php
  include("../../helpers/addr.php");
  include("../../db/execute_query.php");
  session_start();
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

  $partnerName = $_SESSION["partnerName"];

  // change password
  $passwordHash = password_hash($_POST["password"], PASSWORD_BCRYPT);
  $partnerPasswordChangeQuery = "
    UPDATE partners SET passwordHash='{$passwordHash}'
    WHERE name = '{$partnerName}'
  ";

  try {
    executeQuery($partnerPasswordChangeQuery);
    $_SESSION['partnerStatusMessage'] = 
      localize("passwd_changed", $_SESSION["language"]);
  }
  catch(Exception $e) {
    $_SESSION["errorMessage"] =
      localize("passwd_changed_error", $_SESSION["language"]);
  }
  redirectToPage("/presentation/partner/partner_home.php");
?>
