export const formatProductVariantName = (
  productVariantName: string
): string => {
  const [, name] = productVariantName.split(" - ");

  return name ? name : "One style";
};
