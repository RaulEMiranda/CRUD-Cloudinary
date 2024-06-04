"use client";

import React, { useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImgUrl, getCroppedImgFile } from "./cropImage";

const aspectRatios = { value: 1 / 1, text: "1/1" };

const ImageCropDialog = ({
  id,
  imageUrl,
  cropInit,
  zoomInit,
  aspectInit,
  onCancel,
  setCroppedImageFor,
  resetImage,
  file,
  setFile,
}) => {
  if (zoomInit == null) {
    zoomInit = 2;
  }
  if (cropInit == null) {
    cropInit = { x: 0, y: 0 };
  }
  if (aspectInit == null) {
    aspectInit = aspectRatios;
  }
  const [zoom, setZoom] = useState(zoomInit);
  const [crop, setCrop] = useState(cropInit);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const onCrop = async (e) => {
    e.preventDefault();

    const croppedImageUrl = await getCroppedImgUrl(imageUrl, croppedAreaPixels);
    const croppedImageFile = await getCroppedImgFile(
      imageUrl,
      croppedAreaPixels
    );
    setCroppedImageFor(id, crop, zoom, aspectInit, croppedImageUrl);

    const updatedFiles = file.map((f, index) => 
      index === id-1 ? croppedImageFile : f
    );

    setFile(updatedFiles);
    console.log(croppedImageUrl, croppedImageFile);
  };

  const onResetImage = (e) => {
    e.preventDefault();
    resetImage(id);
  };

  return (
    <div>
      <div className="fixed inset-0 bg-black bg-opacity-30" onClick={onCancel}></div>
      <div className="fixed inset-0 h-80 w-80 md:h-[500px] md:w-[500px] container m-auto ">
        <Cropper
          image={imageUrl}
          zoom={zoom}
          crop={crop}
          aspect={1 / 1}
          onCropChange={onCropChange}
          onZoomChange={onZoomChange}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="fixed bottom-10 left-0 flex flex-col w-full items-center">
       
          <input
            type="range"
            min={1}
            max={3}
            step={0.01}
            value={zoom}
            onInput={(e) => {
              onZoomChange(e.target.value);
            }}
            className="w-56 md:w-96 bg-gray-200 rounded-full outline-none appearance-none h-3"
          ></input>
       
        <div className="mt-8 flex gap-3 bg-white px-12 py-3 rounded-md">
          <button onClick={onCancel} className="rounded-lg p-2 bg-rose-100 px-3 hover:bg-rose-200 active:scale-95">Cancelar</button>
          <button onClick={onResetImage} className="rounded-lg p-2 bg-rose-100 px-3 hover:bg-rose-200 active:scale-95">Reiniciar</button>
          <button onClick={onCrop} className="rounded-lg p-2 bg-rose-100 px-3 hover:bg-rose-200 active:scale-95">Recortar</button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropDialog;
