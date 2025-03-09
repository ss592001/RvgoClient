import React, { useState } from "react";
import "./login.css";
import CustomInput from "../../CustomComponents/CustomInput/CustomInput";
import CustomButton from "../../CustomComponents/CustomButton/CustomButton";
import { useNavigate } from "react-router";
import { GetRoute, PostRoute } from "../../Custom_hooks/Routes";
import { useDispatch } from "react-redux";
import { setAuth } from "../../Redux/Store";

import ClimbingBoxLoader from "react-spinners/ClipLoader";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const Login = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const [authType, setAuthType] = useState("Login");

  const [error, setError] = useState("");

  const handleUserNameChange = (ev) => {
    setUserName(ev.target.value);
    console.log(ev.target.value);
  };
  const handlePasswordChange = (ev) => {
    setPassword(ev.target.value);
  };

  const handleNameChange = (ev) => {
    setName(ev.target.value);
  };

  const handleLogin = () => {
    if (userName === "" || password === "") {
      return setError("Please enter login credentials.");
    }
    GetRoute(
      `login/${userName}/${password}`,
      () => {
        setLoader(true);
      },
      (data) => {
        if (data.auth === false) {
          setError("Invalid email or password.");
        } else {
          dispatch(setAuth(data));
          if (data.type === "user") {
            navigate("/user/dashboard");
          } else {
            navigate("/admin/dashboard");
          }
        }
        setLoader(false);
        console.log(data);
      }
    );
  };
  const handleSignUp = () => {
    if (userName === "" || password === "" || name === "") {
      return setError("Some fields are missing.");
    }
    const bodyData = {
      name: name,
      email: userName,
      password: password,
    };
    PostRoute(
      "signup",
      () => {
        setLoader(true);
      },
      (res) => {
        console.log(res);
        if (res.status === 200) {
          setAuthType("Login");
        } else if (res.status === 201) {
          setError("User already exists.");
        }
        setLoader(false);
      },
      bodyData
    );
  };
  return (
    <>
      <div className="authContainer">
        <div className="authStyle">
          <img
            onClick={() => {
              console.log("hello");
              navigate("/");
            }}
            className="backIcon"
            src="https://img.icons8.com/ios-filled/50/FFFFFF/circled-left-2.png"
            alt="circled-left-2"
          />
        </div>
        <div className="authFormContainer">
          <div
            className="auth"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg"
              alt=""
              srcset=""
              className="loginImage"
              height={350}
              width={450}
            />
            <div className="form">
              <div className="authHeader">
                {authType}
                {error !== "" && <span className="error">{error}</span>}
              </div>
              {authType !== "Login" && (
                <CustomInput
                  label={"Name"}
                  placeholder={"Enter your name"}
                  type="text"
                  handleInputChange={handleNameChange}
                  value={name}
                  Required={true}
                />
              )}
              <CustomInput
                label={" Email "}
                placeholder={"Enter your email"}
                type="email"
                handleInputChange={handleUserNameChange}
                value={userName}
                Required={true}
              />
              <CustomInput
                label={"Password"}
                placeholder={"Enter your password"}
                type="password"
                handleInputChange={handlePasswordChange}
                value={password}
                Required={true}
              />
              {/* {authType === "Login" && (
                <div className="smallText">Forget Password ?</div>
              )} */}
              {loader ? (
                <div
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <ClimbingBoxLoader
                    color={"rgb(126, 23, 28)"}
                    loading={loader}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>
              ) : (
                <CustomButton
                  text={authType === "Login" ? "Login" : "Sign Up"}
                  handleClick={
                    authType === "Login" ? handleLogin : handleSignUp
                  }
                  isDissabled={false}
                  style={{}}
                />
              )}
              {authType === "Login" ? (
                <div
                  className="alternateOption"
                  onClick={() => {
                    setError("");
                    setAuthType("Sign Up");
                  }}
                >
                  <div> Or don't have an account ? SIGN UP </div>{" "}
                </div>
              ) : (
                <div
                  className="alternateOption"
                  onClick={() => {
                    setError("");
                    setAuthType("Login");
                  }}
                >
                  <div> Already have an account ? LOGIN </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
