import React, { Component, createRef } from "react";
import axios from "axios";

export default class Email extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      massage: "",
    };

    this.num1 = createRef(null);
    this.num2 = createRef(null);
    this.num3 = createRef(null);
    this.num4 = createRef(null);
  }

  urlQ = new URL(window.location.href).searchParams;
  navigate = function (url) {
    window.location.href = url;
  };

  componentDidMount() {
    axios.defaults.withCredentials = true;
    axios.put("http://localhost:5000/verify/email").then((res) => {
      if (res.data.error) {
        if (res.data?.error === "not logged in") {
          this.navigate("/login");
        }
        throw new Error(res.data.error);
      }

      if (res.data?.status === "success" || res.data?.emailVerified) {
        if (this.urlQ.get("redirect")) {
          this.navigate(this.urlQ.get("redirect"));
        } else {
          this.navigate("/");
        }
      }
      this.setState({
        status: res.data?.status,
      });
    });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const otp =
      this.num1.current.value +
      this.num2.current.value +
      this.num3.current.value +
      this.num4.current.value;
    axios
      .post(
        "http://localhost:5000/verify/email",
        {
          otp: Number(otp),
        },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        if (res.data?.status === "success" || res.data?.emailVerified) {
          if (this.urlQ.get("redirect")) {
            this.navigate(this.urlQ.get("redirect"));
          } else {
            this.navigate("/");
          }
        }
        this.setState({
          status: res.data?.status,
          massage: res.data?.massage,
        });
      });
  };

  render() {
    const inputcss =
      "w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border  text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700";
    if (this.state.status !== "sent" || this.state.status !== "resent") {
      return (
        <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50">
          <div className="flex items-center min-h-screen py-12 bg-white mx-auto w-full max-w-3xl">
            <div className="relative bg-white px-6 pt-10 pb-9  mx-auto w-full max-w-lg ">
              <div role="status" className="flex justify-center items-center">
                <svg
                  aria-hidden="true"
                  className="w-12 h-12 text-gray-200 animate-spin fill-indigo-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50">
        <div className="flex items-center min-h-screen py-12 bg-white mx-auto w-full max-w-3xl">
          <div className="relative bg-white px-6 pt-10 pb-9  mx-auto w-full max-w-lg ">
            {(this.state.status === "sent" ||
              this.state.status === "resent") && (
              <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                <div className="flex flex-col items-center justify-center text-center space-y-2">
                  <div className="font-semibold text-3xl">
                    <p>Email Verification</p>
                  </div>
                  <div className="flex flex-row text-sm font-medium text-gray-400">
                    <p>We have sent a code to your email </p>
                  </div>
                </div>

                <div>
                  <form onSubmit={this.submitHandler}>
                    <div className="flex flex-col space-y-16">
                      <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                        <div className="w-16 h-16 ">
                          <input
                            className={
                              this.state?.massage === "OTP is wrong"
                                ? `${inputcss} border-red-500`
                                : `${inputcss} border-gray-200`
                            }
                            type="text"
                            ref={this.num1}
                            minLength="1"
                            maxLength="1"
                            required
                            name=""
                            id=""
                          />
                        </div>
                        <div className="w-16 h-16 ">
                          <input
                            className={
                              this.state?.massage === "OTP is wrong"
                                ? `${inputcss} border-red-500`
                                : `${inputcss} border-gray-200`
                            }
                            type="text"
                            ref={this.num2}
                            minLength="1"
                            maxLength="1"
                            required
                            name=""
                            id=""
                          />
                        </div>
                        <div className="w-16 h-16 ">
                          <input
                            className={
                              this.state?.massage === "OTP is wrong"
                                ? `${inputcss} border-red-500`
                                : `${inputcss} border-gray-200`
                            }
                            type="text"
                            ref={this.num3}
                            minLength="1"
                            maxLength="1"
                            required
                            name=""
                            id=""
                          />
                        </div>
                        <div className="w-16 h-16 ">
                          <input
                            className={
                              this.state?.massage === "OTP is wrong"
                                ? `${inputcss} border-red-500`
                                : `${inputcss} border-gray-200`
                            }
                            type="text"
                            ref={this.num4}
                            minLength="1"
                            maxLength="1"
                            required
                            name=""
                            id=""
                          />
                        </div>
                      </div>

                      {this.state?.massage === "OTP is wrong" && (
                        <div className="flex flex-col items-center justify-center text-center space-y-2">
                          <div className="font-semibold text-3xl">
                            <p>Wrong code </p>
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col space-y-5">
                        <div>
                          <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Verify Email
                          </button>
                        </div>

                        <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                          <p>Didn't recieve code?</p>{" "}
                          <a
                            className="flex flex-row items-center text-blue-600"
                            href="http://"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Resend
                          </a>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
