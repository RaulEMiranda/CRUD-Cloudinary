"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  details: string;
  image: string;
}

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [productDetails, setProductDetails] = useState<string[]>([]);

  useEffect(() => {
    try {
      const details = JSON.parse(product.details);
      setProductDetails(details);
    } catch (error) {
      console.error("Failed to parse product details:", error);
    }
  }, []);

  return (
    <div className="grid grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-7">
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        className="md:w-[700px]"
        priority
      />
      <article className="relative w-[100%]">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
        <p>Color: {product.color}</p>
        <input
          id="details"
          type="checkbox"
          //onClick={() => setIsOpen(!isOpen)}
          className="peer hidden"
        />
        <label
          htmlFor="details"
          className="w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
        >
          Detalles{" "}
        </label>

        <div
          className={`w-full bg-white overflow-hidden h-0 transition-all duration-500 ease-linear peer-checked:h-[150px]`}
        >
          <div className="px-4 pt-4 pb-2 text-sm text-gray-500">
            <ul style={{ paddingLeft: "1.25rem", listStyleType: "disc" }}>
              {productDetails.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </div>

      </article>
    </div>
  );
};
