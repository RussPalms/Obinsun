import CoolestCat from '../assets/ObinsunVectors/CoolestCat';
import Dogtor from '../assets/ObinsunVectors/Dogtor';
import WitchCrafts from '../assets/ObinsunVectors/WitchCrafts';
import RadRex from '../assets/ObinsunVectors/RadRex';

function Headers() {
  return (
    // <body>
    <section className="md:py-[50px] md:px-[20px]flex justify-center items-center min-h-screen bg-gray-600 bg-cover bg-center bg-fixed p-[50px]">
      <div className="md:flex-col md:h-auto md:p-[20px] relative w-[calc(100% - 100px)] min-h-[calc(100vh - 280px)] bg-white bg-opacity-50 shadow-glass1 rounded-[20px] flex justify-between items-center p-[50px]">
        <header className="md:relative md:flex-col md:w-full md:top-[-60px] md:p-[20px] md:right-0 md:left-0 absolute top-[-40px] right-[20px] left-[20px] py-[20px] px-[50px] flex justify-between items-center shadow-glass1 bg-white/[0.2] border rounded-[20px] backdrop-blur-[10px] border-top-left-glass">
          <a
            href="#"
            className="text-[#8a2435] font-bold no-underline text-[2em]"
          >
            Logo
          </a>
          <ul className="md:mt-[10px] md:flex-wrap flex items-center justify-center">
            <li className="glass-header-item-container">
              <a
                href="#"
                className="glass-header-item"
                // isActive={true}
                // active
              >
                Home
              </a>
            </li>
            <li className="glass-header-item-container">
              <a href="#" className="glass-header-item">
                About
              </a>
            </li>
            <li className="glass-header-item-container">
              <a href="#" className="glass-header-item">
                Team
              </a>
            </li>
            <li className="glass-header-item-container">
              <a href="#" className="glass-header-item">
                Contact
              </a>
            </li>
          </ul>
        </header>
        <div className="md:translate-x-[0px] md:max-w-[100%] md:p-[30px] md:mt-[-40px] transform translate-x-[-90px] max-w-[700px] bg-white/[0.2] rounded-[20px] backdrop-blur-[10px] border border-white border-opacity-[0.25] border-top-left-glass p-[40px] pl-[110px]">
          <h2 className="sm:text-2xl text-5xl text-[#8a2435]">
            Glassmorphism UI
          </h2>
          <p className="sm:text-[1em] text-[1.2em] text-[#8a2435]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <a
            href="#"
            className="md:text-[1em] md:py-[10px] md:px-[20px] inline-block py-[15px] px-[30px] bg-[#fff] text-[#8a2435] mt-[20px] rounded-[30px] text-[1.2em] text-medium no-underline shadow-glass1a"
          >
            Read More
          </a>
        </div>
        <div className="md:mb-[50px]">
          <Dogtor className="md:animate-move1 animate-move sm:max-w-300px object-contain h-full w-[300px]" />
        </div>
        <ul className="md:relative md:flex-row md:left-0 right-[-25px] flex justify-center items-center flex-col">
          <li className="unit-container">
            <a className="glass-header-unit">
              <CoolestCat className="unit-movement" />
            </a>
          </li>
          <li className="unit-container">
            <a className="glass-header-unit">
              <WitchCrafts className="unit-movement" />
            </a>
          </li>
          <li className="unit-container">
            <a className="glass-header-unit">
              <RadRex className="unit-movement" />
            </a>
          </li>
        </ul>
        <p className="md:relative md:bottom-[initial] md:left-[inherit] md:w-full md:text-center md:mt-[20px] sm:text-[1em] absolute bottom-[30px] left-[50px] text-[#8a2435]">
          Copyright © 2021 PalmaView. All Rights Reserved.
        </p>
      </div>
    </section>
    // </body>
  );
}

export default Headers;
