<?php
include("../../helpers/addr.php");
include_once("../../db/clients_waiting.php");
include("../../db/queues.php");
session_start();

include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

function returnToClientHome($partnerName) {
  unset($_POST['action']);
  if($partnerName)
    redirectToPage("/presentation/client/client_home.php?name=" . rawurlencode($partnerName));
  else
    redirectToPage("/presentation/client/client_home.php");
  exit;
}

if (!isset($_POST['action']))
  return;

  switch ($_POST['action']) {
    case 'enterQueue':
      try {
        $_SESSION['clientCode'] = enterQueue($_POST['partnerToEnterQueueName']);
        $_SESSION['clientStatusMessage'] = "";
      } catch (Exception $e) {
        $_SESSION["errorMessage"] =
          localize("enter_queue_error", $_SESSION["language"]); //$e->getMessage();
      }
      returnToClientHome($_POST['partnerToEnterQueueName']);
      break;
    case 'leaveQueue':
      try {
        leaveQueue(
          $_SESSION['clientCode']);
        $_SESSION['clientCode'] = null;
        $_SESSION['clientStatusMessage'] =
          localize("left_queue", $_SESSION["language"]);
      } catch (Exception $e) {
        $_SESSION["errorMessage"] = 
          localize("left_queue_error", $_SESSION["language"]); //$e->getMessage();
      }
      returnToClientHome(null);
      break;
    case 'exit':
      try {
        leaveQueue(
          $_SESSION['clientCode']);
      } catch (Exception $e) {
        $_SESSION["errorMessage"] = 
          localize("left_queue_error", $_SESSION["language"]); //$e->getMessage();
      }
      redirectToPage("/index.php");
      break;
    case 'refreshQueueInfo':
      if(!$_SESSION['clientCode']) {
        echo "{}";
        return;
      }
      try {
        $isClientInQueue = 
          checkClientIsInQueue($_SESSION['clientCode'])?
            'true' : 'false';
        echo "{\"clientInQueue\": {$isClientInQueue}}";
        if($isClientInQueue == 'false') {
          $_SESSION['clientStatusMessage'] = 
            localize("removed_from_queue", $_SESSION["language"]);
          $_SESSION['clientCode'] = null;
          return;
        }
        // check new status set by partner and update corresponding session var
        $clientStatus = readClientStatus($_SESSION['clientCode']);
        if($clientStatus) {
          $_SESSION['clientStatusMessage'] = $clientStatus;
          return;
        }
      } catch (Exception $e) {
        $_SESSION["errorMessage"] = 
          localize("refresh_queue_info_error", $_SESSION["language"]); //$e->getMessage();
      }
      break;
  }

?>