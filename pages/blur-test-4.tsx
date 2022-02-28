import React from 'react';
import DarkModeToggle from './src/components/DarkModeToggle';
import Featured from './src/components/Featured';
import TestContent from './src/components/TestContent';

type Props = {};

function LayoutTest({}: Props) {
  return (
    <>
      <div className="relative h-full w-full z-40 flex flex-col items-center justify-center">
        <div className="relative top-0 blur-none h-full w-full">
          <Featured />
        </div>
        <div className="relative glass-container blur-none z-50 min-h-[80%] max-w-[80%] p-5">
          <DarkModeToggle />
          <TestContent />
        </div>
        {/* Top Left */}
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-1 clipped-top-left-edge" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-2 clipped-top-left-strip" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-3 clipped-top-left-center" />
        </section>
        {/* <section className="custom-clip-container ">
          <div className="custom-clips clip-color-4 clipped-top-left-pent" />
        </section> */}
        {/* Top Right */}
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-1 clipped-top-right-edge" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-2 clipped-top-right-strip" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-3 clipped-top-right-center" />
        </section>
        {/* <section className="custom-clip-container ">
          <div className="custom-clips clip-color-4 clipped-top-right-pent" />
        </section> */}
        {/* Bottom Right */}
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-1 clipped-bottom-right-edge" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-2 clipped-bottom-right-strip" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-3 clipped-bottom-right-center" />
        </section>
        {/* <section className="custom-clip-container ">
          <div className="custom-clips clip-color-4 clipped-bottom-right-pent" />
        </section> */}
        {/* Bottom Left */}
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-1 clipped-bottom-left-edge" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-2 clipped-bottom-left-strip" />
        </section>
        <section className="custom-clip-container ">
          <div className="custom-clips clip-color-3 clipped-bottom-left-center" />
        </section>
        {/* <section className="custom-clip-container ">
          <div className="custom-clips clip-color-4 clipped-bottom-left-pent" />
        </section> */}
      </div>
    </>
  );
}

export default LayoutTest;
