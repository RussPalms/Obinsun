import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useFirestore from '../../../../server/hooks/useFirestore';
import { useSession } from 'next-auth/react';
import axios from 'axios';

function SvgGrid({ setSelectedImg }: any) {
  const [svgs, setSvgs] = useState();

  const { data: session } = useSession();

  const userImage = `users/${session?.id}/images`;

  const { docs } = useFirestore(userImage);

  //   useEffect(() => {
  //     const { docs } = useFirestore(userImage);
  //     setSvgs(docs as any);
  //   }, []);

  return (
    <div className="svg-grid">
      {docs &&
        docs.map((doc: any) => (
          <motion.div
            className="svg-wrap"
            key={doc.id}
            layout
            whileHover={{ opacity: 1 }}
            onClick={() => setSelectedImg(doc.url)}
          >
            <motion.img
              className="svgs"
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

export default SvgGrid;
