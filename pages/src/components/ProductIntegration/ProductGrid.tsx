//@ts-nocheck

import Product from "./Product";

const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) return null;

  return (
    <div className="grid gap-6 grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 justify-items-center">
      {products.map((product) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default ProductGrid;
