import React, { useEffect, useState, createRef } from "react";
import Table from "./components/table";
import Imgandname from "./components/imgandname";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Addcars from "./components/addcars";

export default function Cars() {
  const [cars, setCars] = useState({});

  const addcarboxRef = createRef();

  useEffect(() => {
    document.title = "Cars";
    axios
      .get("http://localhost:5000/admin/cars", { withCredentials: true })
      .then((res) => {
        setCars(res.data.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  function deleteCar(id) {
    /*
    axios
      .delete(`http://localhost:5000/admin/cars/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.message === "Successful") {
          window.location.reload();
        } else {
          alert("Something went wrong please try to delete again");
        }
      })
      .catch((err) => {
        throw err;
      });
      */
  }

  return (
    <>
      <div className="px-2 pb-4 sm:pb-4">
        <div className="sm:flex sm:items-center sm:justify-between">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Your cars
          </h1>
          <div>
            <button
              onClick={() => {
                addcarboxRef.current.showModal();
              }}
              className="block rounded-lg bg-indigo-600 px-4 py-2 text-md font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
            >
              Add Car
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border  border-gray-200">
        <Table>
          <Table.Head>
            <Table.tr>
              <Table.th>Name</Table.th>
              <Table.th>Amount</Table.th>
              <Table.th>mileage</Table.th>
              <Table.th>Size</Table.th>
              <Table.th>fueltype</Table.th>
              <Table.th>Status</Table.th>
              <Table.th className="w-14">Actions</Table.th>
            </Table.tr>
          </Table.Head>

          <Table.Body>
            {cars.length > 0 ? (
              cars?.map((car) => {
                return (
                  <Table.tr key={car._id}>
                    <Table.td>
                      <Imgandname
                        name={car.name}
                        imgUrl={"http://localhost:5000" + car.image.url}
                      />
                    </Table.td>
                    <Table.td>{car.amount}</Table.td>
                    <Table.td>{`${car.mileage} KM/lit`}</Table.td>
                    <Table.td>{car.size}</Table.td>
                    <Table.td>
                      {car.fueltype.charAt(0).toUpperCase() +
                        car.fueltype.slice(1)}
                    </Table.td>
                    <Table.td>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          car.ordered
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {car.ordered ? "Ordered" : "Not Ordered"}
                      </span>
                    </Table.td>
                    <Table.td className="flex space-x-1 justify-end">
                      <Table.Button
                        onClick={() => {
                          window.location.href = `/admin/dashboard/car/${car._id}`;
                        }}
                      >
                        View
                      </Table.Button>
                      <Table.Button onClick={() => {}}>
                        <PencilIcon className="w-4 h-4 mr-1" />
                        Edit
                      </Table.Button>
                      <Table.Button
                        className="bg-red-500 hover:bg-red-600 text-red-100"
                        onClick={deleteCar}
                      >
                        <TrashIcon className="w-4 h-4 mr-1" />
                        Delete
                      </Table.Button>
                    </Table.td>
                  </Table.tr>
                );
              })
            ) : (
              <Table.tr>
                <Table.td colSpan="7">No cars found</Table.td>
              </Table.tr>
            )}
          </Table.Body>
        </Table>
        <Addcars ref={addcarboxRef} />
      </div>
    </>
  );
}
