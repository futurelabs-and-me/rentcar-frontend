import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import {
  ArrowTopRightOnSquareIcon,
  CreditCardIcon,
  DocumentCheckIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

function isCurrentURL(url) {
  const urlOB = new URL(window.location.href);
  if (urlOB.pathname.split("/")[3] === url) {
    return true;
  } else {
    return false;
  }
}

function signout(e) {
  e.preventDefault();
  axios
    .get("http://localhost:5000/admin/auth/logout", { withCredentials: true })
    .then((res) => {
      if (res.data.message === "Successful") {
        window.location.href = "/admin/auth";
      }
    })
    .catch((err) => {
      throw err;
    });
}

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, error: null };
  }

  componentDidMount() {
    document.title = "Admin";
    axios
      .get("http://localhost:5000/admin/user", { withCredentials: true })
      .then((res) => {
        if (res.data.user) {
          this.setState({ user: res.data.user });
        } else {
          window.location.href = "/admin/auth/login";
        }
      })
      .catch((err) => {
        this.setState({ error: err.response.data.error });
        if (err.response.data.error == "Invalid token") {
          window.location.href = "/admin/auth/login";
        }
      });
  }

  render() {
    if (this.state.error == "Invalid token") {
      return <div></div>;
    } else {
      return (
        <div className="flex w-screen">
          <div className="flex h-screen w-16 flex-col justify-between border-e bg-white">
            <div>
              <div className="inline-flex h-16 w-16 items-center justify-center">
                {this.state.user && (
                  <span className="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-sm font-bold text-gray-600">
                    {this.state.user.username.charAt(0).toUpperCase() +
                      this.state.user.username
                        .split(" ")[1]
                        .charAt(0)
                        .toUpperCase()}
                  </span>
                )}
              </div>

              <div className="border-t border-gray-100">
                <div className="px-2">
                  <div className="py-4">
                    <a
                      href="/admin/dashboard/orders/"
                      className={`t group relative flex justify-center rounded px-2 py-1.5 ${
                        isCurrentURL("orders")
                          ? "bg-blue-50 text-blue-700"
                          : "text-gray-500 bg-gray-50 hover:text-gray-700"
                      }`}
                    >
                      <DocumentCheckIcon className="w-5 h-5" />
                      <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                        Orders
                      </span>
                    </a>
                  </div>

                  <ul className="space-y-1 border-t border-gray-100 pt-4">
                    <li>
                      <a
                        href="/admin/dashboard/cars/"
                        className={`group relative flex justify-center rounded px-2 py-1.5 ${
                          isCurrentURL("cars")
                            ? "text-blue-700 bg-blue-50"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        <TruckIcon className="w-5 h-5 opacity-75" />

                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                          Cars
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href=""
                        className="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                      >
                        <CreditCardIcon className="w-5 h-5 opacity-75" />

                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                          Billing
                        </span>
                      </a>
                    </li>

                    <li>
                      <a
                        href="/admin/dashboard/account/"
                        className={`group relative flex justify-center rounded px-2 py-1.5 ${
                          isCurrentURL("account")
                            ? "text-blue-700 bg-blue-50"
                            : "text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                        }`}
                      >
                        <UserIcon className="w-5 h-5 opacity-75" />
                        <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                          Account
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
              <form onSubmit={signout}>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <ArrowTopRightOnSquareIcon className="w-5 h-5 opacity-75" />

                  <span className="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    Logout
                  </span>
                </button>
              </form>
            </div>
          </div>

          <div className="h-screen w-full pt-6 px-6">
            <Outlet />
          </div>
        </div>
      );
    }
  }
}
