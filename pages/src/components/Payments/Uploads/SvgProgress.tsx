import React, { useEffect } from 'react';
import useSvgUpload from '../../../../server/hooks/useSvgUpload';
import { motion } from 'framer-motion';

function SvgProgress({
  file,
  setFile,
  designData,
  setDesignData,
  designName,
  setDesignName,
  designDescription,
  setDesignDescription,
}: any) {
  const { progress, url } = useSvgUpload(
    file,
    designData,
    designName,
    designDescription
  );

  useEffect(() => {
    if (url) {
      setFile(null);
      // setDesignData({ name: '', description: '' });
      setDesignName('');
      setDesignDescription('');
    }
  }, [url, setFile, setDesignData, setDesignName, setDesignDescription]);

  return (
    <motion.div
      className="firebase-progress"
      initial={{ width: 0 }}
      animate={{ width: progress + '%' }}
    ></motion.div>
  );
}

export default SvgProgress;
