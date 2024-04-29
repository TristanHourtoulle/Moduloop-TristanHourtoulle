export const getProducts = async () => {
  let res = await fetch(`/api/product/list`, {
    method: "GET",
  });
  const productsData = await res.json();
  if (productsData.success && productsData.data) {
    return productsData.data;
  }
  return null;
};

export const getProductById = async (id: number) => {
  let res = await fetch(
    `/api/product?id=${encodeURIComponent(id.toString())}`,
    {
      method: "GET",
    }
  );
  const productData = await res.json();
  if (productData.success) {
    return productData.product;
  }
  return null;
};

export const deleteProductById = async (id: number) => {
  const response = await fetch(`/api/product?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return true;
  } else {
    return false;
  }
};
