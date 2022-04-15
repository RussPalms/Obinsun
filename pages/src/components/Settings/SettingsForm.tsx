import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import PersonalInfo from './PersonalInfo';
import BusinessInfo from './BusinessInfo';
import BillingInfo from './BillingInfo';
import StripeAgreement from './StripeAgreement';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';

// declare var process: {
//   env: {
//     NODE_ENV: string;
//   };
// };

const stripePromise = loadStripe(`${process.env.stripe_public_key}`);

const SettingsForm = () => {
  // console.log(process.env['NODE_ENV']);
  // console.log(process.env['']);
  const router = useRouter();

  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/printful/account-connect`;
  const clientId = process.env.printful_client_id;
  const printfulLogin = `https://www.printful.com/oauth/authorize?grant_type=authorize&client_id=${clientId}&state={stateValue}&redirect_url=${redirectUrl}`;
  // console.log(clientId);

  const { data: session, status } = useSession() as any;
  // const loading = status === 'loading';
  let userData = session.user;

  const [ip, setIP] = useState('') as any;
  const [ts, setTS] = useState(null) as any;
  const [cc, setCC] = useState('') as any;

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setIP(res.data.IPv4);
    setTS(Math.round(new Date().getTime() / 1000));
    setCC(res.data.country_code);
  };

  // const PIITokenCreation = async ({formData}) => {
  //   const stripeResolver = await Promise.resolve(stripePromise);

  //   const { token, error } = await stripeResolver.createToken('pii', {
  //     personal_id_number: `${formData.ssnLast4}`,
  //   });

  //   // console.log(token);
  // };

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    // type: '',
    mcc: '7333',
    // url: `${process.env.NEXTAUTH_URL}`,
    url: 'Obinsun',
    email: session.user.email,
    phone: '',

    // firstName: '',
    firstName: session.user.firstname,
    // lastName: '',
    lastName: session.user.lastname,
    dob: '',
    ssnLast4: '',

    // line1: '',
    line1: session.user.shipping.address.line1,
    // postalCode: '',
    postalCode: session.user.shipping.address.postal_code,
    // city: '',
    city: session.user.shipping.address.city,
    // state: '',
    state: session.user.shipping.address.state,
  });

  const FormTitles = [
    'Business Information',
    // 'Personal Information',
    // 'Billing Information',
    'Onboarding Confirmation',
  ];

  const PageDisplay = () => {
    if (page === 0) {
      return <BusinessInfo formData={formData} setFormData={setFormData} />;
    }
    // else if (page === 1) {
    //   return <PersonalInfo formData={formData} setFormData={setFormData} />;
    // } else if (page === 2) {
    //   return <BillingInfo formData={formData} setFormData={setFormData} />;
    // }
    else {
      return <StripeAgreement />;
    }
  };

  const submitInformation = async ({ formdata }: any) => {
    const createAccount = await axios.post('/api/events/stripe-events', {
      transactId: session?.user.username,
      // change: input,
      change: 'create-custom-account',
      date: ts,
      ip: ip,
      cc: cc,
      formData,
    });
    // console.log(createAccount);
    // await router.push(printfulLogin);
  };
  useEffect(() => {
    // console.log(process.env.printful_client_id);
    getData();
  }, []);
  // console.log(printfulLogin);

  // const [day, setDay] = useState('') as any;
  // const [month, setMonth] = useState('') as any;
  useEffect(() => {
    if (userData.personal_info) {
      const date_of_birth = userData.personal_info.dob;
      let day: string, month: string;
      if (date_of_birth.month < 10) {
        // setMonth('0');
        month = '0';
      }
      if (date_of_birth.day < 10) {
        // setDay('0');
        day = '0';
      }
      setFormData({
        ...formData,
        dob: `${date_of_birth.year}-${month}${date_of_birth.month}-${day}${date_of_birth.day}`,
        // ssnLast4: userData.personal_info.ssnLast4,
        ssnLast4: 'PROVIDED',
        phone: userData.personal_info.phone,
      });

      // console.log(formData.dob);
    }
  }, [session]);

  return (
    // <form className="glass-form-section">
    <div className="glass-form-container before:bg-gray-800/[5%] dark:before:bg-gray-300/[5%] h-full">
      <div className="information-heading">
        <div className="glass-progress-bar-container">
          <div
            className="glass-progress-bar"
            style={
              {
                width: page === 0 ? '25%' : '100%',
                // : page === 1
                // ? '50%'
                // : page === 2
                // ? '75%'
                // : page === 3
                // ? '100%'
                // : page == 4,
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
                    // router.push(printfulLogin);
                    // alert('FORM SUBMITTED');
                    // console.log(formData);
                  }
                  // else if (page === FormTitles.length) {
                  //   setPage((currPage) => currPage + 1);
                  // }
                  else {
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
