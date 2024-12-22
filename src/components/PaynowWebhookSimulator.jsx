import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { toast } from 'react-toastify';

const PaynowWebhookSimulator = () => {
  const { updatePaymentStatus } = useCart();
  const [webhookData, setWebhookData] = useState({
    Paynow_Reference: '',
    Customer_Name: '',
    Customer_Email: '',
    Customer_Phone: '',
    Transaction_Amount: '',
    Amount_Paid: '',
    Hash: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWebhookData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const simulateWebhook = async (e) => {
    e.preventDefault();
    try {
      const result = await updatePaymentStatus(webhookData);
      
      if (result) {
        toast.success('Webhook simulation successful');
      } else {
        toast.error('Webhook simulation failed');
      }
    } catch (error) {
      console.error('Webhook simulation error:', error);
      toast.error('Webhook simulation encountered an error');
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h2 className="text-xl font-bold mb-4">PayNow Webhook Simulator</h2>
      <form onSubmit={simulateWebhook} className="space-y-4">
        {Object.keys(webhookData).map((key) => (
          <div key={key} className="flex flex-col">
            <label className="mb-2 font-semibold">{key.replace(/_/g, ' ')}</label>
            <input
              type="text"
              name={key}
              value={webhookData[key]}
              onChange={handleInputChange}
              className="border p-2 rounded"
              placeholder={`Enter ${key.replace(/_/g, ' ')}`}
            />
          </div>
        ))}
        <button 
          type="submit" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Simulate Webhook
        </button>
      </form>
    </div>
  );
};

export default PaynowWebhookSimulator;
