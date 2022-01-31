//@ts-nocheck

import { useEffect, useRef, useState } from "react";

function OnboardingForm(props) {
  // ACCOUNT INFORMATION
  // business_type
  // Business type
  const typeRef = useRef();
  // business_profile
  // Merchant Cctegory code
  const mccRef = useRef();
  // URL
  const urlRef = useRef();
  // tos_acceptance
  // Terms of service
  // // ip address
  // const ipRef = useRef();
  // // current date
  // const dateRef = useRef();
  // // external_account
  // // External account
  // const externalAccountRef = useRef();
  // INDIVIDUAL
  // individual
  // Name
  // first name
  const firstNameRef = useRef();
  // last name
  const lastNameRef = useRef();
  // dob
  // Date of birth
  const dobRef = useRef();
  // // day
  // const dayRef = useRef();
  // // month
  // const monthRef = useRef();
  // // year
  // const yearRef = useRef();
  // address
  // Address
  // line1
  const line1Ref = useRef();
  // postal_code
  const postalCodeRef = useRef();
  // city
  const cityRef = useRef();
  // state
  const stateRef = useRef();
  // email
  // Email
  const emailRef = useRef();
  // phone
  // Phone
  const phoneRef = useRef();
  // Tax information
  // ssn_last_4
  const ssnLast4Ref = useRef();

  const [birthDateSetter, setBirthDateSetter] = useState();
  // setBirthDateSetter(() => dobRef.current.value);
  const [birthYear, setBirthYear] = useState();
  const [birthMonth, setBirthMonth] = useState();
  const [birthDay, setBirthDay] = useState();
  const birthdayHandler = (e) => {
    e.preventDefault();

    // let match = str.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);

    // let birthday = e.target.value;

    // const datePattern = birthday.split("-");

    // console.log(datePattern);

    // console.log(e.target.value);
    // console.log(dobRef.current.value);
    // setBirthDate(e.target.value);
    // setBirthDate(dobRef.current.value);
    // const birthDateSetter = dobRef.current.value;
    // setBirthDateSetter(() => dobRef.current.value);
    // setBirthDateSetter(() => e.target.value);
    const birthdayRef = e.target.value;

    // let match = birthdayRef.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    // const datePattern = /(\d{4})\-(\d{1,2})\-(\d{1,2})/;
    const datePattern = /(\d{4})-(\d{1,2})-(\d{1,2})/;
    const birthday = datePattern.exec(birthdayRef);
    // const birthday = birthdayRef.match(datePattern);

    // const birthday = new Date(birthdayRef);
    // setBirthDateSetter((e) => {
    //   new Date(birthDateSetting);
    // });

    // setBirthDateSetter(new Date(e.target.value));

    // const setYear = birthday.getFullYear();
    // const setMonth = birthday.getMonth() + 1;
    // const setDay = birthday.getDate();

    // setBirthYear(setYear);
    // setBirthMonth(setMonth);
    // setBirthDay(setDay);

    setBirthYear(Number(birthday[1]));
    setBirthMonth(Number(birthday[2]));
    setBirthDay(Number(birthday[3]));

    // console.log(year, month, day);
    // console.log(dobRef.current.value);
    // console.log(birthDateSetting);
    // console.log(birthday);
    // console.log(birthDate);
    // console.log(birthday);
    // console.log(birthday[1]);
    // console.log(birthday[2]);
    // console.log(birthday[3]);
    // return birthday;
    // console.log(birthDay, birthMonth, birthYear);
    // console.log(setDay, setMonth, setYear);
    // console.log(birthDateSetter);
    // console.log(birthday);

    // console.log(birthDateSetter);
  };

  // useEffect(() => {
  // setBirthDateSetter((e) => dobRef.current.value);
  // e.preventDefault();
  // let birthday = birthDateSetter;
  // setBirthYear(birthday.getFullYear());
  // setBirthMonth(birthday.getMonth() + 1);
  // setBirthDay(birthday.getDate() + 1);
  // console.log(birthYear, birthMonth, birthDay);
  // console.log(birthDateSetter);
  // const year = birthday.getFullYear();
  // const month = birthday.getMonth() + 1;
  // const day = birthday.getDate();
  // console.log(birthday);
  // }, [birthdayHandler]);

  // console.log(birthday);

  // useEffect(() => {
  //   birthdayHandler();
  // }, [birthdayHandler]);

  // console.log(year, month, day);

  // const birthday = new Date(dobRef);
  // const year = birthday.getFullYear();
  // const month = birthday.getMonth() + 1;
  // const day = birthday.getDate();
  // console.log(year, month, day);

  function submitHandler(event) {
    event.preventDefault();
    // const birthday = new Date(dobRef);

    const enteredType = typeRef.current.value;
    const enteredMcc = mccRef.current.value;
    const enteredUrl = urlRef.current.value;
    // const enteredIp = ipRef.current.value;
    // const enteredDate = dateRef.current.value;
    // const enteredExternalAccount = externalAccountRef.current.value;
    const enteredFirstName = firstNameRef.current.value;
    const enteredLastName = lastNameRef.current.value;
    // const enteredDay = dayRef.current.value;
    // const enteredMonth = monthRef.current.value;
    // const enteredYear = yearRef.current.value;
    const enteredDay = birthDay;
    const enteredMonth = birthMonth;
    const enteredYear = birthYear;
    const enteredLine1 = line1Ref.current.value;
    const enteredPostalCode = postalCodeRef.current.value;
    const enteredCity = cityRef.current.value;
    const enteredState = stateRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredPhone = phoneRef.current.value;
    const enteredSsnLast4 = ssnLast4Ref.current.value;

    // optional: Add validation
    // console.log(enteredDay, enteredMonth, enteredYear);

    props.onSubmitValidation({
      business_type: enteredType,
      mcc: enteredMcc,
      url: enteredUrl,
      // ip: enteredIp,
      // date: enteredDate,
      // external_account: enteredExternalAccount,
      first_name: enteredFirstName,
      last_name: enteredLastName,
      day: enteredDay,
      month: enteredMonth,
      year: enteredYear,
      line1: enteredLine1,
      postal_code: enteredPostalCode,
      city: enteredCity,
      state: enteredState,
      email: enteredEmail,
      phone: enteredPhone,
      ssn_last_4: enteredSsnLast4,
    });
  }

  return (
    <form onSubmit={submitHandler} className="max-h-96 overflow-y-scroll">
      <div className="inputBox">
        <label htmlFor="text">Your Business Type</label>
        <input
          className="input border-bottom-right-glass"
          type="text"
          placeholder="Business Type"
          id="business-type"
          required
          ref={typeRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">Your Merchant Category Code</label>
        <input
          className="input border-bottom-right-glass"
          type="number"
          // type="text"
          placeholder="merchant category code"
          id="merchant-category-code"
          required
          ref={mccRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="text">Your Business Profile URL</label>
        <input
          className="input border-bottom-right-glass"
          type="url"
          placeholder="profile url"
          id="business-profile-url"
          required
          ref={urlRef}
        />
      </div>
      <div className="inputBox">
        <label htmlFor="date">Date of Birth</label>
        <input
          className="input border-bottom-right-glass"
          type="date"
          placeholder="birthdate"
          id="date"
          required
          // onChange={(event) => this.setState({startDate: event.target.value})}
          // onChange={(event) => setBirthDateSetter({startDate: event.target.value})}
          onChange={birthdayHandler}
          ref={dobRef}
        />
      </div>
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
        <label htmlFor="text">
          Last 4 Digits Of Your Social Security Number
        </label>
        <input
          className="input border-bottom-right-glass"
          type="number"
          placeholder="ssn last 4"
          id="ssn-last-4"
          required
          ref={ssnLast4Ref}
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

export default OnboardingForm;
