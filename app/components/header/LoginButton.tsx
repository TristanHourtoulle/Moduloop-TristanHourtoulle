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
      variant="shadow"
      color="primary"
      size="md"
      onClick={() => (window.location.href = "/pages/login")}
    >
      Se connecter
    </Button>
  );
};
