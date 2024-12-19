import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('-I5EyQKlDrIB8772h');

export const sendRegistrationEmail = async (userData) => {
  try {
    console.log('Sending registration email for:', userData.email);

    const templateParams = {
      to_name: `${userData.firstName} ${userData.lastName}`,
      to_email: userData.email,
      race_category: userData.raceCategory,
      tshirt_size: userData.tShirtSize,
      registration_date: new Date().toLocaleDateString(),
      event_name: "Oliver Mtukudzi Memorial Half Marathon (OM³)",
    };

    // Configure EmailJS with service details
    const response = await emailjs.send(
      'service_g3rx8na',
      'template_p4zr1eq',
      templateParams,
      '-I5EyQKlDrIB8772h'
    );

    console.log('Email sent successfully:', response);
    return { 
      success: true, 
      messageId: response.status,
      message: 'Registration confirmation email sent successfully!'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    // Throw a more detailed error object
    throw {
      success: false,
      error: error.text || error.message || 'Failed to send registration email',
      details: error
    };
  }
};
