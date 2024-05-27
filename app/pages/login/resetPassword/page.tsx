"use client";

import { Button } from "@nextui-org/button";
import { getUserByEmail, sendResetCodeByMail } from "@utils/database/user";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const page = () => {
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);
  const [isValidCode, setIsValidCode] = useState<boolean>(false);
  const [resetCode, setResetCode] = useState<string>("");

  const handleSubmit = async () => {
    const email = (document.getElementById("email") as HTMLInputElement).value;

    // Check if email is empty
    if (!email || email === "") {
      toast.error("Veuillez entrer une adresse mail");
      return;
    }

    // Get user by email
    const user = await getUserByEmail(email);

    // Check if user exists
    if (user) {
      console.log("User found:", user);
      // Generate reset code
      const tempResetCode = Math.floor(1000 + Math.random() * 9000).toString();
      setResetCode(tempResetCode);
      console.log("Reset code:", tempResetCode);
      // Send email to user
      let res = await sendResetCodeByMail(email, tempResetCode);
      if (!res) {
        toast.error(
          "Erreur lors de l'envoi de l'email de réinitialisation de mot de passe"
        );
        return;
      }
      toast.success(
        "Un email de réinitialisation de mot de passe a été envoyé sur votre adresse mail."
      );
      setIsEmailSent(true);
    } else {
      toast.warning("Cette adresse mail n'est pas associée à un compte.");
    }
  };

  return (
    <div className="bg-white rounded-[16px] w-fit h-full flex flex-col gap-5 items-center justify-center mx-auto my-auto pb-5">
      <div className="bg-[#0A726F] w-full rounded-t-[16px] flex flex-col items-center justify-center p-8 text-white">
        <h1 className="text-2xl">Mot de passe oublié</h1>
        <Link className="text-lg text-[#30C1BD]" href="/pages/login">
          Se connecter
        </Link>
      </div>

      {!isEmailSent ? (
        <div className="flex flex-col items-center gap-3 pb-5 px-5">
          <h3 className="text-lg text-lg text-center">
            Quelle est votre addresse mail lié à votre compte ?
          </h3>
          <input
            id="email"
            type="text"
            placeholder="Addresse Mail"
            className="w-full text-left bg-gray-50 border border-gray-300 text-gray-900 text-md md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />

          <Button
            className="bg-[#0A726F] mt-5 md:mt-0 lg:mt-0 md:ml-0 lg:ml-0 w-fit w-full text-lg"
            color="primary"
            size="lg"
            onClick={handleSubmit}
            variant="solid"
          >
            Confirmer
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 pb-5 px-5">
          <h3 className="text-lg text-center">
            Renseigner le code de vérification reçu par mail
          </h3>
          <input
            id="resetCode"
            type="number"
            placeholder="8888"
            className="w-full text-left bg-gray-50 border border-gray-300 text-gray-900 text-md md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          />

          <Button
            className="bg-[#0A726F] mt-5 md:mt-0 lg:mt-0 md:ml-0 lg:ml-0 w-fit w-full text-lg"
            color="primary"
            size="lg"
            onClick={handleSubmit}
            variant="solid"
          >
            Confirmer
          </Button>
        </div>
      )}
    </div>
  );
};

export default page;
