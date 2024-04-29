<?php
  include_once($_SERVER['DOCUMENT_ROOT']."/presentation/defs.php");
  if (session_status() != PHP_SESSION_NONE) {
    session_destroy();
  }
  session_start();
  // initialize $_SESSION super global to avoid needing to test all the time
  $_SESSION["language"]   = $LANGUAGE;
  $_SESSION["clientCode"]   = null;
  $_SESSION["partnerName"]  = null;
  $_SESSION["email"]        = null;
  $_SESSION["errorMessage"] = null;
  $_SESSION['clientStatusMessage'] = null;
  $_SESSION['partnerStatusMessage'] = null;
?>
