import React, { useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import { signIn } from 'next-auth/react';

// const variants = {
//   hidden: { opacity: 0, x: 0, y: -200 },
//   enter: { opacity: 1, x: 0, y: 0 },
//   exit: { opacity: 0, x: -100, y: 0 },
// };

// type Props = {};

// async function createUser(email: any, password: any, role: any) {
//   const response = await fetch('/api/auth/register', {
//     method: 'POST',
//     body: JSON.stringify({ email, password, role }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const userData = await response.json();
//   if (!response.ok) {
//     throw new Error(userData.message || 'Something went wrong!');
//   }

//   // console.log(userData);

//   return userData;
// }

// async function createEmail(email: any) {
//   const response = await fetch('/api/auth/email-auth', {
//     method: 'POST',
//     body: JSON.stringify({ email }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const tokenData = await response.json();
//   if (!response.ok) {
//     throw new Error(tokenData.message || 'Something went wrong!');
//   }

//   signIn('email', { redirect: false, email: tokenData.identifier });

//   console.log(tokenData);
//   return tokenData;
// }

const Authorization = ({ closeModal }: any) => {
  const [userResponse, setUserResponse] = useState('');

  async function createUser(email: any, password: any, role: any) {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userData = await response.json();
    if (!response.ok) {
      setUserResponse(userData.message);
      throw new Error(userData.message || 'Something went wrong!');
    }

    // setUserResponse(userData.error);
  }

  // console.log(userResponse);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState: any) => !prevState);
  }

  async function submitHandler(e: any) {
    e.preventDefault();

    // try {
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    // console.log(enteredEmail);

    // optional: Add validation

    if (isLogin) {
      // const enteredPassword = passwordInputRef.current.value;

      // console.log(isLogin);

      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      // setUserResponse(JSON.stringify(result.error));
      if (result?.error && result.status == 200) {
        setUserResponse('User Does Not Exist!');
      }
      // setUserResponse(result.error);
      // console.log(result);

      // const result = await signIn("email", {
      // 	redirect: false,
      // 	email: enteredEmail,
      // 	// callbackUrl: `${window.location.origin}`,
      // });

      if (!result?.error) {
        router.replace('/profile');
        closeModal();
      }
    } else {
      try {
        // const enteredRole = roleInputRef.current?.value;
        const enteredRole = 'guest';

        const result = await createUser(
          enteredEmail,
          enteredPassword,
          enteredRole
        );

        await signIn('credentials', {
          email: enteredEmail,
          password: enteredPassword,
          callbackUrl: '/profile',
        });
        router.push('/profile');
      } catch (error) {
        // console.log(error);
        // setUserResponse(error.error);
      }
    }
  }

  // console.log(userResponse);

  return (
    <section
      key="loginModal"
      className="relative top-[0%] left-0 flex justify-center align-center"
    >
      <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div className="floating-square-0" style={{ '--i': '0' } as any} />
        <div className="floating-square-1" style={{ '--i': '1' } as any} />
        <div className="floating-square-2" style={{ '--i': '2' } as any} />
        <div className="floating-square-3" style={{ '--i': '3' } as any} />
        <div className="floating-square-4" style={{ '--i': '4' } as any} />
        <div className="form-container relative top-0 left-0 vs:w-[15em] xs:w-[20em] mobile-l:w-[21em] tablet:w-[22em] laptop:-w-[23em] laptop-l:w-[24em] 2xl:w-[25em min-h-[25em] bg-gray-300/90 dark:bg-gray-800/90 border rounded-[0.625em] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 glass-container border-white/50">
          <div className="form-body">
            {/* <Link href="/"> */}
            <button onClick={closeModal}>Close Modal</button>
            {/* </Link> */}
            <h2 className="form-header">
              {isLogin ? 'Login ' : 'Register '}
              Form
            </h2>
            <form onSubmit={submitHandler}>
              <p>{userResponse}</p>
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
                  ref={emailInputRef}
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
                  ref={passwordInputRef}
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
                  className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
                  type="submit"
                  value={isLogin ? 'Login' : 'Register'}
                  // value="Login"
                />
              </div>
              {/* <Link href="/"> */}
              <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
                <a
                  //   onClick={() => {
                  //     router.push('/social-test');
                  //   }}
                  className="font-semibold cursor-pointer"
                  onClick={switchAuthModeHandler}
                >
                  {/* Sign in with existing account */}
                  {isLogin
                    ? 'Create new account'
                    : 'Sign in with existing account'}
                </a>
              </p>
              {/* </Link> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authorization;
