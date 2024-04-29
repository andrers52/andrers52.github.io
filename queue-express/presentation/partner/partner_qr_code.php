<script src="/presentation/js/davidshimjs-qrcodejs-04f46c6/qrcode.min.js"></script>
<?php
  include("../../helpers/addr.php");
  include("../../helpers/template.php");
  include("../layout/header.php");
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

  echo '<br/><p style="text-align: center;">' . localize("qr_code_descr", $_SESSION["language"]) . '</p>';

  echo template(
    $_SERVER['DOCUMENT_ROOT'].'/templates/center_card_start.tpl',
    array(
      'title' => localize("qr_code_address", $_SESSION["language"]),
      'error_message' => null
    )
  );


  $address = getServerBaseAddr()
             . '/index.php?name=' 
             . rawurlencode($_SESSION['partnerName']);
  echo "
    <div id='qrcode'></div>
    <script type='text/javascript'>
    new QRCode(document.getElementById('qrcode'),
               '{$address}');
    </script>
  ";

  include("../../templates/center_card_end.php");

  include("../layout/footer.php");
?>
