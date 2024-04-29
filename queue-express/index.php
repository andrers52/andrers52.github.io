<?php
  // entering the init page equals logout
  include("./helpers/session_init.php");
  include("./helpers/captcha.php");
  include("./presentation/layout/header.php");
  include("./presentation/layout/top_bar.php");
  include_once("./localization/localization.php");
?>
 <div class="section no-pad-bot" id="index-banner">
    <div class="container">
      <br><br>
      <h1 class="header center orange-text">
      <?php echo localize("p_name", $_SESSION["language"]) ?>
      </h1>
      <div class="row center">
        <h5 class="header col s12 light">
          <?php echo localize("reserving_easy_text", $_SESSION["language"]) ?>
        </h5>
      </div>
      <div class="row center">
        
        <?php 
          enableButtonByCaptcha('enter-button', 'btn-small waves-effect waves-light orange');
          if( !isset($_SESSION['clientCode']) &&
              isset(($_GET['name']))) {
            $partnerName = urldecode($_GET['name']);
            echo "
              <div style='margin: 10px;'>  
                <form
                  id='enterQueueForm'
                  action='presentation/client/client_home_action.php'
                  method='post'>
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
                      <button
                        id='enter-button'
                        class='btn-large waves-effect waves-light orange'
                        type='submit'
                        name='submit'
                        value='Submit'
                        form='enterQueueForm'
                        style='margin-top: -8px;'>
                        Enter $partnerName
                      </button>
                    </div>
                </form>
              </div>
              <script>
                document.getElementById('autoFormSubmitButton').click()
              </script>
            ";
          } else {
            echo "
              <script>
                function gotoClientHome() { 
                  window.location = 
                  window.location.origin
                    + '/presentation/client/client_home.php'
                }
              </script>
              <button
                id='enter-button'
                onclick='gotoClientHome()'
                class='btn-large waves-effect waves-light orange'>
                Enter
              </button>
            ";
          }
        ?>

      </div>
      <br><br>

    </div>
  </div>


  <div class="container">
    <div class="section">

      <!--   Icon Section   -->
      <div class="row">
        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">smartphone</i></h2>
            <h5 class="center">
              <?php echo localize("convenience_header", $_SESSION["language"]) ?>
            </h5>
            <p class="light">
              <?php echo localize("convenience_text", $_SESSION["language"]) ?>
            </p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">group</i></h2>
            <h5 class="center">
              <?php echo localize("about_you_header", $_SESSION["language"]) ?>
            </h5>
            <p class="light">
            <?php echo localize("about_you_text", $_SESSION["language"]) ?>
            </p>
          </div>
        </div>

        <div class="col s12 m4">
          <div class="icon-block">
            <h2 class="center light-blue-text"><i class="material-icons">access_time</i></h2>
            <h5 class="center">
              <?php echo localize("minimize_time_header", $_SESSION["language"]) ?>
            </h5>

            <p class="light">
              <?php echo localize("minimize_time_text", $_SESSION["language"]) ?>
            </p>
          </div>
        </div>
      </div>

    </div>
    <br><br>
  </div>

  <footer class="page-footer orange">
    <div class="container">
      <div class="row">
        <div class="col l6 s12">
          <h5 class="white-text">
            <?php echo localize("made_by_andre", $_SESSION["language"]) ?>
          </h5>
        </div>
      </div>
    </div>

    <div class="footer-copyright">
      <div class="container">
      </div>
    </div>
  </footer>

  <?php include("./presentation/layout/footer.php"); ?>