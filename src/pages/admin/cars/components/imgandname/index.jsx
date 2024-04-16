import React from "react";

export default function Imgandname(props) {
  return (
    <>
      <div className="flex items-center">
        <div className="flex-shrink-0 h-10 w-14">
          <img
            className="h-10 w-14 rounded-sm"
            src={props.imgUrl}
            alt={props.name + " image"}
          />
        </div>
        <div className="ml-2">
          <div className="text-lg">{props.name}</div>
        </div>
      </div>
    </>
  );
}
