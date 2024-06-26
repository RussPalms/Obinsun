// import type { NextApiRequest, NextApiResponse } from 'next';
// import { printful } from '../../server/lib/printful-client';
// import { PrintfulShippingItem, StripeShippingRate } from '../../types';

// interface StripeRequest extends NextApiRequest {
//   body: {
//     eventName: string;
//     mode: string;
//     createdOn: string;
//     content: { [key: string]: any };
//   };
// }

// type Data = {
//   /** An array of shipping rates. */
//   rates: StripeShippingRate[];
// };

// type Error = {
//   errors: { key: string; message: string }[];
// };

// export default async function handler(
//   req: StripeRequest,
//   res: NextApiResponse<Data | Error>
// ) {
//   const { eventName, content } = req.body;

//   if (eventName !== 'shippingrates.fetch') return res.status(200).end();
//   if (content.items.length === 0) return res.status(200).end();

//   const {
//     items: cartItems,
//     shippingAddress1,
//     shippingAddress2,
//     shippingAddressCity,
//     shippingAddressCountry,
//     shippingAddressProvince,
//     shippingAddressPostalCode,
//     shippingAddressPhone,
//   } = content;

//   const recipient = {
//     ...(shippingAddress1 && { address1: shippingAddress1 }),
//     ...(shippingAddress2 && { address2: shippingAddress2 }),
//     ...(shippingAddressCity && { city: shippingAddressCity }),
//     ...(shippingAddressCountry && { country_code: shippingAddressCountry }),
//     ...(shippingAddressProvince && { state_code: shippingAddressProvince }),
//     ...(shippingAddressPostalCode && { zip: shippingAddressPostalCode }),
//     ...(shippingAddressPhone && { phone: shippingAddressPhone }),
//   };

//   const items: PrintfulShippingItem[] = cartItems.map(
//     (item: any): PrintfulShippingItem => ({
//       external_variant_id: item.id,
//       quantity: item.quantity,
//     })
//   );

//   try {
//     const { result } = await printful.post('shipping/rates', {
//       recipient,
//       items,
//     });

//     res.status(200).json({
//       rates: result.map((rate: any) => ({
//         cost: rate.rate,
//         description: rate.name,
//         userDefinedId: rate.id,
//         guaranteedDaysToDelivery: rate.maxDeliveryDays,
//       })),
//     });
//   } catch ({ error }) {
//     console.log(error);
//     res.status(200).json({
//       errors: [
//         {
//           key: error?.reason,
//           message: error?.message,
//         },
//       ],
//     });
//   }
// }

export default function _() {
  const div = document.createElement('div');
  return div;
}
