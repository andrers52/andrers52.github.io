<?php
  function enableButtonByCaptcha($buttonId, $buttonClass) {

    // if in development mode do not chalenge with captcha
    if(isset($_SESSION['language']) && $_SESSION['language'] == 'dev') {
      $initialDisable = 'false';
    } else $initialDisable = 'true';

    echo "
      <div style='display: flex; flex-direction: row; align-items: center; justify-content: center;'>
        <span id='question'></span> &nbsp;&nbsp;&nbsp;
        <input id='inputAnswer' type='text' style='width: 50px; text-align: center;' placeholder='answer'/> &nbsp;
        <button class='{$buttonClass}' type='submit' onclick='enableButtonIfCorrect()'> I'm human! </button>
      </div>
      <script>
        var answer
        function enableButtonIfCorrect() {
            let inputAnswer = document.getElementById('inputAnswer').value
            if(inputAnswer == answer)
              document.getElementById('{$buttonId}').disabled = false
        }
        let oldOnload = window.onload
        window.onload = () => {
          oldOnload && oldOnload()
          document.getElementById('{$buttonId}').disabled = {$initialDisable}
          let num1 = Math.floor(Math.random() * 15)
          let num2 = Math.floor(Math.random() * 15)
          answer = num1 + num2
          document.getElementById('question').innerText = '' + num1 + ' + ' + num2 + ' is ?'
        }
      </script>
    ";
  }
?>
