<?php
  include_once($_SERVER['DOCUMENT_ROOT']."/db/execute_query.php");
// return the codes of the clients waiting on the queue
// ordered (came first -> apears first)
function getOrderedPartnerNamesWithActiveQueues() {
    $sql = "SELECT queues.partnerName 
            FROM queues as queues
            WHERE queues.isActive = 1
            ORDER BY queues.partnerName";
    return executeQuery($sql)->fetchAll(PDO::FETCH_COLUMN, 0);
}

?>

