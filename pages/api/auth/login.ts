import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   const loginToken = await getToken({ req, secret: process.env.SECRET });
  //   const loginToken = getToken({ req, secret: process.env.SECRET });
  //   console.log({ logginedJWT: loginToken });
  //   res.send(JSON.stringify(loginToken, null, 2));
};
