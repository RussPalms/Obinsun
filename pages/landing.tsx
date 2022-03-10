import DraculaVisitsAfrica from './src/assets/ObinsunVectors/DraculaVisitsAfrica';
import PeaceOnEarth from './src/assets/ObinsunVectors/PeaceOnEarth';
import RadRex from './src/assets/ObinsunVectors/RadRex';
import SeeYouInSpace from './src/assets/ObinsunVectors/SeeYouInSpace';
import SkullIsFullOfCats from './src/assets/ObinsunVectors/SkullIsFullOfCats';
import WhiskersAndPipe from './src/assets/ObinsunVectors/WhiskersAndPipe';
import CatsAndSkullsPattern from './src/assets/ObinsunVectors/CatsAndSkullsPattern';
import DesignFeature from './src/components/DesignFeature';
import Designs from './src/components/Designs';
import Hero from './src/components/Hero';

import { gsap } from 'gsap';
// import { gsap, ScrollTrigger, Draggable, MotionPathPlugin } from "gsap/all";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
// import { DrawSVG } from "gsap/dist/DrawSVG";
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';

import { useEffect, useRef, useState } from 'react';

type Props = {};

function Landing() {
  const ref = useRef(null);

  const [dashOffset, setDashOffset] = useState(null);
  // const elementRef = useRef(null);
  // const elementRef = useRef();

  // function useScrollPosition(elementRef) {
  //   function getScroll() {
  //     return {
  //       y: elementRef.current ? elementRef.current.scrollTop : undefined,
  //       x: elementRef.current ? elementRef.current.scrollLeft : undefined,
  //     };
  //   }

  //   const [scrollPosition, setScrollPosition] = useState(getScroll);

  //   useEffect(() => {
  //     if (!elementRef.current) {
  //       return false;
  //     }

  //     function handleScroll() {
  //       setScrollPosition(getScroll());
  //     }

  //     console.log()

  //     elementRef.current.addEventListener("scroll", handleScroll);
  //     return () =>
  //       elementRef.current.removeEventListener("scroll", handleScroll);
  //   }, []); // Empty array ensures that effect is only run on mount and unmount

  //   return scrollPosition;
  // }

  // const scroll = useScrollPosition(elementRef);

  if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    // gsap.registerPlugin(DrawSVG);
    gsap.registerPlugin(MotionPathPlugin);
  }

  // gsap.registerPlugin(ScrollTrigger);

  // useEffect(() => {
  //   const element = ref.current;

  //   gsap.to(element!.querySelector("#dracula-visits-africa"), {
  //     scrollTrigger: {
  //       scrub: 1,
  //     },
  //     scale: 0.5,
  //   });
  // }, []);

  // useEffect(() => {
  //   const element = ref.current;
  //   gsap.fromTo(
  //     element!.querySelector("#whiskers-and-pipe"),
  //     {
  //       opacity: 0,
  //       y: -20,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //     }
  //   );
  // }, []);

  // useEffect(() => {
  //   const container = ref.current;

  //   // if (container == null || ref == null) return;

  //   let path_1 = container.querySelector("#path1");
  //   let path_1_container = container.querySelector("#path1Container");
  //   let path_1_length = path_1.getTotalLength();

  //   window.addEventListener("scroll", () => {
  //     // document.addEventListener("scroll", () => {
  //     var scrollPercentage =
  //       (document.documentElement.scrollTop +
  //         document.getElementById("landing").scrollTop) /
  //       (document.documentElement.scrollHeight -
  //         document.documentElement.clientHeight);

  //     // Length to offset the dashes
  //     var drawLength = path_1_length * scrollPercentage;
  //     // Draw in reverse
  //     path_1.style.strokeDashoffset = path_1_length - drawLength;
  //     // path_1.strokeDashoffset = path_1_length - drawLength;

  //     var offSetLength = path_1_length - drawLength;

  //     // console.log(offSetLength);

  //     // var strokeDashOffset = path_1.style.strokeDashoffset;

  //     // return strokeDashOffset;
  //     // setDashOffset(path_1_length - drawLength);

  //     // console.log(strokeDashOffset);

  //     // // console.log(drawLength);
  //     // path_1.setAttribute("style", "stroke-dashoffset: " + offSetLength);
  //     // path_1.setAttribute("strokeDashoffset", offSetLength);
  //     // path_1.setAttribute("style", "strokeDashoffset: " + offSetLength);
  //     // path_1.setAttribute("stroke-dashoffset", offSetLength);
  //     // console.log(path_1);

  //     // console.log(path_1.style.strokeDashoffset);
  //     // console.log(path_1.style);

  //     // console.log(dashOffset);
  //     // return;
  //   });

  // const updatePath = async (p) => {
  //   await setDashOffset(p);
  // };

  useEffect(() => {
    const container = ref.current as any;

    if (container == null || ref == null) return;

    let path_1 = container.querySelector('#path1');
    let path_1_container = container.querySelector('#path1Container');
    let path_1_length = path_1.getTotalLength();

    path_1.style.strokeDasharray = path_1_length + ' ' + path_1_length;
    path_1.style.strokeDashoffset = path_1_length;

    document.addEventListener('scroll', (e: any) => {
      if (container == null) return;
      // console.log(e);

      // console.log(e.target);
      let scrollPercentage =
        (e.target.documentElement.scrollTop +
          e.target.getElementById('landing').scrollTop) /
        (e.target.documentElement.scrollHeight -
          e.target.documentElement.clientHeight);

      // console.log(scrollPercentage);

      // let scrollPercentageX =
      //   (e.target.documentElement.scrollLeft +
      //     e.target.getElementById("landing").scrollLeft) /
      //   (e.target.documentElement.scrollWidth -
      //     e.target.documentElement.clientWidth);

      // console.log(scrollPercentageX);

      // console.log(scrollPercentage);

      // // Length to offset the dashes
      let drawLength = path_1_length * scrollPercentage;
      // // Draw in reverse
      path_1.style.strokeDashoffset = path_1_length - drawLength;
      // // var offSetLength = path_1_length - drawLength;
      // console.log(path_1.style);

      // let pathLength = path_1_length - drawLength;

      // console.log(pathLength);

      // setDashOffset(pathLength);

      // console.log(dashOffset);

      // const updatePath = async() ={
      //   setDashOffset(pathLength)
      // };

      // updatePath(pathLength);
    });

    // console.log(dashOffset);
    // path_1.style.strokeDashoffset = dashOffset;
    // // path_1.setAttribute("style", "strokeDashoffset: " + dashOffset);
    // console.log(path_1.style.strokeDashoffset);
  }, []);

  // useEffect(() => {
  //   const element = ref.current;

  //   gsap.defaults({ ease: "none" });

  //   const main = gsap.timeline();
  // }, []);

  useEffect(() => {
    const element = ref.current as any;
    gsap.fromTo(
      element.querySelector('#dracula-visits-africa'),
      {
        opacity: 0.1,
        scale: 1,
        y: -20,
        // rotationX: 0,
      },
      {
        opacity: 1,
        y: 0,
        scale: 3,
        // rotationX: 90,
        // rotationY: 90,
        // rotationZ: 90,
        // rotateX: 90,
        // rotateY: 90,
        // rotateZ: 90,
        rotation: '1.25rad',
        skewX: '30deg',
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element.querySelector('#featured-designs'),
          start: 'top top',
          end: 'bottom center',
          scrub: true,
        },
      }
    );
  }, []);

  useEffect(() => {
    const element = ref.current as any;
    gsap.fromTo(
      element.querySelector('#whiskers-and-pipe'),
      {
        opacity: 0.1,
        scale: 1,
        y: -20,
        // rotation: 0,
      },
      {
        opacity: 1,
        y: 0,
        scale: 3,
        // rotation: 90,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: element.querySelector('#featured-designs'),
          start: 'top top',
          end: 'bottom center',
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <>
      <div
        className="flex bg-gray-600 h-[100rem] w-full relative z-0"
        ref={ref}
        id="landing"
        // ref={elementRef}
        // onScroll={console.log("scroll")}
      >
        {/* <h1 className="mt-[700px] text-white">ScrollPosition: {scroll.y}px</h1> */}
        {/* <div className="fixed top-0 left-0 w-full h-full"> */}
        {/* <svg
          id="path1"
          // className="overflow-visible h-full max-w-full inline-block"
          className="overflow-visible h-[20rem] w-[40rem] border"
          // className="overflow-visible h-full w-full"
          // viewBox="-20 0 557 190"
          viewBox="0 0 500 200"
          // viewBox="0 0 0 0"
        >
          <path
            id="path_1"
            fill="none"
            d="M43.258,74.916 C50.258,55.874 129.624,57.564 226.068,185.369 319.359,308.996 281.897,369.722 259.891,357.27"
            stroke-width="2"
            stroke="gray"
          />
        </svg> */}
        {/* </div> */}

        {/* <div className="design-container h-[50rem] animate-breath6 border"> */}
        <div
          id="path1Container"
          className="h-full w-full fixed top-0 left-0 text-center overflow-hidden"
        >
          <svg
            // id="path1"
            className="inline-block h-full"
            viewBox="0 0 808 1783"
            fill="none"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              id="path1"
              d="M1 0.667053C1068.47 315.611 849.74 1319.43 606.944 1781.97"
              stroke="black"
            />
          </svg>
        </div>

        {/* <svg
          id="motionPath"
          viewBox="-20 0 557 190"
          // className="overflow-visible h-full max-w-full"
          className="overflow-visible h-[10rem] w-[40rem] border"
        >
          <path
            id="path"
            fill="none"
            d="M8,102 C15,83 58,25 131,24 206,24 233,63 259,91 292,125 328,155 377,155 464,155 497,97 504,74"
            stroke-width="2"
            stroke="gray"
            // transform="rotate(-10 50 100) translate(-36 45.5) skewX(40) scale(1 0.5)"
          />
          <g className="visible">
            <path
              className="stroke-1 stroke-cyan-500"
              fill="#CCC"
              d="M25 127.7h.5v-16.1H4.1c.9 3.7 2.8 6.9 5.6 9.8 4.3 4.2 9.4 6.3 15.3 6.3m69.9 0h.1c5.9 0 11-2.1 15.2-6.3 2.9-2.9 4.7-6.1 5.6-9.8H94.4v16.1h.5M31.8 31.4c-4.3.9-8.1 2.9-11.4 6.2-4.5 4.5-6.7 9.9-6.7 16.2v13.6c3.3-2.1 7.1-3.2 11.3-3.2.9 0 1.7 0 2.6.1-1.5-3.9-2.3-8.2-2.3-12.7 0-7.6 2.2-14.3 6.5-20.2m74.5 36V53.8c0-6.3-2.2-11.7-6.7-16.2-3-3-6.5-5.1-10.4-6l-.2.8c3.9 5.6 5.8 12 5.8 19.2 0 4.2-.7 8.1-2 11.8l.1.8c.7-.1 1.4-.1 2.2-.1 4.1.1 7.8 1.2 11.2 3.3z"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="#FFF"
              d="M59.9 17.1h-.1c-9.5 0-17.6 3.4-24.3 10.1-1.3 1.3-2.5 2.7-3.6 4.2-4.3 5.9-6.5 12.6-6.5 20.3 0 4.6.8 8.8 2.3 12.7.2.6.5 1.2.8 1.8 1.7 3.6 4 6.9 7.1 9.9 3.3 3.3 6.8 5.7 10.7 7.4.1 0 .2.1.2.1.8.3 1.6.7 2.5.9 3.4 1.1 7.1 1.7 11 1.7 9.5 0 17.7-3.4 24.4-10.1 3.6-3.6 6.2-7.5 7.9-11.8l.3-.9c1.3-3.6 1.9-7.6 1.9-11.7 0-7.2-1.9-13.5-5.7-19.1l-.2-.2s0-.1-.1-.1l-.1-.1-.1-.1-.1-.1c0-.1-.1-.1-.1-.2 0 0 0-.1-.1-.1-1.1-1.5-2.3-2.9-3.7-4.3-6.8-6.9-14.9-10.3-24.4-10.3m50.2 53.4c-1.2-1.2-2.5-2.3-3.9-3.1-3.3-2.1-7.1-3.2-11.3-3.2-.7 0-1.5 0-2.2.1h-.4l-.3-.1c-1.7 4.3-4.3 8.3-7.9 11.8-6.7 6.7-14.9 10.1-24.4 10.1-3.9 0-7.6-.6-11-1.7-.8-.3-1.7-.6-2.5-.9-.1 0-.2-.1-.2-.1-3.9-1.7-7.5-4.2-10.7-7.4-3-3-5.4-6.3-7.1-9.9-.3-.6-.5-1.2-.8-1.8-.8-.1-1.7-.1-2.6-.1-4.2 0-8 1.1-11.3 3.2-1.4.9-2.7 1.9-3.9 3.1-4.2 4.2-6.3 9.2-6.3 15.2v20.6c0 1.9.2 3.7.6 5.4h21.4V89.1 145c.6 3.3 2.2 6.2 4.7 8.7 3.3 3.4 7.3 5 12 5s8.9-1.8 12.7-5.3c2.8-2.6 4.5-5.5 5-8.7v-15.9H47h26-13v15.9c.5 3.2 2.2 6.1 5 8.7 3.8 3.5 8 5.3 12.7 5.3 4.7 0 8.7-1.7 12-5 2.5-2.5 4-5.4 4.7-8.7V89v22.6h21.4c.4-1.7.6-3.5.6-5.4V85.6c0-5.8-2.1-10.9-6.3-15.1M60 118.1V88v30.1z"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="#2D2D2D"
              d="M59.7 2.5c-1.1 0-2 .4-2.7 1.1-.7.7-1.1 1.6-1.1 2.7s.4 2 1.1 2.7c.7.7 1.6 1.1 2.7 1.1s2-.4 2.7-1.1c.7-.7 1.1-1.6 1.1-2.7s-.4-2-1.1-2.7c-.7-.8-1.6-1.1-2.7-1.1z"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="none"
              stroke="#2D2D2D"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M115.8 111.6c.4-1.7.6-3.5.6-5.4V85.6c0-5.9-2.1-11-6.3-15.2-1.2-1.2-2.5-2.3-3.9-3.1-3.3-2.1-7.1-3.2-11.3-3.2h0c-.7 0-1.5 0-2.2.1h-.4m-.2.1c-1.7 4.3-4.3 8.3-7.9 11.8-6.7 6.7-14.9 10.1-24.4 10.1-3.9 0-7.6-.6-11-1.7-.8-.3-1.7-.6-2.5-.9-.1 0-.2-.1-.2-.1-3.9-1.7-7.5-4.2-10.7-7.4-3-3-5.4-6.3-7.1-9.9-.3-.6-.5-1.2-.8-1.8-.8-.1-1.7-.1-2.6-.1h0c-4.2 0-8 1.1-11.3 3.2-1.4.9-2.7 1.9-3.9 3.1-4.2 4.2-6.3 9.2-6.3 15.2v20.6c0 1.9.2 3.7.6 5.4h21.4V89.2m80.9-21.8V53.8c0-6.3-2.2-11.7-6.7-16.2-3-3-6.5-5.1-10.4-6m-.3.8c3.9 5.6 5.8 12 5.8 19.2 0 4.2-.7 8.1-2 11.8m-33-53.3c-1.1 0-2-.4-2.7-1.1-.7-.7-1.1-1.6-1.1-2.7s.4-2 1.1-2.7c.7-.7 1.6-1.1 2.7-1.1s2 .4 2.7 1.1c.7.7 1.1 1.6 1.1 2.7s-.4 2-1.1 2.7c-.7.7-1.6 1.1-2.7 1.1v7.1h.1c9.5 0 17.7 3.4 24.4 10.1 1.4 1.4 2.6 2.8 3.7 4.3 0 0 0 .1.1.1 0 .1.1.1.1.2l.1.1s0 0 0 0l.1.1s0 0 0 0 0 0 0 0l.1.1h0l.1.1.2.2c3.8 5.6 5.7 12 5.7 19.1 0 4.2-.6 8.1-1.9 11.7l-.3.9m-3-32.6h0c-.1 0-.1 0 0 0-.1 0-.1 0 0 0-.3-.1-.6-.1-.8-.2h-.2s0 .1.1.1v.1c.1.1.2.3.3.4 0 0 0 0 0 0h0c.1.1.2.3.3.4 0 0 0 0 0 0m-57.1-1c1.1-1.4 2.3-2.8 3.6-4.2 6.7-6.7 14.8-10.1 24.3-10.1m-46 50.3V53.8c0-6.3 2.2-11.7 6.7-16.2 3.3-3.3 7.1-5.4 11.4-6.2-4.3 5.9-6.5 12.6-6.5 20.3 0 4.6.8 8.8 2.3 12.7m65.1-.9s0 0 0 0h0v.2l-.2.5c0 .1-.1.1-.1.2m2.3 63.3h.3c5.9 0 11-2.1 15.2-6.3 2.9-2.9 4.7-6.1 5.6-9.8H94.4v16.1h.2m0 0h0m-47.3 1.1H73m-13 16c.5 3.2 2.2 6.1 5 8.7 3.8 3.5 8 5.3 12.7 5.3 4.7 0 8.7-1.7 12-5 2.5-2.5 4-5.4 4.7-8.7v-17.3m-68.8-.1V145c.6 3.3 2.2 6.2 4.7 8.7 3.3 3.4 7.3 5 12 5s8.9-1.8 12.7-5.3c2.8-2.6 4.5-5.5 5-8.7v-15.9m-34.4-1.1s0 0 0 0h-.3s0 0 0 0H25c-5.9 0-11-2.1-15.2-6.3-2.9-2.9-4.7-6.1-5.6-9.8m21.4 0v16.1m68.8-38.6v22.6M60 118.1V88"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="#7592A0"
              d="M84.5 68.6c6.8-4.3 10.2-9.5 10.2-15.5 0-5.1-2.4-9.6-7.2-13.4H32c-4.8 3.8-7.3 8.3-7.3 13.4 0 6.1 3.4 11.2 10.2 15.5C41.7 72.9 50 75 59.6 75c9.8 0 18-2.1 24.9-6.4z"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="none"
              stroke="#2D2D2D"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M94.7 53.1c0 6.1-3.4 11.2-10.2 15.5-6.8 4.3-15.1 6.4-24.7 6.4-9.7 0-17.9-2.1-24.7-6.4-6.8-4.3-10.2-9.5-10.2-15.5 0-5.1 2.4-9.6 7.3-13.4h55.5c4.6 3.8 7 8.3 7 13.4z"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="none"
              stroke="#E6E6E6"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="4"
              d="M83.5 47.6c2.4 3.5 2.4 7.8 0 12.7M35.8 47.6c-2.4 3.5-2.4 7.8 0 12.7"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="#1668B2"
              stroke="#EF3D43"
              stroke-miterlimit="10"
              stroke-width="1.439"
              d="M70.9 95.9c0-4.807 3.893-8.7 8.7-8.7 4.807 0 8.7 3.893 8.7 8.7 0 4.807-3.893 8.7-8.7 8.7a8.698 8.698 0 0 1-8.7-8.7z"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="#FFF"
              d="M79.6 101.7c-1.7 0-2.8-.9-2.6-1.9.5-2.6.9-5.2 1.4-7.8.2-1 .4-2.8 1.2-2.8.8 0 1 1.8 1.2 2.8.5 2.6.9 5.2 1.4 7.8.3 1-.9 1.8-2.6 1.9z"
            />
            <path
              className="stroke-1 stroke-cyan-500"
              fill="#FFF"
              d="M76.4 101.2c-.4 0-.8-.3-.8-.8v-3.3c0-.4.3-.8.8-.8.4 0 .8.3.8.8v3.3c0 .5-.3.8-.8.8zm6.4 0c-.4 0-.7-.3-.7-.7v-3.3c0-.4.3-.7.7-.7.4 0 .7.3.7.7v3.3c.1.4-.3.7-.7.7z"
            />
            <g fill="#FFF">
              <path
                className="stroke-1 stroke-cyan-500"
                d="M73.3 95.3a.7.7 0 1 1 1.4 0 .7.7 0 0 1-1.4 0z"
              />
              <path
                className="stroke-1 stroke-cyan-500"
                d="M73.9 95.3c0-.663.045-1.2.1-1.2.055 0 .1.537.1 1.2 0 .663-.045 1.2-.1 1.2-.055 0-.1-.537-.1-1.2z"
              />
              <path
                className="stroke-1 stroke-cyan-500"
                d="M72.7 95.3c0-.055.582-.1 1.3-.1.718 0 1.3.045 1.3.1 0 .055-.582.1-1.3.1-.718 0-1.3-.045-1.3-.1z"
              />
            </g>
            <g fill="#FFF">
              <path
                className="stroke-1 stroke-cyan-500"
                d="M84.1 93.4a.7.7 0 1 1 1.4 0 .7.7 0 0 1-1.4 0z"
              />
              <path
                className="stroke-1 stroke-cyan-500"
                d="M84.7 93.4c0-.663.045-1.2.1-1.2.055 0 .1.537.1 1.2 0 .663-.045 1.2-.1 1.2-.055 0-.1-.537-.1-1.2z"
              />
              <path
                className="stroke-1 stroke-cyan-500"
                d="M83.5 93.4c0-.055.582-.1 1.3-.1.718 0 1.3.045 1.3.1 0 .055-.582.1-1.3.1-.718 0-1.3-.045-1.3-.1z"
              />
            </g>
          </g>
        </svg> */}
        {/* </div> */}

        <div id="featured-designs">
          {/* <h1>ScrollTrigger</h1> */}
          <div
            id="whiskers-and-pipe"
            className="border absolute left-[15rem] top-[5rem] animate-breath1"
          >
            <WhiskersAndPipe
              name=""
              id="whiskers-and-pipe"
              className="design-container"
            />
          </div>

          <PeaceOnEarth
            name=""
            id="peace-on-earth"
            className="design-container border absolute right-[0rem] top-[2rem] h-[10rem] w-[10rem] animate-breath2"
          />
          <SkullIsFullOfCats
            name=""
            id="skulls-full-of-cats"
            className="design-container border absolute top-[25rem] left-[7rem] animate-breath3"
          />
          <RadRex
            name=""
            id="rad-rex"
            className="design-container border absolute top-[45rem] left-[10rem] animate-breath4"
          />
          <SeeYouInSpace
            name=""
            id="see-you-in-space"
            className="design-container border absolute top-[40rem] right-[7rem] animate-breath5"
          />
          <div
            id="dracula-visits-africa"
            className="border absolute left-[50%] top-[15rem]"
          >
            <DraculaVisitsAfrica
              id=""
              name=""
              className="design-container h-[20rem] animate-breath6"
            />
          </div>
          <CatsAndSkullsPattern
            name=""
            id="cats-and-skulls-pattern"
            className="design-container absolute bottom-[10rem] left-[50%] h-[50rem] border"
          />
        </div>
      </div>
    </>
  );
}

export default Landing;
