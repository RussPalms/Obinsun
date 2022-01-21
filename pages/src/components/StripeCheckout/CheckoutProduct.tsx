import * as React from "react";
import Image from "next/image";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
} from "../../../app/state/slices/basketSlice";
import { getSession } from "next-auth/react";
import { useEffect } from "react";

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
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{name}</p>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={Number(price) as number} />
        {/* quantity={price} */}
      </div>

      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
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
