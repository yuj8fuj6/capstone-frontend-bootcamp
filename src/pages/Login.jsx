import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/main",
      },
    });
  };

  return (
    <div className="flex flex-wrap flex-col justify-center content-center h-full w-full bg-no-repeat bg-center bg-cover bg-[url('https://firebasestorage.googleapis.com/v0/b/kaibo-capstone.appspot.com/o/App%20Logo%2Fbackground.jpeg?alt=media&token=fad681f4-5151-4932-9cbe-6a69d3dfae62')]">
      <div
        className="bg-lightgrey w-2/12 h-1/2 rounded-xl drop-shadow-lg flex flex-wrap flex-row justify-center content-center hover:bg-lightgreen"
        onClick={handleLogin}
      >
        <img
          src={require("../assets/app_logo.png")}
          alt="app-logo"
          className="w-7/12 h-10/12 drop-shadow-xl"
        />
      </div>
      <p className="text-lightgrey mt-5 font-semibold text-lg">
        Click to Sign In or Sign Up
      </p>
    </div>
  );
};

export default Login;
