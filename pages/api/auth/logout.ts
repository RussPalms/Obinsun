import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   const logoutToken = await getToken({ req, secret: process.env.SECRET });
  //   const logoutToken = getToken({ req, secret: process.env.SECRET });
  //   console.log({ loggedoutJWT: logoutToken });
  //   res.send(JSON.stringify(logoutToken, null, 2));
};
