"use client"
import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage'; // Asumimos que tendrás una función de utilidad para obtener la imagen recortada
import 'cropperjs/dist/cropper.css';

const ImageCropper = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleFileChange = (e) => {
    console.log(e.target.files?.[0]);
    
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = useCallback(async () => {
    try {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);

      // Aquí puedes realizar cualquier acción adicional con el nuevo archivo,
      // por ejemplo, actualizar el estado del input file
      const newFile = new File([croppedImg], 'cropped-image.jpg', { type: 'image/jpeg' });
      // Actualiza el estado o maneja el archivo recortado como necesites
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels]);

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      {imageSrc && (
        <div>
          <div style={{ position: 'relative', width: '100%', height: 400 }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
          <button onClick={handleCrop}>Recortar Imagen</button>
        </div>
      )}
      {croppedImage && (
        <div>
          <h3>Imagen Recortada:</h3>
          <img src={croppedImage} alt="Cropped" />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
