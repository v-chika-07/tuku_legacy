<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

$response = array();

try {
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Only POST method allowed');
    }

    if (!isset($_FILES['image'])) {
        throw new Exception('No file uploaded');
    }

    $file = $_FILES['image'];
    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];

    // Validate file size (5MB)
    if ($fileSize > 5 * 1024 * 1024) {
        throw new Exception('File size must be less than 5MB');
    }

    // Get file extension
    $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
    
    // Allowed extensions
    $allowed = array('jpg', 'jpeg', 'png', 'gif');
    if (!in_array($fileExt, $allowed)) {
        throw new Exception('Invalid file type. Only jpg, jpeg, png, and gif allowed');
    }

    // Generate unique filename
    $newFileName = uniqid('img_', true) . '.' . $fileExt;
    
    // Upload directory - use the current directory
    $uploadDir = dirname(__FILE__) . '/';
    
    // Move file to upload directory
    if (!move_uploaded_file($fileTmpName, $uploadDir . $newFileName)) {
        throw new Exception('Failed to move uploaded file');
    }

    // Generate URL for the uploaded file
    $baseUrl = 'https://www.olivermtukudzi.com/images/';
    $imageUrl = $baseUrl . $newFileName;

    $response = array(
        'success' => true,
        'file' => array(
            'url' => $imageUrl,
            'filename' => $newFileName,
            'originalName' => $fileName,
            'size' => $fileSize
        )
    );

} catch (Exception $e) {
    http_response_code(500);
    $response = array(
        'success' => false,
        'message' => $e->getMessage()
    );
}

header('Content-Type: application/json');
echo json_encode($response);
