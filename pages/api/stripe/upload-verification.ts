// @ts-nocheck

const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`);

const fs = require("fs");
const axios = require("axios");

// const fs = require("file-system");
// import fs from 'file-system'
// var fs = require("file-system");

export default async (req: any, res: any) => {
  const { firebaseID, stripeId, personId, documentUploadUrl } = req.body;

  const download_image = (url: any, image_path: any) =>
    axios({
      url,
      responseType: "stream",
      //   responseType: "octed-stream",
    }).then(
      (response: any) =>
        new Promise((resolve, reject) => {
          response.data
            .pipe(fs.createWriteStream(image_path))
            .on("finish", () => resolve())
            .on("error", (e) => reject(e));
        })
    );

  //   (async () => {
  //     let documentFile = await download_image(
  //       documentUploadUrl
  //       //   "https://firebasestorage.googleapis.com/v0/b/photo-gallery-upload.appspot.com/o/users%2F7p8lo2GTr8NCnUVovZtj%2Fimages%2Fsuccess.png?alt=media&token=ec3260fb-90ae-440e-9e74-f38f9413e2b2",
  //       //   "pages/api/stripe/success.png"
  //     );

  //     // console.log(documentFile);
  //     // console.log(documentFile.status); // true
  //     // console.log(documentFile.error); // ''

  //     // let example_image_2 = await download_image('https://example.com/does-not-exist.png', 'example-2.png');

  //     // console.log(example_image_2.status); // false
  //     // console.log(example_image_2.error); // 'Error: Request failed with status code 404'

  //     // let example_image_3 = await download_image('https://example.com/test-3.png', 'example-3.png');

  //     // console.log(example_image_3.status); // true
  //     // console.log(example_image_3.error); // ''

  //     const file = await stripe.files.create(
  //       //   stripeId,
  //       {
  //         purpose: "identity_document",
  //         file: {
  //           data: fs.readFileSync(documentFile),
  //           // data: fs.readFileSync("pages/api/stripe/success.png"),
  //           // data: documentUpload,
  //           name: "success.png",
  //           type: "application/octed-stream",
  //         },
  //         //   metadata: { firebaseID },
  //       },
  //       {
  //         stripeAccount: stripeId,
  //       }
  //     );
  //   })();

  const file = await stripe.files.create(
    //   await stripe.files.create(
    {
      purpose: "identity_document",
      file: {
        // data: fs.readFileSync(documenFile),
        data: fs.readFileSync("pages/api/stripe/success.png"),
        // data: fs.readFileSync(`${documentUploadUrl}`),
        // data: documentUpload,
        name: "success.png",
        type: "application/octed-stream",
      },
      //   metadata: { firebaseID },
    },
    {
      stripeAccount: stripeId,
    }
  );

  console.log(file);

  const person = await stripe.accounts.updatePerson(stripeId, personId, {
    verification: { document: { front: file.id } },
  });

  res.status(200);
};
