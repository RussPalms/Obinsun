import React from 'react';
import DarkModeToggle from './src/components/DarkModeToggle';

type Props = {};

function LayoutTest({}: Props) {
  return (
    <>
      <div className="relative h-screen w-screen flex items-center justify-center">
        {/* Top Left */}
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-red-500 clipped-top-left-edge" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-green-500 clipped-top-left-strip" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-yellow-500 clipped-top-left-center" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-indigo-500 clipped-top-left-pent" />
        </section>

        {/* Top Right */}
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-red-500 clipped-top-right-edge" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-green-500 clipped-top-right-strip" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-yellow-500 clipped-top-right-center" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-indigo-500 clipped-top-right-pent" />
        </section>

        {/* Bottom Right */}
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-red-500 clipped-bottom-right-edge" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-green-500 clipped-bottom-right-strip" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-yellow-500 clipped-bottom-right-center" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-indigo-500 clipped-bottom-right-pent" />
        </section>

        {/* Bottom Left */}
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-red-500 clipped-bottom-left-edge" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-green-500 clipped-bottom-left-strip" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-yellow-500 clipped-bottom-left-center" />
        </section>
        <section className="blur-[0em] absolute top-0 left-0 z-40 flex justify-center align-center w-full h-full">
          <div className="relative top-0 left-0 h-full w-full bg-indigo-500 clipped-bottom-left-pent" />
        </section>

        {/* Content */}
        <section className="absolute top-0 left-0 opacity-100 z-40 flex justify-center align-center w-full h-full">
          <div className="relative left-0 blur-[0em] top-[25%] w-[50%] h-[50%] bg-blue-900 z-40" />
        </section>
      </div>
    </>
  );
}

export default LayoutTest;
