import React, { forwardRef, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const Deletecar = forwardRef((props, ref) => {
  const [fileStates, setFileStates] = useState([]);
  const [fileRes, setfileRes] = useState();
  let [searchParams, setSearchParams] = useSearchParams();

  function deleteCar(id) {
    axios
      .delete(`http://localhost:5000/admin/cars/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Successful") {
          searchParams.delete("del");
          setSearchParams(searchParams);
          ref.current.close();
        } else {
          alert("Something went wrong please try to delete again");
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  return (
    <dialog
      onClick={(event) => {
        if (event.target === ref.current) {
          searchParams.delete("del");
          setSearchParams(searchParams);
          ref.current.close();
        }
      }}
      className="transform rounded-lg shadow-xl transition-all sm:w-full sm:max-w-2xl"
      ref={ref}
    >
      <button
        className="absolute right-2 top-2 z-10 rounded-full bg-gray-100 p-0.5 focus:bg-gray-200"
        onClick={() => {
          searchParams.delete("del");
          setSearchParams(searchParams);
          ref.current.close();
        }}
      >
        <XMarkIcon className="h-4 text-gray-600" />
      </button>
      <div className="flex items-center text-center justify-center pb-2 pt-6">
        <h2 className="mt-1 text-2xl font-medium">
          Are you sure you want delete this car?
        </h2>
      </div>
      <div className="flex items-center text-center justify-end pb-6 pt-6">
        <div className="h-full px-5 flex space-x-2 mx-4">
          <button
            onClick={() => {
              searchParams.delete("del");
              setSearchParams(searchParams);
              ref.current.close();
            }}
            className="inline-flex w-16 items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={deleteCar}
            className="inline-flex w-16 items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default Deletecar;
