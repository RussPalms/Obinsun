import { useState, useEffect, useCallback } from "react";
import { db } from "../lib/database/firebaseStorage";
// import { app } from "../lib/database/firebaseStorage";
// // import { projectFirestore } from '../firebase/config';

import {
  collection,
  query,
  getDocs,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

// import { getFirestore } from "firebase/firestore";

// const db = getFirestore(app);

const useFirestore = (collections: any) => {
  const [docs, setDocs] = useState([]);

  console.log("rendered out firestore documents", docs);

  const collectionsRef = collection(db, collections);
  const collectionsQuery = query(collectionsRef, orderBy("createdAt", "desc"));

  console.log("accessing firestore collections", collectionsQuery);

  //   const [querying, setQuerying] = useState()

  //   const unsub: any = useCallback(() => {
  //     const collectionsRef = collection(db, collections);
  //     const collectionsQuery = query(
  //         collectionsRef,
  //         orderBy("createdAt", "desc")
  //     );
  //     const querySnapshot = getDocs(collectionsQuery);
  //     let documents: any = [];
  //     // var documents: any = [];
  //    setQuerying( querySnapshot.forEach((snap:any) => {
  //         let d = snap.data();
  //         d["id"] = snap.id;
  //         documents[snap.id] = d;
  //         setDocs(documents);
  //     })
  //   }, [docs]);

  //   //   const unsub = () => {
  //   //     const collectionsRef = collection(db, collections);
  //   //     const collectionsQuery = query(
  //   //       collectionsRef,
  //   //       orderBy("createdAt", "desc")
  //   //     );
  //   //     const querySnapshot = await getDocs(collectionsQuery);
  //   //     let documents: any = [];
  //   //     querySnapshot.forEach((snap) => {
  //   //       let d = snap.data();
  //   //       d["id"] = snap.id;
  //   //       documents[snap.id] = d;
  //   //       setDocs(documents);
  //   //     });
  //   //   };

  useEffect(() => {
    console.log(
      "fetching firestore documents when ImageGrid component is loaded"
    );

    // if (!docs) return;
    // if (querying){
    //     querySnapshot.forEach((snap:any) => {
    //         let d = snap.data();
    //         d["id"] = snap.id;
    //         documents[snap.id] = d;
    //         setDocs(documents);
    //     }
    // }

    // unsub();

    // const abortController = new AbortController();

    // const unsub = db
    //   .collection(collection)
    //   .orderBy("createdAt", "desc")
    //   .onSnapshot((snap) => {
    //     let documents: any = [];
    //     snap.forEach((doc) => {
    //       documents.push({ ...doc.data(), id: doc.id });
    //     });
    //     setDocs(documents);
    //   });

    // const collectionsRef = collection(db, collections);
    // const collectionsQuery = query(
    //   collectionsRef,
    //   orderBy("createdAt", "desc")
    // );
    // const querySnapshot = getDocs(collectionsQuery);

    //   const unsub = ()
    const unsub = () => {
      // const collectionsRef = collection(db, collections);
      // const collectionsQuery = query(
      //   collectionsRef,
      //   orderBy("createdAt", "desc")
      // );

      // console.log("accessing firestore collections", collectionsQuery);

      // void async function () {
      //   const querySnapshot = await getDocs(collectionsQuery);
      //   querySnapshot.forEach((snap) => {
      //     let documents: any = [];
      //     let d = snap.data();
      //     d["id"] = snap.id;
      //     documents[snap.id] = d;
      //     setDocs(documents);
      //   });
      // };

      //   // void async function unsub() {
      //   // try {
      //   const collectionsRef = collection(db, collections);
      //   // const collectionsLookup =

      //   const collectionsQuery = query(
      //     collectionsRef,
      //     orderBy("createdAt", "desc")
      //   );

      onSnapshot(collectionsQuery, (snapshot) => {
        let documents: any = [];
        snapshot.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

      // const querySnapshot = await getDocs(collectionsQuery);

      //   //   const querySnapshot = await getDocs(collectionsQuery);
      //   const querySnapshot = await getDocs(collectionsQuery);
      //   let documents: any = [];

      //     // const snapedQuery = query(snap)
      //     // const queryCreation = query(d)
      //     // const docCreation = getDocs(d)
      //     // async () => {
      //     //   await getDocs(snap);
      //     //    snap.forEach((doc: any) => {
      //     //     documents.push({ ...doc.data(), id: doc.id });
      //     //   });
      //     // setDocs(documents);
      //     setDocs(documents);
      //     // };
      //   });

      // } catch(error) {
      //     console.log('error', error)
      // }
      // };

      // querySnapshot.forEach((snap) => {
      //     // let documents: any = [];
      //     // snap.forEach((doc) => {
      //     //   documents.push({ ...doc.data(), id: doc.id });
      //     // });
      //     // setDocs(documents);

      // })
      //   .onSnapshot((snap) => {
      //     let documents: any = [];
      //     snap.forEach((doc) => {
      //       documents.push({ ...doc.data(), id: doc.id });
      //     });
      //     setDocs(documents);
      //   });

      // return () => unsub();
    };

    return unsub();

    //     // this is a cleanup function that react will run when
    //     // a component using the hook unmounts
  }, [collections]);
  //   }, [unsub, collections]);

  return { docs };
};

export default useFirestore;
