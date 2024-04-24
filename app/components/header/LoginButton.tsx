"use client";

import { Button } from "@components/button/Button";

export const LoginButton = () => {
  return (
    <Button
      variant="primary"
      onClick={() => (window.location.href = "/pages/login")}
      content="Se connecter"
      image={null}
      moreClasses=""
      disabled={false}
      size="large"
    />
  );
};
