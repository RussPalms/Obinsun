//@ts-nocheck

import { useEffect, useState } from 'react';
import Image from 'next/image';
import VariantPicker from './VariantPicker';
import useWishlistDispatch from '../../../server/hooks/useWishlistDispatch';
import useWishlistState from '../../../server/hooks/useWishlistState';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  selectTotal,
} from '../../../app/state/slices/basketSlice';

const Product = (product: any) => {
  // const total = useSelector(selectTotal);
  // console.log(total);
  // console.log(product);

  const dispatch = useDispatch();

  const { addItem } = useWishlistDispatch();
  const { isSaved } = useWishlistState();

  const { id, name, variants } = product;
  const [firstVariant] = variants;
  const oneStyle = variants.length === 1;

  const [activeVariantExternalId, setActiveVariantExternalId] = useState(
    firstVariant.external_id
  );

  const activeVariant = variants.find(
    (v: any) => v.external_id === activeVariantExternalId
  );

  const activeVariantFile = activeVariant.files.find(
    ({ type }: any) => type === 'preview'
  );

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: activeVariant.currency,
  }).format(activeVariant.retail_price as number);

  const addToWishlist = () => addItem(product);

  const onWishlist = isSaved(id);

  // const addItemToBasket = async () => {
  //   const productData = {
  //     id: activeVariantExternalId,
  //     price: activeVariant.retail_price as number,
  //     url: `/api/products/${activeVariantExternalId}`,
  //     description: activeVariant.name,
  //     image: activeVariantFile.preview_url,
  //     name: name,
  //   };

  //   await dispatch(addToBasket(productData));
  // };
  // const { aid } = activeVariantExternalId;
  // const { price } = activeVariant.retail_price;
  // const { url } = `/api/products/${activeVariantExternalId}`;
  // const { description } = activeVariant.name;
  // const { image } = activeVariantFile.preview_url;

  // const productData = {
  //   aid,
  //   // price: activeVariant.retail_price as number,
  //   price,
  //   // price: formattedPrice,
  //   url,
  //   description,
  //   image,
  //   name,
  // };

  const addItemToBasket = () => {
    // const productData = {
    //   id: activeVariantExternalId,
    //   // price: activeVariant.retail_price as number,
    //   price: activeVariant.retail_price as number,
    //   // price: formattedPrice,
    //   url: `/api/products/${activeVariantExternalId}`,
    //   description: activeVariant.name,
    //   image: activeVariantFile.preview_url,
    //   name: name,
    // };

    // const productData = [
    //   { id: activeVariantExternalId },
    //   { price: activeVariant.retail_price },
    //   // price: activeVariant.retail_price as number,
    //   // price: formatedPrice,
    //   { url: `/api/products/${activeVariantExternalId}` },
    //   { description: activeVariant.name },
    //   { image: activeVariantFile.preview_url },
    //   { name: name },
    // ];

    // console.log({ productData });
    // console.log(productData.price);
    // console.log(total)

    dispatch(
      addToBasket({
        id: activeVariantExternalId,
        // price: activeVariant.retail_price as number,
        price: activeVariant.retail_price as number,
        // price: formattedPrice,
        url: `/api/products/${activeVariantExternalId}`,
        description: activeVariant.name,
        image: activeVariantFile.preview_url,
        name: name,
      })
    );
  };

  // useEffect(() => {
  //   console.log(productData.price);
  // }, [addItemToBasket]);

  return (
    // <article className="border border-gray-200 rounded bg-white flex flex-col relative">
    <article className="glass-container h-full w-full flex flex-col relative">
      <button
        aria-label="Add to wishlist"
        className="appearance-none absolute top-0 right-0 mt-3 mr-3 text-gray-300 dark:text-gray-800 focus:text-gray-900 darkfocus:text-[#4C8EFF] hover:text-red-500 transition focus:outline-none"
        onClick={addToWishlist}
      >
        {onWishlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current text-red-500"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-6 h-6 fill-current"
          >
            <path fill="none" d="M0 0H24V24H0z" />
            <path d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
          </svg>
        )}
      </button>
      <div className="flex items-center justify-center flex-1  w-full p-8">
        {activeVariantFile && (
          <Image
            src={activeVariantFile.preview_url}
            width={250}
            height={250}
            alt={`${activeVariant.name} ${name}`}
            title={`${activeVariant.name} ${name}`}
            className="border border-transparent rounded-[0.625em]"
          />
        )}
      </div>
      <div className="flex-1 p-6 pt-0">
        <div className="text-center">
          <p className="mb-1 font-semibold">{name}</p>
          <p className="text-sm text-gray-900 dark:text-gray-300">
            {formattedPrice}
          </p>
        </div>
      </div>
      <div className="p-3 flex flex-col justify-center items-center gap-1">
        <VariantPicker
          value={activeVariantExternalId}
          onChange={({ target: { value } }: any) =>
            setActiveVariantExternalId(value)
          }
          variants={variants}
          disabled={oneStyle}
        />
        <button
          className="w-full md:w-auto transition flex-shrink-0 py-2 px-4 border border-gray-300 dark:border-gray-800 hover:border-transparent shadow-sm text-sm font-medium bg-white dark:bg-gray-900 focus:text-gray-300 hover:bg-gray-800 dark:hover:bg-[#4C8EFF] hover:text-gray-300 dark:hover:text-gray-900 focus:bg-#4C8EFF focus:outline-none rounded-[0.625em]"
          // data-item-id={activeVariantExternalId}
          // data-item-price={activeVariant.retail_price}
          // data-item-url={`/api/products/${activeVariantExternalId}`}
          // data-item-description={activeVariant.name}
          // data-item-image={activeVariantFile.preview_url}
          // data-item-name={name}
          onClick={addItemToBasket}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
