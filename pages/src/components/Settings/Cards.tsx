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
              value={formData?.cardName}
              onChange={(e) => {
                setFormData({ ...formData, cardName: e.target.value });
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
              // type="number"
              type="text"
              name=""
              required
              value={formData?.number.toString()}
              onChange={(e) => {
                setFormData({ ...formData, number: e.target.value });
              }}
            />
            <span className="glass-form-text">Card Number</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div>

      {/* <div className="glass-form-row">
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
      </div> */}

      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="month"
              name=""
              required
              value={formData?.exp_month_year}
              onChange={(e) => {
                setFormData({ ...formData, exp_month_year: e.target.value });
                // console.log(e.target.value);
              }}
              // disabled={formData?.exp_month_year ? true : false}
            />
            <span className="glass-form-text">Expiration Month & Year</span>
            <span className="glass-form-line"></span>
          </div>
        </div>
      </div>

      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              // type="number"
              type="text"
              name=""
              required
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
