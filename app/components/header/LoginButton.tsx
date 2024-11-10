"use client";

import { Button } from "@nextui-org/button";

export const LoginButton = () => {
  return (
    // <Button
    //   variant="primary"
    //   onClick={() => (window.location.href = "/pages/login")}
    //   content="Se connecter"
    //   image={null}
    //   moreClasses=""
    //   disabled={false}
    //   size="large"
    // />
    <Button
      color="primary"
      size="lg"
      radius="full"
      variant="ghost"
      className="text-lg outfit-regular"
      onClick={() => (window.location.href = "/pages/login")}
    >
      Se connecter
    </Button>
  );
};
