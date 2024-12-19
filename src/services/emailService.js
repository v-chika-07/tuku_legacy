import axios from 'axios';

const BREVO_API_URL = 'https://api.brevo.com/v3/smtp/email';

export const sendRegistrationEmail = async (userData) => {
  try {
    const emailData = {
      sender: {
        name: "Zunzo Running Club",
        email: "noreply@zunzorunningclub.co.za" // Update this with your verified sender
      },
      to: [{
        email: userData.email,
        name: `${userData.firstName} ${userData.lastName}`
      }],
      subject: "Welcome to Zunzo Running Club Event!",
      htmlContent: generateEmailTemplate(userData),
      params: {
        firstName: userData.firstName,
        eventName: "Zunzo Running Event",
        registrationDate: new Date().toLocaleDateString()
      }
    };

    const response = await axios.post(BREVO_API_URL, emailData, {
      headers: {
        'accept': 'application/json',
        'api-key': import.meta.env.VITE_BREVO_API_KEY,
        'content-type': 'application/json'
      }
    });

    return { success: true, messageId: response.data.messageId };
  } catch (error) {
    console.error('Error sending email:', error.response?.data || error.message);
    throw {
      success: false,
      error: error.response?.data?.message || 'Failed to send email'
    };
  }
};

const generateEmailTemplate = (userData) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Registration Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #FF6B00;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
          background-color: #ffffff;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666666;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FF6B00;
          color: white;
          text-decoration: none;
          border-radius: 5px;
          margin: 20px 0;
        }
        .details {
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          margin: 20px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Zunzo Running Club!</h1>
        </div>
        <div class="content">
          <h2>Hello ${userData.firstName},</h2>
          <p>Thank you for registering for our upcoming event! We're excited to have you join us.</p>
          
          <div class="details">
            <h3>Registration Details:</h3>
            <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
            <p><strong>Event Category:</strong> ${userData.raceCategory}</p>
            <p><strong>T-Shirt Size:</strong> ${userData.tShirtSize}</p>
            <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
          </div>

          <p>Important Information:</p>
          <ul>
            <li>Please arrive 30 minutes before the event start time</li>
            <li>Bring your ID or passport for verification</li>
            <li>Don't forget to bring water and necessary running gear</li>
          </ul>

          <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Zunzo Running Club. All rights reserved.</p>
          <p>This email was sent to ${userData.email}</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Rate limiting utility
let lastEmailSent = 0;
const MIN_EMAIL_INTERVAL = 1000; // Minimum 1 second between emails

export const isRateLimited = () => {
  const now = Date.now();
  if (now - lastEmailSent < MIN_EMAIL_INTERVAL) {
    return true;
  }
  lastEmailSent = now;
  return false;
};
