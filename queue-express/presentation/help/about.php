<?php
  include("../../helpers/addr.php");
  include("../../helpers/template.php");
  include("../layout/header.php");

  echo template(
    $_SERVER['DOCUMENT_ROOT'].'/templates/center_card_start.tpl',
    array(
      'title' => "About",
      'error_message' => null
    )
  );

  echo "

    <p class='text-paragraph'>
      Queue Express helps you to easily create and manage queues.
      Your customers can find your queue and enter it, by listing or
      direct QR code, using their own cell phones.
    </p>
    <p class='text-paragraph'>
      Once you logged in, or signed up, you can activate your queue,
      making it visible to anyone entering the site,
      call or remove your clients, and deactivate it.
    </p>
    <p class='text-paragraph'>
      To allow your customers to find your queue more easily you can
      create a QR code, by using the appropriate menu option, and 
      expose it to them, so that they can use their phones to enter your
      queue directly, without having to search for it among other queues. 
    </p>

    <div class='card-action'>
    <a class='btn waves-effect waves-light orange' href='../../index.php'>Back</a>
  </div>

  ";


  include("../../templates/center_card_end.php");

  include("../layout/footer.php");
?>
