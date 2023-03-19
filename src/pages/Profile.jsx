import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import NavBar from "../components/NavBar";

const Profile = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return (
    <div className="max-h-screen max-w-screen overscroll-none">
      <NavBar />
      Profile
    </div>
  );
};

export default Profile;
