import type { NextApiRequest, NextApiResponse } from 'next';
import type Stripe from 'stripe';
const stripe: Stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { productArray } = req.body;
    // console.dir(
    //   {
    //     'printful-products': productArray,
    //   },
    //   {
    //     depth: null,
    //     maxArrayLength: null,
    //     colors: true,
    //   }
    // );

    // const productValues = Object.values(productArray);
    const [...products] = productArray;
    // console.log(productValues);
    // console.log(products);

    // const createStoreProducts = async () => {
    try {
      const stripeProducts = await Promise.all(
        products.map(async (product: any) => {
          // console.log(product);
          const { id, name, variants } = product;

          const [firstVariant] = variants;
          // const oneStyle = variants.length === 1;
          const activeVariantExternalId = firstVariant.external_id;
          const activeVariant = variants.find(
            (v: any) => v.external_id === activeVariantExternalId
          );
          const activeVariantFile = activeVariant.files.find(
            ({ type }: any) => type === 'preview'
          );
          // const formattedPrice = new Intl.NumberFormat('en-US', {
          //   style: 'currency',
          //   currency: activeVariant.currency,
          // }).format(activeVariant.retail_price as number);

          // console.log(activeVariantFile.preview_url);

          const stripeProduct = await stripe.products.create({
            // id: id,
            name,
            // type: 'good',
            active: true,
            // attributes: Object.keys(product.attributes),
            metadata: { prinfulProductId: id },
            images: [activeVariantFile.preview_url],
          });

          //   console.log(stripeProduct);

          try {
            // const stripePrices = await Promise.all(
            //   variants.map(async (variant: any) => {
            //     const { retail_price } = variant;
            //     const centsPrice = parseFloat(retail_price) * 100;
            //     const variantName = `${stripeProduct.name} ${variant.name}`;

            //     const stripePrice = await stripe.prices.create({
            //       currency: 'usd',
            //       product: stripeProduct.id,
            //       unit_amount: centsPrice,
            //       active: true,
            //       metadata: { printfulVariantId: variant.id },
            //       nickname: variantName,
            //       billing_scheme: 'per_unit',
            //       //   lookup_key: variantName,
            //     });

            //     // const stripePrice = setTimeout(
            //     //   async () =>
            //     //     await stripe.prices.create({
            //     //       currency: 'usd',
            //     //       product: stripeProduct.id,
            //     //       unit_amount: centsPrice,
            //     //       active: true,
            //     //       metadata: { printfulVariantId: variant.id },
            //     //       nickname: variantName,
            //     //       billing_scheme: 'per_unit',
            //     //     }),
            //     //   1100
            //     // );

            //     return { stripePrice };
            //   })
            // );

            setTimeout(async () => {
              await Promise.all(
                variants.map(async (variant: any) => {
                  const { retail_price } = variant;
                  const centsPrice = parseFloat(retail_price) * 100;
                  const variantName = `${stripeProduct.name} ${variant.name}`;

                  const stripePrice = await stripe.prices.create({
                    currency: 'usd',
                    product: stripeProduct.id,
                    unit_amount: centsPrice,
                    active: true,
                    metadata: { printfulVariantId: variant.id },
                    nickname: variantName,
                    billing_scheme: 'per_unit',
                  });

                  return { stripePrice };
                })
              );
            }, 1500);

            // console.log(
            //   `🛍️  Successfully created ${stripePrices.length} price for ${name}.`
            // );

            console.log(`🛍️  Successfully created price for ${name}.`);
          } catch (error) {
            console.log(`⚠️  Error: ${error.message}`);
          }

          return {
            stripeProduct,
          };
        })
      );

      console.log(
        `🛍️  Successfully created ${stripeProducts.length} products for storefront.`
      );
    } catch (error) {
      console.log(`⚠️  Error: ${error.message}`);
    }
    // };

    // createStoreProducts();

    return res.status(200).json({ productMessage: 'products recieved' });
  }
};
