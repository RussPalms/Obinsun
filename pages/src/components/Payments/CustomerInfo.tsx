// @ts-nocheck

import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { DateTime } from "luxon";
import { useEffect, useRef, useState } from "react";
import CustomerShipping from "./CustomerShipping";

// const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

// async function createCustomAccount({firebaseID: session.id})

export default function CustomerInfo() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  console.log(status, session);

  const submitValidationHandler = async (validationData) => {
    // e.preventDefault();

    // const stripe = await stripePromise;
    const createAccount = await axios.post("/api/stripe/create-customer", {
      firebaseID: session?.id,
      // date: ts,
      // ip: ip,
      validationData,
    });

    return;
  };

  const addingCard = async (e) => {
    e.preventDefault();

    //   const externalAccountAddition = await axios.post(
    //     "/api/stripe/create-external-account",
    //     {
    //       firebaseID: session?.id,
    //       stripeId: session?.user.stripeId,
    //     }
    //   );
  };

  const externalAccount = async (e) => {
    e.preventDefault();

    // await axios.post("/api/stripe/create-external-account", {
    await axios.post("/api/stripe/add-card", {
      firebaseID: session?.id,
      stripeId: session?.user.stripeId,
    });
  };

  const updateCustomAccount = async (e) => {
    e.preventDefault();
    const updateAccount = await axios.post(
      "/api/stripe/create-custom-account",
      {
        firebaseID: session?.id,
        stripeId: session?.stripeId,
        // date: ts,
        // ip: ip,
      }
    );
  };

  // useEffect(() => {
  //   //passing getData method to the lifecycle method
  //   getData();
  //   console.log(ts);
  //   console.log(ip);
  // }, []);

  // console.log(session);

  return (
    <section className="relative flex justify-center align-center w-screen min-h-screen bg-gradient-to-b from-[#f1f4f9] to-[#dff1ff] overflow-hidden">
      <div className="color" />
      <div className="color bottom-[-150px] left-[100px] w-[500px] h-[500px] bg-[#fffd87]" />
      <div className="color bottom-[50px] right-[100px] w-[300px] h-[300px] bg-[#00d2ff]" />
      <div className="absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]">
        <div
          className="square border-bottom-right-glass square-delay"
          style={{ "--i": "0" }}
        />
        <div
          className="square border-bottom-right-glass top-[150px] left-[-100px] w-[120px] h-[120px] z-20 square-delay"
          style={{ "--i": "1" }}
        />
        <div
          className="square border-bottom-right-glass bottom-[50px] right-[-60px] w-[80px] h-[80px] z-20 square-delay"
          style={{ "--i": "2" }}
        />
        <div
          className="square border-bottom-right-glass bottom-[-80px] left-[100px] w-[50px] h-[50px] square-delay"
          style={{ "--i": "3" }}
        />
        <div
          className="square border-bottom-right-glass top-[-80px] left-[140px] w-[60px] h-[60px] delay-[-7000ms] square-delay"
          style={{ "--i": "4" }}
        />
        <div className="relative top-0 left-0 w-[400px] min-h-[400px] bg-white/10 border rounded-[10px] flex justify-center align-center backdrop-blur-[5px] shadow-glass3 border-bottom-right-glass border-white/50">
          <div className="relative w-full h-full p-[40px]">
            <h2 className="relative text-white text-[24px] font-semibold tracking-[1px] mb-[40px] before:absolute before:left-0 before:bottom-[-10px] before:w-[80px] before:h-[4px] before:bg-white">
              Password Form
            </h2>
            <button onClick={externalAccount}>Click To Update Account</button>
            <button onClick={addingCard}>Click To Add Card</button>
            <CustomerShipping onSubmitValidation={submitValidationHandler} />
          </div>
        </div>
      </div>
    </section>
  );
}
