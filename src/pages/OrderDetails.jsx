import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaShoppingCart, FaSpinner, FaCheck, FaTruck, FaExclamationCircle } from 'react-icons/fa';
import { db } from '../firebase/config.js';
import { collection, query, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const OrderStatus = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled'
};

const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const ordersQuery = query(collection(db, 'orders'));
    const unsubscribe = onSnapshot(ordersQuery, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching orders:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case OrderStatus.PENDING:
        return <FaExclamationCircle className="text-yellow-500" />;
      case OrderStatus.PROCESSING:
        return <FaSpinner className="text-blue-500 animate-spin" />;
      case OrderStatus.SHIPPED:
        return <FaTruck className="text-green-500" />;
      case OrderStatus.DELIVERED:
        return <FaCheck className="text-green-700" />;
      case OrderStatus.CANCELLED:
        return <FaExclamationCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const formatOrderDate = (timestamp) => {
    try {
      // Prioritize updatedAt, fallback to createdAt
      const dateString = timestamp?.updatedAt || timestamp?.createdAt;
      
      // Validate the date string
      if (!dateString) return 'Date unavailable';
      
      // Parse the ISO string date
      const date = new Date(dateString);
      
      // Check if date is valid
      if (isNaN(date)) return 'Date unavailable';
      
      // Format the date
      return date.toLocaleDateString('en-ZA', {
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date unavailable';
    }
  };

  const renderOrderDetails = (order) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="flex justify-between items-center mb-4 border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold">Order #{order.id}</h2>
          <p className="text-gray-600">
            {formatOrderDate(order)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {getStatusIcon(order.status)}
          <span className="capitalize font-semibold">{order.status}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="text-left">
          <h3 className="font-semibold mb-2 border-b pb-2">Customer Details</h3>
          <p className="mb-1">
            <span className="font-semibold mr-2">Name:</span> 
            {order.payer?.name?.given_name || order.payer?.name?.surname 
              ? `${order.payer.name.given_name || ''} ${order.payer.name.surname || ''}`.trim()
              : 'N/A'}
          </p>
          <p className="mb-1">
            <span className="font-semibold mr-2">Email:</span> 
            {order.payer?.email_address || 'N/A'}
          </p>
          <p className="mb-1">
            <span className="font-semibold mr-2">Shipping Address:</span> 
            {order.shippingAddress 
              ? `${order.shippingAddress.address?.address_line_1 || ''}, 
                 ${order.shippingAddress.address?.admin_area_2 || ''}, 
                 ${order.shippingAddress.address?.admin_area_1 || ''}, 
                 ${order.shippingAddress.address?.postal_code || ''}`
              : 'N/A'}
          </p>
        </div>

        <div>
          <h3 className="font-semibold mb-2 border-b pb-2">Order Summary</h3>
          {Array.isArray(order.items) ? order.items.map((item, index) => (
            <div key={index} className="flex justify-between py-2 border-b">
              <div className="text-left">
                <span>{item.name || 'Unknown Product'}</span>
                {item.color && <span className="text-sm text-gray-600 block">Color: {item.color}</span>}
                {item.size && <span className="text-sm text-gray-600 block">Size: {item.size}</span>}
                <span className="text-sm text-gray-600">Quantity: {item.quantity || 1}</span>
              </div>
              <div className="text-right">
                <span>${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            </div>
          )) : (
            <p>No items in this order</p>
          )}
          <div className="border-t mt-2 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span>${typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {Object.values(OrderStatus)
          .filter(status => status !== order.status)
          .map(status => (
            <button
              key={status}
              onClick={() => handleUpdateOrderStatus(order.id, status)}
              className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-lg capitalize"
            >
              Set to {status}
            </button>
          ))
        }
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-primary via-secondary to-accent">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 py-8"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block p-4 rounded-full bg-black/20 backdrop-blur-sm mb-6"
          >
            <FaShoppingCart className="text-4xl text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            Order Management
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-white/80 text-lg"
          >
            Track and manage your merchandise orders
          </motion.p>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center items-center">
            <FaSpinner className="text-4xl text-white animate-spin" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-white">
            No orders found.
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map(order => (
              <div 
                key={order.id} 
                onClick={() => setSelectedOrder(order)}
                className="cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white text-black border-gradient p-4 hover:bg-gray-100 transition-all"
                >
                  <div className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-bold">Order #{order.id}</span>
                        <p className="text-sm text-gray-600">
                          {formatOrderDate(order)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <span className="font-bold">Total:</span>
                      <span>USD {typeof order.total === 'number' ? order.total.toFixed(2) : '0.00'}</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Order Details */}
        {selectedOrder && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white text-black border-gradient rounded-2xl shadow-2xl"
            >
              {renderOrderDetails(selectedOrder)}
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default OrderDetails;
