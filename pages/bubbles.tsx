import React from 'react';

type Props = {};

function Bubbles({}: Props) {
  return (
    <>
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute top-[-50vh] left-[-50vh] bg-pink-700 border rounded-full h-[100em] w-[100em] blur-[3em]"></div>
      </div>
    </>
  );
}

export default Bubbles;
