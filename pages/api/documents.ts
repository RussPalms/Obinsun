import type { NextApiRequest, NextApiResponse } from 'next';
// const fs = require('fs/promises');

// import type {fs} from 'fs'
// var fs = require('fs');
const fs = require('fs');
// const fs = require('file-system');

// const svgoPkg = require('svgo/package.json');
// const { optimize } = require('svgo');
// import { buffer } from 'micro';
import documentUpload from 'pages/server/middlewares/documentUpload';
import nc from 'next-connect';
import type Stripe from 'stripe';
import { File } from 'node-fetch';

// type Data = {
//   success: boolean;
//   message: string;
// };

const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

// const handler = nc() as any;
// handler.use(documentUpload);

// handler.post(async (req: any, res: any) => {
//   // console.log(req);
//   // console.log(req.body);
//   // console.log(req.files.documentVerification[0].headers);
//   // console.log(Object.values(req.files)[0][0]);
//   // console.log(req.files);

//   const sentFile = req.files.documentVerification[0];
//   // const sentInfo = Object.values(req.files)[0][1];

//   const sentInfo = req.files.accountInfo[0];

//   // console.log(sentDocument);
//   // console.log(sentInfo);
//   // console.log(sentFile);

//   // const accountInformation = JSON.parse(req.files.accountInfo[0].headers);
//   // console.log(req.files.accountInfo[0].headers);

//   const documentPath = sentFile.path;
//   const documentName = sentFile.originalFilename;

//   // const accountInformation = fs.readFileSync(sentInfo.path, 'text');
//   const accountInformation = fs.readFileSync(sentInfo.path);
//   // const accountInformation = await fs.readFile(sentInfo.path, 'utf-8');
//   // console.log(accountInformation);
//   // let arr:any
//   // arr.push(...accountInformation)
//   // console.log(JSON.parse(accountInformation));

//   // console.log(accountInformation.length);

//   // const bufferData = Buffer.from(accountInformation).toJSON();

//   // console.log(bufferData);

//   const { stripeAccess, username } = JSON.parse(accountInformation);
//   // const documentData = await fs.readFileSync(documentPath);
//   const documentData = fs.readFileSync(documentPath);

//   const bufferData = Buffer.from(documentData).toJSON().data;

//   // console.log(bufferData);

//   // const decodedUrl = decodeURI(documentPath);

//   // console.log(decodedUrl);
//   // const documentData = fs.readFileSync(decodedUrl);
//   // await fs
//   //   .readFileSync(documentPath)
//   //   .then(async (docData: any) => {
//   //     const file = await stripe.files
//   //       .create(
//   //         {
//   //           purpose: 'account_requirement',
//   //           file: {
//   //             data: docData,
//   //             name: documentName,
//   //             type: 'application/octet-stream',
//   //           },
//   //         },
//   //         {
//   //           stripeAccount: stripeAccess,
//   //         }
//   //       )
//   //       .catch((err) => console.log(err));

//   //     console.log(file);
//   //   })
//   //   .catch((err:any) => console.log(err));
//   // console.log(documentPath, documentName);
//   // console.log(documentData);
//   // console.log(stripeAccess, username);

//   // console.log(fs.readFileSync('./success.png'));

//   // const submitVerification = async(access, identifier, userInfo, userData) => {

//   // }

//   // console.log(typeof documentData);

//   // const saveImage = (filename: string, data: any) => {
//   //   // let myBuffer = new Buffer(data.length);
//   //   let myBuffer = Buffer.from(data.length);
//   //   // let myBuffer = Buffer.from(data).toJSON().data;
//   //   for (let i = 0; i < data.length; i++) {
//   //     myBuffer[i] = data[i];
//   //   }
//   //   // fs.writeFile(`./${filename}`, myBuffer, (err) => {
//   //   fs.writeFile(filename, myBuffer, (err: any) => {
//   //     if (err) {
//   //       console.log(err);
//   //     } else {
//   //       console.log('The file was saved!');
//   //     }
//   //   });
//   // };

//   // saveImage(`pages/api/${documentName}`, documentData);

//   let buffer = Buffer.from(new Uint8Array(documentData.length));

//   fs.writeFileSync(`pages/api/${documentName}`, buffer);

//   // let all = fs.createWriteStream(`pages/api/${documentName}`);

//   // for (let i = 0; i < bufferData.length; i++) {
//   //   // var buffer = new Buffer( new Uint8Array(bufferData[i]) );
//   //   let buffer = Buffer.from(new Uint8Array(bufferData[i]));
//   //   all.write(buffer);
//   // }
//   // all.end();

