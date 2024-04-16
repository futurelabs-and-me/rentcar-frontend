import React, { Component, createRef } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      edit: false,
    };
  }

  modelRef = createRef();

  usernameRef = createRef();
  emailRef = createRef();
  phone_noRef = createRef();

  navgiateTo = (path) => {
    window.location.href = path;
  };

  editAccount = () => {
    if (this.state.edit) {
      const username = this.usernameRef.current.value;
      const email = this.emailRef.current.value;
      const phone_no = this.phone_noRef.current.value;
      const location = this.state.user.location;
      axios
        .put(
          "http://localhost:5000/user",
          { username, email, phone_no, location },
          { withCredentials: true },
        )
        .then((res) => {
          this.setState({ edit: false });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      this.setState({ edit: true });
    }
  };

  deleteAccount = () => {
    axios
      .delete("http://localhost:5000/user", { withCredentials: true })
      .then((res) => {
        if (res.data.message === "user deleted successfully") {
          this.navgiateTo("/profile");
        }
      });
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/user", {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.data) {
          this.navgiateTo("/");
        }
        this.setState({ user: res.data.data });
      })
      .catch((err) => {
        throw err;
      });
  }

  render() {
    const inputClass =
      "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
    return (
      <div>
        <div>
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Full name
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {this.state.edit ? (
                  <input
                    type="text"
                    className={inputClass}
                    ref={this.usernameRef}
                    defaultValue={this.state.user.username}
                  />
                ) : (
                  <span>{this.state.user.username}</span>
                )}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {this.state.edit ? (
                  <input
                    type="email"
                    className={inputClass}
                    ref={this.emailRef}
                    defaultValue={this.state.user.email}
                  />
                ) : (
                  <>
                    <span>{this.state.user.email}</span>
                    {!this.state.user.emailVerified && (
                      <button
                        type="button"
                        onClick={() => {
                          this.modelRef.current.close();
                        }}
                        className="ml-5 mt-3 inline-flex w-full justify-center rounded-md bg-inherit px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Verify email address
                      </button>
                    )}
                  </>
                )}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Phone number
              </dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                {this.state.edit ? (
                  <input
                    type="text"
                    className={inputClass}
                    ref={this.phone_noRef}
                    defaultValue={this.state.user.phone_no}
                  />
                ) : (
                  <>
                    <span>{this.state.user.phone_no}</span>
                    {!this.state.user.phone_noVerified && (
                      <button
                        type="button"
                        onClick={() => {
                          console.error("Not implemented");
                        }}
                        className="ml-5 mt-3 inline-flex w-full justify-center rounded-md bg-inherit px-3 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      >
                        Verify phone number
                      </button>
                    )}
                  </>
                )}
              </dd>
            </div>
            <div className="w-full px-4 py-6 ">
              <div className="flex flex-col justify-center gap-5 md:flex-row lg:flex-row">
                {this.state.edit ? (
                  <button
                    type="button"
                    onClick={this.editAccount}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={this.editAccount}
                    className="inline-flex items-center rounded-md bg-white px-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    <PencilIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit
                  </button>
                )}

                {this.state.edit && (
                  <button
                    type="button"
                    onClick={() => {
                      this.setState({ edit: false });
                    }}
                    className="inline-flex items-center rounded-md bg-white px-10 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                )}
                {!this.state.edit && (
                  <button
                    type="button"
                    onClick={() => {
                      this.modelRef.current.showModal();
                    }}
                    className="inline-flex items-center rounded-md bg-red-600 px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                  >
                    <TrashIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5"
                      aria-hidden="true"
                    />
                    Delete
                  </button>
                )}
              </div>
            </div>
          </dl>
        </div>
        <dialog
          className="transform overflow-hidden rounded-lg shadow-xl transition-all"
          ref={this.modelRef}
        >
          <div className="relative text-left  sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg
                    className="h-6 w-6 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3
                    className="text-base font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    Deactivate account
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to deactivate your account? All of
                      your data will be permanently removed. This action cannot
                      be undone.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={this.deleteAccount}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Deactivate
              </button>
              <button
                type="button"
                onClick={() => {
                  this.modelRef.current.close();
                }}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    );
  }
}
