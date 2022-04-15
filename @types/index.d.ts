// declare module "*.svg" {
// 	const content: any;
// 	export default content;
// }

import { DefaultSession } from 'next-auth';
import { ExternalAccountCreateParams } from 'stripe';
// export import react from './jsx'
import JSX from './jsx';

declare module 'next-auth' {
  interface Session {
    user?: {
      role?: string;
      // stripeId?: string;
      customerId?: string;
      // personId?: string;
      username?: string;
      firstname?: string;
      lastname?: string;
      obinsunId?: string;
      firestoreId?: string;
      registeredInfo?: {
        userCountryCode: string;
        userCurrency: string;
        userFlag: string;
        // address?: {
        //   line1?: string;
        //   line2?: string;
        //   city?: string;
        //   postal_code?: string;
        //   state?: string;
        // };
      };
      shipping?: {
        address?: {
          line1?: string;
          line2?: string;
          city?: string;
          postal_code?: string;
          state?: string;
        };
        name?: string;
        phone?: string;
      };
      neccessary_actions?: Object<T>;
      personal_info?: Object<T>;
      verification?: Object<T>;
      external_accounts?: Object<T>;
      permissions?: { admin: [Object] };
    } & DefaultSession['user'];
    expires?: DefaultSession['expires'];
    id?: string;
  }
}

// declare module 'stripe' {
//   interface Stripe {
//     AccountsResource: {
//       // external_account: {} | string;
//       createExternalAccount<string, ExternalAccountCreateParams, RequestOptions>
//     } & ExternalAccountCreatParams['external_account'];
//   }
// }

// Stripe.AccountsResource.createExternalAccount(id: string, params: Stripe.ExternalAccountCreateParams, options?: Stripe.RequestOptions): Promise<Stripe.Response<Stripe.BankAccount | Stripe.Card>>

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
// declare namespace JSX {
//   interface IntrinsicAttributes {
//     session: Session;
//   } & JSX['Element']
// }
