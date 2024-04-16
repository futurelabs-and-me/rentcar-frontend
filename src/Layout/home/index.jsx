import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Outlet, useNavigate } from "react-router-dom";
import av from "../../assets/images/user";

function isCurrentURL(url) {
  const urlOB = new URL(window.location.href);
  if (urlOB.pathname === url) {
    return true;
  } else {
    return false;
  }
}

const navigation = [
  { name: "Home", href: "/", current: isCurrentURL("/") },
  { name: "My Order", href: "/orders", current: isCurrentURL("/orders") },
];

const userNavigation = [
  { name: "Your Profile", href: "/profile" },
  {
    name: "Sign out",
    fun: () => {
      axios
        .get("http://localhost:5000/auth/logout", {
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.message === "Successful") {
            window.location.reload();
          }
        })
        .catch((err) => {
          throw err;
        });
    },
  },
];

const login_navigation = [
  { name: "Login", href: "/login" },
  { name: "Signup", href: "/signup" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home_layout() {
  const [user, setUser] = useState(undefined);
  const Navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/user", {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <h1 className="font-sans text-xl font-medium text-white">
                      Rent A Car Now
                    </h1>
                  </div>

                  <div className="hidden md:block">
                    <div className="ml-4 mr-4 flex items-center justify-between md:ml-6 ">
                      <div className=" relative flex items-baseline space-x-3">
                        {navigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-900 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                              "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>

                      <button
                        type="button"
                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                      >
                        <span className="absolute -inset-1.5" />
                      </button>

                      {user && (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button
                              className={
                                isCurrentURL("/profile")
                                  ? "relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm outline-none ring-2 ring-white ring-offset-2 ring-offset-gray-800"
                                  : "relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                              }
                            >
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={user?.image ? user?.image : av}
                                alt="profile pic"
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      onClick={item.fun}
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "block px-4 py-2 text-sm text-gray-700"
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      )}
                      {!user && (
                        <div className="ml-3 inline-flex rounded-md  shadow-sm">
                          {login_navigation.map((item) => (
                            <button
                              key={item.name}
                              type="button"
                              onClick={() => {
                                Navigate(item.href);
                              }}
                              className="-ml-px inline-flex items-center justify-center gap-2 border border-gray-700 px-3 py-2 align-middle text-sm font-medium  text-gray-400  transition-all    first:ml-0 first:rounded-l-lg last:rounded-r-lg hover:bg-gray-700  hover:text-white focus:z-10"
                            >
                              {item.name}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user?.image ? user?.image : av}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">View notifications</span>
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 px-2">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <main>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}
