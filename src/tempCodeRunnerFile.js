// handlePayment.js (or tempCodeRunnerFile.js adjusted for backend)
import stripePackage from 'stripe';
import { Appwrite } from 'appwrite';
import profileService from './payentserices'; // Adjust the path as necessary

const stripe = stripePackage(process.env.STRIPE_SECRET_KEY);

const appwrite = new Appwrite();
appwrite
  .setEndpoint(process.env.APPWRITE_ENDPOINT)
  .setProject(process.env.APPWRITE_PROJECT_ID)
  .setKey(process.env.APPWRITE_API_KEY);

async function handlePayment(req, res) {
  try {
    const data = req.body; // Assuming JSON body parser middleware is used
    const { amount, currency, source, description, paymentDetails } = data;

    const charge = await stripe.charges.create({
      amount: amount,
      currency: currency,
      source: source,
      description: description,
    });

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
      body: { message: 'Payment successful', paymentDetails: charge },
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Failed to process payment' });
  }
}

export default handlePayment;
