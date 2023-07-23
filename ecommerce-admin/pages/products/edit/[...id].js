import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductForm from "@/components/ProductForm";

export default function EditProductPage() {
  const [productInfo, setProductInfo] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) {
      return;
    }
    fetch(`/api/products?id=${id}`)
      .then((response) => response.json())
      .then((data) => setProductInfo(data));
  }, [id]);

  return (
    <Layout>
        <h1>Edit Product</h1>
        {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
