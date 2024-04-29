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

export const getUsers = async () => {
  let res = await fetch("/api/user/list", {
    method: "GET",
  });
  const data = await res.json();
  if (data.success) {
    return data.data;
  } else {
    return null;
  }
};

export const updateUser = async (user: any) => {
  const response = await fetch(`/api/user`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (data.success) {
    return data.data;
  }
  return null;
};
