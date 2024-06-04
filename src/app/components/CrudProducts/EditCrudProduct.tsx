"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  color: string;
  details: string[] | null;
}

interface EditProductFormProps {
  product: Product;
}

export const EditCrudProduct = ({ product }: { product: Product }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [details, setDetails] = useState<string[]>(product.details || []);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Product>({ defaultValues: product });

  const addDetail = () => {
    setDetails([...details, ""]);
  };

  const removeDetail = (index: number) => {
    const newDetails = details.filter((_, i) => i !== index);
    setDetails(newDetails);
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const onSubmit: SubmitHandler<Product> = async (data) => {
    const res = await axios.put("http://localhost:3000/api/productos", {
      id: product.id,
      name: data.name,
      description: data.description,
      price: data.price,
      color: data.color,
      details: details,
    });
    console.log(res);
    
  };

  return (
    <div className="w-[500px] mx-auto bg-white p-6 rounded-md shadow-md">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="name"
            {...register("name", { required: "El nombre es requerido" })}
            className="border rounded px-3 py-2 w-full mt-1"
            autoFocus
          />
          {errors.name && (
            <span className="text-red-500 text-xs">{errors.name.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Descripción
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "La descripción es requerida",
            })}
            className="border rounded px-3 py-2 w-full mt-1 resize-none"
            rows={4}
          />
          {errors.description && (
            <span className="text-red-500 text-xs">
              {errors.description.message}
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Precio
          </label>
          <input
            id="price"
            type="text"
            {...register("price", {
              required: "El precio es requerido",
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "El precio debe contener solo números",
              },
            })}
            className="border rounded px-3 py-2 w-full mt-1"
          />
          {errors.price && (
            <span className="text-red-500 text-xs">{errors.price.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Color
          </label>
          <input
            id="color"
            {...register("color", { required: "El color es requerido" })}
            className="border rounded px-3 py-2 w-full mt-1"
          />
          {errors.color && (
            <span className="text-red-500 text-xs">{errors.color.message}</span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="color"
            className="block text-sm font-medium text-gray-700"
          >
            Detalles
          </label>
          {details.length > 0 ? (
            details.map((detail, index) => (
              <div key={index} className="mb-4 mt-1">
                <input
                  id={`details.${index}`}
                  {...register(`details.${index}`)}
                  placeholder={`Detalle ${index + 1}`}
                  className="border rounded px-3 py-2 w-full"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                />
             
                  <button
                    type="button"
                    className="text-gray-100 px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg mt-3"
                    onClick={() => removeDetail(index)}
                  >
                    Quitar detalle
                  </button>
                
              </div>
            ))
          ) : (
            <button
              type="button"
              className="text-gray-100 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg mt-3"
              onClick={addDetail}
            >
              Agregar detalle
            </button>
          )}
          {details.length > 0 && (
            <button
              type="button"
              className="text-gray-100 px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-lg mt-3"
              onClick={addDetail}
            >
              Agregar otro detalle
            </button>
          )}
        </div>

        <div className="flex justify-center">
          <input
            type="submit"
            value="Actualizar producto"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 cursor-pointer "
          />
        </div>
      </form>
    </div>
  );
};
