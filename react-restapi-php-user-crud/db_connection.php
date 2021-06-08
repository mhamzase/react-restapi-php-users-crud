<?php
$conn = new mysqli("localhost","root","","react_php_crud");
if($conn->connect_error)
{
    echo $conn->connect_error;
}