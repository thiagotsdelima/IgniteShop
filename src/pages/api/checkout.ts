import { stripe } from "@/src/services/stripe";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { priceId } = req.body;

  console.log("Price ID:", priceId);

  // aqui e para ussuario nao acessar pelo url, inpede de add direto na URL
  if (req.method !== 'POST') {
    console.log("Method not allowed!");
    return res.status(405).json({ error: 'Method not allowed!' })
  }  

  if (!priceId) {
    console.log("Price not found!")
    return res.status(400).json({ error: 'Price not found!' })
  }
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`
  const cancelUrl = `${process.env.NEXT_URL}/`

  
  console.log("Success URL:", successUrl); 
  console.log("Cancel URL:", cancelUrl);

const checkoutSession = await stripe.checkout.sessions.create({
  success_url: successUrl, 
  cancel_url: cancelUrl, 
  mode: 'payment', 
  line_items: [
    {
      price: priceId,
      quantity: 1,
    }
  ],
})
console.log("Checkout Session:", checkoutSession);
return res.status(201).json({
  checkoutUrl: checkoutSession.url,
})
}