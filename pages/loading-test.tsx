import React, { useEffect, useRef } from 'react';

import CatsAndSkullsPatternBanner from './src/assets/ObinsunVectors/ZBanner/CatsAndSkullsPatternBanner';

type Props = {};

function LoadingTest({}: Props) {
  const ref = useRef(null);

  //   useEffect(() => {
  //     const loader: any = ref.current;

  //     // if (loader == null || ref == null) return;

  //     let bannerRef = loader.querySelector('#cats-and-skulls-pattern-banner');

  //     // console.log(bannerRef);

  //     const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
  //       (acc, el) => {
  //         const { x, y, width, height } = el.getBBox();
  //         if (!acc.xMin || x < acc.xMin) acc.xMin = x;
  //         if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
  //         if (!acc.yMin || y < acc.yMin) acc.yMin = y;
  //         if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
  //         return acc;
  //       },
  //       {}
  //     );

  //     const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;

  //     bannerRef.setAttribute('viewBox', viewbox);

  //     console.log(bannerRef);
  //   }, []);

  useEffect(() => {
    const loader: any = ref.current;
    let bannerRef = loader.querySelector('#cats-and-skulls-pattern-banner0');
    const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
      (acc, el) => {
        const { x, y, width, height } = el.getBBox();
        if (!acc.xMin || x < acc.xMin) acc.xMin = x;
        if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
        if (!acc.yMin || y < acc.yMin) acc.yMin = y;
        if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
        return acc;
      },
      {}
    );
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    bannerRef.setAttribute('viewBox', viewbox);
  }, []);

  useEffect(() => {
    const loader: any = ref.current;
    let bannerRef = loader.querySelector('#cats-and-skulls-pattern-banner1');
    const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
      (acc, el) => {
        const { x, y, width, height } = el.getBBox();
        if (!acc.xMin || x < acc.xMin) acc.xMin = x;
        if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
        if (!acc.yMin || y < acc.yMin) acc.yMin = y;
        if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
        return acc;
      },
      {}
    );
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    bannerRef.setAttribute('viewBox', viewbox);
  }, []);

  useEffect(() => {
    const loader: any = ref.current;
    let bannerRef = loader.querySelector('#cats-and-skulls-pattern-banner2');
    const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
      (acc, el) => {
        const { x, y, width, height } = el.getBBox();
        if (!acc.xMin || x < acc.xMin) acc.xMin = x;
        if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
        if (!acc.yMin || y < acc.yMin) acc.yMin = y;
        if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
        return acc;
      },
      {}
    );
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    bannerRef.setAttribute('viewBox', viewbox);
  }, []);

  useEffect(() => {
    const loader: any = ref.current;
    let bannerRef = loader.querySelector('#cats-and-skulls-pattern-banner3');
    const { xMin, xMax, yMin, yMax } = [...bannerRef.children].reduce(
      (acc, el) => {
        const { x, y, width, height } = el.getBBox();
        if (!acc.xMin || x < acc.xMin) acc.xMin = x;
        if (!acc.xMax || x + width > acc.xMax) acc.xMax = x + width;
        if (!acc.yMin || y < acc.yMin) acc.yMin = y;
        if (!acc.yMax || y + height > acc.yMax) acc.yMax = y + height;
        return acc;
      },
      {}
    );
    const viewbox = `${xMin} ${yMin} ${xMax - xMin} ${yMax - yMin}`;
    bannerRef.setAttribute('viewBox', viewbox);
  }, []);

  return (
    <>
      {/* <div className="h-full w-screen absolute top-0 left-0"> */}
      <section
        className="h-screen flex overflow-hidden relative first:bg-gray-500 nth-child:bg-gray-700"
        ref={ref}
      >
        {/* <div className="h-screen w-1/2 relative overflow-hidden first:stroke-[0.125em] first:stroke-black first:fill-transparent first:left-[100%] first:relative first:w-[50%] first:bg-cover first:overflow-hidden "> */}
        <div className="w-1/2 relative overflow-hidden first:stroke-[0.125em] first:stroke-black first:fill-transparent">
          <div className="initial-page-loaders right-[-80%]">
            <CatsAndSkullsPatternBanner
              id="cats-and-skulls-pattern-banner0"
              name=""
              className="h-[12em]"
            />
            <CatsAndSkullsPatternBanner
              id="cats-and-skulls-pattern-banner1"
              name=""
              className="h-[12em]"
            />
          </div>
        </div>
        <div className="w-1/2 relative overflow-hidden">
          <div className="initial-page-loaders left-[-20%]">
            <CatsAndSkullsPatternBanner
              id="cats-and-skulls-pattern-banner2"
              name=""
              className="h-[12em]"
            />
            <CatsAndSkullsPatternBanner
              id="cats-and-skulls-pattern-banner3"
              name=""
              className="h-[12em]"
            />
          </div>
        </div>
      </section>
      {/* </div> */}
    </>
  );
}

export default LoadingTest;
