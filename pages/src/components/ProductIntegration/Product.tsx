import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import VariantPicker from './VariantPicker';
import useWishlistDispatch from '../../../server/hooks/useWishlistDispatch';
import useWishlistState from '../../../server/hooks/useWishlistState';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToBasket,
  selectTotal,
} from '../../../app/state/slices/basketSlice';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';
import {
  selectItems,
  selectMultiples,
  selectBasket,
} from 'pages/app/state/slices/basketSlice';

const Product = (product: any) => {
  const countRef = useRef(null);

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
        // count: countRef.current.value
      })
    );
  };

  const items = useSelector(selectItems);
  const basket = useSelector(selectBasket);
  // console.log(items.map((item: any) => item.id));

  // console.log(items);
  // console.log(basket);
  // console.log(basket.map((basketItem: any) => basketItem.id));

  // useEffect(() => {
  //   console.log(productData.price);
  // }, [addItemToBasket]);

  return (
    // <article className="border border-gray-200 rounded bg-white flex flex-col relative">
    <article className="glass-container h-full w-full flex flex-col relative">
      <button
        aria-label="Add to wishlist"
        className="appearance-none absolute top-0 right-0 mt-3 mr-3 text-gray-300 dark:text-gray-800 focus:text-gray-900 darkfocus:text-[#4C8EFF] hover:text-gray-800 dark:hover-text-gray-300 transition focus:outline-none"
        onClick={addToWishlist}
      >
        {onWishlist ? (
          <div className="w-6 h-6 fill-current text-black dark:text-[#4C8EFF]">
            <RiHeartFill />
          </div>
        ) : (
          <div className="w-6 h-6 fill-current text-gray-800 dark:text-gray-300">
            <RiHeartLine />
          </div>
        )}
      </button>
      <div className="flex items-center justify-center flex-1 w-full p-8">
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
          {/* <input type="number" ref={countRef} /> */}
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default Product;
