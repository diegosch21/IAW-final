<?php
    $id = $_GET['id'];

    $xml = file_get_contents("http://meteorologia.cerzos-conicet.gob.ar/mobile/forecast/for-".$id.".xml");

    echo $xml;