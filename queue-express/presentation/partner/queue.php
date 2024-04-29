<?php 
  include_once("../../db/clients_waiting.php");
  include_once("../defs.php");
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");
?>

<ul id="queue-card" class="collection with-header">
  <li class="collection-header cyan">
    <h4 class="card-title">
      <?php echo localize("queue", $_SESSION["language"]) ?>
    </h4>
  </li>
  <?php
    $codes = getOrderedClientWaitingCodes($_SESSION["partnerName"]);
    if(sizeof($codes) == 0) {
      echo localize("no_clients_waiting", $_SESSION["language"]);
    } else {
      foreach ($codes as $code) {
        // Note: reading status one by one.
        // this should change if performance is of concern...
        $clientStatus = readClientStatus($code);
        $remove_admit_msg = localize("remove_admit", $_SESSION["language"]);
        $call_msg = localize("call", $_SESSION["language"]);
        echo "
          <li class='collection-item'>
            <div>
              $code &nbsp; $clientStatus
              <div class='secondary-content'>
                <div style='display: flex;'>
                <form
                  id='removeClientForm'
                  style='margin-right: 10px'
                  action='partner_home_action.php'
                  method='post'>
                  <input
                    name='clientCode'
                    style='display: none;'
                    value='{$code}'
                  />
                  <input
                    name='action'
                    style='display: none;'
                    value='removeClient'
                  />
                  <button
                    class='btn waves-effect waves-light orange'
                    style='margin-top: -8px;'
                    type='submit'
                    name='submit'
                    value='Submit'
                    form='removeClientForm'>
                      {$remove_admit_msg}
                  </button>
                </form>
                <form
                  id='callClientForm'
                  action='partner_home_action.php'
                  method='post'>
                  <input
                    name='clientCode'
                    style='display: none;'
                    value='{$code}'
                  />
                  <input
                    name='action'
                    style='display: none;'
                    value='callClient'
                  />
                  <button
                    class='btn waves-effect waves-light orange'
                    style='margin-top: -8px;'
                    type='submit'
                    name='submit'
                    value='Submit'
                    form='callClientForm'>
                      {$call_msg}
                  </button>
                </form>
                </div>
              </div>
            </div>
          </li>
        ";
      }
    }
    
  ?>
 
</ul>

<script type="text/javascript">
  setInterval(
    () => window.location = window.location.href, 
    <?php echo $REFRESH_TIME ?>);
</script>