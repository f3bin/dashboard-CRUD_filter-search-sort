import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

import "./LoginPage.scss";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <GoogleOAuthProvider 
              clientId="136469885767-v1ls8rkssrmajup1urjdpgvm7shqjne8.apps.googleusercontent.com"
            >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  var decoded = jwt_decode(credentialResponse.credential);
                  console.log(decoded);
                  navigate("/dashboard");
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </GoogleOAuthProvider>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
