"use client";
import Image from "next/image";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import ImageCropDialog from "./ImageCropDialog";

interface DetailsFieldsProps {
  register: UseFormRegister<any>;
  setFile: React.Dispatch<React.SetStateAction<File[] | null>>;
  errors: any;
  cars: any;
  setCars: any;
  file: File[] | null;
}

const ImageCroppie: React.FC<DetailsFieldsProps> = ({
  register,
  setFile,
  errors,
  cars,
  setCars,
  file
}) => {
  const [selectedCar, setSelectedCar] = useState(null);

  const onCancel = (e) => {
    e.preventDefault();
    setSelectedCar(null);
  };

  const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
    const updatedCars = cars.map((car) => {
      if (car.id === id) {
        return { ...car, croppedImageUrl, crop, zoom, aspect };
      } else {
        return car;
      }
    });
    setCars(updatedCars);
    setSelectedCar(null);
  };

  const resetImage = (id) => {
    setCroppedImageFor(id, null, null, null, null);
  };

  const handleFileChange = (e) => {
    const fileList = e.target.files;

    if (fileList.length > 0) {
      setFile(null);
      setCars([]);
      setFile(Array.from(fileList));
      const newCars = Array.from(fileList).map((file, index) => {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result;
          const newCar = {
            id: index + 1,
            imageUrl,
            croppedImageUrl: null,
          };
          setCars((prevCars) => [...prevCars, newCar]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div>
      <label htmlFor="productImage" className="self-start my-2">
        Imágen o imágenes del producto:
      </label>
      <input
        {...register("productImage", {required: true})}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        placeholder="Imagen del producto"
        id="productImage"
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-gray-600 my-4"
      />
      {errors.productImage && (
        <p className="text-red-500 text-xs mb-4">
          Debe seleccionar al menos una imagen del producto
        </p>
      )}
      {selectedCar ? (
        <ImageCropDialog
          id={selectedCar.id}
          imageUrl={selectedCar.imageUrl}
          cropInit={selectedCar.crop}
          zoomInit={selectedCar.zoom}
          aspectInit={selectedCar.aspect}
          onCancel={onCancel}
          setCroppedImageFor={setCroppedImageFor}
          resetImage={resetImage}
          setFile={setFile}
          file={file}
        />
      ) : null}
      {cars.map((car) => (
        <div className="flex justify-center my-4 gap-5" key={car.id}>
          <img
            className="w-[200px]"
            src={car.croppedImageUrl ? car.croppedImageUrl : car.imageUrl}
            alt="image"
            onClick={() => {
              setSelectedCar(car);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCroppie;
