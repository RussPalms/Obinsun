import { NextApiResponse, NextApiRequest } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const [dbAttributes] = req.body;
    console.log(dbAttributes);
    // res.status(201).json({ sentKeys: dbAttributes });
    res.status(201).send(JSON.stringify({ sentKeys: dbAttributes }));
  }
};
