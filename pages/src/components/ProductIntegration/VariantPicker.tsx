const VariantPicker = ({ variants, ...props }: any) => {
  if (variants.length === (0 || 1)) return null;

  return (
    <select
      {...props}
      className="appearance-none w-full relative mb-3 sm:mb-0 flex-grow sm:mr-3 pl-3 py-2 bg-gray-300 dark:bg-gray-900 border border-gray-900 dark:border-gray-300 focus:border-[#4C8EFF] dark:focus:border-gray-900 shadow-sm text-sm focus:outline-none focus:text-gray-800 dark:focus:text-gray-300 rounded-[0.625em] z-50 cursor-pointer"
    >
      {variants.map(({ external_id, name }: any) => (
        <option key={external_id} value={external_id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default VariantPicker;
