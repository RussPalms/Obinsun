import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const PrintfulSignin = () => {
  const { data: session } = useSession() as any;

  const router = useRouter();

  const redirectUrl = `${process.env.NEXTAUTH_URL}/api/printful/account-connect`;
  const clientId = process.env.printful_client_id;
  const stateValue = session.user.firestoreId;
  const printfulLogin = `https://www.printful.com/oauth/authorize?grant_type=authorize&client_id=${clientId}&state=${stateValue}&redirect_url=${redirectUrl}`;

  return (
    <>
      <h2 className="glass-form-header">Printful Signin</h2>
      <h2 className="glass-form-header text-xs">
        connect your Printful account
      </h2>
      <button
        onClick={(e) => router.push(printfulLogin)}
        className="glass-form-submit"
      >
        REDIRECT TO PRINTFUL
      </button>
      {/* <div className="glass-form-single-row"> */}
      {/* <div className="glass-form-row row100">
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
            <input className="glass-form-input" type="text" name="" required />
            <span className="text glass-form-text">First Name</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
            <input className="glass-form-input" type="text" name="" required />
            <span className="text glass-form-text">Last Name</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div>
      <div className="glass-form-row row100">
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
            <input className="glass-form-input" type="text" name="" required />
            <span className="text glass-form-text">E-Mail</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
            <input className="glass-form-input" type="text" name="" required />
            <span className="text glass-form-text">Phone Number</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div> */}
      {/* </div> */}
      {/* <div className="glass-form-single-row"> */}
      {/* <div className="glass-form-row row100">
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
            <textarea
              className="glass-form-textarea"
              required="required"
            ></textarea>
            <span className="text glass-form-text text-[0.7em]">
              Type Your Message Here . . .
            </span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div> */}
      {/* </div> */}
      {/* <div className="glass-form-single-row"> */}
      <div className="glass-form-row row100">
        <div className="glass-form-column col">
          <input className="glass-form-submit" type="submit" value="send" />
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default PrintfulSignin;
