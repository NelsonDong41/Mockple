import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DeleteProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [productInfo, setProductInfo] = useState();
  useEffect(() => {
    if (!id) return;
    fetch("/api/products?id=" + id)
      .then((response) => response.json())
      .then((data) => {
        setProductInfo(data);
      });
  }, [id]);
  function goBack() {
    router.push("/products");
  }
  function deleteProduct() {
    fetch(`/api/products?id=${id}`, {
        method:'DELETE',
        headers: {
          'Content-Type':'application/json',
        }
    });
    goBack();
  }

  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete &nbsp;"{productInfo?.title}"
      </h1>
      <div className="flex gap-2 justify-center">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </Layout>
  );
}
