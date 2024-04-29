<?php
  // include_once($_SERVER['DOCUMENT_ROOT'] . "/helpers/session_init.php");
  include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");

  include("../layout/header.php");
  include("../../helpers/captcha.php");
  include $_SERVER['DOCUMENT_ROOT']."/helpers/template.php";


  echo template(
    $_SERVER['DOCUMENT_ROOT'].'/templates/center_card_start.tpl',
    array(
      'title' => localize("login", $_SESSION["language"]),
      'error_message' => $_SESSION["errorMessage"]
    )
  );
  
  $_SESSION["errorMessage"] = null;
?>

            <form
              id="loginForm"
              class="container"
              action="login_action.php"
              method="post"
            >
              <div class = "row">
                <div class="input-field col s12">
                  <input id="email" type="email" class="validate" name="email">
                  <label for="email">Email</label>
                </div>
                <div class="input-field col s12">
                  <input id="password" type="password" class="validate" name="password">
                  <label for="password">
                    <?php echo localize("password", $_SESSION["language"])?>
                  </label>
                </div>
              </div>
            </form>
            <?php enableButtonByCaptcha('login-button', 'btn-small waves-effect waves-light orange'); ?>
            <div class="card-action">
              <button
              id='login-button'
              class="btn waves-effect waves-light orange"
              type="submit"
              name="submit"
              value="Submit"
              form="loginForm"
            >
              <?php echo localize("business_login", $_SESSION["language"])?>
            </button>
              <a class="btn waves-effect waves-light orange" href="../../index.php">
                <?php echo localize("back", $_SESSION["language"])?>
              </a>
            </div>
  
  <?php include("../../templates/center_card_end.php"); ?>

  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.0/dist/additional-methods.js"></script>

  <script>

    jQuery.extend(jQuery.validator.messages, {
        required: "<?php echo localize("field_required", $_SESSION["language"])?>",
        minlength: jQuery.validator.format("<?php echo localize("min_size_jquery_validate", $_SESSION["language"])?>"),
        email: "<?php echo localize("invalid_email", $_SESSION["language"])?>",
    })
    //http://demo.geekslabs.com/materialize-v1.0/form-validation.html
    $("#loginForm").validate({
      rules: {
        email: {
          required: true,
          email:true
        },
        password: {
          required: true,
          minlength: 5
        }
      }
      ,
      //For custom messages
      messages: {
        // email:{
        //   email: "invalid e-mail text.",
        // }
      },
      errorElement : 'div',
      errorPlacement: function(error, element) {
        var placement = $(element).data('error');
        if (placement) {
          $(placement).append(error)
        } else {
          error.insertAfter(element);
        }
      }
     });
  </script>

<?php include("../layout/footer.php"); ?>