<?php

// Languages we support
$available_languages = array("dev", "en", "pt-br");

function prefered_language() {

  global $available_languages;

  $http_accept_language = $_SERVER["HTTP_ACCEPT_LANGUAGE"];

  preg_match_all('~([\w-]+)(?:[^,\d]+([\d.]+))?~', strtolower($http_accept_language), $matches, PREG_SET_ORDER);
  foreach($matches as $match) {

      list($a, $b) = explode('-', $match[1]) + array('', '');
      $value = isset($match[2]) ? (float) $match[2] : 1.0;

      if(in_array($match[1], $available_languages)) {
          $langs[$match[1]] = $value;
          continue;
      }

  }
  if(!$langs) $langs = ["en"];
  arsort($langs);

  // get the first key (lang)
  reset($langs);
  return key($langs);

}

// *** SAMPLE USAGE ***

//$_SERVER["HTTP_ACCEPT_LANGUAGE"] = 'en-us,en;q=0.8,es-cl;q=0.5,zh-cn;q=0.3';

// Languages we support
//$available_languages = array("en", "pt-br");

//$lang = _prefered_language($available_languages, $_SERVER["HTTP_ACCEPT_LANGUAGE"]);
//echo $lang;

/* Result
"en"
*/

?>