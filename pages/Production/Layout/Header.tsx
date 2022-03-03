import { useSession } from 'next-auth/react';
import Link from 'next/link';
// import { showModal } from 'pages/app/state/actions';
import ZLogo from 'pages/src/assets/ObinsunVectors/ZLogo';
import DarkModeToggle from 'pages/src/components/DarkModeToggle';
import React, {
  //  MouseEventHandler,
  useState,
} from 'react';
import { BiBook, BiCart } from 'react-icons/bi';
import { BsBookmark } from 'react-icons/bs';
import { CgProfile, CgSearch } from 'react-icons/cg';
import { IoIosHome } from 'react-icons/io';
import { VscSettingsGear } from 'react-icons/vsc';

// import { connect, ConnectedProps } from 'react-redux';

// import Modal from './Modal';

// import { useDispatch, useSelector } from 'react-redux';

// const mapDispatchToProps = {
//   dispatchShowModal: showModal,
// };

// const connector = connect(undefined, mapDispatchToProps);

// dispatchShowModal={undefined}

// type AppProps = {} & ConnectedProps<typeof connector>;

// const Header = (props: AppProps) => {

// type openModal = (event: MouseEvent<HTMLButtonElement, MouseEvent>)=> void

// type modalOpener = MouseEventHandler<HTMLButtonElement> | undefined;

// const Header = (openModal: modalOpener) => {
const Header = ({ openModal, passHref }: any) => {
  // const { dispatchShowModal } = props;

  const { data: session } = useSession();

  //   const [showModal, setShowModal] = useState(false);

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // const openModal = () => {
  //   console.log('open modal');
  // };

  return (
    <>
      {/* <Modal /> */}
      <header
        className={`transition-all duration-1000 ease-in-out glass-container sticky ${
          menuOpen
            ? 'h-[100vh] w-[100%] top-[0%] grow'
            : 'h-[10.3em] laptop:h-[11em] w-[80%] top-[3%] laptop-l:h-[9em]'
        } z-50 overflow-hidden tablet:px-4`}
      >
        <div className="relative flex vs:flex-col laptop-l:flex-row flex-col items-evenly p-3 flex-1 h-full w-full laptop-l:h-[10em]">
          <div className="flex vs:flex-col flex-col laptop:flex-col laptop-l:flex-row laptop-l:flex-1 gap-1">
            <div className="relative flex items-center justify-center pb-2 px-3 gap-1">
              <Link href="/" passHref>
                <a>
                  <ZLogo
                    id="logo"
                    className="relative h-[5em] w-[5em] laptop:h-[6em] laptop:w-[6em] cursor-pointer flex items-center justify-center"
                  />
                </a>
              </Link>
              {/* <Link href="/" passHref> */}
              <h1 className="text-[3em] xs:text-[3.3em] mobile-l:text-[3.5em] tablet:text-[4.5em] laptop-l:text-[5.5em] flex items-center justify-center tracking-tight h-full w-full cursor-pointer">
                Obinsun
              </h1>
              {/* </Link> */}
              <DarkModeToggle />
            </div>

            <div className="flex vs:flex-col laptop:flex-col laptop-l:flex-col relative w-full items-center justify-evenly gap-[1em] laptop-l:gap-0 px-4 -mt-2  laptop-l:py-2 laptop-l:flex-1">
              <div className="flex relative vs:h-full vs:w-full vs:items-center vs:justify-center vs:gap-[1em] laptop:h-full laptop:w-full laptop:items-center laptop:justify-center laptop:gap-[1em] laptop-l:h-full laptop-l:w-full laptop-l:items-center laptop-l:justify-center laptop-l:gap-[1em] laptop-l:flex-1">
                <div className="relative flex items-center p-2 rounded-[0.625em] w-full bg-gray-800/20 dark:bg-gray-300/20 flex-1">
                  <input
                    className="w-full select-none border-none rounded-[0.625em] bg-gray-800/0 dark:bg-gray-300/0 outline-none p-1 placeholder-gray-800 dark:placeholder-[#4C8EFF]"
                    placeholder="Search For Merch"
                    type="text"
                  />
                  <CgSearch
                    className="rounded-full cursor-pointer h-6 w-6"
                    type="submit"
                  />
                </div>
                <button
                  className="py-3 px-6 relative border border-gray-800/20 dark:border-gray-300/20 rounded-[0.625em] flex-2 hover:bg-gray-800 hover:text-gray-300 dark:hover:bg-[#4C8EFF] dark:hover:text-gray-300"
                  type="button"
                  // onClick={() => setShowModal(true)}
                  // onClick={() => {
                  //   dispatchShowModal({
                  //     title: 'A new title.',
                  //     description: 'And a new description too.',
                  //     onButtonClick: (event: React.MouseEvent) => {
                  //       alert('You clicked that button!');
                  //     },
                  //   });
                  // }}
                  onClick={openModal}
                >
                  <h2 className="relative z-50 h-full w-full">
                    {session ? 'Logout' : 'Login'}
                  </h2>
                </button>

                {/* <button
                className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(true)}
              >
                Open regular modal
              </button> */}
                <div
                  className="relative top-0 cursor-pointer transform h-[2em] w-[2em] flex items-center justify-evenly"
                  onClick={handleMenu}
                >
                  <div
                    className={`transform duration-3000 translate-y-[1em] absolute top-0 left-0 menu-toggle ${
                      menuOpen
                        ? 'before:translate-y-0 before:rotate-45 after:translate-y-0 after:rotate-[-45deg] after:shadow-active-menu after:dark:shadow-active-dark-menu '
                        : 'before:translate-y-[-0.5em] before:rotate-0 after:translate-y-[0.5em] after:rotate-0'
                    }`}
                  />
                </div>
              </div>

              <div className="p-3 laptop-l:p-2 relative flex items-center laptop-l:content-evenly laptop-l:h-full laptop-l:w-full laptop-l:justify-evenly laptop-l:flex-1">
                <ul className="flex flex-col laptop-l:flex-row justify-center items-start laptop-l:items-center gap-[1em] relative ml-[0%] laptop-l:flex-1">
                  <Link href="/checkout">
                    <li className="filter-container">
                      <a className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <BiCart className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Checkout
                        </span>
                      </a>
                    </li>
                  </Link>

                  <Link href="/wishlist">
                    <li className="filter-container">
                      <a className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <BsBookmark className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Wishlist
                        </span>
                      </a>
                    </li>
                  </Link>

                  <Link href="/orders">
                    <li className="filter-container">
                      <a className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <BiBook className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Orders
                        </span>
                      </a>
                    </li>
                  </Link>

                  <Link href="/profile">
                    <li className="filter-container">
                      <a className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <CgProfile className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Profile
                        </span>
                      </a>
                    </li>
                  </Link>

                  <Link href="/settings">
                    <li className="filter-container">
                      <a className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <VscSettingsGear className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Settings
                        </span>
                      </a>
                    </li>
                  </Link>

                  <Link href="/dashboard">
                    <li className="filter-container">
                      <a className="filter-icon-list-container">
                        <span className="filter-icon-glass-container">
                          <IoIosHome className="filter-icon-size" />
                        </span>
                        <span className="filter-text-container laptop-l:hidden">
                          Shop
                        </span>
                      </a>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
