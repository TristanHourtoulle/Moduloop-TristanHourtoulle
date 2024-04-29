export const uploadFile = async (data: FormData) => {
  const response = await fetch("/api/upload", {
    method: "POST",
    body: data,
  });
  if (!response.ok) throw new Error(await response.text());
  return response.json();
};

export const uploadImageProduct = async (data: FormData) => {
  const response = await fetch("/api/upload/image/product", {
    method: "POST",
    body: data,
  });
  if (!response.ok) return false;
  return true;
};
