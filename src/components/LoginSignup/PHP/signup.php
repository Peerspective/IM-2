<?php
// signup.php

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

// Include the database connection class
include("connection.php");

// Retrieve data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if all required fields are present
if (isset($data->email, $data->password, $data->repeatPassword)) {
    // Validate and sanitize the input (consider using filter_var or other validation methods)

    // Check if passwords match
    if ($data->password !== $data->repeatPassword) {
        http_response_code(400); // Bad Request
        echo json_encode(array("message" => "Passwords do not match."));
        exit();
    }

    // Hash the password
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

    // Your signup logic here
    // Example: Insert data into the database using the Connection class

    try {
        $connection = new Connection();
        $conn = $connection->connect();

        if ($conn) {
            // Log successful connection
            error_log('Connected to the database successfully.');

            // Example SQL query (replace with your actual query)
            $query = "INSERT INTO UserAccounts (Email, Password) VALUES (:email, :password)";
            $stmt = $conn->prepare($query);

            // Bind parameters
            $stmt->bindParam(":email", $data->email);
            $stmt->bindParam(":password", $hashedPassword);

            // Execute the query
            $stmt->execute();

            // Check if the query was successful
            if ($stmt->rowCount() > 0) {
                http_response_code(201); // Created
                echo json_encode(array("message" => "User registered successfully."));
            } else {
                http_response_code(500); // Internal Server Error
                echo json_encode(array("message" => "Unable to register user."));
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
    echo json_encode(array("message" => "Incomplete data provided."));
}
?>
