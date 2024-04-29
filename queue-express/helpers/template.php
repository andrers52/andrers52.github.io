<?php
  /*
  // *** template function ***
  // Usage:

  <?php include $_SERVER['DOCUMENT_ROOT']."/helpers/template.php"; ?>

  $fruit = 'Watermelon';
  $color = 'Gray';

  //parse and return template
  $Template_Tpl = Template('
    $_SERVER['DOCUMENT_ROOT'].'/templates/template.tpl',
    array
    (
      'fruit'	=> $fruit,
      'color'	=> $color
    ));

  echo $Template_Tpl;

  * template.tpl, Template used for the above function

  <p>
    <b>Your Favorite Food Is: {{fruit}}</b>
    <b>Your Favorite Color Is: {{color}}</b>
  </p>

  * Parsed template output

  <p>
    <b>Your Favorite Food Is: Watermelon</b>
    <b>Your Favorite Color Is: Gray</b>
  </p>

  */
  // --------------------------------

  function template($file, $array) {
    if (file_exists($file)) {
      $output = file_get_contents($file);
      foreach ($array as $key => $val) {
        $replace = '{{'.$key.'}}';
        $output = str_replace($replace, $val, $output);
      }
      // remove all non-defined vars
      $output = preg_replace('/{{.+}}/i', '', $output);
      return $output;
    }
  }
?>