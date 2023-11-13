<?php
// verify_email.php



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
// Include the database connection class
include("connection.php");

header("Content-Type: application/json");

// Retrieve data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if the verification token is present
if (isset($data->token)) {
    try {
        $connection = new Connection();
        $conn = $connection->connect();

        if ($conn) {
            // Log successful connection
            error_log('Connected to the database successfully.');

            // Example SQL query (replace with your actual query)
            $query = "UPDATE UserAccounts SET IsVerified = 1 WHERE VerificationToken = :token";
            $stmt = $conn->prepare($query);

            // Bind parameters
            $stmt->bindParam(":token", $data->token);

            // Execute the query
            $stmt->execute();

            // Check if the query was successful
            if ($stmt->rowCount() > 0) {
                http_response_code(200); // OK
                echo json_encode(array("message" => "Email verification successful."));
            } else {
                http_response_code(400); // Bad Request
                echo json_encode(array("message" => "Invalid verification token."));
            }
        } else {
            // Log connection failure
            error_log('Failed to connect to the database.');
            http_response_code(500); // Internal Server Error
            echo json_encode(array("message" => "Failed to connect to the database."));
        }
    } catch (PDOException $e) {
        // Log database error
        error_log('Database error: ' . $e->getMessage());
        http_response_code(500);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(array("message" => "Verification token not provided."));
}
?>
