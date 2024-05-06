import { login } from "@lib/session";
import { unstable_noStore as noStore } from "next/cache";

export const dynamic = "force-dynamic";

export const getUserById = async (id: number) => {
  const response = await fetch(`/api/user/${encodeURIComponent(id)}`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.success) {
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
  noStore();
  const { signal } = new AbortController();
  let res = await fetch("/api/user/list", {
    signal,
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

export const createUser = async (user: any) => {
  const response = await fetch("/api/user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  const data = await response.json();
  if (data.success) {
    login(data.data);
    return data.data;
  }
  return null;
};

export const loginUser = async (email: string, password: string) => {
  const url = `/api/user?email=${encodeURIComponent(
    email
  )}&password=${encodeURIComponent(password)}`;
  const response = await fetch(url, {
    method: "GET",
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
