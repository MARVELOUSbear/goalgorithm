import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import './Login.css';
import Input from './Input';

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: '',
  });

  const onChangeEventListener = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    // console.log(loginFormData);
    setLoginFormData({
      ...loginFormData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container-fluid">
      <div className="row main-content bg-success text-center">
        <div className="col-md-4 text-center company__info">
          <span className="company__logo">
            <h2>
              <span className="fa fa-android"></span>
            </h2>
          </span>
          <h4 className="company_title">Your Company Logo</h4>
        </div>
        <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
          <div className="container-fluid">
            <div className="row">
              <h2>Log In</h2>
            </div>
            <div className="row">
              <form control="" className="form-group">
                <Input
                  type="email"
                  name="email"
                  className="form__input"
                  placeholder="Email"
                  onChange={onChangeEventListener}
                />
                <Input
                  type="password"
                  name="password"
                  className="form__input"
                  placeholder="Password"
                  onChange={onChangeEventListener}
                />

                <div className="row justify-content-center">
                  <input type="submit" value="Submit" className="btn" />
                </div>
              </form>
            </div>
            <div className="row">
              <p>
                Don't have an account? <a href="#">Register Here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
