// @ts-nocheck

import React, { useEffect, useRef, useState } from "react";
// import { useFrame } from "react-three-fiber";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
// import { Html } from "drei";
import { Html } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Object3D } from "three/src/core/Object3D"; // Object 3D types
import { AnimationClip } from "three/src/animation/AnimationClip"; // Animation types

interface group {
  current: {
    rotation: {
      x: number;
      y: number;
    };
  };
}

interface actions {
  current: {
    idle: {
      play: () => void;
    };
  };
}

type Props = {};

const Model = (props: Props) => {
  // Refs
  const group: group = useRef();
  const actions: actions = useRef();

  // State
  const [model, setModel] = useState<Object3D | null>(null);
  const [animation, setAnimation] = useState<AnimationClip[] | null>(null);

  // Mixer
  const [mixer] = useState(() => new THREE.AnimationMixer(null));

  // Load Model
  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load("models/mech_drone/scene.gltf", async (gltf) => {
      // loader.load("models/t-_shirt/scene.gltf", async (gltf) => {
      const nodes = await gltf.parser.getDependencies("node");
      const animations = await gltf.parser.getDependencies("animation");
      setModel(nodes[0]);
      setAnimation(animations);
    });
  }, []);

  // Set Animation
  useEffect(() => {
    if (animation && typeof group.current != "undefined") {
      actions.current = {
        idle: mixer.clipAction(animation[0], group.current as Object3D),
      };
      actions.current.idle.play();
      return () => animation.forEach((clip) => mixer.uncacheClip(clip));
    }
  }, [animation]);

  // Animation Update
  useFrame((_, delta) => mixer.update(delta));
  // Rotation
  useFrame(() => {
    if (typeof group.current != "undefined")
      return (group.current.rotation.y += 0.01);
  });

  return (
    <>
      {model ? (
        <group ref={group} position={[0, -150, 0]} dispose={null}>
          <primitive ref={group} name="Object_0" object={model} />
        </group>
      ) : (
        <Html>Loading . . . </Html>
      )}
    </>
  );
};

export default Model;
