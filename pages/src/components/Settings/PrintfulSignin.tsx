const PrintfulSignin = () => {
  return (
    <>
      <h2 className="glass-form-header">Printful Signin</h2>
      <h2 className="glass-form-header text-xs">
        connect your Printful account
      </h2>
      {/* <div className="glass-form-single-row"> */}
      <div className="glass-form-row row100">
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
      {/* </div> */}
      {/* <div className="glass-form-single-row"> */}
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
      </div>
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
