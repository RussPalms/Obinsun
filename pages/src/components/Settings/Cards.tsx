const Cards = ({ formData, setFormData }: any) => {
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
              value={formData.card_name}
              onChange={(e) => {
                setFormData({ ...formData, card_name: e.target.value });
              }}
            />
            <span className="glass-form-text">Card Name</span>
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
              value={formData.number.toString()}
              onChange={(e) => {
                setFormData({ ...formData, number: e.target.value });
              }}
            />
            <span className="glass-form-text">Card Number</span>
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
              //   required
              value={formData.exp_month}
              onChange={(e) => {
                setFormData({ ...formData, exp_month: e.target.value });
              }}
            />
            <span className="glass-form-text">Expiration Month</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="number"
              name=""
              //   required
              value={formData.exp_year.toString()}
              onChange={(e) => {
                setFormData({ ...formData, exp_year: e.target.value });
              }}
            />
            <span className="glass-form-text">Expiration Year</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div>
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="number"
              name=""
              //   required
              value={formData.cvc}
              onChange={(e) => {
                setFormData({ ...formData, cvc: e.target.value });
              }}
            />
            <span className="glass-form-text">cvc</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
