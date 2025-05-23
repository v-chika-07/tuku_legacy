import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaRunning, FaCreditCard, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { sendRegistrationEmail } from '../services/emailService';
import { toast } from 'react-toastify';
import { 
  initializePaynowTransaction, 
  listenToOrderStatus,
  listenForPaynowTransaction
} from '../services/paynowService';
import registrationImage1 from '../assets/images/IMG-20241218-WA0005.jpg';
import registrationImage2 from '../assets/images/IMG-20241218-WA0006.jpg';
import { collection, query, where, getDocs, addDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaynowLoading, setIsPaynowLoading] = useState(false);
  const [showPaynowCheckout, setShowPaynowCheckout] = useState(false);
  const [paynowUrl, setPaynowUrl] = useState(null);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    idNumber: '',
    hasMedicalAid: 'no',
    medicalAidCompany: '',
    medicalAidNumber: '',
    
    // Race Information
    raceCategory: '',
    tShirtSize: '',
    nextOfKinName: '',
    nextOfKinPhone: '',
    
    // Terms and Conditions
    termsAccepted: false
  });

  const steps = [
    { number: 1, title: "Personal Info", icon: FaUser },
    { number: 2, title: "Race Details", icon: FaRunning },
    { number: 3, title: "Payment", icon: FaCreditCard },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step < 3) {
      // Add email uniqueness check before moving to the next step
      if (step === 1) {
        // Validate email field
        if (!formData.email) {
          toast.error('Please enter an email address');
          return;
        }

        // Check for existing email in registrations
        const registrationsRef = collection(db, 'event_registrations');
        const emailQuery = query(registrationsRef, where('email', '==', formData.email));
        
        try {
          const existingRegistrations = await getDocs(emailQuery);

          if (!existingRegistrations.empty) {
            toast.error('This email is already registered for the event.');
            return;
          }
        } catch (error) {
          console.error('Error checking email uniqueness:', error);
          toast.error('Unable to verify email. Please try again.');
          return;
        }
      }

      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Generate race number based on race category
        const registrationsRef = collection(db, 'event_registrations');
        const raceCategoryQuery = query(
          registrationsRef, 
          where('raceCategory', '==', formData.raceCategory),
          orderBy('raceNumber', 'desc'),
          limit(1)
        );
        
        const lastRegistrationSnapshot = await getDocs(raceCategoryQuery);
        let newRaceNumber = '001';
        
        if (!lastRegistrationSnapshot.empty) {
          const lastRegistration = lastRegistrationSnapshot.docs[0].data();
          const lastRaceNumber = lastRegistration.raceNumber || '000';
          const nextNumber = parseInt(lastRaceNumber, 10) + 1;
          newRaceNumber = nextNumber.toString().padStart(3, '0');
        }

        // Remove sensitive payment information before storing
        const registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          idNumber: formData.idNumber,
          hasMedicalAid: formData.hasMedicalAid,
          medicalAidCompany: formData.medicalAidCompany,
          medicalAidNumber: formData.medicalAidNumber,
          raceCategory: formData.raceCategory,
          raceNumber: newRaceNumber,
          tShirtSize: formData.tShirtSize,
          nextOfKinName: formData.nextOfKinName,
          nextOfKinPhone: formData.nextOfKinPhone,
          termsAccepted: formData.termsAccepted
        };

        // Send confirmation email
        try {
          const emailResult = await sendRegistrationEmail({...registrationData, raceNumber: newRaceNumber});
          console.log('Email service response:', emailResult);
          toast.success(`Registration successful! Your race number is ${newRaceNumber}.`);
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          // Log more details about the error
          if (emailError.details) {
            console.error('Detailed error:', emailError.details);
          }
          // Still navigate to success page even if email fails
          toast.warning(`Registration successful, but email failed: ${emailError.error}`);
        }
        navigate('/registration-success');
      } catch (error) {
        toast.error('Registration failed. Please try again.');
        console.error('Registration error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const paynowUnsubscribeRef = useRef(null);

  const handlePaynowCheckout = async () => {
    // Validate form before checkout
    const requiredFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'dateOfBirth', 'gender', 'raceCategory', 'tShirtSize', 
      'nextOfKinName', 'nextOfKinPhone'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    // Check terms and conditions
    if (!formData.termsAccepted) {
      toast.error('Please accept the Terms and Conditions');
      return;
    }

    setIsPaynowLoading(true);
    try {
      // Determine race fee based on category
      const raceFees = {
        '21.1km': 0.01,  // Half Marathon fee
        '10km': 0.01,    // Fun Run fee
        '5km': 0.01      // Family Walk fee
      };
      const amount = raceFees[formData.raceCategory] || 0.01;

      // Prepare registration data as cart-like object
      const registrationCart = [{
        name: `${formData.raceCategory} Registration`,
        price: amount,
        quantity: 1
      }];

      // Initialize Paynow transaction
      const result = await initializePaynowTransaction(
        registrationCart,  
        formData.email, 
        { 
          uid: 'registration_' + Date.now(),
          email: formData.email,
          registrationData: formData
        }
      );

      if (result.success) {
        // Open PayNow URL in a popup window
        const popupWidth = 600;
        const popupHeight = 700;
        const left = (window.screen.width / 2) - (popupWidth / 2);
        const top = (window.screen.height / 2) - (popupHeight / 2);
        
        const paymentWindow = window.open(
          result.url, 
          'PayNow Payment', 
          `width=${popupWidth},height=${popupHeight},left=${left},top=${top},resizable=yes,scrollbars=yes`
        );

        // Create a promise that resolves when transaction is complete
        const transactionPromise = new Promise((resolve, reject) => {
          // Set up real-time listener for Paynow transactions
          const unsubscribe = listenForPaynowTransaction(
            formData.email, 
            result.orderId, 
            async (transactionResult) => {
              if (transactionResult.success) {
                try {
                  // Send confirmation email
                  await sendRegistrationEmail(formData);
                  
                  resolve(transactionResult);
                } catch (error) {
                  reject(error);
                } finally {
                  // Always unsubscribe
                  if (typeof unsubscribe === 'function') {
                    unsubscribe();
                  }
                }
              }
            },
            // Specify transaction type and pass registration data
            'registration',
            { 
              uid: 'registration_' + Date.now(),
              email: formData.email,
              registrationData: formData
            }
          );

          // Optional: Add a timeout to prevent indefinite waiting
          setTimeout(() => {
            if (typeof unsubscribe === 'function') {
              unsubscribe();
            }
          }, 15 * 60 * 1000); // 15 minutes timeout
        });

        try {
          // Wait for transaction to complete
          await transactionPromise;

          // Close the popup window if it's still open
          if (paymentWindow && !paymentWindow.closed) {
            paymentWindow.close();
          }

          // Navigate to success page
          toast.success('Registration successful!');
          navigate('/registration-success');
        } catch (error) {
          // Handle any errors during transaction
          toast.error(error.message || 'Registration processing failed');
          
          // Close popup if still open
          if (paymentWindow && !paymentWindow.closed) {
            paymentWindow.close();
          }
        } finally {
          setIsPaynowLoading(false);
        }
      } else {
        toast.error('Failed to initialize PayNow transaction');
        setIsPaynowLoading(false);
      }
    } catch (error) {
      console.error('PayNow Checkout Error:', error);
      toast.error('An error occurred during checkout');
      setIsPaynowLoading(false);
    }
  };

  const PaynowFloatingTab = () => {
    const handleClose = () => {
      setPaynowUrl(null);
      setShowPaynowCheckout(false);
    };

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="relative w-11/12 max-w-4xl h-5/6 bg-white rounded-lg shadow-2xl">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 z-60 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
          >
            Close
          </button>
          <iframe 
            src={paynowUrl} 
            className="w-full h-full rounded-lg"
            title="PayNow Checkout"
          />
        </div>
      </div>
    );
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {steps.map((stepItem) => (
        <div 
          key={stepItem.number}
          className={`flex items-center ${
            step === stepItem.number 
              ? 'text-primary' 
              : 'text-gray-400'
          }`}
        >
          <stepItem.icon className="mr-2" />
          <span className="font-semibold">{stepItem.title}</span>
          {stepItem.number < steps.length && (
            <div className="mx-4 w-12 h-0.5 bg-gray-300" />
          )}
        </div>
      ))}
    </div>
  );

  const renderPersonalInfo = () => (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-4"
    >
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white appearance-none"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">ID Number</label>
          <input
            type="text"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Do you have medical aid?</label>
          <select
            name="hasMedicalAid"
            value={formData.hasMedicalAid}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white appearance-none"
            required
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>
      </div>
      {formData.hasMedicalAid === 'yes' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Medical Aid Company</label>
            <input
              type="text"
              name="medicalAidCompany"
              value={formData.medicalAidCompany}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Medical Aid Number</label>
            <input
              type="text"
              name="medicalAidNumber"
              value={formData.medicalAidNumber}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
              required
            />
          </div>
        </div>
      )}
      <div className="space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData(prev => ({
              ...prev, 
              termsAccepted: e.target.checked
            }))}
            className="mr-2 h-4 w-4 text-zunzo-primary focus:ring-zunzo-primary border-gray-300 rounded"
            required
          />
          <label 
            htmlFor="termsAccepted" 
            className="text-gray-700 text-sm"
          >
            I have read and agree to the{' '}
            <a 
              href="/terms-and-conditions" 
              target="_blank" 
              className="text-zunzo-primary hover:underline"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
    </motion.div>
  );

  const renderRaceDetails = () => (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-gray-700 mb-2">Race Category</label>
        <select
          name="raceCategory"
          value={formData.raceCategory}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white appearance-none"
          required
        >
          <option value="">Select Category</option>
          <option value="21.1km">21.1km Half Marathon</option>
          <option value="10km">10km Fun Run</option>
          <option value="5km">5km Family Walk</option>
        </select>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">T-Shirt Size</label>
        <select
          name="tShirtSize"
          value={formData.tShirtSize}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white appearance-none"
          required
        >
          <option value="">Select Size</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Next of Kin Name</label>
          <input
            type="text"
            name="nextOfKinName"
            value={formData.nextOfKinName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Next of Kin Phone</label>
          <input
            type="tel"
            name="nextOfKinPhone"
            value={formData.nextOfKinPhone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-black bg-white caret-zunzo-primary appearance-none"
            required
          />
        </div>
      </div>
    </motion.div>
  );

  const renderPayment = () => (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-4"
    >
      <div className="mb-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={(e) => setFormData(prev => ({
              ...prev, 
              termsAccepted: e.target.checked
            }))}
            className="mr-2 h-4 w-4 text-zunzo-primary focus:ring-zunzo-primary border-gray-300 rounded"
            required
          />
          <label 
            htmlFor="termsAccepted" 
            className="text-gray-700 text-sm"
          >
            I have read and agree to the{' '}
            <a 
              href="/terms-and-conditions" 
              target="_blank" 
              className="text-zunzo-primary hover:underline"
            >
              Terms and Conditions
            </a>
          </label>
        </div>
      </div>
      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={handlePaynowCheckout}
          disabled={isPaynowLoading || !formData.termsAccepted}
          className={`bg-zunzo-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors ${(isPaynowLoading || !formData.termsAccepted) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isPaynowLoading ? 'Processing...' : 'Pay with Paynow'}
        </button>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center py-8"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <FaCheck className="text-4xl text-green-500" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Registration Successful!</h2>
      <p className="text-gray-600 mb-8">
        Thank you for registering for the Tuku Legacy Half Marathon. 
        You will receive a confirmation email shortly.
      </p>
      <button
        onClick={() => navigate('/events')}
        className="bg-zunzo-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors"
      >
        Back to Events
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zunzo-primary/10 to-zunzo-primary/30 py-16 px-4 relative overflow-hidden">
      {/* Left Side Image */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed left-0 top-0 bottom-0 w-[26%] hidden md:block"
        style={{
          backgroundImage: `url(${registrationImage1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zunzo-primary/60 to-transparent mix-blend-multiply" />
      </motion.div>

      {/* Right Side Image */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed right-0 top-0 bottom-0 w-[26%] hidden md:block"
        style={{
          backgroundImage: `url(${registrationImage2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-l from-zunzo-primary/60 to-transparent mix-blend-multiply" />
      </motion.div>

      {/* Registration Form Container */}
      <div className="container mx-auto relative z-10 md:px-24">
        {showPaynowCheckout && <PaynowFloatingTab />}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-8 text-white"
        >
          OM³ Registration
        </motion.h1>
        <div className="w-full px-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-8">
            {step < 4 && (
              <div className="flex justify-center mb-8">
                {steps.map((stepItem) => (
                  <div 
                    key={stepItem.number}
                    className={`flex items-center ${
                      step === stepItem.number 
                        ? 'text-primary' 
                        : 'text-gray-400'
                    }`}
                  >
                    <stepItem.icon className="mr-2" />
                    <span className="font-semibold">{stepItem.title}</span>
                    {stepItem.number < steps.length && (
                      <div className="mx-4 w-12 h-0.5 bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              {step === 1 && renderPersonalInfo()}
              {step === 2 && renderRaceDetails()}
              {step === 3 && renderPayment()}
              {step === 4 && renderSuccess()}
              
              {step < 4 && (
                <div className="mt-8 flex justify-end">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="px-6 py-2 text-white mr-4 hover:text-gray-300 transition-colors"
                    >
                      Back
                    </button>
                  )}
                  {step < 3 && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`bg-zunzo-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Next Step'}
                    </button>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
