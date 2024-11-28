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
  let res = await fetch(`/api/product/${encodeURIComponent(id.toString())}`, {
    method: "GET",
  });
  const productData = await res.json();
  if (productData.success) {
    return productData.product;
  }
  return null;
};

export const deleteProductById = async (id: number) => {
  const response = await fetch(`/api/product/${id}`, {
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

export const addProductsInDatabase = async (data: any) => {
  console.log("Données envoyées à l'API :", data); // Log pour vérifier les données
  const response = await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // Assure-toi que data est un objet valide
  });

  if (response.ok) {
    return response.json();
  } else {
    throw new Error(await response.text()); // Lève une erreur si la requête échoue
  }
};
