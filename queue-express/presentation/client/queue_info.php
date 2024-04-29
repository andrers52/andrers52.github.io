<?php
  echo localize("waiting_on_queue", $_SESSION["language"]) 
        . ": {$_GET['name']} &nbsp";
  $partnerToLeaveQueueName = $_GET['name'];
  $leave_msg = localize("leave", $_SESSION["language"]);
  echo "
    <form
      id='leaveQueueForm'
      action='client_home_action.php'
      method='post'>
      <input
        name='action'
        style='display: none;'
        value='leaveQueue'
      />
      <button
        class='btn waves-effect waves-light orange'
        type='submit'
        name='submit'
        value='Submit'
        form='leaveQueueForm'>
          {$leave_msg}
      </button>
    </form>
  ";
?>
