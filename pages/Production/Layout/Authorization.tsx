import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import Link from 'next/link';

// const variants = {
//   hidden: { opacity: 0, x: 0, y: -200 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: -100, y: 0 },
// };

type Props = {};

const Authorization = ({ closeModal }: any) => {
  const router = useRouter();

  return (
    <section
      key="loginModal"
      // initial="hidden"
      // animate="enter"
      // exit="exit"
      // variants={variants}
      // transition={{ type: 'linear' }}
      className="relative top-[0%] left-0 flex justify-center align-center"
    >
      <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div
          className="square glass-container square-delay"
          style={{ '--i': '0' }}
        />
        <div
          className="square glass-container top-[9.375em] left-[-6.25em] w-[7.5em] h-[7.5em] z-20 square-delay"
          style={{ '--i': '1' }}
        />
        <div
          className="square glass-container bottom-[3.125em] right-[-3.75em] w-[5em] h-[5em] z-20 square-delay"
          style={{ '--i': '2' }}
        />
        <div
          className="square glass-container bottom-[-5em] left-[6.25em] w-[3.125em] h-[3.125em] square-delay"
          style={{ '--i': '3' }}
        />
        <div
          className="square glass-container top-[-5em] vs:left-[3.75em] xs:left-[4.75em] mobile-l:left-[5.75em] tablet:left-[6.75em] tablet-l:left-[7.75em] laptop:left-[8.75em] w-[3.75em] h-[3.75em] delay-[-7000ms] square-delay"
          style={{ '--i': '4' }}
        />
        <div className="relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em  min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
          <div className="relative w-full h-full p-[40px]">
            {/* <Link href="/"> */}
            <button onClick={closeModal}>Close Modal</button>
            {/* </Link> */}
            <h2 className="relative text-black dark:text-[#4C8EFF] text-[1.5em] font-semibold tracking-[0.0625em] mb-[2.5em] before:absolute before:left-0 before:bottom-[-0.625em] before:w-[5em] before:h-[0.25em] before:bg-gray-800 dark:before:bg-gray-300">
              {/* {isLogin ? 'Login' : 'Register'}  */}
              Form
            </h2>
            <form
            // onSubmit={submitHandler}
            >
              <div className="inputBox">
                <input
                  name="csrfToken"
                  type="hidden"
                  // defaultValue={csrfToken}
                />

                {/* <label htmlFor="email"></label> */}
                <input
                  className="input input-glass-container"
                  type="email"
                  placeholder="E-Mail"
                  id="email"
                  required
                  // ref={emailInputRef}
                />
              </div>
              <div className="inputBox">
                {/* <label htmlFor="password"></label> */}
                <input
                  className="input input-glass-container"
                  type="password"
                  placeholder="Password"
                  id="password"
                  required
                  // ref={passwordInputRef}
                />
              </div>

              {/* {isLogin ? (
                      ''
                    ) : ( */}
              {/* <div className="inputBox"> */}
              {/* <label htmlFor="email"></label> */}
              {/* <input */}
              {/* className="input glass-container"
                        type="text"
                        placeholder="Role"
                        id="role"
                        required
                        // ref={roleInputRef}
                      /> */}
              {/* </div> */}
              {/* // )} */}

              <div className="inputBox">
                <input
                  className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[8.25em] cursor-pointer mb-[1.25em] font-semibold"
                  type="submit"
                  // value={isLogin ? 'Login' : 'Register'}
                  value="Login"
                />
              </div>
              <Link href="/motion-testing">
                <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
                  <a
                    //   onClick={() => {
                    //     router.push('/social-test');
                    //   }}
                    className="font-semibold cursor-pointer"
                    // onClick={switchAuthModeHandler}
                  >
                    Sign in with existing account
                    {/* {isLogin
                          ? 'Create new account'
                          : 'Sign in with existing account'} */}
                  </a>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authorization;
