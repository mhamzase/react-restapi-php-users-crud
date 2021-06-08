<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require "db_connection.php";

// POST DATA
$data = json_decode(file_get_contents("php://input"));


if (
    isset($data->fullname)
    && isset($data->age)
    && !empty(trim($data->fullname))
    && !empty(trim($data->age))
) {
    $fullname = mysqli_real_escape_string($conn, trim($data->fullname));
    $age = mysqli_real_escape_string($conn, trim($data->age));

    $insertUser = mysqli_query($conn, "INSERT INTO `users`(`fullname`,`age`) VALUES('$fullname','$age')");
    if ($insertUser) {
        echo json_encode(["success" => 1, "msg" => "User Inserted successfully."]);
    } else {
        echo json_encode(["success" => 0, "msg" => "User Not Inserted!"]);
    }
} else {
    echo json_encode(["success" => 0, "msg" => "Please fill all the required fields!"]);
}
