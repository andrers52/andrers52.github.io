<?php
  function executeQuery($query) {
    try
    {
      $db = new PDO("mysql:host=localhost;dbname=u299246104_qe;charset=utf8mb4", 'u299246104_qe', 'pu299246104_qe');
      $result = $db->query($query);
      return $result;
    } catch(PDOException $ex) {
      throw new Exception("Database error.");
    }
  }
?>