<?php

if(isset($_FILES['file']['name'])){
    if(move_uploaded_file($_FILES['file']['tmp_name'], 'upload/'.$_FILES['file']['name'] )){
        echo 'Archivo subido exitosamente';
    }
}