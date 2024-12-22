require('dotenv').config({ path: '../.env' });
const express = require('express');
const admin = require('firebase-admin');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Safely load Firebase credentials
const serviceAccountConfig = {
  type: 'service_account',
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY 
    ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
    : fs.readFileSync(path.resolve(__dirname, 'firebase-service-account.json'), 'utf8'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
};

// Fallback to service account file if environment variables are not set
try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountConfig),
  });
} catch (error) {
  console.error('Firebase initialization error:', error);
  process.exit(1);
}

// Log environment variables for debugging
console.log('Environment Variables:');
console.log('Project ID:', process.env.FIREBASE_PROJECT_ID);
console.log('Client Email:', process.env.FIREBASE_CLIENT_EMAIL);
console.log('Paynow Integration ID:', process.env.VITE_PAYNOW_INTEGRATION_ID);

const app = express();

// Paynow Configuration
const PAYNOW_INTEGRATION_ID = process.env.VITE_PAYNOW_INTEGRATION_ID;
const PAYNOW_INTEGRATION_KEY = process.env.VITE_PAYNOW_INTEGRATION_KEY;

// Middleware
app.use(cors({
  origin: ['https://zunzorunningclub.com', 'http://localhost:3008', 'http://localhost:5173'],
  methods: ['POST', 'GET'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse various content types
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'application/octet-stream' }));

// Enhanced Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Content-Type:', req.get('Content-Type'));
  next();
});

// Enhanced Hash Verification
function verifyPaynowHash(data, suppliedHash) {
  try {
    const { Hash, ...dataToHash } = data;

    // Consistent key sorting
    const sortedKeys = Object.keys(dataToHash)
      .filter(key => dataToHash[key] !== undefined)
      .sort();
    
    // Concatenate values
    const hashString = sortedKeys
      .map(key => String(dataToHash[key]))
      .join('') + PAYNOW_INTEGRATION_KEY;

    // Generate SHA512 hash
    const generatedHash = crypto
      .createHash('sha512')
      .update(hashString, 'utf8')
      .digest('hex')
      .toUpperCase();

    return generatedHash === suppliedHash;
  } catch (error) {
    console.error('Hash Verification Error:', error);
    return false;
  }
}

// Comprehensive Notification Handler
app.post('/paynow/notification', async (req, res) => {
  try {
    console.log('==== FULL PAYNOW NOTIFICATION RECEIVED ====');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Query Parameters:', JSON.stringify(req.query, null, 2));
    console.log('Body (Form-Urlencoded):', JSON.stringify(req.body, null, 2));
    
    // Try to parse different types of incoming data
    const postData = {
      ...req.query,
      ...req.body
    };

    console.log('Parsed Notification Data:', JSON.stringify(postData, null, 2));

    // Validate required fields with more flexible matching
    const requiredFields = [
      'Paynow_Reference', 
      'Transaction_Amount', 
      'Amount_Paid', 
      'Hash'
    ];

    const missingFields = requiredFields.filter(field => 
      !postData[field] && 
      !postData[field.toLowerCase()] && 
      !postData[field.toUpperCase()]
    );

    if (missingFields.length > 0) {
      console.warn('Missing required fields:', missingFields);
      return res.status(400).json({ 
        success: false, 
        message: `Missing required fields: ${missingFields.join(', ')}`,
        receivedData: postData
      });
    }

    // Case-insensitive field matching
    const normalizedData = Object.keys(postData).reduce((acc, key) => {
      acc[key.toLowerCase()] = postData[key];
      return acc;
    }, {});

    // Determine Payment Status
    const paymentStatus = parseFloat(normalizedData['amount_paid']) >= parseFloat(normalizedData['transaction_amount']) 
      ? 'Paid' 
      : 'Partially Paid';

    const db = admin.firestore();
    const ordersRef = db.collection('orders');

    // Find Matching Order with case-insensitive search
    const orderSnapshot = await ordersRef
      .where('transactionReference', '==', normalizedData['paynow_reference'])
      .limit(1)
      .get();

    if (orderSnapshot.empty) {
      console.warn('No matching order found for reference:', normalizedData['paynow_reference']);
      return res.status(404).json({ 
        success: false, 
        message: 'No matching order found',
        reference: normalizedData['paynow_reference']
      });
    }

    // Update Order
    const orderDoc = orderSnapshot.docs[0];
    await orderDoc.ref.update({
      status: paymentStatus,
      paynowDetails: {
        transactionAmount: normalizedData['transaction_amount'],
        amountPaid: normalizedData['amount_paid'],
        customerEmail: normalizedData['customer_email'] || '',
        customerName: normalizedData['customer_name'] || ''
      },
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });

    console.log(`Order ${orderDoc.id} updated with status: ${paymentStatus}`);

    // Respond to Paynow
    res.status(200).json({ 
      success: true, 
      message: `Order updated with status: ${paymentStatus}` 
    });

  } catch (error) {
    console.error('Paynow Webhook Error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Local testing route
if (process.env.NODE_ENV === 'development') {
  app.get('/test-paynow-notification', (req, res) => {
    const mockPaynowData = {
      Paynow_Reference: `ZunzoOrder_${Date.now()}`,
      Transaction_Amount: '100.00',
      Amount_Paid: '100.00',
      Customer_Name: 'Test User',
      Customer_Email: 'test@example.com',
      Hash: 'MOCK_HASH_VALUE'
    };

    req.body = mockPaynowData;
    app.handle(req, res, () => {
      console.log('Test notification simulation complete');
    });
  });
}

// Start server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Paynow Webhook Server running on port ${PORT}`);
});

module.exports = app;
