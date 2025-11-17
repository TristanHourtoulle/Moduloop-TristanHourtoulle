import { login } from "@lib/session";
import { unstable_noStore as noStore } from "next/cache";

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

export const getUserByEmail = async (email: string) => {
  const response = await fetch(`/api/user/email/${encodeURIComponent(email)}`, {
    method: "GET",
  });
  const data = await response.json();
  if (data.success) {
    return data.data;
  } else {
    return null;
  }
};

export const sendResetCodeByMail = async (
  receiver: string,
  resetCode: string,
  firstname: string
) => {
  try {
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiver, resetCode, firstname }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erreur inconnue");
    }

    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export const updateUserPassword = async (email: string, password: string) => {
  const response = await fetch("/api/user/password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (data.success) {
    return true;
  }
  return false;
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
