<?php
include("../defs.php");
include("../../helpers/addr.php");
include_once("../../db/clients_waiting.php");
include("../../db/queues.php");
include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");
session_start();


function returnToPartnerHome() {
  unset($_POST['action']);
  redirectToPage("/presentation/partner/partner_home.php");
}

if (!isset($_POST['action']) || !$_POST['action'])
  return;
  try {
    switch ($_POST['action']) {
        case 'activateQueue':
          activateQueue($_SESSION['partnerName']);
          returnToPartnerHome();
          break;
        case 'deactivateQueue':
          deactivateQueue($_SESSION['partnerName']);
          returnToPartnerHome();
          break;
        case 'removeClient':
          // Since we'll remove the client entry, there is no way to add status to
          // her client waiting row. The client will have to deduct this.         
          //writeClientStatus($_POST['clientCode'], 'Removed from queue.');
          removeClient($_POST['clientCode']);
          returnToPartnerHome();
          break;
        case 'callClient':
          writeClientStatus($_POST['clientCode'], $CLIENT_BEING_CALLED);
          returnToPartnerHome();
          break;
    }
  } catch (Exception $e) {
    $_SESSION["errorMessage"] = 
    localize("ocurred_error", $_SESSION["language"]); //$e->getMessage();
  }


?>