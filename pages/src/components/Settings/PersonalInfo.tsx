//@ts-nocheck

import { useState } from 'react';

const PersonalInfo = ({ formData, setFormData }: any) => {
  return (
    <>
      {/* <h2 className="glass-form-header text-xs">
        Necessary to recieve payments. P.S. Joel, I promise not to sell this
        information.
      </h2> */}
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="text"
              name=""
              required
              value={formData.firstName}
              onChange={(e) => {
                setFormData({ ...formData, firstName: e.target.value });
              }}
            />
            <span className="glass-form-text">First Name</span>
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
              value={formData.lastName}
              onChange={(e) => {
                setFormData({ ...formData, lastName: e.target.value });
              }}
            />
            <span className="glass-form-text">Last Name</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div>
      <div className="glass-form-row">
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="date"
              name=""
              required
              value={formData.dob}
              onChange={(e) => {
                setFormData({ ...formData, dob: e.target.value });
              }}
            />
            <span className="glass-form-text leading-none">Date Of Birth</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
        <div className="glass-form-column">
          <div className="glass-form-input-container">
            <input
              className="glass-form-input"
              type="number"
              name=""
              required
              value={formData.ssnLast4}
              onChange={(e) => {
                setFormData({ ...formData, ssnLast4: e.target.value });
              }}
              maxLength="4"
              minLength="4"
            />
            <span className="glass-form-text">Last 4 Digits of SSN</span>
            <span className="glass-form-line line"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfo;
