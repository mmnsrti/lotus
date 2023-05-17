import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Container,
  Paper,
  Avatar,
  Grid,
} from "@mui/material";
import { FaLock } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import Icon from "./Icon";
import Input from "./Input";
import { signin, signup } from "../../actions/auth";
import { gapi } from "gapi-script";
import Lotus from "./Lotus.js";
import "./Auth.css";
const initailState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initailState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (formData.password === formData.confirmPassword) {
        dispatch(signup(formData, navigate));
      } else {
       
      }
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleShowpassword = () => setShowPassword((p) => !p);
  const switchMod = () => setIsSignup((p) => !p);

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH ", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };
  return (
    <div className="Container-auth" component="main" maxWidth="">
      <div className="paper-auth">
        <Lotus className="lotus-auth" />
        <form className="form" noValidate onSubmit={handleSubmit}>
          <Grid>
            <Grid>
              <div className="switchMod">
                <button
                  onClick={() => setIsSignup(true)}
                  className={
                    isSignup ? "signup-acc active-auth" : "signin-acc "
                  }
                >
                  Sign up
                </button>
                <button
                  onClick={() => setIsSignup(false)}
                  className={
                    isSignup ? "signup-acc " : "signin-acc active-auth"
                  }
                >
                  Sign In
                </button>
              </div>
            </Grid>
            <GoogleLogin
              clientId="19657246709-i8482moutaolgqifdqpp0b3qf8usjduq.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy={"single_host_origin"}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  className="Google-auth"
                >
                  <Icon />
                </button>
              )}
            />
            <span>or use your email for registration</span>

            {isSignup ? (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  className="firstName"
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  className="lastName"
                />
              </>
            ) : null}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
              className="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowpassword={handleShowpassword}
              className="password"
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
                className="confirmPassword"
                value={formData.confirmPassword}

              />
            )}
          </Grid>
          <button type="submit" className="submit-auth">
            {isSignup ? "Sign Up" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
