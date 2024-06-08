import React, { forwardRef, useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import MapPicker from "react-google-map-picker";
import { useEdgeStore } from "../../../../../lib/edgestore";
import { MultiImageDropzone } from "./components/MultiImageDropzone";

const Addcars = forwardRef((props, ref) => {
  const [fileStates, setFileStates] = useState([]);
  const [fileRes, setfileRes] = useState();

  const DefaultLocation = { lat: 10, lng: 106 };
  const DefaultZoom = 10;

  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);

  const [location, setLocation] = useState(defaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  const [fueltype, setFueltype] = useState();

  const { edgestore } = useEdgeStore();

  function updateFileProgress(key, progress) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setDefaultLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("car_name"),
      amount: formData.get("Price"),
      mileage: formData.get("mileage"),
      size: formData.get("Size"),
      fueltype: fueltype,
      location: location,
      images: fileRes,
    };
    console.log(data);
  }

  return (
    <dialog
      onClick={(event) => {
        if (event.target === ref.current) {
          ref.current.close();
        }
      }}
      className="transform rounded-lg shadow-xl transition-all sm:w-full sm:max-w-7xl"
      ref={ref}
    >
      <button
        className="absolute right-2 top-2 z-10 rounded-full bg-gray-100 p-0.5 focus:bg-gray-200"
        onClick={() => ref.current.close()}
      >
        <XMarkIcon className="h-4 text-gray-600" />
      </button>
      <div className="flex items-center justify-start ml-7 pb-2 pt-6">
        <h2 className="mt-1 text-2xl font-medium">Add Your Car</h2>
      </div>
      <div className="grid grid-cols-2 pb-9 h-full px-5 gap-4">
        <MultiImageDropzone
          value={fileStates}
          dropzoneOptions={{
            maxFiles: 6,
          }}
          onChange={(files) => {
            setFileStates(files);
          }}
          onFilesAdded={async (addedFiles) => {
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
              addedFiles.map(async (addedFileState) => {
                try {
                  const res = await edgestore.publicFiles.upload({
                    input: {
                      type: "cars",
                    },
                    options: {
                      temporary: true,
                    },
                    file: addedFileState.file,
                    onProgressChange: async (progress) => {
                      updateFileProgress(addedFileState.key, progress);
                      if (progress === 100) {
                        await new Promise((resolve) =>
                          setTimeout(resolve, 1000)
                        );
                        updateFileProgress(addedFileState.key, "COMPLETE");
                      }
                    },
                  });
                  setfileRes([...fileRes, res.url]);
                } catch (err) {
                  updateFileProgress(addedFileState.key, "ERROR");
                }
              })
            );
          }}
        />

        <form
          onSubmit={onSubmit}
          className="mt-3 grid grid-cols-6 gap-y-2 gap-6"
        >
          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor="CarName"
              className=" text-sm font-medium text-gray-700"
            >
              Name
            </label>

            <input
              type="text"
              id="CarName"
              name="car_name"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label className="block text-sm font-medium text-gray-700">
              Fueltype
            </label>

            <fieldset className="flex flex-wrap gap-2">
              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="Diesel"
                  id="Diesel"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="Diesel"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">Diesel</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="Petrol"
                  id="Petrol"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="Petrol"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">Petrol</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="Electric"
                  id="Electric"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="Electric"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">Electric</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="hybrid"
                  id="hybrid"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="hybrid"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">hybrid</p>
                </label>
              </div>
            </fieldset>
          </div>

          <div className="col-span-3">
            <label
              htmlFor="mileage"
              className="block text-sm font-medium text-gray-700"
            >
              mileage
            </label>

            <input
              type="number"
              id="mileage"
              name="mileage"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>

            <input
              type="number"
              id="Price"
              name="Price"
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label
              htmlFor="Size"
              className="block text-sm font-medium text-gray-700"
            >
              Seats
            </label>
            <fieldset className="flex flex-wrap gap-2">
              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="Diesel"
                  id="Diesel"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="Diesel"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">Diesel</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="Petrol"
                  id="Petrol"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="Petrol"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">Petrol</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="Electric"
                  id="Electric"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="Electric"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">Electric</p>
                </label>
              </div>

              <div>
                <input
                  type="radio"
                  name="Fueltype"
                  value="hybrid"
                  id="hybrid"
                  onClick={(e) => setFueltype(e.target.value)}
                  className="peer hidden"
                />

                <label
                  htmlFor="hybrid"
                  className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-blue-500 peer-checked:bg-blue-500 peer-checked:text-white"
                >
                  <p className="text-sm font-medium">hybrid</p>
                </label>
              </div>
            </fieldset>
          </div>

          {/* <MapPicker
            defaultLocation={defaultLocation}
            zoom={zoom}
            mapTypeId="roadmap"
            style={{ height: "700px" }}
            onChangeLocation={handleChangeLocation}
            onChangeZoom={handleChangeZoom}
            apiKey="AIzaSyD7y48-Ir_HKE43kMn_5DGf28FpJ8vRf-s"
          /> */}

          <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
            <button
              type="sumbit"
              className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
});

export default Addcars;
