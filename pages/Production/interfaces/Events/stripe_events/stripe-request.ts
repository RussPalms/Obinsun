import { NextApiRequest } from 'next';

type StripeEventId = string;

export interface StripeEventRequest extends NextApiRequest {
  id: StripeEventId;
}

export default function _() {}
