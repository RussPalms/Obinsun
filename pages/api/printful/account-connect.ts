import * as admin from 'firebase-admin';
import axios from 'axios';

const serviceAccount =
  require('/pages/api/keys/photo-gallery-upload-firebase-adminsdk-wnbhz-ae0e426bf6') as string;

const clientId = process.env.PRINTFUL_CLIENT_ID;

const clientSecret = process.env.PRINTFUL_SECRET_KEY;

const redirectUrl = `${process.env.NEXTAUTH_URL}/settings`;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

const createAccessCode = async (
  printfulTokenData: any,
  firestoreAccess: any
) => {
  return app
    .firestore()
    .collection('users')
    .doc(firestoreAccess)
    .collection('printful')
    .doc('accessValues')
    .set({
      access_token: printfulTokenData.access_token,
      expires_at: printfulTokenData.expires_at,
      token_type: printfulTokenData.token_type,
      refresh_token: printfulTokenData.refresh_token,
    })
    .then(() => {
      console.log(
        `SUCCESS: Printful access token ${printfulTokenData.access_token} has been added to the DB`
      );
    });
};

async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const firestoreAccess = req.query.state;
    const printfulAccess = req.query.code;

    const getPrintfulToken = await axios.post(
      'https://www.printful.com/oauth/token',
      {
        grant_type: 'access_token',
        client_id: clientId,
        client_secret: clientSecret,
        code: printfulAccess,
      }
    );

    const response = await getPrintfulToken;
    const printfulTokenData = response.data;
    console.log(printfulTokenData);

    return createAccessCode(printfulTokenData, firestoreAccess)
      .then(() => res.redirect(307, redirectUrl))
      .catch((err) => res.status(400).send(`Error: ${err.message}`));
  }
}

export default handler;
