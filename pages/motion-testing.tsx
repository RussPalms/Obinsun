import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Obinsun from './Production/Layout/Obinsun';
import Link from 'next/link';
import Content from './Production/Layout/Content';

type Props = {};

function MotionTesting({}: Props) {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.registerPlugin(ScrollTrigger);
  }

  const ref = useRef(null);
  // const container: any = ref.current;

  useEffect(() => {
    const container: any = ref.current;

    // if (container == null || ref == null) return;

    let path_1 = container!.querySelector('#path1');
    let path_1_length = path_1.getTotalLength();
    let rectRef = container!.querySelector('#rect');
    let landing = container!.querySelector('#landing');

    console.log(path_1.pathLength);

    path_1.style.strokeDasharray = path_1_length + ' ' + path_1_length;
    path_1.style.strokeDashoffset = path_1_length;

    document.addEventListener('scroll', (e) => {
      e.preventDefault();

      // if (container == null) return;
      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById('landing').scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_1_length * scrollPercentage;
      path_1.style.strokeDashoffset = path_1_length - drawLength;

      //   gsap.defaults({ ease: "none" });
      //   gsap
      //     .timeline({
      //       defaults: { duration: 1 },
      //       scrollTrigger: {
      //         trigger: landing,
      //         scrub: true,
      //         //   start: "top center",
      //         //   end: "bottom center",
      //       },
      //     })
      //     //   .to(rectRef, { duration: 0.01, autoAlpha: 1 })
      //     //   .from(".theLine", {drawSVG: 0}, 0)
      //     //   .from(path_1)
      //     .to(
      //       rectRef,
      //       {
      //         motionPath: {
      //           path: path_1,
      //           align: path_1,
      //           alignOrigin: [0.5, 0.5],
      //         },
      //       }
      //       // 0
      //     );
    });

    // gsap.to(rectRef, {
    //   duration: 5,
    //   repeat: 12,
    //   repeatDelay: 3,
    //   yoyo: true,
    //   ease: "power1.inOut",
    //   motionPath: {
    //     path: path_1,
    //     align: path_1,
    //     autoRotate: true,
    //     alignOrigin: [0.5, 0.5],
    //   },
    // });

    gsap.set(rectRef, { autoAlpha: 1 });

    gsap.defaults({ ease: 'none' });
    gsap
      .timeline({
        // defaults: { duration: 1 },
        scrollTrigger: {
          trigger: landing,
          scrub: true,
          // start: "top center",
          // start: "center",
          // start: "top",
          // end: "bottom center",
          // end: "top center",
          // end: "center",
          // end: "bottom",
        },
      })
      //   .to(rectRef, { duration: 0.01, autoAlpha: 1 })
      //   .from(".theLine", {drawSVG: 0}, 0)
      //   .from(path_1)
      .to(
        rectRef,
        {
          immediateRender: true,
          motionPath: {
            path: path_1,
            align: path_1,
            alignOrigin: [0.5, 0.5],
            // alignOrigin: [0, 1],
            // alignOrigin: [0.5, 1],
            // alignOrigin: [1, 0.5],
            // alignOrigin: [0, 1],
            // alignOrigin: [1, 0.5],
            // alignOrigin: [1.5, 0.5],
            // autoRotate: 90,
            autoRotate: false,
            // start: 0.05,
            // end: 0.95,
          },
        }
        // 0
      );
  }, []);

  useEffect(() => {
    const container: any = ref.current;

    // if (container == null || ref == null) return;

    let path_2 = container!.querySelector('#path2');
    let path_2_length = path_2.getTotalLength();
    let rect0Ref = container!.querySelector('#rect0');
    let landing = container!.querySelector('#landing');

    console.log(path_2.pathLength);

    path_2.style.strokeDasharray = path_2_length + ' ' + path_2_length;
    path_2.style.strokeDashoffset = path_2_length;

    document.addEventListener('scroll', (e) => {
      e.preventDefault();

      // if (container == null) return;
      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById('landing').scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_2_length * scrollPercentage;
      path_2.style.strokeDashoffset = path_2_length - drawLength;
    });

    gsap.set(rect0Ref, { autoAlpha: 1 });

    gsap.defaults({ ease: 'none' });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(
        rect0Ref,
        {
          immediateRender: true,
          motionPath: {
            path: path_2,
            align: path_2,
            alignOrigin: [0.5, 0.5],
            // autoRotate: true,
            // start: 0.05,
            // end: 0.95,
          },
        }
        // 0
      );
  }, []);

  useEffect(() => {
    const container: any = ref.current;

    let path_4 = container!.querySelector('#path4');
    let path_4_length = path_4.getTotalLength();
    let rect4Ref = container!.querySelector('#rect4');
    let landing = container!.querySelector('#landing');

    console.log(path_4.pathLength);

    path_4.style.strokeDasharray = path_4_length + ' ' + path_4_length;
    path_4.style.strokeDashoffset = path_4_length;

    document.addEventListener('scroll', (e) => {
      e.preventDefault();

      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById('landing').scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_4_length * scrollPercentage;
      path_4.style.strokeDashoffset = path_4_length - drawLength;
    });

    gsap.set(rect4Ref, { autoAlpha: 1 });

    gsap.defaults({ ease: 'none' });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(
        rect4Ref,
        {
          immediateRender: true,
          motionPath: {
            path: path_4,
            align: path_4,
            alignOrigin: [0.5, 0.5],
          },
        }
        // 0
      );
  }, []);

  return (
    <>
      {/* <div className="flex justify-center items-center h-[200rem] w-screen bg-black"> */}
      {/* <div> */}
      <Content>
        <div
          className="flex bg-gray-600 w-full relative z-0 h-[200vh]"
          ref={ref}
          id="landing"
        >
          {/* <div className="relative h-full w-full"> */}
          <div
            id="featured"
            className="h-[100em] w-full border-black border-8 absolute flex justify-center items-center"
          >
            <div
              id="path_container"
              // className="h-[75%] w-[75%] border relative flex justify-center items-center"
              className="h-[60%] w-[100%] grid gap-0 grid-cols-3 grid-rows-3 text-white items-center justify-items-center border border-green-300 absolute top-0"
            >
              <div
                id="path1Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-red-400 flex justify-center items-center"
              >
                <div
                  className="h-[480%] w-[350%] border absolute border-blue-300 flex justify-center items-center left-0 top-0"
                  id="path_design_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-black"
                    // className="inline-block"
                    // className="h-full"
                    viewBox="0 0 808 1783"
                    // viewBox="0 0 808 1800"
                    fill="none"
                    // stroke="black"
                    preserveAspectRatio="xMidYMax meet"
                    // id="path1"
                    // path="M1 0.667053C1068.47 315.611 849.74 1319.43 606.944 1781.97"
                    // stroke="black"
                  >
                    {/* <div> */}
                    <path
                      // className="h-full"
                      id="path1"
                      d="M1 0.667053C1068.47 315.611 849.74 1319.43 606.944 1781.97"
                      //   d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
                      stroke="black"
                    />
                    {/* <g id="rect"> */}
                    {/* <div> */}
                    {/* <rect
                    className="invisible"
                    id="rect"
                    width="85"
                    height="30"
                    fill="dodgerblue"
                    //   className="overflow-visible"
                  /> */}
                    {/* </div> */}
                    {/* </div> */}
                    {/* <text className="pointer-events-none" x="10" y="19" fontSize="14">
                SVG &lt;rect&gt;
              </text> */}
                    {/* </g> */}
                  </svg>
                  {/* <div className="h-full f-full absolute border border-green-100"> */}
                  <div
                    className="h-20 w-20 bg-blue-500 absolute invisible border"
                    id="rect"
                  />
                  {/* </div> */}
                </div>
                {/* <rect id="rect" width="85" height="30" fill="dodgerblue" /> */}
              </div>

              <div className="content relative h-1/2 w-1/2 text-center border border-gray-500">
                path 2
              </div>

              <div
                id="path2Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-red-400 flex justify-center items-center"
              >
                <div
                  className="h-[480%] w-[350%] border absolute border-blue-300 flex justify-center items-center right-0 top-0"
                  id="path_design0_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-black"
                    // viewBox="-20 0 557 190"
                    viewBox="0 0 291 753"
                    fill="none"
                    preserveAspectRatio="xMidYMax meet"
                  >
                    <path
                      id="path2"
                      // d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
                      d="M290.5 1C194 254.5 189.4 906.9 1 718.5"
                      stroke="black"
                    />
                    {/* <rect id="rect0" width="85" height="30" fill="dodgerblue" /> */}
                    {/* <svg
                    // width="291" height="753"
                    viewBox="0 0 291 753"
                    fill="none"
                    // xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M290.5 1C194 254.5 189.4 906.9 1 718.5"
                      stroke="black"
                    />
                  </svg> */}
                  </svg>
                  <div
                    className="h-20 w-20 bg-blue-500 absolute invisible border"
                    id="rect0"
                  />
                </div>
              </div>

              <div
                id="path4Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-red-400 flex justify-center items-center"
              >
                <div
                  className="h-[350%] w-[300%] border absolute border-blue-300 flex justify-center items-center left-0"
                  id="path_design4_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-black"
                    viewBox="0 0 1060 524"
                    fill="none"
                    preserveAspectRatio="xMidYMax meet"
                  >
                    <path
                      id="path4"
                      d="M1 1.00003C948 44 1193 341 995 523.5"
                      stroke="black"
                    />
                  </svg>

                  <div
                    className="h-20 w-20 bg-blue-500 absolute invisible border"
                    id="rect4"
                  />
                </div>
              </div>

              <div className="content relative h-1/2 w-1/2 text-center border border-gray-500">
                path 5
              </div>
              <div className="content relative h-1/2 w-1/2 text-center border border-gray-500">
                path 7
              </div>
              <div className="content relative h-1/2 w-1/2 text-center border border-gray-500">
                path 7
              </div>
              <div className="content relative h-1/2 w-1/2 text-center border border-gray-500">
                path 8
              </div>
              <div className="content relative h-1/2 w-1/2 text-center border border-gray-500">
                Last grid item
              </div>
            </div>
          </div>

          {/* </div> */}
          {/* <rect id="rect" width="85" height="30" fill="dodgerblue" /> */}
          {/* <div className="h-[100em] w-screen border-blue-500 border-[5em] absolute">
          Content
        </div> */}
        </div>
        {/* </div> */}
        {/* <div ref={ref} className="h-full m-0 p-0 overflow-hidden">
        <body className="bg-black text-black font-sans font-light text-base min-h-full flex flex-cols items-center">
          <svg
            width="100%"
            height="100%"
            viewBox="-20 0 557 190"
            id="svg"
            className="overflow-visible h-full transform translate-z-0"
          >
            <circle cx="100" cy="100" r="3" />
            <circle cx="300" cy="20" r="3" />
            <path
              id="path"
              d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
              className="stroke-2 stroke-gray-500"
            />
            <g id="rect">
              <rect width="85" height="30" fill="dodgerblue" />
              <text className="pointer-events-none" x="10" y="19" fontSize="14">
                SVG &lt;rect&gt;
              </text>
            </g>
          </svg>

          <div
            id="div"
            className="w-[120px] h-[60px] pointer-events-none bg-[#aa00ee] text-black text-center leading-[60px] absolute top-[30%] left-[60%] text-[32px]"
          >
            #div
          </div>
        </body>
      </div> */}
        {/* </div> */}
        {/* </div> */}
        Scroll here
        <Link href="/">Home</Link>
      </Content>
    </>
  );
}

export default MotionTesting;
