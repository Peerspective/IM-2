<?php
// login.php

// Enable CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Allow-Headers: Content-Type");
    exit();
}

header("Content-Type: application/json");

include("connection.php");

$data = json_decode(file_get_contents("php://input"));

if (isset($data->email, $data->password)) {
    try {
        $connection = new Connection();
        $conn = $connection->connect();

        if ($conn) {
            $query = "SELECT * FROM UserAccounts WHERE Email = :email";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(":email", $data->email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);

                if (password_verify($data->password, $user['Password'])) {
                    http_response_code(200);
                    echo json_encode(array("message" => "Login successful."));
                } else {
                    http_response_code(401); // Unauthorized
                    echo json_encode(array("message" => "Invalid credentials."));
                }
            } else {
                http_response_code(401); // Unauthorized
                echo json_encode(array("message" => "Invalid credentials."));
            }
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Failed to connect to the database."));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Incomplete data provided."));
}
?>
