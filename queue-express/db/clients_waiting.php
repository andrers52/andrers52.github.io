<?php
include_once($_SERVER['DOCUMENT_ROOT']."/db/execute_query.php");
// return the codes of the clients waiting on the queue
// ordered (came first -> apears first)
function getOrderedClientWaitingCodes($ownerName) {
    $sql = "SELECT code FROM clientsWaiting 
            WHERE partnerName = '$ownerName'
            ORDER BY enteringTimeStamp ASC";
    return executeQuery($sql)->fetchAll(PDO::FETCH_COLUMN, 0);
}

function removeAllClientsWaitingFromPartner($partnerName) {
  $sql = "DELETE FROM clientsWaiting where partnerName='{$partnerName}'";
  try{
    executeQuery($sql);
  } catch (Exception $e) {
    throw new Exception("Database error while removing clients from deactivated queue.");
  }
}

function _getCodeOfLatestClientInserted($partnerName) {
  $addClient = "SELECT code FROM clientsWaiting 
            ORDER BY code DESC LIMIT 1";
  $row = executeQuery($addClient)->fetch();
  return $row['code'];
}

function addClientWaiting($partnerName) {
  // create client on clientsWaiting table
  $clientsWaitingQuery = 
    "INSERT INTO clientsWaiting (partnerName) 
     VALUES ('$partnerName')";
  executeQuery($clientsWaitingQuery);
  return _getCodeOfLatestClientInserted($partnerName);
}

function removeClientWaiting($clientCode) {
  // remove client on clientsWaiting table
  $removeclientWaitingQuery = 
    "DELETE FROM clientsWaiting
     WHERE code = $clientCode";
  executeQuery($removeclientWaitingQuery);
}

function checkClientIsWaiting($clientCode) {
  $sql = "SELECT * FROM clientsWaiting 
  WHERE code = $clientCode";
  $queue = executeQuery($sql)->fetch();
  return !!$queue;
}

// *** STATUS ***
function writeClientStatus($clientCode, $status) {
  $sql = "UPDATE clientsWaiting SET status='{$status}'
          WHERE code = $clientCode";
  try {
    executeQuery($sql);
  } catch (Exception $e) {
    throw new Exception("Database error while setting client status.");
  }
}

function readClientStatus($clientCode) {
  $sql = "SELECT * FROM clientsWaiting
          WHERE code = $clientCode";
  try {
    $client = executeQuery($sql)->fetch();
      return $client['status'];
    } catch (Exception $e) {
    throw new Exception("Database error while reading client status.");
  }
}

function clearClientStatus($clientCode) {
  writeClientStatus($clientCode, "");
}


?>

