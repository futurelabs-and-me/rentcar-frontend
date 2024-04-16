import React, { useState, useEffect } from "react";
import axios from "axios";
import Product_card from "./components/product_card";

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/cars").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        {
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Product_card
                key={product._id}
                name={product.name}
                price={product.amount}
                href={"/car/" + product._id}
                color={product.color}
                imageSrc={"http://localhost:5000" + product.image.url}
                imageAlt={product.name + " image"}
              />
            ))}
          </div>
        }
      </div>
    </div>
  );
}
