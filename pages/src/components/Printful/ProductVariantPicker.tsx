const ProductVariantPicker = ({ variant_count, ...props }: any) => {
  if (variant_count.length === (0 || 1)) return null;

  return (
    <select
      {...props}
      className="appearance-none w-full relative mb-3 sm:mb-0 flex-grow sm:mr-3 pl-3 py-2 bg-white border border-gray-300 focus:border-gray-500 shadow-sm text-gray-500 text-sm focus:outline-none focus:text-gray-900 rounded"
    >
      {variant_count.map(({ id, name }: any) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default ProductVariantPicker;
