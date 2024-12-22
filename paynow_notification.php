<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Load Firebase configuration and SDK
require_once 'vendor/autoload.php';
use Firebase\Auth\Token\Exception\InvalidToken;
use Google\Cloud\Firestore\FirestoreClient;

// Paynow configuration
$INTEGRATION_KEY = 'YOUR_PAYNOW_INTEGRATION_KEY'; // Replace with actual key

// Function to verify Paynow hash
function verifyPaynowHash($data, $suppliedHash, $integrationKey) {
    // Concatenate all values in order, excluding the hash
    $hashString = '';
    ksort($data);
    foreach ($data as $key => $value) {
        if ($key !== 'Hash') {
            $hashString .= $value;
        }
    }
    $hashString .= $integrationKey;

    // Generate SHA512 hash
    $generatedHash = strtoupper(hash('sha512', $hashString));

    return $generatedHash === $suppliedHash;
}

// Initialize response
$response = [
    'success' => false,
    'message' => 'Invalid request'
];

try {
    // Check if it's a POST request
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST requests are allowed');
    }

    // Get raw POST data
    $rawData = file_get_contents('php://input');
    $postData = $_POST ?: json_decode($rawData, true);

    // Validate required fields
    $requiredFields = ['Paynow_Reference', 'Transaction_Amount', 'Amount_Paid', 'Hash'];
    foreach ($requiredFields as $field) {
        if (!isset($postData[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }

    // Verify Paynow hash
    if (!verifyPaynowHash($postData, $postData['Hash'], $INTEGRATION_KEY)) {
        throw new Exception('Hash verification failed');
    }

    // Initialize Firestore
    $firestore = new FirestoreClient();
    $ordersCollection = $firestore->collection('orders');

    // Prepare order data
    $orderData = [
        'transactionReference' => $postData['Paynow_Reference'],
        'customerName' => $postData['Customer_Name'] ?? 'Unknown',
        'customerEmail' => $postData['Customer_Email'] ?? 'unknown@example.com',
        'transactionAmount' => floatval($postData['Transaction_Amount']),
        'amountPaid' => floatval($postData['Amount_Paid']),
        'paymentMethod' => 'Paynow',
        'status' => 'Paid', // Assuming successful notification means paid
        'createdAt' => time(),
        'rawPaynowData' => $postData // Store raw data for reference
    ];

    // Add order to Firestore
    $orderRef = $ordersCollection->add($orderData);

    // Prepare successful response
    $response = [
        'success' => true,
        'message' => 'Notification processed successfully',
        'orderId' => $orderRef->id()
    ];

} catch (Exception $e) {
    // Log the error
    error_log('Paynow Notification Error: ' . $e->getMessage());
    
    $response = [
        'success' => false,
        'message' => $e->getMessage()
    ];
}

// Send JSON response
echo json_encode($response);
exit();
