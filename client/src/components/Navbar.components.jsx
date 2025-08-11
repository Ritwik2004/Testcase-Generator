import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios"

const NavbarComponent = ({ onToken, onUsername }) => {
  const [token, setToken] = useState(null);
  const [avatar, setAvatar] = useState(null)
  //fiend the username and avatar from accesstoken
  const usernameAvatar = async (token) => {
    try {
      const response = await axios.get("https://api.github.com/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json"
        }
      });
      onUsername(response.data.login)
      setAvatar(response.data.avatar_url)
    } catch (error) {
      toast.error(error.message || "Something went wrong while fetching the username and avatar")
    }
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("token");

    if (accessToken) {
      localStorage.setItem("github_token", accessToken);
      setToken(accessToken);
      onToken(accessToken); // pass token to parent
      // clean URL
      window.history.replaceState({}, "", "/");
      usernameAvatar(accessToken)
    } else {
      const stored = localStorage.getItem("github_token");
      if (stored) {
        setToken(stored);
        onToken(stored);
      usernameAvatar(stored)
      }
    }

  }, [onToken]);

  return (
    // <div className="bg-white shadow-md p-4 sm:pl-5 sm:pr-5 flex justify-between items-center">
    //   <h1 className="text-xl font-bold text-blue-600">⚡ Test Case Generator</h1>

    //   {!token ? (
    //     <a
    //       href="http://localhost:8000/api/auth/login"
    //       className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
    //     >
    //       Login with GitHub
    //     </a>
    //   ) : (
    //     <img src={avatar} alt="Logo" className="w-10 h-10 rounded-full cursor-pointer" />
    //   )}
    // </div>

    <div className="bg-white shadow-md p-4 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
  <h1 className="text-lg sm:text-xl font-bold text-blue-600 text-center sm:text-left">
    ⚡ Test Case Generator
  </h1>

  {!token ? (
    <a
      href="http://localhost:8000/api/auth/login"
      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
    >
      Login with GitHub
    </a>
  ) : (
    <img src={avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
  )}
</div>

  );
};

export default NavbarComponent;
