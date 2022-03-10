import * as React from 'react';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch } from 'react-redux';
import {
  addToBasket,
  removeFromBasket,
  // addExtra,
} from '../../../app/state/slices/basketSlice';
import { getSession } from 'next-auth/react';
// import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  selectItems,
  selectMultiples,
} from 'pages/app/state/slices/basketSlice';

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
    console.log({ checkout_product: product });
    // console.log(price);
    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  // const addExtraItem = () => {
  //   dispatch(addExtra({ id }));
  // };

  const items = useSelector(selectItems);
  console.log(items.map((item: any) => item.id));
  const multiples = useSelector(selectMultiples);
  console.log(items);

  return (
    <div className="relative h-full w-full grid vs:grid-cols-1 tablet:grid-cols-5 grid-cols-5">
      <div className="h-full w-full flex items-center justify-center">
        <Image
          src={image}
          height={250}
          width={250}
          className="h-full w-full border border-transparent rounded-[0.625em]"
        />
      </div>

      <div className="col-span-3 mx-5 self-center">
        <p>{name}</p>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={Number(price) as number} />
      </div>

      <div className="flex space-x-2 my-auto justify-center items-center">
        <button
          className="checkout-input flex items-center justify-center"
          onClick={removeItemFromBasket}
        >
          -
        </button>
        <div className="flex items-center justify-center h-full w-full">
          {items.length}
          {/* {items.map((item: any) => item.id)} */}
        </div>
        <button
          className="checkout-input flex items-center justify-center"
          onClick={addItemToBasket}
        >
          +
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
