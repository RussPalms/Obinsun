// import { NextApiRequest, NextApiResponse } from "next";
// import * as jwt from "next-auth/jwt";

// const secret = process.env.NEXTAUTH_SECRET as any;

// // this is 1 way to add protectecd api routes, by checking to see if you can read the json web token

// export default async (req: any, res: any) => {
// 	const token = await jwt.getToken({ req, secret });
// 	res.sen(JSON.stringify(token, undefined, 2));
// };

export default function _() {
  const div = document.createElement('div');
  return div;
}
