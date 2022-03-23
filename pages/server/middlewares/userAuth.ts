// server/middlewares/userAuth.js
// ----------------------------------------
import { getSession } from 'next-auth/react';

// check if user is authenticated
export const userAuth = async (req: any, res: any, next: any) => {
  // store session into request to pass it to following middlewares
  req.session = await getSession({ req });
  if (!req.session) {
    return res.status(403).send({
      ok: false,
      message: `User authentication required.`,
    });
  }
  return next();
};

export default function _() {
  const div = document.createElement('div');
  return div;
}
