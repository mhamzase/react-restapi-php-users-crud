<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require 'db_connection.php';

$data = json_decode(file_get_contents("php://input"));
if (isset($data->id) && is_numeric($data->id)) {
    $fetchID = $data->id;
    $isUser = mysqli_query($conn, "SELECT * FROM `users` WHERE `id`='$fetchID'");
    $userDetails = $isUser->fetch_all();
    if ($isUser) {
        echo json_encode(["success" => 1, "user" => $userDetails]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "User Not Found!"]);
}