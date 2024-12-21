import React from 'react';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { createOrder } from '../firebase/services/orderService';
import { toast } from 'react-toastify';

const PayPalCheckout = ({ items, total, userId, onSuccess }) => {
  const createPayPalOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: total.toFixed(2),
            currency_code: "USD"
          },
          description: `Order from Zunzo Running Club - ${items.length} items`
        }
      ]
    });
  };

  const onApprove = async (data, actions) => {
    try {
      const order = await actions.order.capture();
      
      // Create order in Firebase
      const orderData = {
        paypalOrderId: order.id,
        items: items.map(item => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size
        })),
        total: total,
        shippingAddress: order.purchase_units[0].shipping,
        paymentStatus: order.status,
        payer: order.payer
      };

      const result = await createOrder(userId, orderData);
      
      if (result.success) {
        toast.success('Order completed successfully!');
        onSuccess(result.orderId);
      } else {
        toast.error('Failed to save order details');
      }
    } catch (error) {
      console.error('PayPal transaction failed:', error);
      toast.error('Payment failed. Please try again.');
    }
  };

  const onError = (err) => {
    console.error('PayPal Error:', err);
    toast.error('Payment failed. Please try again.');
  };

  return (
    <div className="w-full">
      <PayPalButtons
        createOrder={createPayPalOrder}
        onApprove={onApprove}
        onError={onError}
        style={{
          layout: 'vertical',
          color: 'black',
          shape: 'rect',
          label: 'checkout'
        }}
      />
    </div>
  );
};

export default PayPalCheckout;
