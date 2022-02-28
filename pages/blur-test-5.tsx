import React from 'react';
import DarkModeToggle from './src/components/DarkModeToggle';
import TestContent from './src/components/TestContent';

type Props = {};

function Blurb({}: Props) {
  return (
    <>
      <div className="relative h-full w-full z-40 flex flex-col items-center justify-center">
        <div className="relative blur-[0] z-50 min-h-[80%] max-w-[80%] p-5">
          <div className="card glassmporphism">
            <DarkModeToggle />
            <TestContent />
          </div>
        </div>
        <div className="absolute top-0 left-0 z-40 flex justify-center items-center w-full h-full flex-1 grow blur-[0em]">
          <div className="triangle-page bg-pink-500 custom-clips"></div>
        </div>
      </div>
    </>
  );
}

export default Blurb;
