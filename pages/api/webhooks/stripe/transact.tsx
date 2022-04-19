import { buffer } from 'micro';
import * as admin from 'firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';
// import type { Stripe } from '@stripe/stripe-js';
const serviceAccount =
  require('/pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;

const firebaseAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

const fulfillCapabilityUpdate = async (capabilityUpdate: any) => {
  const customAccount = await stripe.accounts.retrieve(
    capabilityUpdate.account
  );

  // const person = await stripe.accounts.retrievePerson(
  //   capabilityUpdate.account,
  //   customAccount.individual.id
  // );

  // console.log(person);

  // console.log(
  //   'neccessary actions:',
  //   customAccount.requirements.currently_due[0]
  // );
  // firebaseAdmin.firestore().collection('accessCodes').doc('Payment').set({
  //   obinsunId: customAccount.id,
  // });

  // firebaseAdmin
  //   .firestore()
  //   .collection('users')
  //   .doc(customAccount.metadata.transactId)
  //   .collection('custom_account')
  //   .doc(customAccount.id)
  //   .set({
  //     last_time_updated: admin.firestore.FieldValue.serverTimestamp(),
  //   });

  return firebaseAdmin
    .firestore()
    .collection('users')
    .doc(customAccount.metadata.transactId)
    .update({
      stripeId: customAccount.id,
      // personId: customAccount.individual.id,
      last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
      // neccessary_actions: customAccount.requirements.currently_due[0],
      neccessary_actions: customAccount.requirements,
      verification: customAccount.individual.verification,
      // business_info: customAccount.
      personal_info: {
        dob: customAccount.individual.dob,
        phone: customAccount.individual.phone,
        ssnLast4: customAccount.individual.ssn_last_4_provided,
      },
    })
    .then(() => {
      console.log(
        `SUCCESS: Account ${customAccount.id} has been added to firestore`
      );
    });
};

const fulfillAccountUpdate = async (accountUpdate: any) => {
  const customAccountUpdate = await stripe.accounts.retrieve(accountUpdate.id);
  console.log(customAccountUpdate);

  return firebaseAdmin
    .firestore()
    .collection('users')
    .doc(customAccountUpdate.metadata.transactId)
    .update({
      last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
      neccessary_actions: customAccountUpdate.requirements,
      individualVerification: customAccountUpdate.individual.verification,
      companyVerification: customAccountUpdate.company.verification,
      external_accounts: customAccountUpdate.external_accounts,
      stripe_metadata: customAccountUpdate.metadata,
    })
    .then(() => {
      console.log(
        `SUCCESS: Account ${customAccountUpdate.id} has been updated`
      );
    });
};

const fulfillExternalAccountCreation = async (externalAccountCreation: any) => {
  // const externalAccount = await stripe.accounts.retrieveExternalAccount(externalAccountCreation.id);
  // console.log(customAccountUpdate);

  const customExternalAccountUpdate = await stripe.accounts.retrieve(
    externalAccountCreation.id
  );
  console.log(customExternalAccountUpdate);

  return firebaseAdmin
    .firestore()
    .collection('users')
    .doc(customExternalAccountUpdate.metadata.transactId)
    .update({
      last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
      neccessary_actions: customExternalAccountUpdate.requirements,
      verification: customExternalAccountUpdate.individual.verification,
      external_accounts: customExternalAccountUpdate.external_accounts,
    })
    .then(() => {
      console.log(
        `SUCCESS: Account ${customExternalAccountUpdate.id} has been updated`
      );
    });
};

// const fulfillPersonUpdate = async (personUpdate: any) => {
//   const person = await stripe.accounts.retrievePerson(
//     personUpdate.id
//   );

//   return firebaseAdmin
//     .firestore()
//     .collection('users')
//     .doc(person.metadata.transactId)
//     .update({
//       personId: person.id,
//       last_stripe_update: admin.firestore.FieldValue.serverTimestamp(),
//             personal_info: {
//         dob: person.individual.dob,
//         phone: person.individual.phone,
//         ssnLast4: person.individual.ssn_last_4,
//       },
//     })
//     .then(() => {
//       console.log(
//         `SUCCESS: Account ${person.id} has been added to firestore`
//       );
//     });
// };

const fulfillCustomerCreation = async (customerCreation: any) => {
  const customerAccount = await stripe.customers.retrieve(customerCreation.id);

  return firebaseAdmin
    .firestore()
    .collection('users')
    .doc(customerAccount.metadata.username)
    .update({
      customerId: customerAccount.id,
    })
    .then(() => {
      console.log(
        `SUCCESS: Account ${customerAccount.id} has been added to firestore`
      );
    });
};

const fulfillCustomerUpdate = async (customerUpdate: any) => {
  const customerAccount = await stripe.customers.retrieve(customerUpdate.id);

  return firebaseAdmin
    .firestore()
    .collection('users')
    .doc(customerAccount.metadata.username)
    .update({
      shipping: customerAccount.shipping,
    })
    .then(() => {
      console.log(`SUCCESS: Updated ${customerAccount.id} shipping address.`);
    });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err: any) {
      console.log('ERROR', err.message);
      return res.status(400).send(`Webhook error: ${err.message}`);
    }

    console.log(event);

    // Handle the event
    switch (event.type) {
      case 'account.updated':
        const accountUpdate = event.data.object;
        // console.log('accountUpdate:', event.pending_webhooks);
        // res.status(200).send('account updated');
        return (
          fulfillAccountUpdate(accountUpdate)
            // .then(() => res.status(200).send('successfully updated account'))
            .then(() => res.status(200))
            .catch((err) =>
              res.status(400).send(`Webhook Error: ${err.message}`)
            )
        );

        break;
      case 'account.external_account.created':
        const externalAccountCreation = event.data.object;
        // res.status(200).send('external account created');
        return fulfillExternalAccountCreation(externalAccountCreation)
          .then(() => res.status(200))
          .catch((err: any) =>
            res.status(400).send(`Webhook Error: ${err.message}`)
          );

        break;
      case 'account.external_account.deleted':
        const externalAccountDeletion = event.data.object;
        res.status(200).send('external account deleted');

        break;
      case 'account.external_account.updated':
        const externalAccountUpdate = event.data.object;
        res.status(200).send('external account updated');

        break;
      case 'application_fee.created':
        const applicationFeeCreation = event.data.object;
        res.status(200).send('application fee created');

        break;
      case 'balance.available':
        const balanceAvailable = event.data.object;
        res.status(200).send('balance available');

        break;
      case 'capability.updated':
        const capabilityUpdate = event.data.object;
        console.log('capabilityUpdate:', event.pending_webhooks);
        return fulfillCapabilityUpdate(capabilityUpdate)
          .then(() => res.status(200).send('successfully updated capibility'))
          .catch((err) =>
            res.status(400).send(`Webhook Error: ${err.message}`)
          );
        // res.status(200).send('capability updated');

        break;
      case 'charge.captured':
        const chargeCapture = event.data.object;
        res.status(200).send('charge captured');

        break;
      case 'charge.expired':
        const chargeExpiration = event.data.object;
        res.status(200).send('charge expired');

        break;
      case 'charge.failed':
        const chargeFailure = event.data.object;
        res.status(200).send('charge failed');

        break;
      case 'charge.pending':
        const chargePending = event.data.object;
        res.status(200).send('charge pending');

        break;
      case 'charge.refunded':
        const chargeRefund = event.data.object;
        res.status(200).send('charge refunded');

        break;
      case 'charge.succeeded':
        const chargeSuccess = event.data.object;
        res.status(200).send('charge succeeded');

        break;
      case 'charge.updated':
        const chargeUpdate = event.data.object;
        res.status(200).send('charge updated');

        break;
      case 'coupon.created':
        const couponCreation = event.data.object;
        res.status(200).send('coupon created');

        break;
      case 'coupon.deleted':
        const couponDeletion = event.data.object;
        res.status(200).send('coupon deleted');

        break;
      case 'coupon.updated':
        const couponUpdate = event.data.object;
        res.status(200).send('coupon updated');
        break;
      case 'customer.created':
        const customerCreation = event.data.object;
        return fulfillCustomerCreation(customerCreation)
          .then(() => res.status(200).send('successfully created customer'))
          .catch((err) =>
            res.status(400).send(`Webhook Error: ${err.message}`)
          );

        break;
      case 'customer.deleted':
        const customerDeletion = event.data.object;
        res.status(200).send('customer deleted');

        break;
      case 'customer.updated':
        const customerUpdate = event.data.object;
        console.log(customerUpdate);
        res.status(200).send('customer updated');
        return fulfillCustomerUpdate(customerUpdate)
          .then(() =>
            // res.status(200).json({ message: 'successfully updated customer' })
            res.status(200)
          )
          .catch((err) =>
            res.status(400).send(`Webhook Error: ${err.message}`)
          );
        break;
      case 'customer.discount.created':
        const discountCreation = event.data.object;
        res.status(200).send('discount created');

        break;
      case 'customer.discount.deleted':
        const discountDeletion = event.data.object;
        res.status(200).send('discount deleted');

        break;
      case 'file.created':
        const fileCreation = event.data.object;
        res.status(200).send('file created');

        break;
      case 'identity.verification_session.canceled':
        const verificationSessionCancelation = event.data.object;
        res.status(200).send('verification session canceled');

        break;
      case 'identity.verification_session.created':
        const verificationSessionCreation = event.data.object;
        res.status(200).send('verification session created');

        break;
      case 'identity.verification_session.processing':
        const verificationSessionProcess = event.data.object;
        res.status(200).send('identification session processing');

        break;
      case 'identity.verification_session.requires_input':
        const verificationSessionRequire = event.data.object;
        res.status(200).send('identification session requires input');

        break;
      case 'identity.verification_session.verified':
        const verificationSessionIdentification = event.data.object;
        res.status(200).send('identification session verified');

        break;
      case 'invoice.created':
        const invoiceCreation = event.data.object;
        res.status(200).send('invoice created');

        break;
      case 'invoice.deleted':
        const invoiceDeletion = event.data.object;
        res.status(200).send('invoice deleted');

        break;
      case 'invoice.finalization_failed':
        const invoiceFailure = event.data.object;
        res.status(200).send('invoice finalization failed');

        break;
      case 'invoice.finalized':
        const invoiceFinalization = event.data.object;
        res.status(200).send('invoice finalized');

        break;
      case 'invoice.marked_uncollectible':
        const invoiceUncollected = event.data.object;
        res.status(200).send('invoice uncollectible');

        break;
      case 'invoice.paid':
        const invoicePayment = event.data.object;
        res.status(200).send('invoice paid');

        break;
      case 'invoice.payment_action_required':
        const invoicePaymentAction = event.data.object;
        res.status(200).send('invoice payment action required');

        break;
      case 'invoice.payment_failed':
        const invoicePaymentFailure = event.data.object;
        res.status(200).send('invoice payment failed');

        break;
      case 'invoice.payment_succeeded':
        const invoiceSuccess = event.data.object;
        res.status(200).send('invoice payment succeeded');

        break;
      case 'invoice.sent':
        const invoiceSent = event.data.object;
        res.status(200).send('invoice sent');

        break;
      case 'invoice.upcoming':
        const invoiceUpcoming = event.data.object;
        res.status(200).send('invoice upcoming');

        break;
      case 'invoice.updated':
        const invoiceUpdate = event.data.object;
        res.status(200).send('invoice updated');

        break;
      case 'invoice.voided':
        const invoiceVoid = event.data.object;
        res.status(200).send('invoice voided');

        break;
      case 'invoiceitem.created':
        const invoiceitemCreation = event.data.object;
        res.status(200).send('invoice item created');

        break;
      case 'invoiceitem.deleted':
        const invoiceitemDeletion = event.data.object;
        res.status(200).send('invoice item deleted');

        break;
      case 'invoiceitem.updated':
        const invoiceitemUpdate = event.data.object;
        res.status(200).send('invoice item update');

        break;
      case 'issuing_dispute.closed':
        const issuingDisputeClosure = event.data.object;
        res.status(200).send('issuing dispute closed');

        break;
      case 'issuing_dispute.created':
        const issuingDisputeCreation = event.data.object;
        res.status(200).send('issuing dispute created');

        break;
      case 'issuing_dispute.funds_reinstated':
        const issuingDisputeFundsReinstated = event.data.object;
        res.status(200).send('issuing dispute funds reinstated');

        break;
      case 'issuing_dispute.submitted':
        const issuingDisputeSubmition = event.data.object;
        res.status(200).send('issuing dispute submitted');

        break;
      case 'issuing_dispute.updated':
        const issuingDisputeUpdate = event.data.object;
        res.status(200).send('issuing dispute updated');

        break;
      case 'issuing_transaction.created':
        const issuingTransactionCreation = event.data.object;
        res.status(200).send('issuing transaction created');

        break;
      case 'issuing_transaction.updated':
        const issuingTransactionUpdate = event.data.object;
        res.status(200).send('issuing transaction updated');

        break;
      case 'order.created':
        const orderCreation = event.data.object;
        res.status(200).send('order created');

        break;
      case 'order.payment_failed':
        const orderPaymentFailure = event.data.object;
        res.status(200).send('order payment failed');

        break;
      case 'order.payment_succeeded':
        const orderPaymentSucess = event.data.object;
        res.status(200).send('order payment succeeded');

        break;
      case 'order.updated':
        const orderUpdate = event.data.object;
        res.status(200).send('order updated');

        break;
      case 'order_return.created':
        const orderReturnCreation = event.data.object;
        res.status(200).send('order return created');

        break;
      case 'payment_intent.amount_capturable_updated':
        const paymentIntentAmountCaptureableUpdate = event.data.object;
        res.status(200).send('payment intent amount capturable updated');

        break;
      case 'payment_intent.canceled':
        const paymentIntentCancelation = event.data.object;
        res.status(200).send('payment intent canceled');

        break;
      case 'payment_intent.created':
        const paymentIntentCreation = event.data.object;
        res.status(200).send('payment intent created');

        break;
      case 'payment_intent.payment_failed':
        const paymentIntentFailure = event.data.object;
        res.status(200).send('payment intent failed');

        break;
      case 'payment_intent.processing':
        const paymentIntentProcess = event.data.object;
        res.status(200).send('payment intent processing');

        break;
      case 'payment_intent.requires_action':
        const paymentIntentActionRequest = event.data.object;
        res.status(200).send('payment intent requires action');

        break;
      case 'payment_intent.succeeded':
        const paymentIntentSuccess = event.data.object;
        res.status(200).send('payment intent succeeded');

        break;
      case 'payment_link.created':
        const paymentLinkCreation = event.data.object;
        res.status(200).send('payment link created');

        break;
      case 'payment_link.updated':
        const paymentLinkUpdate = event.data.object;
        res.status(200).send('payment link updated');

        break;
      case 'payment_method.attached':
        const paymentMethodAttatchment = event.data.object;
        res.status(200).send('payment method attatched');

        break;
      case 'payment_method.automatically_updated':
        const paymentMethodAutomaticUpdate = event.data.object;
        res.status(200).send('payment method automatically updated');

        break;
      case 'payment_method.detached':
        const paymentMethodDetatchment = event.data.object;
        res.status(200).send('payment method detatched');

        break;
      case 'payment_method.updated':
        const paymentMethodUpdate = event.data.object;
        res.status(200).send('payment method updated');

        break;
      case 'payout.canceled':
        const payoutCancelation = event.data.object;
        res.status(200).send('payout canceled');

        break;
      case 'payout.created':
        const payoutCreation = event.data.object;
        res.status(200).send('payout created');

        break;
      case 'payout.failed':
        const payoutFailure = event.data.object;
        res.status(200).send('payout failed');

        break;
      case 'payout.paid':
        const payoutPay = event.data.object;
        res.status(200).send('payout paid');

        break;
      case 'payout.updated':
        const payoutUpdate = event.data.object;
        res.status(200).send('payout updated');

        break;
      case 'person.created':
        const personCreation = event.data.object;
        console.log('personCreation:', event.pending_webhooks);
        res.status(200).send('person created');

        break;
      case 'person.deleted':
        const personDeletion = event.data.object;
        res.status(200).send('person deleted');

        break;
      case 'person.updated':
        const personUpdate = event.data.object;
        // console.log('personUpdate:', event.pending_webhooks);
        res.status(200).send('person updated');

        break;
      case 'price.created':
        const priceCreation = event.data.object;
        res.status(200).send('price created');

        break;
      case 'price.deleted':
        const priceDeletion = event.data.object;
        res.status(200).send('price deleted');

        break;
      case 'price.updated':
        const priceUpdate = event.data.object;
        res.status(200).send('price updated');

        break;
      case 'product.created':
        const productCreation = event.data.object;
        res.status(200).send('product created');

        break;
      case 'product.deleted':
        const productDeletion = event.data.object;
        res.status(200).send('product deleted');

        break;
      case 'product.updated':
        const productUpdate = event.data.object;
        res.status(200).send('product updated');

        break;
      case 'radar.early_fraud_warning.created':
        const earlyFraudWarningCreation = event.data.object;
        res.status(200).send('radar early fraud warning created');

        break;
      case 'radar.early_fraud_warning.updated':
        const earlyFraudWarningUpdate = event.data.object;
        res.status(200).send('radar early fraud warning updated');

        break;
      case 'recipient.created':
        const recipientCreation = event.data.object;
        res.status(200).send('recipient created');

        break;
      case 'recipient.deleted':
        const recipientDeletion = event.data.object;
        res.status(200).send('recipient deleted');

        break;
      case 'recipient.updated':
        const recipientUpdate = event.data.object;
        res.status(200).send('recipient updated');

        break;
      case 'setup_intent.canceled':
        const setupIntentCancelation = event.data.object;
        res.status(200).send('setup intent canceled');

        break;
      case 'setup_intent.created':
        const setupIntentCreation = event.data.object;
        res.status(200).send('setup intent created');

        break;
      case 'setup_intent.requires_action':
        const setupIntentActionRequest = event.data.object;
        res.status(200).send('setup intent requires action');

        break;
      case 'setup_intent.setup_failed':
        const setupIntentFailure = event.data.object;
        res.status(200).send('setup intent failed');

        break;
      case 'setup_intent.succeeded':
        const setupIntentSuccess = event.data.object;
        res.status(200).send('setup intent succeeded');

        break;
      case 'tax_rate.created':
        const taxRateCreation = event.data.object;
        res.status(200).send('tax rate created');

        break;
      case 'tax_rate.updated':
        const taxRateUpdate = event.data.object;
        res.status(200).send('tax rate updated');

        break;
      case 'topup.canceled':
        const topupCancelation = event.data.object;
        res.status(200).send('topup canceled');

        break;
      case 'topup.created':
        const topupCreation = event.data.object;
        res.status(200).send('topup created');

        break;
      case 'topup.failed':
        const topupFailure = event.data.object;
        res.status(200).send('topup failed');

        break;
      case 'topup.reversed':
        const topupReverse = event.data.object;
        res.status(200).send('topup reversed');

        break;
      case 'topup.succeeded':
        const topupSuccess = event.data.object;
        res.status(200).send('topup succeeded');

        break;
      case 'transfer.created':
        const transferCreation = event.data.object;
        res.status(200).send('transfer created');

        break;
      case 'transfer.failed':
        const transferFailure = event.data.object;
        res.status(200).send('transfer failed');

        break;
      case 'transfer.paid':
        const transferPay = event.data.object;
        res.status(200).send('transfer paid');

        break;
      case 'transfer.reversed':
        const transferReverse = event.data.object;
        res.status(200).send('transfer reversed');

        break;
      case 'transfer.updated':
        const transferUpdate = event.data.object;
        res.status(200).send('transfer updated');

        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  } else {
    return res.status(204).send({});
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
