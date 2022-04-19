import type { NextApiRequest, NextApiResponse } from 'next';
// const fs = require('fs/promises');
var fs = require('fs');
const svgoPkg = require('svgo/package.json');
const { optimize } = require('svgo');
import { buffer } from 'micro';
import fileUpload from 'pages/server/middlewares/fileUpload';
import nextConnect from 'next-connect';

type Data = {
  success: boolean;
  //   error: string;
  message: string;
};

const redirectUrl = `${process.env.NEXTAUTH_URL}/studio`;

// const handler = nextConnect() as any;
const handler = nextConnect() as any;
handler.use(fileUpload);

handler.post(async (req: any, res: any) => {
  console.log(req.body);
  console.log(req.files.svg[0].headers);

  const svgFile = req.files;

  // store string data
  // const retrievedSvg = Object.values(req.files)[0][0];

  // const tag = fs.readFileSync(retrievedSvg.path, 'utf8');

  // get string path
  // const svgPath = retrievedSvg.path;
  // const svgString = fs.readFileSync(svgPath, 'utf8');

  // const content = await fs.readFile(retrievedSvg.path, 'utf-8');
  // console.log(JSON.parse(content));

  // const range = document.createRange();
  // range.selectNode(document.documentElement);

  // const strToEl = (svgString: any) => {
  //   const outputString = range.createContextualFragment(String(svgString))
  //     .children[0];
  //   return outputString;
  // };

  // const entityMap = {
  //   '&': '&amp;',
  //   '<': '&lt;',
  //   '>': '&gt;',
  //   '"': '&quot;',
  //   "'": '&#39;',
  //   '/': '&#x2F;',
  // };

  // const escapeHTML = String(outputString).replace(/[&<>"'/]/g, (s) => entityMap[s]);

  // string data
  // console.log(svgString);

  // const xmlString = new DOMParser().parseFromString(svgString, 'image/svg+xml')

  // const document = xmlString.firstChild
  // const document = xmlString.lastChild.innerHTML
  // const document = xmlString.lastChild

  // const document = xmlString

  // const htmlInner = document.innerHTML

  // const firstChildSelector = document.firstChild.firstChild.innerHTML

  // console.log(svgString);

  // const result = optimize(svgString, {
  //   // optional but recommended field
  //   path: svgPath,
  //   // all config fields are also available here
  //   multipass: true,
  // });
  // const optimizedSvgString = result.data;

  //...
  // res.status(200).JSON({ message: 'file was uploaded' }, req.files);
  // return res.status(200).json('recieved file');
  return res.status(200);
  // return res.redirect(307, redirectUrl);
  // return res.end('recieved file');
});

// handler.get(async (req: any, res: any) => {
//   console.log(req.files);

//   res.status(200).send(req.files);
// });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;

// export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   if (req.method == 'POST') {
//   const svgData = req.body;

//   const { filePath } = svgData;

//   console.log(filePath);
//   res.status(200).json({ success: true, message: 'recieved svg' });
// };

// if (req.method == 'GET') {

// }

// };

// export const apiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   console.log({ ncRequest: req });

//   if (req.method == 'POST') {
//     console.log(req.body);

//     return res.status(200).json('recieved svg file');
//   }
// };
