import { getProduct } from "@/app/actions/apiProducts";
import { EditCrudProduct } from "@/app/components/CrudProducts/EditCrudProduct";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  color: string;
  details: string[];

}

export default async function EditProduct({
  params,
}: {
  params: {
    productName: string;
  };
}) {
  const id = params.productName.split("-")[1];

  const product: Product = await getProduct(id);

  return (
    <div className="flex flex-col items-center">
      <h1>Edita el producto</h1>
      <EditCrudProduct product={product} />
    </div>
  );
}
