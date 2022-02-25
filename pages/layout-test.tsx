import React from 'react';
import DarkModeToggle from './src/components/DarkModeToggle';

type Props = {};

function LayoutTest({}: Props) {
  return (
    <>
      <div className="transition-all duration-500 bg-gradient-to-tl from-red-300 via-fuchsia-200 to-blue-900 dark:text-blue-300 text-red-900 bg-size-200 bg-pos-100 dark:bg-pos-0 relative">
        <div className="grid grid-rows-layout">
          <div className="shape-top clipped-shape-top self-start moz-blur"></div>

          {/* <div className="glass-container min-h-[80%] w-[90%] relative text-center p-[3em] place-self-center z-50">
            <DarkModeToggle />
           
          </div> */}
          <div className="shape-bottom clipped-shape-bottom self-end moz-blur"></div>
        </div>
      </div>
    </>
  );
}

export default LayoutTest;
