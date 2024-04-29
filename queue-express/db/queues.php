<?php
  include_once($_SERVER['DOCUMENT_ROOT']."/db/execute_query.php");
  include_once("clients_waiting.php");
  function checkQueueIsActive($ownerName) {
    $sql = "SELECT * FROM queues 
            WHERE partnerName = '$ownerName'";
    $queue = executeQuery($sql)->fetch();
    return $queue['isActive'] == 1;
  }

  function _changeQueueActivation($partnerName, $value) {
    $sql = "UPDATE queues SET isActive=$value WHERE partnerName='{$partnerName}'";
    try {
      executeQuery($sql);
    } catch (Exception $e) {
      throw new Exception(
        "Database error while " 
        . ($value == 1)? "activating" : "deactivating"
        . " queue."
      );
    }
    if($value == 0) {
      // remove all clients from deactivated queue
        removeAllClientsWaitingFromPartner($partnerName);
    }
  }
  
  function activateQueue($partnerName) {
    _changeQueueActivation($partnerName, 1);
  }
  
  
  function deactivateQueue($partnerName) {
    _changeQueueActivation($partnerName, 0);
  }
  
  // returns added client code
  function enterQueue($partnerName) {
    return addClientWaiting($partnerName);
  }

  function leaveQueue($clientCode) {
    removeClientWaiting($clientCode);
  }

  function removeClient($clientCode) {
    removeClientWaiting($clientCode);
  }
    
  function checkClientIsInQueue($clientCode) {
    return checkClientIsWaiting($clientCode);
  }
?>