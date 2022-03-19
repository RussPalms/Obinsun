import React, { useEffect } from 'react';
import useSvgUpload from '../../../../server/hooks/useSvgUpload';
import { motion } from 'framer-motion';

function SvgProgress({ file, setFile }: any) {
  const { progress, url } = useSvgUpload(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return (
    <motion.div
      className="firebase-progress"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
}

export default SvgProgress;
