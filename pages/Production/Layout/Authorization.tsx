import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
// import Link from 'next/link';
import { getProviders, getSession, signIn } from 'next-auth/react';
import { getCsrfToken } from 'next-auth/react';
import axios from 'axios';
import Script from 'next/script';
import {
  keyCreation,
  UserCreation,
} from '../interfaces/objects/obinsun-objects';
import { loadStripe } from '@stripe/stripe-js';
// import { DB, dbApi } from '../../app/state/rtkApi';
import { v4 as uuidv4 } from 'uuid';
import { NextApiResponse } from 'next';

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

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

const Authorization = ({ closeModal }: any) => {
  // const { data: dbs } = dbApi.useGetAllQuery();
  // const [updateDB] = dbApi.useUpdateDBMutation();
  // const [deleteDB] = dbApi.useDeleteDBMutation();
  // const [addDB] = dbApi.useAddDBMutation();

  // const [obinsunId, setObinsunId] = useState('');

  // const onToggle = useCallback(
  //   (db: DB) => updateDB({ ...db, done: !db.done }),
  //   [updateDB]
  // );

  // const onDelete = useCallback((db: DB) => deleteDB(db), [deleteDB]);

  // const textRef = useRef<HTMLInputElement>(null);

  // const onAdd = useCallback(() => addDB(textRef.current!.value ?? ''), [addDB]);

  // useEffect(() => {}, []);

  const [userResponse, setUserResponse] = useState('');
  const [quickRegister, setQuickRegister] = useState(true);

  const handleRegister = () => {};

  // const createUserParams = {
  //   username, firstname, lastname, email, password
  // }
  useEffect(() => {});

  async function createUser(email: any, password: any, role: any) {
    // async function createUser({
    //   // enteredUsername,
    //   // enteredFirstname,
    //   // enteredLastname,
    //   // enteredEmail,
    //   // enteredPassword,

    //   // username,
    //   // firstname,
    //   // lastname,
    //   email,
    //   password,
    // }: any) {
    // : // , role
    // UserCreation
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        // enteredUsername,
        // enteredFirstname,
        // enteredLastname,
        // enteredEmail,
        // enteredPassword,

        // username,
        // firstname,
        // lastname,
        email,
        password,
        role,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const userData = await response.json();
    if (!response.ok) {
      setUserResponse(userData.message);
      throw new Error(userData.message || 'Something went wrong!');
    }
  }
  const usernameInputRef: React.MutableRefObject<any> = useRef();
  const firstnameInputRef: React.MutableRefObject<any> = useRef();
  const lastnameInputRef: React.MutableRefObject<any> = useRef();

  const emailInputRef: React.MutableRefObject<any> = useRef();
  const passwordInputRef: React.MutableRefObject<any> = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  function switchAuthModeHandler() {
    setIsLogin((prevState: any) => !prevState);
  }

  async function submitHandler(e: any) {
    e.preventDefault();

    // const enteredUsername = usernameInputRef.current?.value as string;
    // const enteredFirstname = firstnameInputRef.current?.value as string;
    // const enteredLastname = lastnameInputRef.current?.value as string;
    const enteredEmail = emailInputRef.current?.value as string;
    const enteredPassword = passwordInputRef.current?.value as string;
    const enteredRole = 'guest';

    if (isLogin) {
      const result: any = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      });

      if (result?.error && result.status == 200) {
        setUserResponse('User Does Not Exist!');
      }

      if (!result?.error) {
        router.replace('/profile');
        closeModal();
      }
    } else {
      if (quickRegister == true) {
        // const enteredRole = 'guest';

        const result = await createUser(
          // {
          // enteredUsername,
          // enteredFirstname,
          // enteredLastname,
          enteredEmail,
          enteredPassword,
          enteredRole
          // }
        );

        console.log(result);
      } else if (quickRegister == false) {
        const result = await createUser(
          // {
          // enteredUsername,
          // enteredFirstname,
          // enteredLastname,
          enteredEmail,
          enteredPassword,
          enteredRole
          // }
        );

        console.log(result);
      }
      await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
        callbackUrl: '/profile',
      });
      closeModal();
      router.push('/profile');
      // catch (error) {
      //   console.log(error);
      // }
    }
  }

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
            <button onClick={closeModal}>Close Modal</button>
            <h2 className="form-header">
              {isLogin ? 'Login ' : 'Register '}
              Form
            </h2>
            <form onSubmit={submitHandler}>
              <p>{userResponse}</p>
              {/* <div className="inputBox">
                <input
                  className="input input-glass-container"
                  type="text"
                  placeholder="Username"
                  id="username"
                  required
                  ref={usernameInputRef}
                />
              </div>
              <div className="inputBox">
                <input
                  className="input input-glass-container"
                  type="text"
                  placeholder="First"
                  id="firstname"
                  required
                  ref={firstnameInputRef}
                />
              </div>
              <div className="inputBox">
                <input
                  className="input input-glass-container"
                  type="text"
                  placeholder="Last"
                  id="lastname"
                  required
                  ref={lastnameInputRef}
                />
              </div> */}
              <div className="inputBox">
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
                <input
                  className="input input-glass-container"
                  type="password"
                  placeholder="Password"
                  id="password"
                  required
                  ref={passwordInputRef}
                />
              </div>

              <div className="inputBox">
                <input
                  className="input input-glass-container text-black dark:text-[#4C8EFF] bg-gray-800/40 dark:bg-gray-300/40 max-w-[10.25em] cursor-pointer mb-[1.25em] font-semibold"
                  type="submit"
                  value={isLogin ? 'Login' : 'Register'}
                />
              </div>
              <p className="mt-[0.3125em] text-gray-800 dark:text-gray-300">
                <a
                  className="font-semibold cursor-pointer"
                  onClick={switchAuthModeHandler}
                >
                  {isLogin
                    ? 'Create new account'
                    : 'Sign in with existing account'}
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Authorization;

// export const getServerSideProps = async () => {
//   const obinsunKey = uuidv4();

//   const dbAttributes: keyCreation[] = [
//     {
//       obinsunKey: `string`,
//       username: `string`,
//       firstname: `string`,
//       lastname: `string`,
//       email: `string`,
//       password: `string`,
//       ip: `string`,
//       cc: `string`,
//     },
//   ];

//   const addDBKeys = {
//     method: 'POST',
//     body: JSON.stringify(dbAttributes),
//     headers: {
//       Database: `Piece 0`,
//     },
//   };

//   console.log(dbAttributes);

//   const runRetrieval = async () => {
//     const retrieveDBkeys = await fetch(`/api/dbs/`, addDBKeys);
//     console.log({ retrievedKeys: retrieveDBkeys });
//   };

//   runRetrieval();

//   return {};
// };
