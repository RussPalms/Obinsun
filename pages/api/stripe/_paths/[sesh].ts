import { buffer } from 'micro';

import type Fetch from 'node-fetch';
import type { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';

const fetch: typeof Fetch = require('node-fetch');
import * as admin from 'firebase-admin';
const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

const serviceAccount =
  require('/pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;
const firebaseAdmin = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const endpointSecret = `${process.env.STRIPE_SIGNING_SECRET}`;

export const seshHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const aquireSesh = async (seshAction: string) => {
    return await new Promise(async (resolveSesh, rejectSesh) => {
      await fetch(`${endpointSecret}`)
        .then((seshResponse) => seshResponse.text())
        .then((seshData) => {
          const [seshStatus, seshInfo] = String(seshData).split('~');
          if (seshStatus !== '1') {
            throw new Error('Unable to fetch sesh');
          }
          resolveSesh(seshInfo);
        })
        .catch(() => {
          resolveSesh('seshBase');
        });
    }).catch((seshErrors) => {
      console.error({ SeshErrorMessage: seshErrors.raw.message });
      console.dir(
        {
          'sesh-error-logger': seshErrors,
        },
        {
          depth: null,
          maxArrayLength: null,
          colors: true,
        }
      );
    });
  };

  if (req.method === 'GET') {
    let seshRetrieve: Object;

    console.dir(
      {
        'sesh-retrieval-logger': seshRetrieve,
      },
      {
        depth: null,
        maxArrayLength: null,
        colors: true,
      }
    );
    return res.status(200);
  }

  if (req.method === 'POST') {
    let seshManifest: Object;

    console.dir(
      {
        'sesh-manifest-logger': seshManifest,
      },
      {
        depth: null,
        maxArrayLength: null,
        colors: true,
      }
    );
    return res.status(200);
  }

  if (req.method === 'PUT') {
    let seshAmmend: Object;

    console.dir(
      {
        'sesh-ammending-logger': seshAmmend,
      },
      {
        depth: null,
        maxArrayLength: null,
        colors: true,
      }
    );
    return res.status(200);
  }

  if (req.method === 'DELETE') {
    let seshForget: Object;

    console.dir(
      {
        'sesh-forgetter-logger': seshForget,
      },
      {
        depth: null,
        maxArrayLength: null,
        colors: true,
      }
    );
    return res.status(200);
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
