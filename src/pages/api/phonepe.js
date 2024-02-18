// pages/api/phonepe.js

import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Replace these with your actual PhonePe API credentials
      const apiKey = 'a6334ff7-da0e-4d51-a9ce-76b97d518b1e';
      const merchantId = 'ON24MARTUAT';

      // Prepare the payment request data (you should customize this)
      const paymentData = {
        merchantId,
        merchantTransactionId: "ORDER_TRANSACTION_UNIQUE_ID1231313181521",
        merchantUserId: "CUSTOMER_UNIQUE_ID415151151515156",
        amount: 1000, // Amount in paisa (10 INR)
        redirectUrl: "https://webhook.site/redirect-url",
        redirectMode: "POST",
        callbackUrl: "https://webhook.site/redirect-url",
        merchantOrderId: "YOUR_ORDER_ID",
        mobileNumber: "CUSTOMER_MOBILE_NUMBER",
        message: "Order description",
        email: "CUSTOMER_EMAIL_ID",
        shortName: "CUSTOMER_Name",
        paymentInstrument: {
          type: "PAY_PAGE",
        },
      };

      const jsonEncode = JSON.stringify(paymentData);
      const payloadMain = Buffer.from(jsonEncode).toString('base64');

      const saltIndex = 1; // key index 1
      const payload = payloadMain + "/pg/v1/pay" + apiKey;
      const sha256 = require('crypto').createHash("sha256").update(payload).digest("hex");
      const finalXHeader = sha256 + '###' + saltIndex;
      const request = JSON.stringify({ request: payloadMain });

      // Make a request to PhonePe API
      const response = await axios.post('https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay', request, {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': finalXHeader,
          'accept': 'application/json',
        },
      });

      // Process the response and send it back to the client
      res.status(response.status).json(response.data);
    } catch (error) {
      console.error('Error processing PhonePe payment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
