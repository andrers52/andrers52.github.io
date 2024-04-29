<?php
ob_start();
function getServerBaseAddr() {
  $portStr = isset($_SERVER['SERVER_PORT'])? ":{$_SERVER['SERVER_PORT']}" : "";
  $protocol = isset($_SERVER['HTTPS'])? "https" : "http";
  return $protocol . "://" . $_SERVER['SERVER_NAME'] . $portStr;
}

function redirectToPage($page) {
  header(
    "Location: "
    . getServerBaseAddr()
    . $page
  );
  ob_end_flush();
}

?>