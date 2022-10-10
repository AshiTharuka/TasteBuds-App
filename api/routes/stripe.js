import express from "express";
import {
 payment,
} from "../controllers/stripe.js";
import stripe from 'stripe';

const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_KEY);
const KEY = process.env.STRIPE_KEY
const Stripe = new stripe (KEY);

router.post("/payment", payment) ;

export default router;

