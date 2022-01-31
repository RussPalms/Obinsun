import {
  useState,
  useEffect,
  // , useCallback
} from "react";
import { db } from "../lib/database/firebaseStorage";
// import { useSession } from "next-auth/react";
// import { useDispatch, useSelector } from "react-redux";

import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import { addToimages } from "../../app/state/slices/imagesSlice";

const useFirestore = (collections: any) => {
  // const dispatch = useDispatch();

  // const { data: session, status } = useSession();
  // console.log(status, session);

  const [docs, setDocs] = useState([]);

  // console.log("rendered out firestore documents", docs);
  // console.log("users/", `${session?.id}`, collections);

  // const userImageRef = `"users/", ${session?.id}, ${collections}`

  useEffect(() => {
    const collectionsRef = collection(db, collections);
    // const collectionsRef = collection(
    //   db,
    //   userImageRef
    // );

    const collectionsQuery = query(
      collectionsRef,
      orderBy("createdAt", "desc")
    );

    // console.log("accessing firestore collections", collectionsQuery);

    // console.log(
    //   "fetching firestore documents when ImageGrid component is loaded"
    // );

    const unsub = () => {
      onSnapshot(collectionsQuery, (snapshot) => {
        let documents: any = [];
        snapshot.forEach((doc) => {
          // console.log(doc.id);

          documents.push({ ...doc.data(), id: doc.id });
          // console.log("image information", doc.data());
          // console.log("uploaded image url", doc.id.url);
        });
        setDocs(documents);

        // console.log("uploaded image", documents);
        // console.log("uploaded image url", doc.id.url);
      });
    };

    // console.log("uploaded documents", docs);
    // dispatch(
    //   addToimages({
    //     images: docs
    //   })
    // );

    return unsub();

    // this is a cleanup function that react will run when a component using the hook unmounts
  }, [collections]);

  return { docs };
};

export default useFirestore;
