import axios from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import BusinessInfo from './BusinessInfo';
import PaymentInfo from './PaymentInfo';
import BillingInfo from './BillingInfo';
import StripeAgreement from './StripeAgreement';
// import PrintfulSigin from './PrintfulSigin';
import Router from 'next/router';

const SettingsForm = () => {
  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/printful/account-connect`;
  const clientId = process.env.PRINTFUL_CLIENT_ID;
  const printfulLogin = `https://www.printful.com/oauth/authorize?grant_type=authorize&client_id=${clientId}&state={stateValue}&redirect_url=${redirectUrl}`;

  const { data: session, status } = useSession() as any;
  const loading = status === 'loading';

  const [ip, setIP] = useState('') as any;
  const [ts, setTS] = useState(null) as any;

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setIP(res.data.IPv4);
    setTS(Math.round(new Date().getTime() / 1000));
  };

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    type: '',
    mcc: '',
    url: '',
    email: '',
    phone: '',

    firstName: '',
    lastName: '',
    dob: '',
    ssnLast4: '',

    line1: '',
    postalCode: '',
    city: '',
    state: '',
  });

  const typeRef = useRef() as any;
  const mccRef = useRef() as any;
  const urlRef = useRef() as any;
  const firstNameRef = useRef() as any;
  const lastNameRef = useRef() as any;
  const dobRef = useRef() as any;
  const line1Ref = useRef() as any;
  const postalCodeRef = useRef() as any;
  const cityRef = useRef() as any;
  const stateRef = useRef() as any;
  const emailRef = useRef() as any;
  const phoneRef = useRef() as any;
  const ssnLast4Ref = useRef() as any;

  // const formDataRef = useRef();

  const FormTitles = [
    'Business Information',
    'Personal Information',
    'Billing Information',
    'Onboarding Confirmation',
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <BusinessInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 2) {
      return <BillingInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <StripeAgreement />;
    }
  };

  const submitInformation = async ({ formdata }: any) => {
    const createAccount = await axios.post(
      '/api/stripe/create-custom-account',
      {
        firebaseID: session?.id,
        date: ts,
        ip: ip,
        formData,
      }
    );
    console.log(createAccount);
    // await router.push(printfulLogin);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    // <form className="glass-form-section">
    <div className="glass-form-container container before:bg:gray-800/[5%] dark:before:bg-gray-300/[5%] ">
      <div className="information-heading">
        <div className="glass-progress-bar-container">
          <div
            className="glass-progress-bar"
            style={
              {
                width:
                  page === 0
                    ? '25%'
                    : page === 1
                    ? '50%'
                    : page === 2
                    ? '75%'
                    : page === 3
                    ? '100%'
                    : page == 4,
              } as any
            }
          ></div>
        </div>
        <h2 className="glass-form-header">{FormTitles[page]}</h2>
      </div>

      <div className="information-container">{PageDisplay()}</div>
      <div className="information-footing">
        <div className="flex flex-col tablet:flex-row">
          <div className={`${page === 0} ? 'hidden' : 'glass-form-row'`}>
            <div className="glass-form-column col">
              <button
                className="glass-form-submit"
                disabled={page == 0}
                onClick={(e) => {
                  e.preventDefault();
                  setPage((currPage) => currPage - 1);
                }}
              >
                Prev
              </button>
            </div>
          </div>

          <div className="glass-form-row">
            <div className="glass-form-column">
              <button
                className="glass-form-submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (page === FormTitles.length - 1) {
                    submitInformation({ ...formData });
                    // alert('FORM SUBMITTED');
                    // console.log(formData);
                  } else if (page === FormTitles.length) {
                    setPage((currPage) => currPage + 1);
                  } else {
                    setPage((currPage) => currPage + 1);
                  }
                }}
              >
                {page === FormTitles.length - 1 ? 'Submit' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </form>
  );
};

export default SettingsForm;
