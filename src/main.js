const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Use environment variables for security
const { Appwrite } = require('appwrite');
const profileService = require('./payentserices'); // Ensure this path is correct

const appwrite = new Appwrite();
appwrite
  .setEndpoint(process.env.APPWRITE_ENDPOINT) // Use environment variables
  .setProject(process.env.APPWRITE_PROJECT_ID) // Use environment variables
  .setKey(process.env.APPWRITE_API_KEY); // Use environment variables

// Define your Appwrite function handler
async function handlePayment(req, res) {
  try {
    // Parse the request body to get payment details
    const data = JSON.parse(req.payload);

    // Extract necessary data from request body
    const { amount, currency, source, description, paymentDetails } = data;

    // Create a charge with Stripe
    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency,
      source: source,
      description: description,
    });

    // If charge is successful, store payment details in Appwrite
    if (charge) {
      const payment = await profileService.createpayment({
        amount: amount,
        paymentdetails: paymentDetails,
        slug: paymentDetails.id,
        resid: paymentDetails.resid,
        userid: paymentDetails.userid,
      });
    }

    res.json({
      statusCode: 200,
      body: JSON.stringify({ message: 'Payment successful', paymentDetails: charge }),
    });
  } catch (error) {
    // Handle errors
    console.error('Error processing payment:', error);
    res.json({
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process payment' }),
    });
  }
}

// Export the function for Appwrite to execute
module.exports = handlePayment;
