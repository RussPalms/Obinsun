import React from "react";
import { motion } from "framer-motion";
import useFirestore from "../../../../server/hooks/useFirestore";
import { useCollection } from "react-firebase-hooks/firestore";
// import {
//     // db
//     app
// } from "../../../../server/lib/database/firebaseStorage";
// import { collection, orderBy, query } from "firebase/firestore";

// import { getFirestore } from "firebase/firestore";

// const db = getFirestore(app);

// type Props = {};

function ImageGrid({ setSelectedImg, res }: any) {
  console.log("response from firebase storage bucket endpoint", res);

  //   const
  // //   [realtimePosts, loading, error]
  // {docs}
  //   = useCollection(
  //     query(collection(db, "images"), orderBy("createdAt", "desc"))
  //   );

  const { docs } = useFirestore("images");

  console.log("these are the currently uploaded documents", docs);

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc: any) => (
          <motion.div
            className="img-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              src={doc.url}
              alt="uploaded pic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            />
          </motion.div>

          // <div
          //   className="img-wrap"
          //   key={doc.id}
          //   onClick={() => setSelectedImg(doc.url)}
          // >
          //   <img src={doc.url} alt="uploaded pic" />
          // </div>
        ))}
    </div>
  );
}

export default ImageGrid;

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch("gs://obinsun-merch.appspot.com");
  // const docs = await res.json()

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      res,
      // docs,
    },
  };
}
