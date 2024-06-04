import axios from "axios";
import { ProductsCards } from "../components/ProductsCards/ProductsCards";
import { getProducts } from "../actions/apiProducts";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  details: string;
  image: string;
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return (
    <section className="">
      <h1 className="text-xl">Todas nuestras carteras</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-3 my-5">
        <ProductsCards products={products} />
      </div>
    </section>
  );
}
