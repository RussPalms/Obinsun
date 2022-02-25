import React, { ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import DarkModeToggle from './DarkModeToggle';

type Props = {
  children: ReactNode;
  title: string;
  description: string;
};

const variants = {
  hidden: { opacity: 0, x: -200, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: -100 },
};

const Gradient = ({ children, title, description }: Props): JSX.Element => {
  return (
    <>
      <div className="transition-all duration-500 bg-gradient-to-tl from-red-300 via-fuchsia-200 to-blue-900 dark:text-blue-300 text-red-900 bg-size-200 bg-pos-100 dark:bg-pos-0 relative">
        <div className="grid grid-rows-layout">
          <div className="shape-top clipped-shape-top self-start moz-blur"></div>
          <div className="min-h-[80%] w-[90%] relative place-self-center z-50">
            {children}
          </div>
          <div className="shape-bottom clipped-shape-bottom self-end moz-blur"></div>
        </div>
      </div>
    </>
  );
};

export default Gradient;
