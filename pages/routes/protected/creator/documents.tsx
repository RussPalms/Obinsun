// import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
// import { useRouter } from 'next/router';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { db } from '../../../server/lib/database/firebaseStorage';
// import { useSession } from 'next-auth/react';
// import { resetCameraImage } from '../../../app/state/slices/cameraSlice';
// import CapturedDocuments from '../../../src/components/Payments/Uploads/CapturedDocuments';
// import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';

// type Props = {};

// const Documents = () => {
//   const { data: session } = useSession();

//   const [documents, setDocuments] = useState([]);
//   //   const user = useSelector(selectUser);
//   const dispatch = useDispatch();
//   //   const history = useHistory();
//   // const navigate = useNavigate()
//   const router = useRouter();

//   const capturedDocument = `users/${session?.id}/documents`;
//   const imageRefrence = collection(db, capturedDocument);

//   useEffect(() => {
//     const documentQuery = query(imageRefrence, orderBy('createdAt', 'desc'));

//     // console.log(documentQuery);

//     let images: any = [];

//     onSnapshot(documentQuery, (snap) => {
//       setDocuments(
//         snap.docs.map((doc) => ({
//           id: doc.id,
//           data: doc.data(),
//         }))
//       );
//       console.log(snap.docs);

//       //   console.log(documents);
//       //   snap.forEach((doc) => {
//       //     images.push({ ...doc.data(), id: doc.id });

//       //     // let i = doc.data();
//       //     // i["id"] = doc.id;
//       //     // images[doc.id] = i;
//       //   });
//     });

//     // console.log(images);

//     // const imageList = Object.values(images)[0];
//     // const imageList = Object.values(images)[0];

//     // console.log(imageSnapshot);

//     // setDocuments(images);
//     // console.log(documents);

//     // console.log(imageList);
//     // console.log(documents);
//   }, []);

//   //   console.log(documents);

//   const takeSnap = () => {
//     dispatch(resetCameraImage());
//     router.push('/routes/protected/creator/webcam-capture');
//   };

//   return (
//     <>
//       <div
//         className="relative
//       "
//       >
//         <div className="shadow-imageCapture h-[359px] top-[-9px] bg-white overflow-scroll">
//           {documents.map(({ id, data: { createdAt, imageUrl, read } }) => (
//             <CapturedDocuments
//               key={id}
//               id={id}
//               timestamp={createdAt}
//               imageUrl={imageUrl}
//               read={read}
//             />
//           ))}
//         </div>

//         <RadioButtonUncheckedIcon
//           className="hover:opacity-[0.8] cursor-pointer"
//           onClick={takeSnap}
//           fontSize="large"
//         />
//       </div>
//     </>
//   );
// };

// export default Documents;

export {};
