import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  details: string;
  image: string;
}

interface ProductsCardsProps {
  products: Product[];
}

export const ProductsCards: React.FC<ProductsCardsProps> = ({ products }) => {
  return (
    <>
      {products.map((product) => (
        <Link
          href={`/productos/${product.name}`}
          key={product.id}
          className="flex flex-col bg-[#A8E6CF]  border-2 border-black animate-opacity cursor-pointer"
        >
          <Image
            alt={product.name}
            src={product.image}
            width={400}
            height={400}
            className="self-center "
          />
          <article className="flex flex-col gap-2 justify-center items-center mb-10 mt-5">
            <h2 className="text-md">{product.name}</h2>
            <p>S/{product.price}</p>
          </article>
        </Link>
      ))}
    </>
  );
};
