import { useState } from 'react';
import ZLogo from '../assets/ObinsunVectors/ZLogo';
import DarkModeToggle from './DarkModeToggle';

import {
  IoIosMan,
  IoIosWoman,
  IoIosPhonePortrait,
  IoIosHome,
} from 'react-icons/io';
import { FaChild, FaTshirt } from 'react-icons/fa';
import { GiArmoredPants } from 'react-icons/gi';
import { SiRedhat } from 'react-icons/si';
import { MdFilterFrames, MdKeyboardArrowRight } from 'react-icons/md';
import { CgSearch, CgProfile } from 'react-icons/cg';
import { BsBookmark } from 'react-icons/bs';
import { BiCart, BiBook } from 'react-icons/bi';
import { VscSettingsGear } from 'react-icons/vsc';
import { useSession } from 'next-auth/react';
import Socials from './Socials';
import Link from 'next/link';
import TestContent from './TestContent';

const MerchLayout = () => {
  const { data: session } = useSession();

  const [filterOpen, setFilterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleFilter = () => {
    setFilterOpen(!filterOpen);
  };
  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <div className="relative z-40 flex flex-col items-center justify-center text-xs xs:text-sm mobile-l:text-base laptop-l:text-lg">
        <header
          className={`transition-all duration-200 ease-in-out glass-container sticky ${
            menuOpen
              ? 'h-[100vh] w-[100%] top-[0%] grow'
              : 'h-[10.3em] laptop:h-[11em] w-[80%] top-[3%] laptop-l:h-[9em]'
          } z-50 overflow-hidden tablet:px-4`}
        >
          <div className="relative flex vs:flex-col laptop-l:flex-row flex-col items-evenly p-3 flex-1 h-full w-full laptop-l:h-[10em]">
            <div className="flex vs:flex-col flex-col laptop:flex-col laptop-l:flex-row laptop-l:flex-1 gap-1">
              <div className="relative flex items-center justify-center pb-2 px-3">
                <ZLogo
                  id="logo"
                  className="relative h-[5em] w-[5em] laptop:h-[6em] laptop:w-[6em]  flex items-center justify-center"
                />
                <h1 className="text-[3em] xs:text-[3.3em] mobile-l:text-[3.5em] tablet:text-[4.5em] laptop-l:text-[5.5em] flex items-center justify-center tracking-tight h-full w-full">
                  Obinsun
                </h1>
                <DarkModeToggle />
              </div>

              <div className="flex vs:flex-col laptop:flex-col laptop-l:flex-col relative w-full items-center justify-evenly gap-[1em] laptop-l:gap-0 px-4 -mt-2  laptop-l:py-2 laptop-l:flex-1">
                <div className="flex relative vs:h-full vs:w-full vs:items-center vs:justify-center vs:gap-[1em] laptop:h-full laptop:w-full laptop:items-center laptop:justify-center laptop:gap-[1em] laptop-l:h-full laptop-l:w-full laptop-l:items-center laptop-l:justify-center laptop-l:gap-[1em] laptop-l:flex-1">
                  <div className="relative flex items-center p-2 rounded-[1.25em] w-full bg-gray-800/20 dark:bg-gray-300/20 flex-1">
                    <input
                      className="w-full select-none border-none rounded-[1.25em] bg-gray-800/0 dark:bg-gray-300/0 outline-none p-1 placeholder-gray-800 dark:placeholder-[#4C8EFF]"
                      placeholder="Search For Merch"
                      type="text"
                    />
                    <CgSearch
                      className="rounded-full cursor-pointer h-6 w-6"
                      type="submit"
                    />
                  </div>
                  <div className="p-2 relative border border-gray-800/20 dark:border-gray-300/20 rounded-[1.25em] flex-2 hover:bg-gray-800/10 dark:hover:bg-gray-300/10">
                    <button className="relative z-50 h-full w-full">
                      {session ? 'Logout' : 'Login'}
                    </button>
                  </div>
                  <div
                    className="relative top-0 cursor-pointer transform h-[2em] w-[2em] flex items-center justify-evenly"
                    onClick={handleMenu}
                  >
                    <div
                      className={`transform translate-y-[1em] absolute top-0 left-0 menu-toggle ${
                        menuOpen
                          ? 'before:translate-y-0 before:rotate-45 after:translate-y-0 after:rotate-[-45deg] after:shadow-active-menu after:dark:shadow-active-dark-menu '
                          : 'before:translate-y-[-0.5em] before:rotate-0 after:translate-y-[0.5em] after:rotate-0'
                      }`}
                    />
                  </div>
                </div>

                <div className="p-3 laptop-l:p-2 relative flex items-center laptop-l:content-evenly laptop-l:h-full laptop-l:w-full laptop-l:justify-evenly laptop-l:flex-1">
                  <ul className="flex flex-col laptop-l:flex-row justify-center items-start laptop-l:items-center gap-[1em] relative ml-[0%] laptop-l:flex-1">
                    <li className="filter-container">
                      <a href="#cart" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <BiCart className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Cart
                        </span>
                      </a>
                    </li>
                    <li className="filter-container">
                      <a
                        href="#wishlist"
                        className="filter-icon-list-container"
                      >
                        <span className="filter-icon-glass-container">
                          <BsBookmark className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Wishlist
                        </span>
                      </a>
                    </li>
                    <li className="filter-container">
                      <a href="#orders" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <BiBook className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Orders
                        </span>
                      </a>
                    </li>
                    <li className="filter-container">
                      <a href="#profile" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <CgProfile className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Profile
                        </span>
                      </a>
                    </li>
                    <li className="filter-container">
                      <a
                        href="#settings"
                        className="filter-icon-list-container"
                      >
                        <span className="filter-icon-glass-container">
                          <VscSettingsGear className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Settings
                        </span>
                      </a>
                    </li>
                    <li className="filter-container">
                      <a href="#shop" className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <IoIosHome className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Shop
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className={`border-top-left-glass border-bottom-right-glass bg-gray-300/50 dark:bg-gray-800/50 shadow-glass dark:shadow-dark-glass rounded-[1.25em] backdrop-blur-[0.25em] sticky top-[20%] xs:top-[25%] mobile-l:top-[26%] tablet:top-[27%] md:top-[26%] laptop:top-[26%] laptop-l:top-[30%] xl:top-[] left-0 h-[35%] laptop-l:h-[] transition-all duration-150 ease-in-out ${
            filterOpen
              ? 'w-[70%] xs:w-[60%] mobile-l:w-[59%] tablet:w-[33%] laptop:w-[25%]'
              : 'w-[6.5em] xs:w-[6em] mobile-l:w-[5.5em] tablet:w-[5.3em] laptop-l:w-[16%] 2xl:w-[13%] 3xl:w-[11%] 4vl:w-[10%]'
          } z-40 overflow-hidden translate-x-[0%] -mb-[43em] xs:-mb-[40em] mobile-l:-mb-[37em] md:-mb-[40em] laptop-l:-mb-[32em] xl:-mb-[30em] 4vl:-mb-[33em] px-[1.5em] laptop-l:px-[0.5em] py-[1%] laptop-l:py-[1%] text-center flex flex-row items-center justify-start hover:translate-x-[0%] self-start ml-[3%] laptop-l:ml-[0.5%] 2xl:ml-[2%]`}
        >
          <ul className="flex flex-col justify-center items-start gap-[1em] relative ml-[0%]">
            <li className="laptop-l:hidden">
              <a
                href="#filter"
                className="flex items-center justify-center gap-[1.5em]"
              >
                <button
                  className="h-[2.5rem] min-w-[2.5rem] flex items-center justify-center"
                  onClick={handleFilter}
                >
                  <MdKeyboardArrowRight
                    className={`transition-all duration-150 linear transform ${
                      !filterOpen ? 'rotate-0' : 'rotate-180'
                    } h-[1.5em] w-[1.5em]`}
                  />
                </button>

                <strong className="min-w-[10rem] flex justify-start">
                  Filter
                </strong>
              </a>
            </li>
            <li className="filter-container">
              <a href="#men" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <IoIosMan className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Men's Clothing</span>
              </a>
            </li>
            <li className="filter-container">
              <a href="#women" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <IoIosWoman className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Women's Clothing</span>
              </a>
            </li>
            <li className="filter-container">
              <a href="#kids" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <FaChild className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Kid's Clothing</span>
              </a>
            </li>
            <li className="filter-container">
              <a href="#hats" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <SiRedhat className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Hats</span>
              </a>
            </li>
            <li className="filter-container">
              <a href="#tops" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <FaTshirt className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Tops</span>
              </a>
            </li>
            <li className="filter-container">
              <a href="#bottoms" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <GiArmoredPants className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Bottoms</span>
              </a>
            </li>
            <li className="filter-container">
              <a href="#accessories" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <IoIosPhonePortrait className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Accessories</span>
              </a>
            </li>
            <li className="filter-container">
              <a href="#lifestyle" className="filter-icon-list-container">
                <span className="filter-icon-glass-container">
                  <MdFilterFrames className="filter-icon-size" />
                </span>
                <span className="filter-text-container">Home & Living</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sticky top-[28em] w-[25em] mobile-l:w-[27em] tablet:w-[45em] laptop:w-[58.5em] laptop-l:w-[72.5em] xl:w-[80em] 2xl:w-[95em] 3xl:w-[110em] 4vl:w-[124.5em] justify-end flex items-center z-40 -mb-[22em] 4vl:-mb-[19em] mobile-l:top-[20em] 4vl:top-[33em] overflow-x-clip">
          <Socials />
        </div>

        <div className="relative max-w-[85%] h-full flex items-center justify-center flex-col text-center overflow-hidden rounded-3xl">
          <div className="border border-gray-800/0 dark:border-gray-800/0 bg-gray-800/20 dark:bg-gray-300/20 pl-[6em] pt-[12em] pr-[2em] pb-[1em] xl:px-48 4vl:p-32">
            <TestContent />
          </div>
        </div>

        <footer className="max-w-6xl mx-auto px-6">
          <div className="py-6 border-t border-gray-800 dark:border-[#4C8EFF] text-center flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm">
              Powered by
              <a
                href="http://localhost:3000"
                title="Learn more about how this site was made"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-0.5"
              >
                Obinsun Merch
              </a>
              , Built by{' '}
              <a
                href="https://twitter.com/obinsun"
                title="Follow the creator on Twitter"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-0.5"
              >
                @obinsun
              </a>
            </p>
            <nav className="flex items-center justify-end space-x-3 md:space-x-6">
              <Link href="/about">
                <a className="p-1 transition text-sm">FAQS</a>
              </Link>
              <Link href="/terms-of-sale">
                <a className="p-1 transition text-sm">Terms of Sale</a>
              </Link>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
};

export default MerchLayout;

// import Header from 'Production/Layout/Header';
// import Sidebar from 'Production/Layout/Sidebar';
// import Footer from 'Production/Layout/Footer';
// import Content from 'Production/Layout/Content';
// import Socials from './Socials';

// const MerchLayout = ({ children }) => {
//   return (
//     <>
//       <div className="relative z-40 flex flex-col items-center justify-center text-xs xs:text-sm mobile-l:text-base laptop-l:text-lg">
//         <Header />
//         <Sidebar />
//         <Socials />
//         <Content />
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default MerchLayout;
