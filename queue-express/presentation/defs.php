<?php
  include_once($_SERVER['DOCUMENT_ROOT']."/localization/check_acceptable_language.php");

  $CLIENT_BEING_CALLED = 'Being Called.';
  $REFRESH_TIME = 30000;
  $LANGUAGE = prefered_language(); // options: ['dev', prefered_language()]
?>