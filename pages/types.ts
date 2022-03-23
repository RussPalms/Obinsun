import type { NextApiRequest } from 'next';

declare global {
  interface Window {
    // Snipcart: any;
    StripeCheckout: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      'address-fields': any;
      // "snipcart-label": any;
      // "snipcart-input": any;
      'stripe-label': any;
      'stripe-input': any;
      // id: any;
      id: any;
    }
  }
}

// declare type basketTotal = number;

export interface total {
  basketTotal: number;
}

// export declare type total = number;

export type StripeWebhookEvent =
  // | "order.completed"

  // | 'order.payment_succeeded'
  // | 'checkout.session.completed'
  | 'payment_intent.succeeded'

  // | "order.status.changed"
  | 'order.updated'

  // | "order.paymentStatus.changed"
  | 'payment_method.updated'

  // | "order.trackingNumber.changed"

  // | "order.refund.created"
  // | 'charge.refunded'
  | 'order_return.created'

  // | "order.notification.created"
  | 'order.created'

  // | "subscription.created"
  | 'customer.subscription.created'

  // | "subscription.cancelled"
  | 'customer.subscription.deleted'

  // | "subscription.paused"
  | 'customer.subscription.pending_update_applied'

  // | "subscription.resumed"
  | 'customer.subscription.updated'

  // | "subscription.invoice.created"
  | 'invoice.created'

  // | "shippingrates.fetch"

  // | "taxes.calculate"
  // | 'tax_rate.created'
  | 'tax_rate.updated'

  // | "customauth:customer_updated";
  // | 'account.updated'
  // | "account.application.authorized"
  | 'account.external_account.updated';

export interface StripeWebhookContent {
  discounts: { [key: string]: any };
  items: { [key: string]: any };
  // products: { [key: string]: any };
  shippingAddress: {
    fullName: string;
    firstName?: string;
    name: string;
    company?: string;
    address1: string;
    address2?: string;
    fullAddress: string;
    city: string;
    country: string;
    postalCode: string;
    province: string;
    phone?: string;
  };
  shippingRateUserDefinedId?: string;
  [key: string]: any;
}

// export type SnipcartShippingRate = {
export type StripeShippingRate = {
  /** Shipping method's price. */
  cost: number;
  /** Name or description of the shipping method. */
  description: string;
  /** Estimated time for delivery in days. */
  guaranteedDaysToDelivery?: number;
  /** Internal ID of shipping method, can be useful when using shipping fulfillment solutions. */
  userDefinedId?: string;
};

export type StripeTaxItem = {
  name: string;
  amount: number;
  rate: number;
  numberForInvoice?: string;
  includedInPrice?: boolean;
  appliesOnShipping?: boolean;
};

export interface StripeRequest extends NextApiRequest {
  headers: {
    'x-stripe-requesttoken'?: string;
  };
  body: {
    eventName: StripeWebhookEvent;
    mode: string;
    createdOn: string;
    content: StripeWebhookContent;
  };
}

// export interface ISyncProduct {
//   id: string;
//   external_id: string;
//   name: string;
//   variants: [];
//   synced: number;
//   thumbnail_url: string;
//   is_ignored: boolean;
// }

export interface CartProduct {
  id: string;
  price: number;
  url: string;
  description: string;
  image: string;
  name: string;
}

export interface PrintfulProduct {
  id: string;
  name: string;
}

export interface PrintfulCatalog {
  id: string;
  name: string;
}

export type PrintfulShippingItem = {
  external_variant_id: string;
  quantity: number;
};

export default function _() {
  const div = document.createElement('div');
  return div;
}
