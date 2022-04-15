import { useRouter } from 'next/router';
import ProfileForm from './ProfileForm';
import Link from 'next/link';
import DarkModeToggle from '../DarkModeToggle';
import { useEffect, useRef, useState } from 'react';
import { useSession } from 'next-auth/react';
import BillingInfo from '../Settings/BillingInfo';
import countries from './supported-countries';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

const UserProfile = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const shippingRef = useRef();
  const zipRef = useRef();

  const userData = session?.user;

  const [hasState, setHasState] = useState(null);
  const [postalCode, setPostalCode] = useState('');
  const [cityInput, setCityInput] = useState('');
  const [passwordResponse, setPasswordResponse] = useState('');

  const [shippingData, setShippingData] = useState({
    first: userData?.firstname,
    last: userData?.lastname,

    line1: '',
    line2: '',
    city: '',
    postal_code: '',
    state: '',

    country: userData?.registeredInfo.userCountryCode,

    stripeAccess: userData?.customerId,
  });
  const handleShippingForm = async (e: any, shippingData: any) => {
    e.preventDefault();

    await fetch('api/user/update-shipping', {
      method: 'PUT',
      body: JSON.stringify(shippingData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  async function changePasswordHandler(passwordData: any) {
    const response = await fetch('/api/user/change-password', {
      method: 'PATCH',
      body: JSON.stringify(passwordData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const passwordApiResponse = await response.json();

    setPasswordResponse(passwordApiResponse);
  }

  // const createStripeElement = async () => {
  //   const stripeResolver = await Promise.resolve(stripePromise);

  //   const elements = stripeResolver.elements();

  //   const style = {
  //     base: {
  //       iconColor: '#666ee8',
  //       color: '#31325f',
  //       fontWeight: 400,
  //       fontFamily:
  //         '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  //       fontSmoothing: 'antialiased',
  //       fontSize: '15px',
  //       '::placeholder': {
  //         color: '#aab7c4',
  //       },
  //       ':-webkit-autofill': {
  //         color: '#666ee8',
  //       },
  //     },
  //   };

  //   const card = elements.create('card', { style, hidePostalCode: true });

  //   return  card ;
  // };

  // useEffect(() => {
  //   const mountCardElement = async() => {
  //     const card = await createStripeElement()

  //   }

  // });

  useEffect(() => {
    if (userData.shipping) {
      setShippingData({
        ...shippingData,
        line1: userData.shipping.address.line1,
        line2: userData.shipping.address.line2,
        city: userData.shipping.address.city,
        postal_code: userData.shipping.address.postal_code,
        state: userData.shipping.address.state,
      });
    }

    if (['AU', 'US'].includes(shippingData.country)) {
      setHasState(true);
    } else setHasState(false);

    switch (shippingData.country) {
      case 'US':
        setPostalCode('ZIP');
        setCityInput('City');
        break;
      case 'GB':
        setPostalCode('Postcode');
        break;
      case 'AU':
        setPostalCode('Postcode');
        setCityInput('City / Suburb');
        break;
      default:
        setPostalCode('Postal Code');
        setCityInput('City');
        break;
    }
  }, [session]);

  return (
    <div className="relative h-full w-[85%] flex flex-col items-center justify-center">
      <ProfileForm
        passwordResponse={passwordResponse}
        onChangePassword={changePasswordHandler}
      />
      <form
        onSubmit={(e) => {
          handleShippingForm(e, shippingData);
        }}
        className="glass-form-container before:bg-gray-800/[5%] dark:before:bg-gray-300/[5%] h-full"
      >
        <div className="information-container">
          <div className="glass-form-row">
            <div className="glass-form-column">
              <div className="glass-form-input-container">
                <input
                  className="glass-form-input"
                  type="text"
                  name=""
                  required
                  value={shippingData.first}
                  onChange={(e) => {
                    setShippingData({ ...shippingData, first: e.target.value });
                  }}
                />
                <span className="glass-form-text">First</span>
                <span className="glass-form-line"></span>
              </div>
            </div>
            <div className="glass-form-column">
              <div className="glass-form-input-container">
                <input
                  className="glass-form-input"
                  type="text"
                  name=""
                  required
                  value={shippingData.last}
                  onChange={(e) => {
                    setShippingData({ ...shippingData, last: e.target.value });
                  }}
                />
                <span className="glass-form-text">Last</span>
                <span className="glass-form-line"></span>
              </div>
            </div>
          </div>
          <div className="glass-form-row">
            <div className="glass-form-column">
              <div className="glass-form-input-container">
                <input
                  className="glass-form-input"
                  type="text"
                  name=""
                  required
                  value={shippingData?.line1}
                  onChange={(e) => {
                    setShippingData({ ...shippingData, line1: e.target.value });
                  }}
                />
                <span className="glass-form-text">Address</span>
                <span className="glass-form-line"></span>
              </div>
            </div>
            <div className="glass-form-column">
              <div className="glass-form-input-container">
                <input
                  className="glass-form-input"
                  type="text"
                  name=""
                  required
                  value={shippingData?.city}
                  onChange={(e) => {
                    setShippingData({ ...shippingData, city: e.target.value });
                  }}
                />
                <span className="glass-form-text">{cityInput}</span>
                <span className="glass-form-line"></span>
              </div>
            </div>
          </div>
          <div className="glass-form-row">
            <div className="glass-form-column">
              <div className="glass-form-input-container">
                <input
                  className="glass-form-input"
                  type="number"
                  name=""
                  required
                  value={shippingData?.postal_code?.toString()}
                  onChange={(e) => {
                    setShippingData({
                      ...shippingData,
                      postal_code: e.target.value,
                    });
                  }}
                />
                <span className="glass-form-text">{postalCode}</span>
                <span className="glass-form-line"></span>
              </div>
            </div>
            {hasState == true ? (
              <div className="glass-form-column">
                <div className="glass-form-input-container">
                  <input
                    className="glass-form-input"
                    type="text"
                    name=""
                    required
                    value={shippingData?.state}
                    onChange={(e) => {
                      setShippingData({
                        ...shippingData,
                        state: e.target.value,
                      });
                    }}
                  />
                  <span className="glass-form-text">State</span>
                  <span className="glass-form-line"></span>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="glass-form-row">
            <div className="glass-form-column">
              <div className="glass-form-input-container">
                <select
                  className="glass-form-input"
                  onChange={(e) => {
                    setShippingData({
                      ...shippingData,
                      country: e.target.value,
                    });
                  }}
                  defaultValue={shippingData.country}
                >
                  {countries.map(({ countryCode, countryName }: any) => (
                    <option key={countryCode} value={countryCode}>
                      {countryName}
                    </option>
                  ))}
                </select>

                <span className="glass-form-text">Country</span>
                <span className="glass-form-line"></span>
              </div>
            </div>
          </div>
        </div>
        <input className="cursor-pointer" type="submit" value="Save" />

        {/* <section className="payment-section">
          <h2>Payment Information</h2>
          <nav id="payment-methods">
            <ul>
              <li className="payment-selection">
                <input
                  type="radio"
                  name="payment"
                  id="payment-card"
                  value="card"
                  checked
                />
                <label htmlFor="payment-card">Card</label>
              </li>
              <li className="payment-selection">
                <input
                  type="radio"
                  name="payment"
                  id="payment-ach_credit_transfer"
                  value="ach_credit_transfer"
                  checked
                />
                <label htmlFor="payment-ach_credit_transfer">
                  Bank Transfer
                </label>
              </li>
              <li className="payment-selection">
                <input
                  type="radio"
                  name="payment"
                  id="payment-alipay"
                  value="alipay"
                  checked
                />
                <label htmlFor="payment-alipay">Alipay</label>
              </li>
              <li className="payment-selection">
                <input
                  type="radio"
                  name="payment"
                  id="payment-wechat"
                  value="wechat"
                  checked
                />
                <label htmlFor="payment-wechat">WeChat Pay</label>
              </li>
            </ul>
          </nav>
          <div className="payment-info card visible">
            <fieldset>
              <label>
                <span>Card</span>
                <div id="card-element" className="field"></div>
              </label>
            </fieldset>
          </div>
          <div className="payment-info visible redirect">
            <p className="notice">
              You’ll be redirected to the banking site to complete your payment.
            </p>
          </div>
          <div className="payment-info visible receiver">
            <p className="notice">
              Payment information will be provided after you place the order.
            </p>
          </div>
          <div className="payment-info visible wechat">
            <div id="wechat-qrcode"></div>
            <p className="notice">
              Click the button below to generate a QR code for WeChat.
            </p>
          </div>
        </section> */}
      </form>
    </div>
  );
};

export default UserProfile;
