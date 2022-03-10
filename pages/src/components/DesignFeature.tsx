import React from 'react';
import PeaceOnEarth from '../assets/ObinsunVectors/PeaceOnEarth';
import RadRex from '../assets/ObinsunVectors/RadRex';
import SeeYouInSpace from '../assets/ObinsunVectors/SeeYouInSpace';
import SkullIsFullOfCats from '../assets/ObinsunVectors/SkullIsFullOfCats';
import WhiskersAndPipe from '../assets/ObinsunVectors/WhiskersAndPipe';

type Props = {};

const DesignFeature = () => {
  return (
    <>
      <div className="bg-gray-600 h-96 w-full relative z-0">
        <li className="design-container absolute top-0 left-0">
          <WhiskersAndPipe />
        </li>
        <li className="design-container absolute top-0 right-0">
          <PeaceOnEarth />
        </li>
        <li className="design-container absolute top-[50%] left-[50%]">
          <SkullIsFullOfCats />
        </li>
        <li className="design-container absolute bottom-0 left-0">
          <RadRex />
        </li>
        <li className="design-container absolute bottom-0 right-0">
          <SeeYouInSpace />
        </li>
      </div>
    </>
  );
};

export default DesignFeature;
