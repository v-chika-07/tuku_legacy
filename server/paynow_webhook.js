require('dotenv').config({ path: '../.env' });
const express = require('express');
const admin = require('firebase-admin');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

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

// Enhanced Hash Verification Function
function verifyPaynowHash(data, suppliedHash) {
  try {
    // Sort keys to ensure consistent hash generation
    const sortedKeys = Object.keys(data).sort();
    
    // Create hash string by concatenating values
    let hashString = '';
    sortedKeys.forEach(key => {
      if (key !== 'Hash') {
        hashString += data[key];
      }
    });
    
    // Add integration key
    hashString += PAYNOW_INTEGRATION_KEY;

    // Generate SHA512 hash
    const generatedHash = crypto
      .createHash('sha512')
      .update(hashString)
      .digest('hex')
      .toUpperCase();

    // Compare hashes
    return generatedHash === suppliedHash;
  } catch (error) {
    console.error('Hash verification error:', error);
    return false;
  }
}

// Enhanced Paynow Webhook Endpoint
app.post('/paynow/notification', async (req, res) => {
  try {
    console.log('==== PAYNOW NOTIFICATION RECEIVED ====');
    
    // Extract all payment data
    const paymentData = req.body;
    console.log('Raw Payment Data:', paymentData);

    // Verify hash (critical security step)
    const verificationResult = verifyPaynowHash(paymentData, paymentData.Hash);
    if (!verificationResult) {
      console.error('Hash verification failed');
      return res.status(400).json({ 
        status: 'error', 
        message: 'Invalid payment notification' 
      });
    }

    // Prepare normalized payment information
    const normalizedPaymentInfo = {
      reference: paymentData.Paynow_Reference,
      customerName: decodeURIComponent(paymentData.Customer_Name),
      customerEmail: decodeURIComponent(paymentData.Customer_Email),
      customerPhone: paymentData.Customer_Phone,
      transactionAmount: parseFloat(paymentData.Transaction_Amount),
      amountPaid: parseFloat(paymentData.Amount_Paid),
      status: 'completed'
    };

    // Update Firestore document
    const orderRef = admin.firestore().collection('orders').doc(normalizedPaymentInfo.reference);
    await orderRef.update({
      paymentStatus: 'completed',
      paymentDetails: normalizedPaymentInfo
    });

    // Optional: Send real-time update to frontend via Firebase
    await admin.firestore().collection('paymentNotifications').add({
      ...normalizedPaymentInfo,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    // Respond to PayNow
    res.status(200).json({ 
      status: 'success', 
      message: 'Payment notification processed' 
    });

  } catch (error) {
    console.error('Paynow Webhook Error:', error);
    res.status(500).json({ 
      status: 'error', 
      message: 'Internal server error processing payment' 
    });
  }
});

// Real-time listener for payment notifications
function setupPaymentNotificationListener() {
  const db = admin.firestore();
  const notificationsRef = db.collection('paymentNotifications');

  // Create a real-time listener
  notificationsRef
    .where('status', '==', 'completed')
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const paymentData = change.doc.data();
          
          // Broadcast payment notification (you could use Socket.IO or similar)
          console.log('New Payment Notification:', paymentData);
        }
      });
    }, (error) => {
      console.error('Payment notification listener error:', error);
    });
}

// Call this when your server starts
setupPaymentNotificationListener();

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

// Add a root route handler
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Zunzo Running Club Webhook Server',
    status: 'running',
    timestamp: new Date().toISOString()
  });
});

// Add a health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
  console.log(`Server accessible at http://localhost:${PORT}`);
});

module.exports = app;
