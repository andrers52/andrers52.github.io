<?php
  // include_once($_SERVER['DOCUMENT_ROOT'] . "/helpers/session_init.php");
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");
  include("../../db/partners.php");
?>
<ul id="queue-card" class="collection with-header">
  <li class="collection-header cyan">
    <h4 class="card-title">
      <?php echo localize("queues", $_SESSION["language"])?>
    </h4>
  </li>
  <?php
    $partnerNames = getOrderedPartnerNamesWithActiveQueues();
    $enterMsg = localize("enter", $_SESSION["language"]);
    if(sizeof($partnerNames) == 0) {
      echo localize("no_available_queues", $_SESSION["language"]);
    } else {
      foreach ($partnerNames as $key=>$partnerName) {
        echo "
          <form
            id='enterQueueForm_{$key}'
            action='client_home_action.php'
            method='post'>
            <li class='collection-item'>

              <!-- these hidden inputs serve to send the action throught POST-->
              <input
                type='text'
                name='action'
                style='display: none;'
                value='enterQueue'
              />
              <input
                type='text'
                name='partnerToEnterQueueName'
                style='display: none;'
                value='{$partnerName}'
              />

              <div>
                $partnerName
                <button
                  class='btn secondary-content  waves-effect waves-light orange'
                  type='submit'
                  name='submit'
                  value='Submit'
                  form='enterQueueForm_{$key}'
                  style='margin-top: -8px;'>
                  {$enterMsg}
                </button>
              </div>
            </li>
          </form>
        ";
      }
    }
    
  ?>
 
</ul>
