<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));

if (
    isset($data->id)
    && isset($data->fullname)
    && isset($data->age)
    && is_numeric($data->id)
    && !empty(trim($data->fullname))
    && !empty(trim(is_numeric($data->age)))
) {
    $fullname = mysqli_real_escape_string($conn, trim($data->fullname));
    $age = mysqli_real_escape_string($conn, trim($data->age));
    
    $updateUser = mysqli_query($conn, "UPDATE `users` SET `fullname`='$fullname', `age`='$age' WHERE `id`='$data->id'");
    if ($updateUser) {
        echo json_encode(["success" => 1, "msg" => "User Updated."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Updated!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
