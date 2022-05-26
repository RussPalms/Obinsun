import { access_code } from 'pages/server/lib/printful-client';
import Content from './Production/Layout/Content';
import Cart from './src/components/Cart';

export default function CartPage(printfulWebhook: any) {
  return (
    <Content title="Cart" description="these are your cart items">
      <Cart printfulWebhook={printfulWebhook} />
    </Content>
  );
}

export const getServerSideProps = async () => {
  const webhookCreation = {
    url: `${process.env.NEXTAUTH_URL}/api/webhooks/printful/produce`,
    types: ['package_shipped', 'stock_updated'],
    params: {
      stock_updated: {
        product_ids: [5, 12],
      },
    },
  };

  console.log(access_code);

  const addWebhook = {
    method: 'POST',
    headers: {
      token_type: 'Bearer',
      'X-PF-Store-Id': "Russell's Store",
      //   access_token: JSON.stringify(access_code),
      access_token: 'aCamWJt2Qby8sjawAVbFVUMsiOJewI7LBDmZzcan',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(webhookCreation),
  };

  const printfulWebhook = await fetch(
    'https://api.printful.com/webhook',
    addWebhook
  );

  console.log(printfulWebhook);

  return {
    props: {
      webhook: printfulWebhook,
    },
  };
};
