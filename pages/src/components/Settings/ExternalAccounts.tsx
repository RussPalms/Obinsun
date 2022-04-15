import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Banks from './Banks';
import Cards from './Cards';

const ExternalAccounts = () => {
  const { data: session, status } = useSession() as any;

  const [ip, setIP] = useState('') as any;
  const [ts, setTS] = useState(null) as any;
  const [cc, setCC] = useState('') as any;

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/');
    setIP(res.data.IPv4);
    setTS(Math.round(new Date().getTime() / 1000));
    setCC(res.data.country_code);
  };

  const [page, setPage] = useState(0);
  const [object, setObject] = useState('bank_account');
  const [formData, setFormData] = useState({
    bankName: '',
    // country: cc,
    currency: 'usd',
    routing_number: '',
    account_number: '',

    cardName: '',
    number: '',
    exp_month: '',
    exp_year: '',
    cvc: '',
  });

  const FormTitles = ['Banks', 'Cards'];

  const AccountDisplay = () => {
    if (page === 0) {
      return <Banks formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <Cards formData={formData} setFormData={setFormData} />;
    }
  };

  const createExternalAccount = async ({ formdata }: any, object: string) => {
    const createAccount = await axios.post('/api/events/stripe-events', {
      transactId: session?.id,
      stripeId: session.user.stripeId,
      change: 'create-external-account',
      object,
      formData,
      ip,
      date: ts,
      country: cc,
    });
  };

  useEffect(() => {
    // setObject('');
    // console.log(object);
    getData();
  });

  useEffect(() => {
    if (session.user.external_accounts) {
      setFormData({
        ...formData,
        bankName: session.user.external_accounts.data[0].bank_name,
        routing_number: session.user.external_accounts.data[0].routing_number,
        account_number: 'PROVIDED',
      });
    }
  }, [session]);

  //   useEffect(() => {}, [AccountDisplay]);

  return (
    // <form className="glass-form-section">
    <div className="glass-form-container before:bg-gray-800/[5%] dark:before:bg-gray-300/[5%] h-full">
      <div className="information-heading">
        <div className="glass-progress-bar-container">
          <div
            className="glass-progress-bar"
            style={
              {
                width: page === 0 ? '50%' : page === 1 ? '100%' : page == 2,
              } as any
            }
          ></div>
        </div>
        <h2 className="glass-form-header">{FormTitles[page]}</h2>
      </div>

      <div className="information-container">{AccountDisplay()}</div>
      <div className="information-footing">
        <div className="flex flex-col tablet:flex-row">
          <div className={`${page === 0} ? 'hidden' : 'glass-form-row'`}>
            <div className="glass-form-column col">
              <button
                className="glass-form-submit"
                // disabled={page == 0}
                // onClick={(e) => {
                //   e.preventDefault();
                //   setPage((currPage) => currPage - 1);
                //   setObject('bank');
                // }}
                onClick={(e) => {
                  e.preventDefault();
                  if (page === FormTitles.length - 1) {
                    setPage((currPage) => currPage - 1);
                    setObject('bank_account');
                  } else if (page === FormTitles.length) {
                    setPage((currPage) => currPage - 1);
                    console.log('page');
                  } else {
                    setPage((currPage) => currPage + 1);
                    setObject('card');
                  }
                }}
              >
                {page === FormTitles.length - 1
                  ? FormTitles['0']
                  : FormTitles['1']}
              </button>
            </div>
          </div>

          <div className="glass-form-row">
            <div className="glass-form-column">
              <button
                className="glass-form-submit"
                // onClick={(e) => {
                //   e.preventDefault();
                //   if (page === FormTitles.length - 1) {
                //     createExternalAccount({ ...formData }, object);
                //     console.log('adding card ...');
                //   } else if (page === FormTitles.length) {
                //     // setObject('bank');
                //   } else {
                //     createExternalAccount({ ...formData }, object);
                //     console.log('adding bank ...');
                //     // setObject('card');
                //   }
                // }}

                onClick={(e) => {
                  e.preventDefault();
                  if (page === FormTitles.length - 1) {
                    createExternalAccount({ ...formData }, object);
                    console.log('adding card ...');
                  } else {
                    createExternalAccount({ ...formData }, object);
                    console.log('adding bank ...');
                  }
                }}
              >
                add {page === FormTitles.length - 1 ? 'Card' : 'Bank'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </form>
  );
};

export default ExternalAccounts;
