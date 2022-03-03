import Product from './Product';

const ProductGrid = ({ products }: any) => {
  if (!products || products.length === 0) return null;
  // console.log(products);

  return (
    <div className="z-50 relative grid gap-[1em] grid-cols-1 tablet:grid-cols-2 lg:grid-cols-7 sm:grid-cols-1 justify-items-center h-full w-full">
      {products.map((product: any) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
