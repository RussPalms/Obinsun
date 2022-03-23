export const formatProductVariantName = (
  productVariantName: string
): string => {
  const [, name] = productVariantName.split(' - ');

  return name ? name : 'One style';
};

export default function _() {
  const div = document.createElement('div');
  return div;
}
