import React from 'react';
// import { Canvas } from "react-three-fiber";
import { Canvas } from '@react-three/fiber';
import Lights from './src/components/Three/Lights';
// import Lights from "@/components/Three/Lights";
import Model from './src/components/Three/Model';
// import Model from "@/components/Three/Model";

type Props = {};

function ThreeFiberTesting({}: Props) {
  return (
    <>
      <div className="h-screen bg-gray-400">
        <Canvas
          // colorManagement
          camera={{ position: [0, 0, 300] }}
        >
          <Lights />
          <Model />
        </Canvas>
      </div>
    </>
  );
}

export default ThreeFiberTesting;
