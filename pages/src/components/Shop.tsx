import { useEffect, useRef, useState } from 'react';
import ZLogo from '../assets/ObinsunVectors/ZLogo';
import DarkModeToggle from './DarkModeToggle';
import TestContent from './TestContent';
import { IoIosMan, IoIosWoman, IoIosPhonePortrait } from 'react-icons/io';
import { FaChild, FaTshirt } from 'react-icons/fa';
import { GiArmoredPants } from 'react-icons/gi';
import { SiRedhat } from 'react-icons/si';
import { MdFilterFrames, MdKeyboardArrowRight } from 'react-icons/md';

const Shop = () => {
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
      <div className="relative top-0 h-full w-full z-40 flex flex-col items-center justify-center text-center text-xs">
        <div className="glass-container sticky top-[3%] mb-[10%] h-[10%] w-[80%] z-50 overflow-hidden ">
          <div className="relative flex flex-col items-center justify-center p-3">
            <div className="relative flex items-center justify-center">
              <ZLogo
                id="logo"
                className="relative h-[5em] w-[5em] p-[0.5em] flex items-center justify-center"
              />
              <h1 className="text-[3em] flex items-center justify-center tracking-tight h-full w-full">
                Obinsun
              </h1>
              <DarkModeToggle />
            </div>
            <div className="flex relative w-full items-center justify-center gap-[1em]">
              <div
                className="relative top-0 cursor-pointer transform h-[2em] w-[2em] flex items-center justify-center"
                onClick={handleMenu}
              >
                <div
                  className={`transform translate-y-[1.25em] absolute top-0 left-0 menu-toggle ${
                    menuOpen
                      ? 'before:translate-y-0 before:rotate-45 after:translate-y-0 after:rotate-[-45deg] after:shadow-active-menu after:dark:shadow-active-dark-menu '
                      : 'before:translate-y-[-0.5em] before:rotate-0 after:translate-y-[0.5em] after:rotate-0'
                  }`}
                />
              </div>
              <div className="relative self-end h-full w-1/2 border border-gray-800/20 dark:border-gray-300/20 rounded-[1.25em] flex-1 hover:bg-gray-800/10 dark:hover:bg-gray-300/10">
                <button className="relative z-50 h-full w-full tracking-widest">
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`border-top-left-glass border-bottom-right-glass bg-gray-300/50 dark:bg-gray-800/50 shadow-glass dark:shadow-dark-glass rounded-[1.25em] backdrop-blur-[0.25em] sticky top-[15%] left-0 h-[35%] transition-all duration-150 ease-in-out ${
            filterOpen ? 'w-[6.5em]' : 'w-[70%]'
          } z-50 overflow-hidden translate-x-[0%] -mb-[42em] px-[1.5em] py-[3%] text-center flex flex-row items-center justify-start hover:translate-x-[0%] self-start ml-[3%]`}
        >
          <ul className="flex flex-col justify-center items-start gap-[1em] relative ml-[0%]">
            <li className="">
              <a
                href="#men"
                className="flex items-center justify-center gap-[1.5em]"
              >
                <button
                  className="h-[2.5rem] min-w-[2.5rem] flex items-center justify-center"
                  onClick={handleFilter}
                >
                  <MdKeyboardArrowRight
                    className={`transition-all duration-150 linear transform ${
                      !filterOpen ? 'rotate-90' : 'rotate-0]'
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

        <div className="relative max-w-[85%] flex items-center justify-center flex-col text-center overflow-hidden rounded-3xl">
          <div className="border border-gray-800/0 dark:border-gray-800/0 bg-gray-800/20 dark:bg-gray-300/20 p-32">
            <TestContent />
            <TestContent />
          </div>
        </div>
        <div className="relative">
          <h2>Footer</h2>
        </div>
      </div>
    </>
  );
};

export default Shop;
