import stripe from 'stripe';


// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY;
//const Stripe = require('stripe')(KEY);
const Stripe = new stripe(KEY);


  
export const payment = async (req, res, next) => {
  await Stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "LKR",
      mode: "payment",
      cancel_url: `http://localhost:3000/cart`,
      success_url: `http://localhost:3000/success`,
      
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        next(stripeErr);
        
        
      } else {
        res.status(200).json(stripeRes);
        
      }
    }
  );
};

