<?php
  include("../../helpers/addr.php");
  include("../layout/header.php");
  include("../layout/top_bar.php");
  include("../../db/queues.php");
  include_once("../../helpers/template.php");
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

  if(!isset($_SESSION["partnerName"])) redirectToPage("/index.php");

  echo template(
    $_SERVER['DOCUMENT_ROOT'].'/templates/center_card_start.tpl',
    array(
      'title' => $_SESSION["partnerName"],
      'error_message' => $_SESSION["errorMessage"]
    )
  );
  
  $_SESSION["errorMessage"] = null;

  $queueIsActive = checkQueueIsActive($_SESSION["partnerName"]);
  $action = $queueIsActive? "deactivateQueue" : "activateQueue";
  $buttonLabel = $queueIsActive?
    localize("deactivate", $_SESSION["language"]) :
    localize("activate", $_SESSION["language"]);
  echo "
    <form
    id='changeQueueActivationForm'
    action='partner_home_action.php'
    method='post'
    >
      <!-- this hidden input serves to send the action throught POST-->
      <input
        type='text'
        name='action'
        style='display: none;'
        value='{$action}'
      />
      <button
        class='btn waves-effect waves-light orange'
        type='submit'
        name='submit'
        value='Submit'
        form='changeQueueActivationForm'
      >
        $buttonLabel
      </button>
    </form>
  ";
  if($queueIsActive) {
    include("queue.php");
  }
  
  include("../../templates/center_card_end.php");

  if($_SESSION['partnerStatusMessage']) {
    echo '<script language="javascript">';
    echo "alert('{$_SESSION['partnerStatusMessage']}')";
    echo '</script>';
    $_SESSION['partnerStatusMessage'] = null;
  }


  include("../layout/footer.php");

?>
