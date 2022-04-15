const BusinessInfo = ({ formData, setFormData }: any) => {
  return (
    <>
      {/* <h2 className="glass-form-header text-xs">for payment collection</h2> */}
      {/* <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.type}
              onChange={(e) => {
                setFormData({ ...formData, type: e.target.value });
              }}
            />
            <span className="glass-form-text">Business Type</span>
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
              value={formData.mcc.toString()}
              onChange={(e) => {
                setFormData({ ...formData, mcc: e.target.value });
              }}
            />
            <span className="glass-form-text">
              M.C.C.
            </span>
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
              value={formData.url}
              onChange={(e) => {
                setFormData({ ...formData, url: e.target.value });
              }}
            />
            <span className="glass-form-text">Domain Name</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div> */}
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="date"
              name=""
              required
              value={formData?.dob}
              onChange={(e) => {
                setFormData({ ...formData, dob: e.target.value });
              }}
            />
            <span className="glass-form-text leading-none">Date Of Birth</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div>
      <div className="glass-form-row">
        {/* <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="email"
              name=""
              required
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <span className="glass-form-text">E-Mail</span>
            <span className="glass-form-line"></span>
          </div>
        </div> */}

        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              // type="number"
              type="text"
              name=""
              required
              // value={formData?.ssnLast4.toString()}
              value={formData?.ssnLast4}
              onChange={(e) => {
                setFormData({ ...formData, ssnLast4: e.target.value });
              }}
              maxLength={4}
              minLength={4}
            />
            <span className="glass-form-text">Last 4 Digits of SSN</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              // value={formData?.phone.toString()}
              value={formData?.phone}
              onChange={(e) => {
                setFormData({ ...formData, phone: e.target.value });
              }}
            />
            <span className="glass-form-text">Phone Number</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessInfo;
