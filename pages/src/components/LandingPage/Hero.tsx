import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';


import WhiskersAndPipe from '../../../src/assets/ObinsunVectors/WhiskersAndPipe';
import PeaceOnEarth from '../../../src/assets/ObinsunVectors/PeaceOnEarth';
import RadRex from '../../../src/assets/ObinsunVectors/RadRex';
import SeeYouInSpace from '../../../src/assets/ObinsunVectors/SeeYouInSpace';
import SkullIsFullOfCats from '../../../src/assets/ObinsunVectors/SkullIsFullOfCats';

import CatsAndSkullsPattern from '../../../src/assets/ObinsunVectors/CatsAndSkullsPattern';

const Hero = () => {
    if (typeof window !== 'undefined') {
        gsap.registerPlugin(MotionPathPlugin);
        gsap.registerPlugin(ScrollTrigger);
      }

  const ref = useRef(null);

  useEffect(() => {
    const featuredOne = ref.current;

    let path_1 = featuredOne!.querySelector('#path1');
    let path_1_length = path_1.getTotalLength();
    let rectRef = featuredOne!.querySelector('#whiskers-and-pipe');
    let landing = featuredOne!.querySelector('#landing');

    path_1.style.strokeDasharray = path_1_length + ' ' + path_1_length;
    path_1.style.strokeDashoffset = path_1_length;

    document.addEventListener('scroll', (e) => {
      e.preventDefault();

      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById('landing').scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_1_length * scrollPercentage;
      path_1.style.strokeDashoffset = path_1_length - drawLength;
    });

    gsap.set(rectRef, { autoAlpha: 1 });

    gsap.defaults({ ease: 'none' });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(rectRef, {
        rotate: '90deg',
        rotationY: '-3rad',
        skewY: '10deg',
        immediateRender: true,
        motionPath: {
          path: path_1,
          align: path_1,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      });
  }, []);

  return (
    <>

    </>
  )
}

export default Hero