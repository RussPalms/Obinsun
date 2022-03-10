const ContactInfo = ({ formData, setFormData }: any) => {
  return (
    <>
      {/* <h2 className="glass-form-header">Billing Information</h2> */}
      <h2 className="glass-form-header text-xs">
        also needed form payment collection
      </h2>
      {/* <div className="glass-form-single-row"> */}
      <div className="glass-form-row row100">
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
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
            <span className="text glass-form-text">Street Address</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.postalCode}
              onChange={(e) => {
                setFormData({ ...formData, postalCode: e.target.value });
              }}
            />
            <span className="text glass-form-text">Postal Code</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* <div className="glass-form-single-row"> */}
      <div className="glass-form-row row100">
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
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
            <span className="text glass-form-text">City</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
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
            <span className="text glass-form-text">State</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div>
      <div className="glass-form-row row100">
        <div className="glass-form-column col">
          <div className="glass-form-input-container inputBox0">
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
      {/* <div className="glass-form-row row100">
          <div className="glass-form-column col">
            <input className="glass-form-submit" type="submit" value="send" />
          </div>
        </div> */}
      {/* </div> */}
    </>
  );
};

export default ContactInfo;
