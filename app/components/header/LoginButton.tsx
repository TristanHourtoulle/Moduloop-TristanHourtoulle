"use client";

import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      href="/pages/login"
      className="text-md outfit-regular rounded-full bg-transparent hover:bg-primary hover:bg-opacity-10 py-2 px-6 flex items-center justify-center transition-all text-primary border-2 border-primary"
    >
      Se connecter
    </Link>
  );
};
