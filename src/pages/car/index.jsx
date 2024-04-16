import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { CalendarDaysIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";

export default function Car() {
  const [car, setCar] = useState();
  const [loding, setLoding] = useState(false);
  const [status, setStatus] = useState("");
  const { id } = useParams();
  const modelRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const priceRef = useRef();

  useEffect(() => {
    axios.get("http://localhost:5000/cars/" + id).then((res) => {
      setCar(res.data);
    });
  }, [id]);

  function inputChange(e) {
    if (e.target.value.length != 0) {
      e.target.attributes.removeNamedItem("placeholder");
    } else {
      e.target.setAttribute(
        "placeholder",
        e.target.attributes.oldplaceholder.value
      );
    }
  }

  function chackDate(callback) {
    const today = new Date();
    const startDate = new Date(startDateRef.current.value);
    const endDate = new Date(endDateRef.current.value);
    if (startDate < today) {
      startDateRef.current.focus();
      startDateRef.current.setCustomValidity("Enter a valid date");
    } else if (endDate < startDate) {
      endDateRef.current.focus();
      endDateRef.current.setCustomValidity(
        "End date must be greater than start date"
      );
    } else {
      callback(startDate, endDate);
    }
  }

  function orderNow(e) {
    e.preventDefault();
    chackDate((startDate, endDate) => {
      const data = {
        carId: id,
        startDate: startDate,
        endDate: endDate,
        price: priceRef.current.value,
      };
      setLoding(true);
      axios
        .post("http://localhost:5000/orders", data, {
          withCredentials: true,
        })
        .then((res) => {
          setLoding(false);
          switch (res.data.status) {
            case "success":
              modelRef.current.close();

              break;
            case "error":
              alert("Something went wrong");
              break;
            default:
              break;
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Something went wrong");
        });
    });
  }

  console.log(car);

  return (
    <div className="mt-10 grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8">
      <div className="aspect-h-3 aspect-w-2 overflow-hidden rounded-lg bg-gray-100 sm:col-span-4 lg:col-span-5">
        <img
          src={car && "http://localhost:5000" + car?.image.url}
          alt={car?.name}
          className="object-cover object-center"
        />
      </div>
      <div className="sm:col-span-8 lg:col-span-7">
        <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">
          {car?.name}
        </h2>

        <section aria-labelledby="information-heading" className="mt-2">
          <h3 id="information-heading" className="sr-only">
            Product information
          </h3>

          <p className="text-2xl text-gray-900">
            ₹{car?.amount}
            <span className="text-sm font-semibold">/Day</span>
          </p>
        </section>

        <section aria-labelledby="options-heading" className="mt-6">
          <div>
            <div className=" border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Fuel Type
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <span className="capitalize"> {car?.fueltype}</span>
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Mileage
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <span className="text-base font-semibold">
                      {car?.mileage}
                    </span>{" "}
                    kmpl
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Size
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <span className="text-base font-semibold">{car?.size}</span>{" "}
                    seats
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    {/* "" */}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {/* "" */}
                  </dd>
                </div>
                <div className=" py-6 ">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    About
                  </dt>
                  <dd className="mt-1"></dd>
                </div>
              </dl>
            </div>
          </div>

          <button
            type="button"
            onClick={() => modelRef.current.showModal()}
            className="mt-6 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Order now
          </button>
        </section>
      </div>
      {/* dialog */}
      <dialog
        onClick={(event) => {
          if (event.target === modelRef.current) {
            modelRef.current.close();
          }
        }}
        className="transform rounded-lg shadow-xl transition-all backdrop:bg-black/30 sm:w-full sm:max-w-2xl"
        ref={modelRef}
      >
        <button
          className="absolute right-2 top-2 z-10 rounded-full bg-gray-100 p-0.5 focus:bg-gray-200"
          onClick={() => modelRef.current.close()}
        >
          <XMarkIcon className="h-4 text-gray-600" />
        </button>

        <div className="flex flex-col items-center justify-center pb-5 pt-6">
          <CalendarDaysIcon className="h-12 text-indigo-600" />
          <h2 className="mt-1 text-xl font-medium">Place a Order</h2>
        </div>
        <hr className="m-auto w-11/12" />
        <form onSubmit={orderNow}>
          <div className="grid grid-cols-1 gap-y-3 bg-white px-4 pb-4 pt-2 sm:grid-cols-6 sm:p-6 sm:pb-4">
            <div className="sm:col-span-6">
              <label
                htmlFor="your_date"
                className="ml-1 block text-sm font-medium leading-6 text-gray-900"
              >
                Your Date
              </label>
              <div className="mt-2 grid w-full grid-cols-7 gap-1">
                <input
                  type="date"
                  ref={startDateRef}
                  onBlur={inputChange}
                  placeholder="Start Date"
                  oldplaceholder="Start Date"
                  required
                  className="col-span-3 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <span className="relative col-span-1 flex items-center justify-center">
                  <span className="absolute top-[6px] z-10 bg-inherit bg-white px-1 font-semibold uppercase text-gray-400">
                    to
                  </span>
                  <div className="w-full border-t border-gray-300"></div>
                </span>
                <input
                  type="date"
                  ref={endDateRef}
                  onBlur={inputChange}
                  placeholder="End Date"
                  oldplaceholder="End Date"
                  required
                  className="col-span-3 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="your_price"
                className="ml-1 block text-sm font-medium leading-6 text-gray-900"
              >
                Your Price
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  ref={priceRef}
                  name="your_price"
                  placeholder="Price"
                  required
                  className="w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="px-4 py-3 pb-4 sm:flex  sm:px-6">
            <button
              type="submit"
              className="focus:ring-indigo w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              {loding ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    class="inline w-5 h-5 animate-spin text-gray-600/60  fill-gray-300"
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
                  <span class="sr-only">Loading...</span>
                </div>
              ) : (
                "Confirm"
              )}
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
