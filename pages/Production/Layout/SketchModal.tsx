import { AnimatePresence, motion, useIsPresent } from 'framer-motion';
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from 'react';
import ReactDOM from 'react-dom';

const variants = {
  hidden: { opacity: 0, x: 0, y: -200 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -100, y: 0 },
};

const SketchModal = forwardRef((props: any, ref) => {
  const [displaySketch, setDisplaySketch] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openSketch: () => openQuickSketchModal(),
      closeQuickSketchModal: () => closeQuickSketchModal(),
    };
  });

  const openQuickSketchModal = () => {
    setDisplaySketch(true);
  };

  const closeQuickSketchModal = () => {
    setDisplaySketch(false);
  };

  if (displaySketch) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div className="modal-backdrop" onClick={closeQuickSketchModal}></div>
        <AnimatePresence
          exitBeforeEnter
          onExitComplete={() => closeQuickSketchModal}
        >
          <motion.div
            key="sketch-modal"
            initial="hidden"
            animate="enter"
            exit={{ opacity: 0 }}
            variants={variants}
            transition={{ type: 'linear' }}
            className="modal-box"
          >
            {props.children}
          </motion.div>
        </AnimatePresence>
      </div>,
      document.getElementById('sketch-root') as any
    );
  }

  return null;
});

export default SketchModal;
