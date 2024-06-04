import cloudinary from "@/app/libs/cloudinary";
import db from "@/app/libs/db";
import processImage from "@/app/libs/processImage";
import { unlink } from "fs/promises";
import { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  color: string;
  details: string | null;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export async function GET() {
  try {
    const [products] = await db.query("SELECT * FROM products");

    const convertedProducts = (products as Product[]).map(
      (product: Product) => ({
        ...product,
        details: product.details ? JSON.parse(product.details) : null,
      })
    );

    return NextResponse.json(convertedProducts, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json("Error en la consulta SQL", {
      status: 405,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const productData: { [key: string]: any } = {};
    const imageFiles: File[] = [];
    const imageUrls: string[] = [];

    // Iterar sobre los datos del formulario
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("image") && value instanceof File) {
        imageFiles.push(value);
      } else {
        productData[key] = value;
      }
    }

    // Verificar si se recibieron imágenes
    if (imageFiles.length === 0) {
      return NextResponse.json(
        {
          message: "At least one image is required",
        },
        {
          status: 400,
        }
      );
    }

    // Procesar y subir cada imagen
    for (const imageFile of imageFiles) {
      const filepath = await processImage(imageFile);
      const uploadResult = await cloudinary.uploader.upload(filepath);

      if (uploadResult) {
        await unlink(filepath);
        imageUrls.push(uploadResult.secure_url);
      }
    }

    productData.images = JSON.stringify(imageUrls);
    console.log(productData);

    const [productAdded] = await db.query<ResultSetHeader>(
      "INSERT INTO products SET ?",
      productData
    );

    return NextResponse.json(
      { ...productData, id: productAdded.insertId },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error en la consulta SQL", error },
      {
        status: 405,
      }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    const [response]: any = await db.query(
      "UPDATE products SET ? WHERE id = ?",
      [
        {
          name: data.name,
          description: data.description,
          price: data.price,
          color: data.color,
          details: JSON.stringify(data.details),
        },
        data.id,
      ]
    );

    if (response.affectedRows > 0) {
      return NextResponse.json(
        {
          message: "Producto actualizado con exito",
        },
        {
          status: 200,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Product not found",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
