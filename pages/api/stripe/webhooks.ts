import type { NextApiResponse } from 'next';
import createOrder from '../../server/lib/create-order';
import { StripeRequest, StripeWebhookEvent } from '../../types';

// import createOrder from "../../../lib/create-order";

// import type { SnipcartRequest, SnipcartWebhookEvent } from "../../../types";

export default async function handler(
  req: StripeRequest,
  res: NextApiResponse
) {
  const allowedEvents: StripeWebhookEvent[] = [
    'order.completed' as any,
    'customauth:customer_updated' as any,
  ];

  console.log(req.headers);
  const token = req.headers['x-stripe-requesttoken'];
  console.log(token);

  const { eventName, content } = req.body;

  if (req.method !== 'POST')
    return res.status(405).json({ message: 'Method not allowed' });

  if (!allowedEvents.includes(eventName))
    return res.status(400).json({ message: 'This event is not permitted' });

  // if (!token) return res.status(401).json({ message: "Not Authorized" });

  // try {
  //   const verifyToken = await fetch(
  //     `https://app.snipcart.com/api/requestvalidation/${token}`
  //   );

  //   if (!verifyToken.ok)
  //     return res.status(401).json({ message: "Not Authorization" });
  // } catch (err) {
  //   console.log(err);
  //   return res
  //     .status(500)
  //     .json({ message: "Unable to verify Snipcart webhook token" });
  // }

  try {
    switch (eventName) {
      case 'order.completed' as any:
        await createOrder(content);
        break;
      case 'customauth:customer_updated' as any:
        return res
          .status(200)
          .json({ message: 'Customer updated - no action taken' });
      default:
        throw new Error('No such event handler exists');
    }

    res.status(200).json({ message: 'Done' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Something went wrong' });
  }
}

// export {};
