// import CatsAndSkullsPatternBanner from "../assets/ObinsunVectors/ZBanner/CatsAndSkullsPatternBanner";
// import Grim2021 from "../assets/ObinsunVectors/ZLogo/Grim2021";
import entities from './entity.data';
import Entities from './Entities';
import Designs from '../Designs';
import { useState, useEffect, useRef } from 'react';

function Entity() {
  // const Asset = ({ vector, className }:any) => {
  // 	const ImportedAssetRef = useRef(null);
  // 	const [loading, setLoading] = useState(false);

  // 	useEffect(() => {
  // 		setLoading(true);
  // 		const importAsset = async () => {
  // 			try {
  // 				const { default: namedImport } = await import(
  // 					`../assets/ObinsunVectors/${vector}`
  // 				);
  // 				ImportedAssetRef.current = namedImport;
  // 			} catch (err) {
  // 				throw err;
  // 			} finally {
  // 				setLoading(false);
  // 			}
  // 		};
  // 		importAsset();
  // 	}, [vector]);

  // 	if (!loading && ImportedAssetRef.current) {
  // 		const { current: ImportedAsset } = ImportedAssetRef;
  // 		return <ImportedAsset className={className} />;
  // 	}

  // 	return null;
  // };
  return (
    <>
      <Entities className="bg-gray-600">
        {/* {entities.map((entity, i) => entity.name)} */}
      </Entities>
    </>
  );
}

export default Entity;

// try {
//     importIcon();
// } catch (err) {
//         throw err;
//       } finally {
//         setLoading(false);
//       }
//     importIcon()
//   }, [vector]);

//   if (!loading && ImportedVectorRef.current) {
//     const { current: ImportedVector } = ImportedIconRef;
//     return <ImportedVector/>;
//   }

//   return null;
// };
