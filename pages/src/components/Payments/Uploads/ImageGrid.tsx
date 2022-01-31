import React, { useEffect } from "react";
import { motion } from "framer-motion";
import useFirestore from "../../../../server/hooks/useFirestore";
import {
  useSession,
  //  getSession
} from "next-auth/react";
import axios from "axios";

// async function uploadImages(email:any, images:any) {
//   const response = await fetch("/api/user/images", {
// 		method: "POST",
// 		body: JSON.stringify({ email,images }),
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 	});

// 	const userImages = await response.json();
// 	if (!response.ok) {
// 		throw new Error(userImages.message || "Something went wrong!");
// 	}

// 	console.log(userImages);

// 	return userImages;
// }

function ImageGrid({
  setSelectedImg,
}: // , res
any) {
  const {
    data: session,
    // , status
  } = useSession();

  // console.log(status, session);

  // console.log("response from firebase storage bucket endpoint", res);

  const userImage = `users/${session?.id}/images`;

  const { docs } = useFirestore(userImage);
  // const { docs } = useFirestore("users");
  // const { docs } = useFirestore(`users/${session?.id}/images`);

  // console.log("these are the currently uploaded documents", docs);

  // const uploadImages = async () => {
  //   await axios.post("/api/user/images", {
  //     userId: session?.id,
  //     uploadedImages: docs,
  //   });
  // };

  // uploadImages(session?.id, docs)

  useEffect(() => {
    console.log();
  });

  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc: any) => (
          <motion.div
            className="img-wrap"
            // key={doc.id}
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            // onClick={() => setSelectedImg(doc.url)}
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
        ))}
    </div>
  );
}

export default ImageGrid;

// // This function gets called at build time on server-side.
// // It won't be called on client-side, so you can even do
// // direct database queries.
// export async function getStaticProps() {
//   // Call an external API endpoint to get posts.
//   // You can use any data fetching library
//   const res = await fetch("gs://obinsun-merch.appspot.com");
//   // const docs = await res.json()

//   // By returning { props: { posts } }, the Blog component
//   // will receive `posts` as a prop at build time
//   return {
//     props: {
//       res,
//       // docs,
//     },
//   };
// }

// export async function getServerSideProps(context) {
// 	const session = await getSession(context);

// 	return {
// 		props: {
// 			session,
// 		},
// 	};
// }
