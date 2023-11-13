<?php
// send_verification_email.php

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

// Import PHPMailer classes into the global namespace
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Path to Composer autoload file

header("Content-Type: application/json");

// Include the database connection class
include("connection.php");

// Retrieve data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if the email is provided
if (isset($data->email)) {
    // Generate a unique verification token (you may use a library like `uuid` for this)
    $verificationToken = uniqid();

    // Save the verification token in the database (you need to modify the UserAccounts table to include a verification_token column)
    try {
        $connection = new Connection();
        $conn = $connection->connect();

        if ($conn) {
            $query = "UPDATE UserAccounts SET verification_token = :token WHERE Email = :email";
            $stmt = $conn->prepare($query);
            $stmt->bindParam(":token", $verificationToken);
            $stmt->bindParam(":email", $data->email);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                // Verification token saved successfully, now send the email using PHPMailer
                $mail = new PHPMailer(true);

                // Set mailer to use SMTP
                $mail->isSMTP();
                $mail->Host = 'your-smtp-host'; // Replace with your SMTP server
                $mail->SMTPAuth = true;
                $mail->Username = 'your-smtp-username'; // Replace with your SMTP username
                $mail->Password = 'your-smtp-password'; // Replace with your SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                // Set sender and recipient
                $mail->setFrom('your-email@example.com', 'Your Name'); // Replace with your sender details
                $mail->addAddress($data->email);

                // Set email content
                $mail->isHTML(true);
                $mail->Subject = 'Email Verification';
                $mail->Body = "Click the following link to verify your email: https://cquibranza.leon.svdphs.ph/API_2/verify_email?token=$verificationToken";

                // Send the email
                $mail->send();

                http_response_code(200);
                echo json_encode(array("message" => "Verification email sent successfully."));
            } else {
                http_response_code(500);
                echo json_encode(array("message" => "Failed to save verification token."));
            }
        } else {
            http_response_code(500);
            echo json_encode(array("message" => "Failed to connect to the database."));
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(array("message" => "Database error: " . $e->getMessage()));
    }
} else {
    http_response_code(400);
    echo json_encode(array("message" => "Email not provided."));
}
?>
