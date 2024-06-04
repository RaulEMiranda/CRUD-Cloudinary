import { ProductInfo } from "@/app/components/ProductInfo/ProductInfo";
import axios from "axios";

async function getProduct(url: string) {
  const product = await axios.get(`http://localhost:3000/api/productos/${url}`);
  return product.data;
}

interface Params {
  params: {
    productName: string;
  };
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  details: string;
  image: string;
}

export default async function ProductPage({ params }: Params) {
  const product: Product[] = await getProduct(params.productName);

  return (
    <section>
      <ProductInfo product={product[0]}/>
    </section>
  );
}
