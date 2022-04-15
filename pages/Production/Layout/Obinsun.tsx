import React, { ReactNode, useRef, useState } from 'react';
// import { useSession } from 'next-auth/react';
import { NextSeo } from 'next-seo';
// import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// import {
//   IoIosMan,
//   IoIosWoman,
//   IoIosPhonePortrait,
//   IoIosHome,
// } from 'react-icons/io';
// import { FaChild, FaTshirt } from 'react-icons/fa';
// import { GiArmoredPants } from 'react-icons/gi';
// import { SiRedhat } from 'react-icons/si';
// import { MdFilterFrames, MdKeyboardArrowRight } from 'react-icons/md';
// import { CgSearch, CgProfile } from 'react-icons/cg';
// import { BsBookmark } from 'react-icons/bs';
// import { BiCart, BiBook } from 'react-icons/bi';
// import { VscSettingsGear } from 'react-icons/vsc';

// import ZLogo from '../../src/assets/ObinsunVectors/ZLogo';
import DesignMix from 'pages/src/components/DesignMix';
// import DarkModeToggle from '../../src/components/DarkModeToggle';
// import Socials from '../../src/components/Socials';
// import TestContent from 'pages/src/components/TestContent';
import Header from './Header';
import Sidebar from './Sidebar';
import Content from './Content';
import Footer from './Footer';
import Externals from './Externals';
// import Modal from './Modal';
// import { showModal } from 'pages/app/state/actions';
// import { connect, ConnectedProps } from 'react-redux';

import GeneralModal from './GeneralModal';
import Authorization from './Authorization';
import QuickSketch from './QuickSketch';
// import DesignMix from '@/components/DesignMix';

// type AppProps = {} & ConnectedProps<typeof connector>;

// interface openModal {
//   modelOpener
// }

// type Props = {
//   children: ReactNode;
//   title: string;
//   description: string;
//   // props: AppProps;
// };

// const variants = {
//   hidden: { opacity: 0, x: -200, y: 0 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: 0, y: -100 },
// };

// const mapDispatchToProps = {
//   dispatchShowModal: showModal,
// };

// const connector = connect(undefined, mapDispatchToProps);

const Obinsun = ({ children }: any) => {
  // const [modalOpen, setModalOpen] = useState(false)

  const obinsunRef = useRef() as any;
  const authModalRef = useRef() as any;
  const quickSketchModalRef = useRef() as any;

  const openModal = () => {
    authModalRef.current?.openModal();
  };

  const closeModal = () => {
    authModalRef.current?.close();
  };

  const openQuickSketch = () => {
    quickSketchModalRef.current?.openQuickSketch();
  };

  const closeQuickSketch = () => {
    quickSketchModalRef.current?.close();
  };

  return (
    <main ref={obinsunRef}>
      {/* <AnimatePresence> */}
      <GeneralModal ref={authModalRef}>
        <Authorization closeModal={closeModal} passHref />
      </GeneralModal>
      <GeneralModal ref={quickSketchModalRef}>
        <QuickSketch closeQuickSketch={closeQuickSketch} passHref />
      </GeneralModal>
      {/* </AnimatePresence> */}
      <DesignMix key="design_mix" />
      {/* <motion.div
          initial="hidden"
          animate="enter"
          exit="exit"
          variants={variants}
          transition={{ type: 'linear' }} */}
      <div className="relative top-0 h-full w-full z-40 flex flex-col items-center justify-center text-center text-xs xs:text-sm mobile-l:text-base laptop-l:text-lg">
        <Header
          key="header"
          openModal={openModal}
          openQuickSketch={openQuickSketch}
          passHref
        />
        <Sidebar
          key="sidebar"
          //  passHref
        />
        <Externals
          key="externals"
          // passHref
        />
        {/* <Content children={children} /> */}
        {children}
        <Footer
          key="footer"
          // passHref
        />
        {/* </motion.div> */}
      </div>
    </main>
  );
};
export default Obinsun;
