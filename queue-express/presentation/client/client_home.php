<?php

  // include_once($_SERVER['DOCUMENT_ROOT'] . "/helpers/session_init.php");
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

  include("../defs.php");
  include("../../helpers/addr.php");
  include("../layout/header.php");
  include("../layout/top_bar.php");
  include $_SERVER['DOCUMENT_ROOT']."/helpers/template.php";

  echo template(
    $_SERVER['DOCUMENT_ROOT'].'/templates/center_card_start.tpl',
    array(
      'title' => localize("client", $_SESSION["language"]),
      'error_message' => $_SESSION["errorMessage"]
    )
  );
  $_SESSION["errorMessage"] = null;

    if(isset($_SESSION['clientStatusMessage'])) {
      $class = ($_SESSION['clientStatusMessage'] == $CLIENT_BEING_CALLED)?
        'pulse' : '';

      echo "
        <div id='statusMessagePlace' class='$class'>
          {$_SESSION['clientStatusMessage']}
        </div>
        <script> 
          window.navigator.vibrate([200, 100, 200, 100, 200, 100, 200, 100, 200])
        </script>
      ";
    }

    if(!isset($_GET['name']))
      include("partners_list.php");
    else
      include("queue_info.php");

  include("../../templates/center_card_end.php");
?>

<script type="text/javascript">
  function refreshInfo() {
    let errorMessageElmt = document.getElementById('errorMessagePlace')
      try {
        $.post(
          'client_home_action.php',
          {action: 'refreshQueueInfo'},
          (result) => {
            resultObj = JSON.parse(result)
            if(!resultObj.clientInQueue) {
              //client has been removed from queue
              window.location = window.location.href.split('?')[0]
              return
            }
            //just refresh
            window.location = window.location.href
          }
        )
      } catch(e) {
        errorMessageElmt.innerText = localize("queue_refresh_error", $_SESSION["language"])
      }
  }

  setInterval(refreshInfo , <?php echo $REFRESH_TIME ?>);
</script>

<?php include("../layout/footer.php"); ?>