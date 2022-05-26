import { NextApiResponse, NextApiRequest } from 'next';
import { keyCreation } from 'pages/Production/interfaces/objects/obinsun-objects';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  let dbEndpoint = req.method;

  const getKeys = (fetchedKeys: keyCreation[]) => {
    return fetchedKeys;
  };

  switch (dbEndpoint) {
    case 'POST':
      const dbAttributes: keyCreation[] = req.body;
      console.log({ dbKeys: dbAttributes });
      res.status(201).send(JSON.stringify({ sentKeys: dbAttributes }));

      const keys = dbAttributes;

      return keys;

    case 'GET':
      return getKeys(keys);
  }
};
