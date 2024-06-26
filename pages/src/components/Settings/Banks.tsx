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
              value={formData?.bankName}
              onChange={(e) => {
                setFormData({ ...formData, bankName: e.target.value });
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
              // type="number"
              type="text"
              name=""
              required
              // value={formData.routing_number.toString()}
              value={formData?.routing_number}
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
              // type="number"
              type="text"
              name=""
              required
              // value={formData.account_number.toString()}
              value={formData?.account_number}
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
