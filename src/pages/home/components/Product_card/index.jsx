import React from "react";
import PropTypes from "prop-types";

function Product_card(props) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        <img
          src={props.imageSrc}
          alt={props.imageAlt}
          type="image/png"
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <a href={props.href}>
              <span aria-hidden="true" className="absolute inset-0" />
              {props.name}
            </a>
          </h3>
          <p className="mt-1 text-sm text-gray-500">{props.color}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">₹{props.price}/day</p>
      </div>
    </div>
  );
}

Product_card.propTypes = {
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  href: PropTypes.string,
  name: PropTypes.string,
  color: PropTypes.string,
  price: PropTypes.number,
};

export default Product_card;
