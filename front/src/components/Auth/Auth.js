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
import { signin,signup } from "../../actions/auth";
import { gapi } from "gapi-script";
import "./Auth.css";
const initailState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmpassword: "",
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
      dispatch(signup(formData,navigate));
      
    } else {
      dispatch(signin(formData,navigate));
     
    }
  };
  const handleChange = (e) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
  };
  
  const handleShowpassword = () => setShowPassword((p) => !p);
  const switchMod = () =>  setIsSignup((p) => !p);
 
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: "AUTH", data: { result, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Paper>
        <Avatar>
          <FaLock />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign In"}</Typography>
        <form className="form" noValidate onSubmit={handleSubmit}>
          <Grid>
            {isSignup ? (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            ) : null}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowpassword={handleShowpassword}
            />
            {isSignup && (
              <Input
                name="confirmpassword"
                label="Confirm Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            variant="contained "
            color="primary"
            className=""
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="19657246709-i8482moutaolgqifdqpp0b3qf8usjduq.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={"single_host_origin"}
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                fullWidth
                variant="contained"
                color="primary"
                startIcon={<Icon />}
              >
                Sign in with Google
              </Button>
            )}
          />
          <Grid c>
            <Grid>
              <Button onClick={switchMod}>
                {isSignup
                  ? "Already have an acount ? Sign In"
                  : "Dont have an Account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
