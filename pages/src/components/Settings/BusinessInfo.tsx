const BusinessInfo = ({ formData, setFormData }: any) => {
  return (
    <>
      {/* <h2 className="glass-form-header text-xs">for payment collection</h2> */}
      <div className="glass-form-row">
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
              value={formData.mcc}
              onChange={(e) => {
                setFormData({ ...formData, mcc: e.target.value });
              }}
            />
            <span className="glass-form-text">
              {/* Merchant Classification Code */}
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
      </div>
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
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
        </div>
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.phone}
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