//   // fs.appendFileSync(`pages/api/${documentName}`, Buffer.from(bufferData));
//   // fs.appendFileSync(`pages/api/${documentName}`, Buffer.from(documentData));

//   // const file = await stripe.files
//   //   .create(
//   //     {
//   //       purpose: 'account_requirement',
//   //       file: {
//   //         //   data: fs.readFileSync(cameraImage.replace(/(\r\n|\n|\r)/gm, '')),
//   //         // data: documentData,
//   //         // data: documentData,
//   //         // data: fs.readFileSync(`./${documentName}`),
//   //         data: fs.readFileSync(documentPath),
//   //         // data: fs.readFileSync('./success.png'),
//   //         name: documentName,
//   //         // name: 'success.png',
//   //         type: 'application/octet-stream',
//   //         // type: 'image/png',
//   //       },
//   //     },
//   //     {
//   //       stripeAccount: stripeAccess,
//   //       // stripeAccount: 'acct_1KooKoQVTD5TWxMX',
//   //     }
//   //   )
//   //   .catch((err) => console.log(err));
//   // // .catch((err) => err.json())
//   // // .then((error) => console.log(error));

//   // console.log(file);

//   // await stripe.accounts.update(stripeAccess, {
//   //   company: { verification: { document: { front: file.id } } },
//   //   metadata: { username },
//   // });

//   // console.log(req.previewData);

//   // const documentFile = req.files;
//   return res.status(200);
// });

// export const config = {
//   api: {
//     bodyParser: false,
//     // externalResolver: true,
//   },
// };

// export default handler;

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const {
      id,
      cameraImage,
      createdAt,
      documentName,
      description,
      stripeId,
      username,
    } = JSON.parse(req.body);

    console.log(cameraImage);

    const dataurl = cameraImage;
    const regex = /^data:.+\/(.+);base64,(.*)$/;
    const matches = dataurl.match(regex);
    const ext = matches[1];
    const data = matches[2];
    const buffer = Buffer.from(data, 'base64');
    fs.writeFileSync(`pages/api/${documentName}.` + ext, buffer);

    // console.log(req.body.cameraImage);

    // console.log(cameraImage);

    // console.log(req.body);

    // console.log(JSON.parse(req.body));

    // const documentBuffer = fs.readFileSync(cameraImage);
    //
    // const documentBuffer = Buffer.from(cameraImage, 'base64');
    // console.log(documentBuffer);
    //
    // const base64 = fs.readFileSync(cameraImage);

    // console.log(base64);

    // const documentRead = fs.writeFileSync(`${documentName}.png`, base64);
    // const documentRead =
    //
    // console.log(fs.writeFileSync(`${documentName}.png`, documentBuffer));
    //
    // const documentRead = fs.writeFileSync(`${documentName}.png`, cameraImage);

    // console.log(documentRead);
    // console.log(fs);

    // const dataURLtoFile = (dataurl, filename) => {
    //   const arr = dataurl.split(',');
    //   const mime = arr[0].match(/:(.*?);/)[1];
    //   // deprecated
    //   // const bstr = atob(arr[1]);
    //   const bstr = arr[0].toString('base64');
    //   // const bstr = Buffer.from(arr[1], 'base64')
    //   let n = bstr.length;
    //   let u8arr = new Uint8Array(n);

    //   while (n--) {
    //     u8arr[n] = bstr.charCodeAt(n);
    //   }

    //   return new File([u8arr], filename, { type: mime });
    // };

    // const documentFile = dataURLtoFile(cameraImage, `${documentName}.png`);

    // console.log(documentFile);

    const file = await stripe.files.create(
      {
        purpose: 'account_requirement',
        file: {
          //   data: fs.readFileSync(cameraImage.replace(/(\r\n|\n|\r)/gm, '')),
          data: fs.readFileSync(`pages/api/${documentName}.` + ext),
          // data: fs.readFileSync(documentFile.name),
          name: `${documentName}.png`,
          type: 'application/octet-stream',
          //   type: 'image/png',
          // type: 'multipart/form-data',
        },
      },
      {
        stripeAccount: stripeId,
      }
    );

    console.log(file);

    // await stripe.accounts.update(stripeId, {
    //   company: { verification: { document: { front: file.id } } },
    //   metadata: { username },
    // });

    return res.status(200);
  }
};
