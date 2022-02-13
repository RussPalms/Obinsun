import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

type Props = {};

function MotionTesting({}: Props) {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.registerPlugin(ScrollTrigger);
  }

  const ref = useRef(null);

  useEffect(() => {
    const container: any = ref.current;

    if (container == null || ref == null) return;

    let path_1 = container!.querySelector("#path1");
    let path_1_length = path_1.getTotalLength();
    let rectRef = container!.querySelector("#rect");
    let landing = container!.querySelector("#landing");

    console.log(path_1.pathLength);

    path_1.style.strokeDasharray = path_1_length + " " + path_1_length;
    path_1.style.strokeDashoffset = path_1_length;

    document.addEventListener("scroll", (e) => {
      e.preventDefault();

      if (container == null) return;
      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById("landing").scrollTop) /
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

    gsap.defaults({ ease: "none" });
    gsap
      .timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: landing,
          scrub: true,
          //   start: "top center",
          //   end: "bottom center",
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
            // alignOrigin: [0.5, 0.5],
            alignOrigin: [0.5, 0.5],
            // autoRotate: 90,
            autoRotate: false,
          },
        }
        // 0
      );
  }, []);

  return (
    <>
      {/* <div className="flex justify-center items-center h-[200rem] w-screen bg-black"> */}
      <div
        className="flex bg-gray-600 h-[100rem] w-full relative z-0"
        ref={ref}
        id="landing"
      >
        <div
          id="path1Container"
          className="h-full w-full fixed top-0 left-0 text-center overflow-hidden"
        >
          <svg
            className="inline-block h-full w-full"
            // className="h-full"
            viewBox="0 0 808 1783"
            fill="none"
            preserveAspectRatio="xMidYMax meet"
          >
            <path
              id="path1"
              d="M1 0.667053C1068.47 315.611 849.74 1319.43 606.944 1781.97"
              //   d="M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37"
              //   stroke="black"
            />
            {/* <g id="rect"> */}
            <rect
              id="rect"
              width="85"
              height="30"
              fill="dodgerblue"
              //   className="overflow-visible"
            />
            {/* <text className="pointer-events-none" x="10" y="19" fontSize="14">
                SVG &lt;rect&gt;
              </text> */}
            {/* </g> */}
          </svg>
          {/* <rect id="rect" width="85" height="30" fill="dodgerblue" /> */}
        </div>
        {/* <rect id="rect" width="85" height="30" fill="dodgerblue" /> */}
      </div>

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
    </>
  );
}

export default MotionTesting;
