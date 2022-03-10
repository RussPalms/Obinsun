const BillingInfo = ({ formData, setFormData }: any) => {
  return (
    <>
      {/* <h2 className="glass-form-header text-xs">
        also needed for payment collection
      </h2> */}
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.line1}
              onChange={(e) => {
                setFormData({ ...formData, line1: e.target.value });
              }}
            />
            <span className="glass-form-text">Street Address</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="number"
              name=""
              required
              value={formData.postalCode}
              onChange={(e) => {
                setFormData({ ...formData, postalCode: e.target.value });
              }}
            />
            <span className="glass-form-text">Postal Code</span>
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
              value={formData.city}
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
              }}
            />
            <span className="glass-form-text">City</span>
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
              value={formData.state}
              onChange={(e) => {
                setFormData({ ...formData, state: e.target.value });
              }}
            />
            <span className="glass-form-text">State</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BillingInfo;
