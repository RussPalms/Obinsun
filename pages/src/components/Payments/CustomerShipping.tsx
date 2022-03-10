import { useEffect, useRef, useState } from 'react';

function CustomerShipping(props: any) {
  // INDIVIDUAL
  // individual
  // Name
  // first name
  const firstNameRef = useRef() as any;
  // last name
  const lastNameRef = useRef() as any;
  // address
  // Address
  // line1
  const line1Ref = useRef() as any;
  // postal_code
  const postalCodeRef = useRef() as any;
  // city
  const cityRef = useRef() as any;
  // state
  const stateRef = useRef() as any;
  // email
  // Email
  const emailRef = useRef() as any;
  // phone
  // Phone
  const phoneRef = useRef() as any;

  function submitHandler(event: any) {
    event.preventDefault();
    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    const enteredLine1 = line1Ref.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredState = stateRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;

    props.onSubmitValidation({
      first_name: enteredFirstName,
      last_name: enteredLastName,
      line1: enteredLine1,
      postal_code: enteredPostalCode,
      city: enteredCity,
      state: enteredState,
      email: enteredEmail,
      phone: enteredPhone,
    });
  }

  return (
    <form onSubmit={submitHandler} className="max-h-96 overflow-y-scroll">
      <div className="inputBox">
        <label htmlFor="text">Your First Name</label>
        <input
          className="input border-bottom-right-glass"
          type="text"
          placeholder="first name"
          id="first-name"
          required
          ref={firstNameRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">Your Last Name</label>
        <input
          className="input border-bottom-right-glass"
          type="text"
          placeholder="last name"
          id="last-name"
          required
          ref={lastNameRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">Street Address</label>
        <input
          className="input border-bottom-right-glass"
          type="text"
          placeholder="Street Address"
          id="line1"
          required
          ref={line1Ref}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">Postal Code</label>
        <input
          className="input border-bottom-right-glass"
          type="number"
          placeholder="postal code"
          id="postal-code"
          required
          ref={postalCodeRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">City</label>
        <input
          className="input border-bottom-right-glass"
          type="text"
          placeholder="city"
          id="city"
          required
          ref={cityRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">State</label>
        <input
          className="input border-bottom-right-glass"
          type="text"
          placeholder="state"
          id="state"
          required
          ref={stateRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">Your E-Mail</label>
        <input
          className="input border-bottom-right-glass"
          type="email"
          placeholder="email"
          id="email"
          required
          ref={emailRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">Your Phone Number</label>
        <input
          className="input border-bottom-right-glass"
          // type="text"
          type="number"
          placeholder="phone number"
          id="phone"
          required
          ref={phoneRef}
        />
      </div>

      <div className="inputBox">
        <input
          className="input border-bottom-right-glass text-[#666] bg-white max-w-[200px] cursor-pointer mb-[20px] font-semibold"
          type="submit"
          value="Submit Validation"
        />
      </div>
    </form>
  );
}

export default CustomerShipping;
