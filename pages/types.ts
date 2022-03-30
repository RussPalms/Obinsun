import type { NextApiRequest } from 'next';
import type { Session } from 'next-auth';
import type Stripe from 'stripe';

// declare global {
//   interface Window {
//     // Snipcart: any;
//     StripeCheckout: any;
//   }
//   namespace JSX {
//     interface IntrinsicElements {
//       'address-fields': any;
//       // "snipcart-label": any;
//       // "snipcart-input": any;
//       'stripe-label': any;
//       'stripe-input': any;
//       // id: any;
//       id: any;
//       session: Session;
//     }
//   }
// }

// declare type basketTotal = number;

export interface total {
  basketTotal: number;
}

// export declare type total = number;

export type StripeWebhookEvent =
  Stripe.WebhookEndpointCreateParams.EnabledEvent;

// export type StripeWebhookEvent =
//   | 'account.updated'
//   | 'account.external_account.created'
//   | 'account.external_account.deleted'
//   | 'account.external_account.updated'
//   | 'application_fee.created'
//   | 'balance.available'
//   | 'capability.updated'
//   | 'charge.captured'
//   | 'charge.expired'
//   | 'charge.failed'
//   | 'charge.pending'
//   | 'charge.refunded'
//   | 'charge.succeeded'
//   | 'charge.updated'
//   | 'coupon.created'
//   | 'coupon.deleted'
//   | 'coupon.updated'
//   | 'customer.created'
//   | 'customer.deleted'
//   | 'customer.updated'
//   | 'customer.discount.created'
//   | 'customer.discount.deleted'
//   | 'file.created'
//   | 'identity.verification_session.canceled'
//   | 'identity.verification_session.created'
//   | 'identity.verification_session.processing'
//   | 'identity.verification_session.requires_input'
//   | 'identity.verification_session.verified'
//   | 'invoice.created'
//   | 'invoice.deleted'
//   | 'invoice.finalization_failed'
//   | 'invoice.finalized'
//   | 'invoice.payment_succeeded'
//   | 'invoice.sent'
//   | 'invoice.upcoming'
//   | 'invoice.updated'
//   | 'invoice.voided'
//   | 'invoiceitem.created'
//   | 'invoiceitem.deleted'
//   | 'invoiceitem.updated'
//   | 'issuing_dispute.closed'
//   | 'issuing_dispute.created'
//   | 'issuing_dispute.funds_reinstated'
//   | 'issuing_dispute.submitted'
//   | 'issuing_dispute.updated'
//   | 'issuing_transaction.created'
//   | 'issuing_transaction.updated'
//   | 'order.created'
//   | 'order.payment_failed'
//   | 'order.payment_succeeded'
//   | 'order.updated'
//   | 'order_return.created'
//   | 'payment_intent.amount_capturable_updated'
//   | 'payment_intent.canceled'
//   | 'payment_intent.created'
//   | 'payment_intent.payment_failed'
//   | 'payment_intent.processing'
//   | 'payment_intent.requires_action'
//   | 'payment_intent.succeeded'
//   | 'payment_link.created'
//   | 'payment_link.updated'
//   | 'payment_method.attached'
//   | 'payment_method.automatically_updated'
//   | 'payment_method.detached'
//   | 'payment_method.updated'
//   | 'payout.canceled'
//   | 'payout.created'
//   | 'payout.failed'
//   | 'payout.paid'
//   | 'payout.updated'
//   | 'person.created'
//   | 'person.deleted'
//   | 'person.updated'
//   | 'price.created'
//   | 'price.deleted'
//   | 'price.updated'
//   | 'product.created'
//   | 'product.deleted'
//   | 'product.updated'
//   | 'radar.early_fraud_warning.created'
//   | 'radar.early_fraud_warning.updated'
//   | 'recipient.created'
//   | 'recipient.deleted'
//   | 'recipient.updated'
//   | 'setup_intent.canceled'
//   | 'setup_intent.created'
//   | 'setup_intent.requires_action'
//   | 'setup_intent.setup_failed'
//   | 'setup_intent.succeeded'
//   | 'tax_rate.created'
//   | 'tax_rate.updated'
//   | 'topup.canceled'
//   | 'topup.created'
//   | 'topup.failed'
//   | 'topup.reversed'
//   | 'topup.succeeded'
//   | 'transfer.created'
//   | 'transfer.failed'
//   | 'transfer.paid'
//   | 'transfer.reversed'
//   | 'transfer.updated';

// export type StripeActions =
// '*'
// |

export type PrintfulWebhookEvent =
  | 'package_shipped'
  | 'order_failed'
  | 'order_canceled'
  | 'order_refunded'
  | 'product_synced'
  | 'product_updated'
  | 'product_deleted'
  | 'stock_updated'
  | 'order_put_hold'
  | 'order_remove_hold'
  | 'package_returned'
  | 'order_created'
  | 'order_updated';

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
