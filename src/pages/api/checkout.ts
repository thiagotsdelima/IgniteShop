import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../services/stripe";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { items } = req.body;

  console.log('Received items:', items);

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Invalid items.' });
  }

  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;
  const cancelUrl = `${process.env.NEXT_URL}/`;
  
  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      mode: 'payment',
      line_items: items.map((item) => {
        return {
          price: item.id,
          quantity: item.quantity
        };
      })
    });

    console.log('Checkout session created:', checkoutSession);

    return res.status(201).json({
      checkoutUrl: checkoutSession.url
    });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Failed to create checkout session.' });
  }
}
