export const getUserById = async (id: number) => {
  const response = await fetch(`/api/user/admin?id=${encodeURIComponent(id)}`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.success && data.data.role === "admin") {
    return data.data;
  } else {
    return null;
  }
};
