// routes/orders.js
const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const sendSmsNotification = require('../controller/notifications');

// POST /orders - Place a new order and send SMS notification
router.post('/', async (req, res) => {
  try {
    const { itemName, quantity, price, customerName, customerPhone } = req.body;

    // Save the order to the database
    const newOrder = await Order.create({
      itemName,
      quantity,
      price,
      customerName,
      customerPhone
    });

    // Attempt to send SMS notification asynchronously
    sendSmsNotification(newOrder)
      .then(result => {
        res.status(201).json({
          message: 'Order placed successfully and SMS notification sent.',
          order: newOrder,
          notification: result
        });
      })
      .catch(error => {
        res.status(201).json({
          message: 'Order placed successfully, but SMS notification failed.',
          order: newOrder,
          notification: error
        });
      });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Failed to place order.' });
  }
});

module.exports = router;

