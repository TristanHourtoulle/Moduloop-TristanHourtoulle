"use client";

import Link from "next/link";

export const RegisterButton = () => {
  return (
    <Link
      href="/pages/register"
      className="text-md outfit-regular rounded-full bg-transparent hover:bg-primary hover:bg-opacity-10 py-2 px-6 flex items-center justify-center transition-all text-primary border-2 border-primary"
    >
      S'inscrire
    </Link>
  );
};
