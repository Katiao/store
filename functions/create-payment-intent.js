// domain/.netlify/functions/create-payment-intent

//node-land we use require syntax instead of import / export
require('dotenv').config();

//connecting to stripe:
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY);

exports.handler = async function (event, context) {
	//logic when we're seeting up post request, checking if there is body property on event object, then send information.
	if (event.body) {
		const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

		//normally this function is used to communicate with backend to get prices
		const calculateOrderAmount = () => {
			return shipping_fee + total_amount;
		};
		try {
			const paymentIntent = await stripe.paymentIntents.create({
				amount: calculateOrderAmount(),
				currency: 'usd',
			});
			return {
				//this is what is being sent back to server
				statusCode: 200,
				body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
			};
		} catch (error) {
			return {
				statusCode: 500,
				body: JSON.stringify({ msg: error.message }),
			};
		}
	}
	//logic for get request / navigate to payment intent browser
	return {
		statusCode: 200,
		body: 'Create Payment Intent',
	};
};
