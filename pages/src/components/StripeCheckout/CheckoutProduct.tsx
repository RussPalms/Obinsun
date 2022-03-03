import * as React from 'react';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
} from '../../../app/state/slices/basketSlice';
import { getSession } from 'next-auth/react';
// import { useEffect } from 'react';

export default function CheckoutProduct({
  id,
  price,
  url,
  description,
  image,
  name,
}: any) {
  const dispatch = useDispatch();

  const product = {
    id,
    price,
    url,
    description,
    image,
    name,
  };

  const addItemToBasket = () => {
    // const product = {
    //   id,
    //   price,
    //   url,
    //   description,
    //   image,
    //   name,
    // };

    console.log({ checkout_product: product });
    console.log(price);
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  // useEffect(() => {
  //   dispatch(addToBasket(product));
  // }, [addItemToBasket]);

  return (
    <div className="grid vs:grid-cols-1 tablet:grid-cols-5 grid-cols-5">
      <Image
        src={image}
        height={250}
        width={250}
        // objectFit="fill"
        className="border border-transparent rounded-[0.625em]"
      />

      <div className="col-span-3 mx-5 self-center">
        <p>{name}</p>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={Number(price) as number} />
        {/* quantity={price} */}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button submit-input" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button submit-input" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
