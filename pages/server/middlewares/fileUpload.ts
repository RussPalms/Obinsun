// import nextConnect from 'next-connect';
import nextConnect from 'next-connect';
import multiparty from 'multiparty';

const fileUpload = nextConnect() as any;

fileUpload.use(async (req: any, res: any, next: any) => {
  const form = new multiparty.Form();

  await form.parse(req, function (err: any, fields, files) {
    // console.log(req);
    req.body = fields;
    // console.log(req.body);
    // console.log(fields);
    req.files = files;
    next();
    // res.status(200);
  });
});

export default fileUpload;
