  <?php

    // include_once($_SERVER['DOCUMENT_ROOT'] . "/helpers/session_init.php");
    include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

    function generateLinks() {
      $login_text = localize("login", $_SESSION["language"]);
      $sign_up_text = localize("sign_up", $_SESSION["language"]);
      $about_text = localize("about", $_SESSION["language"]);
      if(!isset($_SESSION["partnerName"]) && basename($_SERVER['PHP_SELF']) == 'index.php') {
        echo "<li>
                <a href='/presentation/authentication/login.php'>
                  {$login_text}
                </a>
              </li>";
        echo "<li>
                <a href='/presentation/authentication/signup.php'>
                  {$sign_up_text}
                </a>
              </li>";
        echo "<li>
                <a href='/presentation/help/about.php'>
                  {$about_text}
                </a>
              </li>";
      }

      if(!isset($_SESSION["partnerName"]) && basename($_SERVER['PHP_SELF']) != 'index.php') {
        echo '<li>
                <a href="/index.php" onclick="clientExit()">'
              .
                localize("exit", $_SESSION["language"])
              .
                '</a>
              </li>';
      };

      if(isset($_SESSION["partnerName"])) {
        echo '<li>
                <a href="/presentation/authentication/change_password.php">'
              .
                  localize("change_password", $_SESSION["language"])
              .
              ' </a>
              </li>';
        echo '<li>
                <a href="/presentation/partner/partner_qr_code.php" target="blank">'
              .
                  localize("generate_QR_code", $_SESSION["language"])
              .
              ' </a>
              </li>';
        echo '<li>
                <a href="/index.php">'
                .
                    localize("logout", $_SESSION["language"])
                .
                ' </a>
              </li>';
      }
    }
  ?>

  <nav class="light-blue lighten-1" role="navigation">
    <div class="nav-wrapper container">
      <a id="logo-container" href="#" class="brand-logo">
        <?php echo localize("p_name", $_SESSION["language"])?>
      </a>
      <ul class="right hide-on-med-and-down">
        <?php
          generateLinks();
        ?>
      </ul>
      <ul class="right">
        <?php
          if(isset($_SESSION["partnerName"])) {
            echo "<li> {$_SESSION['partnerName']} </li>";
          }
        ?>
      </ul>

      <ul id="nav-mobile" class="sidenav">
        <?php
          generateLinks();
        ?>
      </ul>
      <a href="#" data-target="nav-mobile" class="sidenav-trigger"><i class="material-icons">menu</i></a>
    </div>
  </nav>

  <script>
    function clientExit() {
      $.post(
        '/presentation/client/client_home_action.php',
        {action: 'exit'},
        (result) => {}
      )
    }
  </script>
