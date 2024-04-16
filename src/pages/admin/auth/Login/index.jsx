import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import imageth from "../../../../assets/images/1105fe51-0393-474c-a4ec-7320b383d039.png";

export default function AdminLogin() {
  const [email, setEmail] = useState();
  const [error, setError] = useState({});
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Admin Login";
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/admin/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.password === "Incorrect password") {
          alert("Incorrect Password");
        }
        if (res.data.auth === "Successful") {
          navigate("/admin/dashboard/");
        }
        if (res.data.error) {
          setError(res.data.error);
          console.log(res.data.error);
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <div className="flex h-screen min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {" "}
        <img src={imageth} className="mx-auto object-cover h-80 w-auto" />
        <h2 className="!mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in your seller account
        </h2>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="col-span-6">
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Email{" "}
            </label>

            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              id="Email"
              name="email"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Password{" "}
            </label>

            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              id="Password"
              name="password"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="!mt-5">
            <button className="flex w-full justify-center rounded-md border border-blue-600 bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 ">
              Sign in
            </button>
          </div>
        </form>

        <p className="mt-5 text-center text-sm text-gray-500">
          Not a seller?{" "}
          <a
            href="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            become a seller
          </a>
        </p>
      </div>
    </div>
  );
}
