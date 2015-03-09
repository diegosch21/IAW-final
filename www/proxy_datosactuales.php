<?php
    $id = $_GET['id'];

    $xml = file_get_contents("http://meteorologia.cerzos-conicet.gob.ar/mobile/xml/now-".$id.".xml");

    echo $xml;