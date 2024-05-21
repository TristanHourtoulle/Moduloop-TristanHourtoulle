"use client";

import { User } from "@/models/User";
import { loginUser } from "@utils/database/user";
import { toast } from "sonner";

export default function Login() {
  const handleSubmit = async () => {
    // e.preventDefault();
    // const formData = new FormData(e.currentTarget);
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passwordInput = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const user: User = {
      id: 0,
      firstName: "",
      name: "",
      email: emailInput.value || "",
      password: passwordInput.value || "",
      role: "",
      createdAt: "",
      updatedAt: "",
      avatar: "",
    };

    try {
      const email = user.email || "";
      const password = user.password || "";
      const response = await loginUser(email, password);

      if (response) {
        toast.success("Connexion réussie");
        window.location.href = "/";
      } else {
        toast.error("Email ou mot de passe incorrect");
      }
    } catch (error) {}
  };

  return (
    <div className="bg-white w-full md:w-full md:h-[400px] lg:h-[450px] xl:h-[600px] 2xl:h-[700px] flex shadow-lg items-center ml-auto mr-auto rounded-lg overflow-hidden">
      {/* Left Side */}
      <div className="hidden md:flex h-full flex-col gap-3 items-start justify-center bg-[#0A726F] w-[40%] px-[4%] rounded-l-lg shadow-lg">
        <h2 className="font-outfit font-bold text-white text-4xl">
          Bon retour sur{" "}
          <span className="text-5xl text-[#30C1BD]">Moduloop</span>
        </h2>
        <hr className="w-48 h-2 my-4 bg-[#30C1BD] border-0 rounded"></hr>
        <p className="font-outfit text-white text-base opacity-[90%]">
          Connectez-vous à votre compte pour continuer.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-5 md:gap-10 items-center justify-center w-full md:w-[60%] px-4 my-[7%] md:my-0">
        {/* Head Section */}
        <div className="flex flex-col items-center justify-center text-center">
          <h2 className="text-black font-outfit font-bold text-2xl md:text-5xl">
            Se connecter
          </h2>
          <p className="mt-2 text-black font-outfit text-sm md:text-md">
            Vous n'avez pas encore de compte ?
          </p>
          <p
            onClick={() => {
              window.location.href = "/pages/register";
            }}
            className="cursor-pointer text-black font-outfit text-md md:text-md font-bold transition-all hover:opacity-[75%]"
          >
            Créer un compte
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full flex flex-col items-center gap-3 mt-[10%] md:mt-0 ">
          <input
            style={{ width: "75%" }}
            id="email"
            type="text"
            placeholder="Addresse Mail"
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-md md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          ></input>
          <input
            style={{ width: "75%" }}
            id="password"
            type="password"
            placeholder="Mot de passe"
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-md md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          ></input>

          {/* Submit Button */}
          <div
            onClick={handleSubmit}
            className="mt-[10%] md:mt-3 bg-[#0A726F] px-4 py-3 md:px-8 md:py-4 rounded-lg text-white font-outfit text-md md:text-lg w-fit md:w-[75%] text-center transition-all cursor-pointer hover:opacity-[75%]"
          >
            Connection
          </div>
          {/* Reset Password */}
          <p
            onClick={() => {
              alert("Fonctionnalité encore en développement");
            }}
            className="cursor-pointer transition-all hover:opacity-[75%] text-left text-[#0A726F] font-bold text-md mt-[5%] md:mt-0"
          >
            Mot de passe oublié ?
          </p>
        </div>
      </div>
    </div>
  );
}
