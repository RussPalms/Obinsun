export interface IListing {
  slug: string;
  date: string;
  thumbnail: string;
  title: string;
  description: string;
  pricing: string;
  colors: string[];
  sizing: string[];
  reviews: string[];
}

export default function _() {
  const div = document.createElement('div');
  return div;
}
