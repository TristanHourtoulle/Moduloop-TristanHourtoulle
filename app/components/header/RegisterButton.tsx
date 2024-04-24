"use client";
import { Button } from "@components/button/Button";

export const RegisterButton = () => {
  return (
    // <div className="flex items-center justify-center bg-white border-2 border-[#30c1bd] rounded-[8px] px-7 py-3 transition-all hover:opacity-50 cursor-pointer">
    //   <Link href="/pages/register">
    //     <p className="text-[#30c1bd] text-lg">S'inscrire</p>
    //   </Link>
    // </div>
    <Button
      variant="secondary"
      onClick={() => (window.location.href = "/pages/register")}
      content="S'incrire"
      image={null}
      moreClasses=""
      disabled={false}
      size="large"
    />
  );
};
