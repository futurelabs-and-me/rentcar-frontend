import React from "react";

function Table({ children, className }) {
  return (
    <table
      className={`min-w-full divide-y-2 divide-gray-200 bg-white text-sm ${
        className ? className : ""
      }`}
    >
      {children}
    </table>
  );
}

function Head({ children, className }) {
  return (
    <thead
      className={`ltr:text-left rtl:text-right ${className ? className : ""}`}
    >
      {children}
    </thead>
  );
}

function tr({ children, className }) {
  return (
    <tr className={`divide-x divide-gray-200 ${className}`}>{children}</tr>
  );
}

function th({ children, className }) {
  return (
    <th
      className={`text-left whitespace-nowrap px-4 py-2 font-medium text-gray-900 ${
        className ? className : ""
      }`}
    >
      {children}
    </th>
  );
}

function Body({ children, className }) {
  return (
    <tbody className={`divide-y divide-gray-200 ${className ? className : ""}`}>
      {children}
    </tbody>
  );
}

function td({ children, className }) {
  return (
    <td className={`px-4 py-2 ${className ? className : ""}`}>{children}</td>
  );
}

function ButtonA({ children, className, href }) {
  return (
    <a
      href={href ? href : "#"}
      className={`inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700 ${
        className ? className : ""
      }`}
    >
      {children}
    </a>
  );
}

function Button({ children, className, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex justify-center align-middle rounded bg-indigo-600 px-3 py-2 text-xs font-medium text-white hover:bg-indigo-700 ${
        className ? className : ""
      }`}
    >
      {children}
    </button>
  );
}

export default Object.assign(Table, {
  Head,
  tr,
  th,
  Body,
  td,
  ButtonA,
  Button,
});
