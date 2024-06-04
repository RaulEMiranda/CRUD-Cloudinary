import axios from "axios";

export async function getProducts() {
  const products = await axios.get("http://localhost:3000/api/productos");
  return products.data;
}

export async function getProduct(id: string) {  
  const product = await axios.get(`http://localhost:3000/api/productos/${id}`)
  return product.data;
}