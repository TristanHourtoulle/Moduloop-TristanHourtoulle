import Link from "next/link";

export const LoginButton = () => {
  return (
    <div className="bg-[#30c1bd] flex items-center justify-center px-7 py-3 rounded-[8px] transition-all hover:opacity-50 cursor-pointer">
      <Link href="/pages/login">
        <p className="text-lg font-medium text-white">Se connecter</p>
      </Link>
    </div>
  );
};
