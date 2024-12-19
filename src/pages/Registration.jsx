import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaRunning, FaCreditCard, FaCheck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { submitEventRegistration } from '../firebase/services/eventService';
import { sendRegistrationEmail } from '../services/emailService';
import { toast } from 'react-toastify';

const Registration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    
    // Race Information
    raceCategory: '',
    tShirtSize: '',
    emergencyContact: '',
    emergencyPhone: '',
    
    // Payment Information
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
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
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      try {
        // Remove sensitive payment information before storing
        const registrationData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          dateOfBirth: formData.dateOfBirth,
          gender: formData.gender,
          raceCategory: formData.raceCategory,
          tShirtSize: formData.tShirtSize,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,
        };

        const result = await submitEventRegistration(registrationData);
        
        if (result.success) {
          // Send confirmation email
          try {
            const emailResult = await sendRegistrationEmail(registrationData);
            console.log('Email service response:', emailResult);
            toast.success('Registration successful! Check your email for confirmation.');
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
        }
      } catch (error) {
        toast.error('Registration failed. Please try again.');
        console.error('Registration error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderStepIndicator = () => (
    <div className="flex justify-center mb-8">
      {steps.map((s, index) => (
        <div key={s.number} className="flex items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center justify-center w-12 h-12 rounded-full 
              ${step >= s.number ? 'bg-zunzo-primary' : 'bg-gray-200'} 
              ${step >= s.number ? 'text-white' : 'text-gray-500'}`}
          >
            <s.icon className="text-xl" />
          </motion.div>
          {index < steps.length - 1 && (
            <div className={`w-20 h-1 mx-2 ${step > s.number ? 'bg-zunzo-primary' : 'bg-gray-200'}`} />
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
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
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
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
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white"
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
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white"
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
          <label className="block text-gray-700 mb-2">Emergency Contact Name</label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Emergency Contact Phone</label>
          <input
            type="tel"
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
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
      <div>
        <label className="block text-gray-700 mb-2">Name on Card</label>
        <input
          type="text"
          name="cardName"
          value={formData.cardName}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 mb-2">Card Number</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleInputChange}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
          required
          maxLength="16"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Expiry Date</label>
          <input
            type="text"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleInputChange}
            placeholder="MM/YY"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
            required
            maxLength="5"
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">CVV</label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zunzo-primary text-gray-800 bg-white caret-zunzo-primary"
            required
            maxLength="3"
          />
        </div>
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
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {step < 4 && (
              <>
                <h1 className="text-3xl font-bold text-center mb-8">
                  Register for Tuku Legacy Half Marathon
                </h1>
                {renderStepIndicator()}
              </>
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
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`bg-zunzo-primary text-white px-8 py-3 rounded-full hover:bg-orange-600 transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Submitting...' : step === 3 ? 'Complete Registration' : 'Next Step'}
                  </button>
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
