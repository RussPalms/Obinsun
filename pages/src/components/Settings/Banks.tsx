const Banks = ({ formData, setFormData }: any) => {
  return (
    <>
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.bank_name}
              onChange={(e) => {
                setFormData({ ...formData, bank_name: e.target.value });
              }}
            />
            <span className="glass-form-text">Bank Account Name</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
        {/* <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.country}
              onChange={(e) => {
                setFormData({ ...formData, country: e.target.value });
              }}
            />
            <span className="glass-form-text">Country</span>
            <span className="glass-form-line"></span>
          </div>
        </div> */}
      </div>
      {/* <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.currency}
              onChange={(e) => {
                setFormData({ ...formData, currency: e.target.value });
              }}
            />
            <span className="glass-form-text">Currency</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div> */}
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="number"
              name=""
              required
              value={formData.routing_number.toString()}
              onChange={(e) => {
                setFormData({ ...formData, routing_number: e.target.value });
              }}
            />
            <span className="glass-form-text">Routing Number</span>
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
              value={formData.account_number.toString()}
              onChange={(e) => {
                setFormData({ ...formData, account_number: e.target.value });
              }}
            />
            <span className="glass-form-text">Account Number</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banks;
