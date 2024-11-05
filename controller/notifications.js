// controller/notifications.js
const twilio = require('twilio');
// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromPhone = process.env.TWILIO_PHONE_NUMBER;
// const client = twilio(accountSid, authToken);

const accountSid = hhhhh;
const authToken = process;
const fromPhone = processggh;
const client = twilio;;


/**
 * Sends an SMS notification using Twilio's API.
 * @param {Object} order - Order details containing customer contact information.
 * @returns {Promise<Object>} - A promise that resolves with the SMS sending result.
 */
console.log('Twilio SID:', process.env.TWILIO_ACCOUNT_SID);
console.log('Twilio Auth Token:', process.env.TWILIO_AUTH_TOKEN);



// My function
async function sendSmsNotification(order) {
  const { itemName, quantity, price, customerName, customerPhone,  } = order;
  const message = `Hello ${customerName}, your order for ${quantity} ${itemName}(s) has been placed. Total: $${price * quantity}.`;

  // Using a third party API
  try {
    // Send SMS via Twilio
    const response = await client.messages.create({
      body: message,
      from: fromPhone,
      to: customerPhone
    });

    //Handling my errors

    console.log(`✅ SMS sent to ${customerPhone}: ${message}`);
    return { success: true, message: 'SMS sent successfully', phone: customerPhone, sid: response.sid };
  } catch (error) {
    console.error(`❌ Failed to send SMS to ${customerPhone}:`, error.message);
    return { success: false, message: 'Failed to send SMS', phone: customerPhone, error: error.message };
  }
}

module.exports = sendSmsNotification;

  