const getProducts = async () => {
  let res = await fetch(`/api/product/list`, {
    method: "GET",
  });
  const productsData = await res.json();
  if (productsData.success && productsData.data) {
    return productsData.data;
  }
  return null;
};
