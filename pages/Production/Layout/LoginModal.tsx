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

const LoginModal = forwardRef((props: any, ref) => {
  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return { openModal: () => open(), close: () => close() };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className="modal-wrapper">
        <div className="modal-backdrop" onClick={close}></div>
        <AnimatePresence
          //   initial={false}
          exitBeforeEnter
          onExitComplete={() => close}
        >
          {/* {display && ( */}
          <motion.div
            key="login-modal"
            initial="hidden"
            animate="enter"
            exit={{ opacity: 0 }}
            variants={variants}
            transition={{ type: 'linear' }}
            className="modal-box"
          >
            {props.children}
          </motion.div>
          {/* )} */}
        </AnimatePresence>
      </div>,
      document.getElementById('modal-root') as any
    );
  }

  //   if (!display) {
  return null;
  //   }
});

export default LoginModal;
