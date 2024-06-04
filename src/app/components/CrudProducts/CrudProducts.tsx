"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  details: string[] | null;
  images: string[];
}

interface CrudProductsProps {
  products: Product[];
}

export const CrudProducts: React.FC<CrudProductsProps> = ({ products }) => {
  const router = useRouter();

  const handleDelete = async (id: number) => {
    const res = confirm("¿Estás seguro que quiero eliminar este producto?");

    if (res) {
      const response = await axios.delete(
        `http://localhost:3000/api/productos/${id}`
      );
      if (response.status === 200) {
        alert("Producto eliminado");
        window.location.reload();
      } else {
        alert("No se pudo eliminar el producto");
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Crud Products</h1>
      {products.map((product) => (
        <div key={product.id} className="border border-gray-300 p-4 mb-4">
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <p className="mb-2">{product.description}</p>
          <p className="mb-2">Price: ${product.price}</p>
          <p className="mb-2">Color: {product.color}</p>
          {product.details && product.details.length > 0 && (
            <div className="mb-2">
              <h3 className="font-bold mb-1">Detalles:</h3>
              <ul>
                {product.details.map((detail, index) => (
                  <li key={index} className="list-disc ml-4">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {product.images.length > 0 && (
            <div className="flex flex-wrap">
              {product.images.map((image, index) => (
                <div key={index} className="m-2">
                  <Image
                    width={120}
                    height={120}
                    src={image}
                    alt={`${product.name} image ${index + 1}`}
                    className="w-36 h-36 object-cover"
                    priority
                  />
                </div>
              ))}
            </div>
          )}
          <div className="mt-4">
            <Link
              href={`/crud/editar/${product.name}-${product.id}`}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
            >
              Editar
            </Link>
            <button
              className="bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleDelete(product.id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
