// import nextConnect from 'next-connect';
import nc from 'next-connect';
import multiparty from 'multiparty';

const documentUpload = nc() as any;

documentUpload.use(async (req: any, res: any, next: any) => {
  const form = new multiparty.Form();

  await form.parse(req, function (err: any, fields, files) {
    req.body = fields;
    req.files = files;
    next();
  });
});

export default documentUpload;
