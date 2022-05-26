import type Ngrok from 'ngrok';
// const ngrokModule = require('ngrok')

// import type { NextApiRequest, NextApiResponse } from 'next';
import type Next from 'next';
import type Parse from 'url';
import type CreateServer from 'http';

const { createServer }: typeof CreateServer = require('http');
const { parse }: typeof Parse = require('url');
const next: typeof Next = require('next');

const customDev = process.env.NODE_ENV !== 'production';
const customPort = (process.env.PORT || 8000) as number;
// let customHostname: string;
const customHostname = 'localhost';

const ngrokConfig = {
  ngrok: {
    enabled: customDev,
    port: customPort,
    subDomain: process.env.NGROK_SUBDOMAIN,
    authToken: process.env.NGROK_AUTHTOKEN,
  },
};

const ngrokRef = ngrokConfig.ngrok;

type NgrokServer = typeof Ngrok | null;

// module.exports = ngrokConfig

// const ngrokServer = ngrokConfig.ngrok.enabled ? (ngrokModule as typeof Ngrok) : null
const ngrokServer: NgrokServer = ngrokRef.enabled ? require('ngrok') : null;

// const newError = (throw new Error)

//   const customApp = next({
//         dev: ngrokRef.enabled,
//         hostname: customHostname,
//         port: ngrokRef.port,
//       });
//       const handle = customApp.getRequestHandler();

//       customApp.prepare().then(() => {
//         createServer(async (req, res) => {
//           try {
//             const parsedUrl = parse(req.url as string, true);
//             const { pathname, query } = parsedUrl;

//             if (pathname === '/a') {
//               await customApp.render(req, res, '/a', query);
//             } else if (pathname === '/b') {
//               await customApp.render(req, res, '/b', query);
//             } else {
//               await handle(req, res, parsedUrl);
//             }
//           } catch (serverErr) {
//             console.error('Error occured custom handling', req.url, serverErr);
//             res.statusCode = 500;
//             res.end('internal custom server error');
//           }

//         if (ngrokServer !== null) {
//             await ngrokServer
//               .connect({
//                 addr: ngrokRef.port,
//                 aubdomain: ngrokRef.subDomain,
//                 authtoken: ngrokRef.authToken,
//               })
//               .then((ngrokUrl: string) => {
//                 console.log(
//                   `💳  Ngrok URL to see the https test in the browser: ${ngrokUrl}/`
//                 );
//               })
//               .catch((ngrokErr: any) => {
//                 if (ngrokErr.code === 'ECONNREFUSED') {
//                   console.log(
//                     `⚠️  Connection refused at ${ngrokErr.address}:${ngrokErr.port}`
//                   );
//                 } else {
//                   console.log(`⚠️ Ngrok error: ${JSON.stringify(ngrokErr)}`);
//                 }
//                 process.exit(1);
//               });
//           }
//         }).listen(customPort, ((portErr: Promise<void>) => {
//           if (portErr) throw portErr;
//           console.log(
//             `> Custom server ready on http://${customHostname}:${customPort}`
//           );
//         }) as () => void);
//       });

if (ngrokServer !== null) {
  ngrokServer
    .connect({
      addr: ngrokConfig.ngrok.port,
      aubdomain: ngrokConfig.ngrok.subDomain,
      authtoken: ngrokConfig.ngrok.authToken,
    })
    .then((ngrokUrl: string) => {
      //   customHostname = ngrokUrl;

      //   const customApp = next({
      //     dev: customDev,
      //     hostname: customHostname,
      //     port: customPort,
      //   });
      //   const handle = customApp.getRequestHandler();

      //   customApp.prepare().then(() => {
      //     createServer(async (req, res) => {
      //       try {
      //         const parsedUrl = parse(req.url as string, true);
      //         const { pathname, query } = parsedUrl;

      //         if (pathname === '/a') {
      //           await customApp.render(req, res, '/a', query);
      //         } else if (pathname === '/b') {
      //           await customApp.render(req, res, '/b', query);
      //         } else {
      //           await handle(req, res, parsedUrl);
      //         }
      //       } catch (serverErr) {
      //         console.error('Error occured custom handling', req.url, serverErr);
      //         res.statusCode = 500;
      //         res.end('internal custom server error');
      //       }
      //     }).listen(customPort, ((portErr: any) => {
      //       if (portErr) throw portErr;
      //       console.log(
      //         `> Custom server ready on http://${customHostname}:${customPort}`
      //       );
      //     }) as () => void);
      //   });

      console.log(
        `💳  Ngrok URL to see the https test in the browser: ${ngrokUrl}/`
      );
    })
    .catch((ngrokErr: any) => {
      if (ngrokErr.code === 'ECONNREFUSED') {
        console.log(
          `⚠️  Connection refused at ${ngrokErr.address}:${ngrokErr.port}`
        );
      } else {
        console.log(`⚠️ Ngrok error: ${JSON.stringify(ngrokErr)}`);
      }
      process.exit(1);
    });
}
