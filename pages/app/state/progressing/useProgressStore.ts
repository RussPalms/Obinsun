import create from 'zustand';

export const useProgressStore = create((set: any) => ({
  isAnimating: false,
  setIsAnimating: (isAnimating: any) => set(() => ({ isAnimating })),
}));

export default function _() {
  const div = document.createElement('div');
  return div;
}
