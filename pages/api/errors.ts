import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //   console.log(req);

  if (req.method === 'POST') {
    console.log(req.body);

    res.send(req.body);
  }
};
