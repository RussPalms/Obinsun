import Catalog from "./Catalog";

const CatalogGrid = ({ catalog }: any) => {
  if (!catalog || catalog.length === 0) return null;
  // console.log(catalog);

  return (
    <div className="grid gap-6 grid-cols-3 lg:grid-cols-2 sm:grid-cols-1 justify-items-center">
      {catalog.map((product: any) => (
        <Catalog key={product.id} {...product} />
      ))}
    </div>
  );
};

export default CatalogGrid;
