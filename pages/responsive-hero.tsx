import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/dist/MotionPathPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import DraculaVisitsAfrica from "./src/assets/ObinsunVectors/DraculaVisitsAfrica";
import PeaceOnEarth from "./src/assets/ObinsunVectors/PeaceOnEarth";
import RadRex from "./src/assets/ObinsunVectors/RadRex";
import SeeYouInSpace from "./src/assets/ObinsunVectors/SeeYouInSpace";
import SkullIsFullOfCats from "./src/assets/ObinsunVectors/SkullIsFullOfCats";
import WhiskersAndPipe from "./src/assets/ObinsunVectors/WhiskersAndPipe";
import CatsAndSkullsPattern from "./src/assets/ObinsunVectors/CatsAndSkullsPattern";

type Props = {};

function ResponsiveHero({}: Props) {
  if (typeof window !== "undefined") {
    gsap.registerPlugin(MotionPathPlugin);
    gsap.registerPlugin(ScrollTrigger);
  }

  const ref = useRef(null);

  useEffect(() => {
    const container: any = ref.current;

    let path_1 = container!.querySelector("#path1");
    let path_1_length = path_1.getTotalLength();
    let rectRef = container!.querySelector("#whiskers-and-pipe");
    let landing = container!.querySelector("#landing");

    path_1.style.strokeDasharray = path_1_length + " " + path_1_length;
    path_1.style.strokeDashoffset = path_1_length;

    document.addEventListener("scroll", (e) => {
      e.preventDefault();

      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById("landing").scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_1_length * scrollPercentage;
      path_1.style.strokeDashoffset = path_1_length - drawLength;
    });

    gsap.set(rectRef, { autoAlpha: 1 });

    gsap.defaults({ ease: "none" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(rectRef, {
        rotate: "90deg",
        rotationY: "-3rad",
        skewY: "10deg",
        immediateRender: true,
        motionPath: {
          path: path_1,
          align: path_1,
          alignOrigin: [0.5, 0.5],
          autoRotate: false,
        },
      });
  }, []);

  useEffect(() => {
    const container: any = ref.current;

    let path_2 = container!.querySelector("#path2");
    let path_2_length = path_2.getTotalLength();
    let rect0Ref = container!.querySelector("#peace-on-earth");
    let landing = container!.querySelector("#landing");

    path_2.style.strokeDasharray = path_2_length + " " + path_2_length;
    path_2.style.strokeDashoffset = path_2_length;

    document.addEventListener("scroll", (e) => {
      e.preventDefault();

      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById("landing").scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_2_length * scrollPercentage;
      path_2.style.strokeDashoffset = path_2_length - drawLength;
    });

    gsap.set(rect0Ref, { autoAlpha: 1 });

    gsap.defaults({ ease: "none" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(rect0Ref, {
        immediateRender: true,
        motionPath: {
          path: path_2,
          align: path_2,
          alignOrigin: [0.5, 0.5],
        },
      });
  }, []);

  useEffect(() => {
    const container: any = ref.current;

    let path_4 = container!.querySelector("#path4");
    let path_4_length = path_4.getTotalLength();
    let rect4Ref = container!.querySelector("#rad-rex");
    let landing = container!.querySelector("#landing");

    console.log(path_4.pathLength);

    path_4.style.strokeDasharray = path_4_length + " " + path_4_length;
    path_4.style.strokeDashoffset = path_4_length;

    document.addEventListener("scroll", (e) => {
      e.preventDefault();

      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById("landing").scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_4_length * scrollPercentage;
      path_4.style.strokeDashoffset = path_4_length - drawLength;
    });

    gsap.set(rect4Ref, { autoAlpha: 1 });

    gsap.defaults({ ease: "none" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(rect4Ref, {
        immediateRender: true,
        motionPath: {
          path: path_4,
          align: path_4,
          alignOrigin: [0.5, 0.5],
        },
      });
  }, []);

  useEffect(() => {
    const container: any = ref.current;

    let see_you_in_space = container!.querySelector("#see_you_in_space");
    let see_you_in_space_length = see_you_in_space.getTotalLength();
    let seeYouInSpaceRef = container!.querySelector("#see-you-in-space");
    let landing = container!.querySelector("#landing");

    console.log(see_you_in_space.pathLength);

    see_you_in_space.style.strokeDasharray =
      see_you_in_space_length + " " + see_you_in_space_length;
    see_you_in_space.style.strokeDashoffset = see_you_in_space_length;

    document.addEventListener("scroll", (e) => {
      e.preventDefault();

      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById("landing").scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = see_you_in_space_length * scrollPercentage;
      see_you_in_space.style.strokeDashoffset =
        see_you_in_space_length - drawLength;
    });

    gsap.set(seeYouInSpaceRef, { autoAlpha: 1 });

    gsap.defaults({ ease: "none" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(seeYouInSpaceRef, {
        immediateRender: true,
        motionPath: {
          path: see_you_in_space,
          align: see_you_in_space,
          alignOrigin: [0.5, 0.5],
        },
      });
  }, []);

  useEffect(() => {
    const container: any = ref.current;

    let path_9 = container!.querySelector("#skull_is_full_of_cats");
    let path_9_length = path_9.getTotalLength();
    let design9Ref = container!.querySelector("#skull-is-full-of-cats");
    let landing = container!.querySelector("#landing");

    console.log(path_9.pathLength);

    path_9.style.strokeDasharray = path_9_length + " " + path_9_length;
    path_9.style.strokeDashoffset = path_9_length;

    document.addEventListener("scroll", (e) => {
      e.preventDefault();

      let event: any = e.target;
      let scrollPercentage =
        (event.documentElement.scrollTop +
          event.getElementById("landing").scrollTop) /
        (event.documentElement.scrollHeight -
          event.documentElement.clientHeight);
      let drawLength = path_9_length * scrollPercentage;
      path_9.style.strokeDashoffset = path_9_length - drawLength;
    });

    gsap.set(design9Ref, { autoAlpha: 1 });

    gsap.defaults({ ease: "none" });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: landing,
          scrub: true,
        },
      })
      .to(design9Ref, {
        immediateRender: true,
        motionPath: {
          path: path_9,
          align: path_9,
          alignOrigin: [0.5, 0.5],
        },
      });
  }, []);

  //   useEffect(() => {
  //     const container: any = featuredRef.current;

  //     let landingRef = container!.querySelector("#landing");
  //     // let featuredDesignsRef = container!.querySelector("#featured");
  //     let pathContainerRef = container!.querySelector("#path_container");

  //     gsap.set(pathContainerRef, { autoAlpha: 1 });

  //     gsap.defaults({ ease: "none" });

  //     gsap
  //       .timeline({
  //         scrollTrigger: {
  //           trigger: landingRef,
  //           scrub: true,
  //         },
  //       })
  //       .to(pathContainerRef, {
  //         immediateRender: true,
  //         y: 500,
  //       });
  //   }, []);

  //   useEffect(() => {
  //     const container: any = ref.current;
  //     let landingRef = container!.querySelector("#landing");
  //     let featuredDesignsRef = container!.querySelector("#featured");

  //     gsap.set(featuredDesignsRef, { autoAlpha: 1 });

  //     gsap.fromTo(
  //       featuredDesignsRef,
  //       {
  //         immediateRender: true,
  //       },
  //       {
  //         y: 500,
  //         duration: 1,
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: landingRef,
  //           //   start: "top top",
  //           //   end: "bottom center",
  //           scrub: true,
  //         },
  //       }
  //     );
  //   }, []);

  const featuredRef = useRef(null);

  useEffect(() => {
    const container: any = ref.current;
    // const container: any = featuredRef.current;
    let landingRef = container!.querySelector("#landing");
    // let featuredDesignsRef = container!.querySelector("#featured");
    // let boundryRef = container!.querySelector("#design-boundry");
    let pathContainerRef = container!.querySelector("#path_container");

    gsap.set(pathContainerRef, { autoAlpha: 1 });

    gsap.fromTo(
      pathContainerRef,
      //   landingRef,
      //   featuredRef,
      //   featuredDesignsRef,
      {
        pinSpacing: false,
        // pinSpacing: true,
        // immediateRender: true,
        // anticipatePin: 12,
        pin: true,
      },
      {
        y: 600,
        duration: 1,
        ease: "none",
        scrollTrigger: {
          trigger: landingRef,
          scrub: 0.5,
          //   scrub: 0.1,
          //   scrub: true,
          //   start: "top top",
          //   pinSpacing: false,
          //   anticipatePin: 48,
          //   anticipatePin: 100,
          //   anticipatePin: 1000,
          anticipatePin: 1,
          // pin: true,
          refreshPriority: 1,
          snap: {
            snapTo: container, // snap to the closest label in the timeline
            // duration: {min: 0.2, max: 3}, // the snap animation should be at least 0.2 seconds, but no more than 3 seconds (determined by velocity)
            delay: 0.5, // wait 0.2 seconds from the last scroll event before doing the snapping
            // ease: "power1.inOut" // the ease of the snap animation ("power3" by default)
            inertia: false,
          },
        },
      }
    );
  }, []);

  return (
    <>
      <div
        className="flex bg-gray-600 w-full relative z-0 h-[200vh]"
        ref={ref}
        id="landing"
      >
        <div
          ref={featuredRef}
          id="featured"
          className="h-[100rem] w-full border border-black border-1 absolute flex justify-center items-center z-10"
        >
          <div
            id="design-bountry"
            className="h-[100vh] w-[97%] absolute top-0 flex justify-center items-center border border-3 border-purple-900 "
          >
            <div
              id="path_container"
              className="h-[93vh] w-[95%] grid gap-0 grid-cols-3 grid-rows-3 text-white items-center justify-items-center border border-1 border-green-300 relative visible"
            >
              <div
                id="path1Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-1 border-red-400 flex justify-center items-center"
              >
                <div
                  className="h-[480%] w-[350%] border border-1 absolute border-blue-300 flex justify-center items-center left-0 top-0"
                  id="path_design_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-1 border-black visible"
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
                  <div className="absolute animate-breath1">
                    <div
                      className="featured-container bg-blue-500 absolute border border-1"
                      id="whiskers-and-pipe"
                    >
                      <WhiskersAndPipe id="" name="" className="" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="content relative h-1/2 w-1/2 text-center border border-1 border-gray-500"></div>

              <div
                id="path2Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-1 border-red-400 flex justify-center items-center"
              >
                <div
                  className="h-[480%] w-[350%] border border-1 absolute border-blue-300 flex justify-center items-center right-0 top-0"
                  id="path_design0_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-1 border-black visible"
                    viewBox="0 0 291 753"
                    fill="none"
                    preserveAspectRatio="xMidYMax meet"
                  >
                    <path
                      id="path2"
                      d="M290.5 1C194 254.5 189.4 906.9 1 718.5"
                      stroke="black"
                    />
                  </svg>
                  <div
                    className="featured-container bg-pink-500 absolute visible border border-1"
                    id="peace-on-earth"
                  >
                    <PeaceOnEarth id="" className="" name="" />
                  </div>
                </div>
              </div>

              <div
                id="path4Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-1 border-red-400 flex justify-center items-center visible"
              >
                <div
                  className="h-[350%] w-[300%] border border-1 absolute border-blue-300 flex justify-center items-center left-0"
                  id="path_design4_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-1 border-black visible"
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
                    className="featured-container bg-blue-500 absolute visible border border-1"
                    id="rad-rex"
                  >
                    <RadRex id="" name="" className="" />
                  </div>
                </div>
              </div>

              <div className="content relative h-1/2 w-1/2 text-center border border-1 border-gray-500"></div>
              <div className="content relative h-1/2 w-1/2 text-center border border-1 border-gray-500"></div>

              <div
                id="see_you_in_space_Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-1 border-red-400 flex justify-center items-center"
              >
                <div
                  className="h-[150%] w-[500%] border border-1 absolute border-blue-300 flex justify-center items-center bottom-0 left-0"
                  id="path_design7_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-1 border-black visible"
                    viewBox="0 0 816 718"
                    fill="none"
                    preserveAspectRatio="xMidYMax meet"
                  >
                    <path
                      id="see_you_in_space"
                      d="M1 717C176.833 444.833 528.5 -41.7 528.5 189.5C528.5 420.7 528.5 160.833 528.5 2L815.5 289"
                      stroke="black"
                    />
                  </svg>
                  <div
                    className="featured-container bg-blue-500 absolute visible border border-1"
                    id="see-you-in-space"
                  >
                    <SeeYouInSpace id="" name="" className="" />
                  </div>
                </div>
              </div>

              <div className="content relative h-1/2 w-1/2 text-center border border-1 border-gray-500"></div>

              <div
                id="skull_is_full_of_cats_Container"
                className="h-1/2 w-1/2 relative text-center overflow-visible border border-1 border-red-400 flex justify-center items-center"
              >
                <div
                  className="h-[200%] w-[400%] border border-1 absolute border-blue-300 flex justify-center items-center bottom-0 right-0"
                  id="path_design9_container"
                >
                  <svg
                    className="h-[100%] w-[100%] border border-1 border-black visible"
                    viewBox="0 0 571 647"
                    fill="none"
                    preserveAspectRatio="xMidYMax meet"
                  >
                    <path
                      id="skull_is_full_of_cats"
                      d="M570 646.5C380.333 559.333 1 323.5 1 77.5C1 -168.5 1 233.333 1 465"
                      stroke="black"
                    />
                  </svg>

                  <div
                    className="featured-container bg-blue-500 absolute visible border border-1"
                    id="skull-is-full-of-cats"
                  >
                    <SkullIsFullOfCats id="" name="" className="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <h1 className="text-large text-purple-800 border-4 border-yellow-700">
          More Content
        </h1> */}
      </div>
    </>
  );
}

export default ResponsiveHero;
