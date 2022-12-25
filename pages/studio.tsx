// import { Studio } from '@/components/Studio';
import Content from 'pages/Production/Layout/Content';
import React, { useEffect } from 'react';
import SvgGrid from './src/components/Payments/Uploads/SvgGrid';
// import Content from './Production/Layout/Content';
import { Studio } from './src/components/Studio';
import { motion } from 'framer-motion';
import { getSession } from 'next-auth/react';

const title = 'Welcome, this is Obinsun 👋';
const subtitle =
  'You will find a plethora of custom graphic designs attatched to high quality merchandise.';

export default function StudioPage(retrievedDesigns: []) {
  const designs = Object.values(retrievedDesigns)[0] as [];

  // console.log(designs);

  console.log(designs);

  // useEffect(() => {
  //   console.log();
  // }, []);

  return (
    <Content title="Studio" description={`${title} - ${subtitle}`}>
      <div className="">
        <Studio />
      </div>
      <SvgGrid designs={designs} />
      <div className="svg-grid">
        {designs &&
          designs.map((design: any) => (
            <motion.div
              className="svg-wrap"
              key={design.id}
              layout
              whileHover={{ opacity: 1 }}
              // onClick={() => setSelectedImg(design.url)}
            >
              <motion.img
                className="svgs"
                src={design.url}
                alt="uploaded pic"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              />
            </motion.div>
          ))}
      </div>
    </Content>
  );
}

export const getServerSideProps = async (ctx) => {
  // const session = await getSession(ctx);

  // console.log(ctx);

  const getDesigns = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  // const getDesigns = await fetch(`${process.env.NEXTAUTH_URL}/api/design/${designAddition.id}`)
  const retrievedDesigns = await fetch(
    `${process.env.NEXTAUTH_URL}/api/design/`,
    getDesigns
  )
    .then((response) => response.json())
    .then((data) => data);
  return {
    props: {
      // session,
      retrievedDesigns,
    },
  };
};

// export const getServerSideProps = async () => {
//   const designAddition = {
//     id: 2,
//     file: 'test/file2',
//     name: 'test2',
//     description: 'test design 2',
//   };

//   const addDesign = {
//     method: 'POST',
//     body: JSON.stringify(designAddition),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };

//   // const getDesigns = {
//   //   method: 'GET',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   // };

//   const addedDesign = await fetch(
//     `${process.env.NEXTAUTH_URL}/api/design/${designAddition.id}`,
//     addDesign
//   )
//     .then((res) => res.json())
//     .then((data) => data);

//   console.log(addedDesign);

//   // const retrievedDesigns = await fetch(
//   //   `${process.env.NEXTAUTH_URL}/api/design/${designAddition.name}`,
//   //   getDesigns
//   // )
//   //   .then((res) => res.json())
//   //   // .then((data) => console.log(data));
//   //   .then((data) => data);

//   // console.log(retrievedDesigns);

//   return {
//     props: {},
//   };
// };
