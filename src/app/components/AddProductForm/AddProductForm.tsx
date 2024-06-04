"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import ImageCroppie from "./ImageCroppie";

interface FormData {
  name: string;
  description: string;
  price: string;
  color: string;
  productImage: FileList | null;
  details: {
    id: number;
    value: string;
  }[];
}

const AddProductForm: React.FC = () => {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      color: "",
      details: [{ id: 1, value: "" }],
    },
  });
  const [file, setFile] = useState<File[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cars, setCars] = useState([]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "details",
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(file);

    setLoading(true);
    setSuccess(false);
    const formData = new FormData();
    formData.append("name", data.name.replace(/\s+/g, " ").trim());
    formData.append("price", data.price);
    formData.append(
      "description",
      data.description.replace(/\s+/g, " ").trim()
    );
    formData.append("color", data.color.replace(/\s+/g, " ").trim());
    if (file) {
      if (file.length > 0) {
        file.forEach((image, index) => {
          formData.append(`image${index + 1}`, image);
        });
      }
    }

    const allDetails: string[] = [];
    data.details.map((details) => {
      allDetails.push(details.value.replace(/\s+/g, " ").trim());
    });
    formData.append("details", JSON.stringify(allDetails));
    try {
      await axios.post("http://localhost:3000/api/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(formData.get("image1"));
      
    } catch (error) {
      console.log(error);
    } finally {
      setSuccess(true);
      setTimeout(() => {
        reset();
        setFile(null);
        setCars([]);
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md"
    >
      {loading && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-3xl py-20 px-32 flex flex-col items-center gap-4">
            {success ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-20 w-20 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p>Producto guardado con éxito</p>
              </>
            ) : (
              <>
                <div className="w-20 h-20 border-4 border-t-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                <p>Guardando producto...</p>
              </>
            )}
          </div>
        </div>
      )}
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
      <label
        htmlFor="color"
        className="block text-sm font-medium text-gray-700"
      >
        Detalles
      </label>
      {fields.map((field, index) => (
        <div key={field.id} className="mb-4 mt-1">
          <input
            {...register(`details.${index}.value`)}
            placeholder={`Detalle ${index + 1}`}
            className="border rounded px-3 py-2 w-full"
          />
          {index > 0 && (
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-gray-100 px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-lg mt-3"
            >
              Quitar detalle
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ id: fields.length + 1, value: "" })}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 mb-4 mx-auto"
      >
        Agregar otro detalle
      </button>
      <ImageCroppie
        register={register}
        setFile={setFile}
        cars={cars}
        setCars={setCars}
        errors={errors}
        file={file}
      />
      <div className="flex justify-center">
        <input
          type="submit"
          value="Agregar Producto"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 cursor-pointer "
        />
      </div>
    </form>
  );
};

export default AddProductForm;
