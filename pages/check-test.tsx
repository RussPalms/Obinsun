import React, { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { BsSun, BsMoon } from 'react-icons/bs';
import DarkModeToggle from './src/components/DarkModeToggle';

type Props = {};

function CheckTest({}: Props) {
  //   const [darkMode, setDarkMode] = useState(false);

  const { theme, setTheme } = useTheme();

  const dark = theme === 'dark' ? true : false;

  const [checked, setChecked] = useState(dark);
  const [mounted, setMounted] = useState(false);

  const handleChange = (e: any) => {
    e.preventDefault;
    // setDarkMode(!darkMode);
    // console.log(e);
    // console.log(darkMode);
    setChecked(!checked);
    // console.log(checked);
  };

  //   const handleChange = (nextChecked: boolean) => {
  //     setChecked(nextChecked);
  //   };

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setTheme(checked ? 'dark' : 'light');

    // console.log(checked);
  }, [checked, setTheme]);

  if (!mounted) return null;

  //   useEffect(() => {

  //   },[handleChange])

  return (
    <>
      {/* <div className="bg-gray-500">
        <input
          type="checkbox"
          className="appearance-none absolute"
          id="check"
          value=""
          onChange={handleChange}
        />
        <label
          htmlFor="check"
          className="h-[3em] w-[3em] rounded-full flex justify-center items-center cursor-pointer text-[2em] glass-container"
          //   className="before:content-[''] before:w-[20em] before:h-[10em] before:bg-gray-500 before:border before:rounded-full before:mr-[.25em] before:cursor-pointer after:content-['\2715'] after:text-[5em] after:text-red-300 after:flex after:items-center after:justify-center after: after:w-[9rem] after:h-[9rem] after:bg-red-500 after:border after:rounded-full after:absolute after:left-[1rem] after:cursor-pointer after:transition-transform after:duration-200 after:ease-in-out"
        >
          {checked ? <BsMoon /> : <BsSun />}
        </label>
      </div> */}
      <DarkModeToggle />
    </>
  );
}

export default CheckTest;
