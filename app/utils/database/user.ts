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

export const requiredUser = async (id: number) => {
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  if (user.role !== "user" && user.role !== "admin") {
    return false;
  }
  return true;
};

export const requiredAdmin = async (id: number) => {
  const user = await getUserById(id);
  if (!user) {
    return false;
  }
  if (user.role !== "admin") {
    return false;
  }
  return true;
};
