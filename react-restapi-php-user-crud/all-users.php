<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require "db_connection.php";


$allUsers = $conn->query("SELECT * FROM `users`");
if ($allUsers->num_rows > 0) {
    $all_users = $allUsers->fetch_all();
    echo json_encode(["success" => 1, "users" => $all_users]);
} else {
    echo json_encode(["success" => 0]);
}