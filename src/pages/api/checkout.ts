import { stripe } from "@/src/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body;

  // aqui é para o usuário não acessar pelo URL, impede de adicionar diretamente na URL
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed!' })
  }  

  if (!priceId) {
    return res.status(400).json({ error: 'Price not found!' })
  }
  
  let checkoutSession;

  try {
    checkoutSession = await stripe.checkout.sessions.create({
      success_url: `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_URL}/`,
      mode: 'payment', 
      line_items: [
        {
          price: priceId,
          quantity: 1,
        }
      ],
    });

    const successUrl = `${process.env.NEXT_URL}/success?session_id=${checkoutSession.id}`;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }

  return res.status(201).json({
    checkoutUrl: checkoutSession.url,
  });
}
