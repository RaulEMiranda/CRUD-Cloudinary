import { getProducts } from "@/app/actions/apiProducts";
import { CrudProducts } from "@/app/components/CrudProducts/CrudProducts";
import { ProductsCards } from "@/app/components/ProductsCards/ProductsCards";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  color: string;
  details: string[] | null;
  images: string[];
}

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return <div>
    <CrudProducts products={products}/>
  </div>
}
