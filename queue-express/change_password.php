<?php
include("../layout/header.php");
include $_SERVER['DOCUMENT_ROOT']."/helpers/template.php";
include_once($_SERVER['DOCUMENT_ROOT'] . "/localization/localization.php");


  echo template(
    $_SERVER['DOCUMENT_ROOT'].'/templates/center_card_start.tpl',
    array(
      'title' => localize("change_password", $_SESSION["language"]),
      'error_message' => $_SESSION["errorMessage"]
    )
  );
  
  $_SESSION["errorMessage"] = null;
?>

            <form
              id="changePasswordForm"
              class="container"
              action="change_password_action.php"
              method="post"
            >
              <div class = "row">
                <div class="input-field col s12">
                  <input id="password" type="password" class="validate" name="password">
                  <label for="password">New Password</label>
                </div>
                <div class="input-field col s12">
                  <input id="passwordConfirm" type="password" class="validate" name="passwordConfirm">
                  <label
                    for="passwordConfirm" 
                    data-error="Passwords do not match">
                    Confirm password
                  </label>
                </div>
              </div>
            </form>
            <div class="card-action">
              <button
              class="btn waves-effect waves-light orange"
              type="submit"
              name="submit"
              value="Submit"
              form="changePasswordForm"
              >
                Submit
              </button>
              <a class="btn waves-effect waves-light orange" href="../../index.php">Back</a>
            </div>
  
  <?php include("../../templates/center_card_end.php"); ?>

  <!--  Scripts-->
  <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.0/dist/jquery.validate.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.0/dist/additional-methods.js"></script>

  <script>
    //http://demo.geekslabs.com/materialize-v1.0/form-validation.html
    $("#changePasswordForm").validate({
      rules: {
        password: {
          required: true,
          minlength: 5
        },
        passwordConfirm: {
          required: true,
          minlength: 5,
          equalTo: "#password"
        }
      }
      ,
      //For custom messages
      messages: {
        name:{
          required: "Enter a username",
          minlength: "Enter at least 5 characters"
        },
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