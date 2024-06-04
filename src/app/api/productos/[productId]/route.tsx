import db from "@/app/libs/db";
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

export async function GET(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const [product] = await db.query(`SELECT * FROM products WHERE  id = ?`, [
      params.productId,
    ]);

    const convertedProducts = (product as Product[]).map(
      (product: Product) => ({
        ...product,
        details: product.details ? JSON.parse(product.details) : null,
      })
    );

    const { createdAt, updatedAt, images, ...productWithoutTimestamps } =
      convertedProducts[0];

    return NextResponse.json(productWithoutTimestamps, {
      status: 200,
    });
  } catch (error) {
    console.log("Error en la consulta");

    return NextResponse.json("fallo la hacer la consulta", {
      status: 500,
    });
  }
}

export async function POST() {
  return NextResponse.json({
    message: "Hello World",
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const [result]: any = await db.query(`DELETE FROM products WHERE id =?`, [
      params.productId,
    ]);

    if (result.affectedRows === 0) {
      throw new Error("El producto no existe o ya ha sido eliminado");
    }

    return NextResponse.json(
      { success: true },
      {
        status: 200,
      }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Error al eliminar el producto" },
      {
        status: 500,
      }
    );
  }
}
