//@ts-nocheck

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/Grim2021.svg" />
          {/* <link rel="preconnect" href="https://app.snipcart.com" />
          <link rel="preconnect" href="https://cdn.snipcart.com" />
          <link
            rel="stylesheet"
            href="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.css"
          /> */}
          {/* <link
          //   rel="preconnect"
          //   href="https://unpkg.com/@stripe/react-stripe-js@latest/dist/react-stripe.umd.js"
          // />
          // <link rel="preconnect" href="https://js.stripe.com/v3/" />
          <link
            // href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
            
          /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Fuzzy+Bubbles:wght@400;700&family=Grandstander:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="antialiased">
          <Main />
          <NextScript />
          {/* <script
            async
            src="https://cdn.snipcart.com/themes/v3.0.31/default/snipcart.js"
          ></script> */}
          {/* <script src="https://js.stripe.com/v3/"></script> */}
          {/* <div */}
          {/* // id="snipcart"
            // id="stripe"
            // data-config-modal-style="side"
            // data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
            // data-api-key={process.env.STRIPE_PUBLIC_KEY}
            // hidden
          // > */}
          {/* <address-fields section="top"> */}
          {/* <div className="snipcart-form__field"> */}
          {/* <div className="stripe-form__field"> */}
          {/* <snipcart-label for="phone">Phone number</snipcart-label> */}
          {/* <stripe-label for="phone">Phone number</stripe-label> */}
          {/* <snipcart-input name="phone"></snipcart-input> */}
          {/* <stripe-input name="phone"></stripe-input> */}
          {/* </div>
            </address-fields>
          </div> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
