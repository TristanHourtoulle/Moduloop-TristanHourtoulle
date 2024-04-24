"use client";

import { User } from "@models/User";
import { toast } from "sonner";

export default function Register() {
  const handleSubmit = async () => {
    const firstNameValue = document.getElementById(
      "firstName"
    ) as HTMLInputElement;
    const nameValue = document.getElementById("name") as HTMLInputElement;
    const emailValue = document.getElementById("email") as HTMLInputElement;
    const passwordValue = document.getElementById(
      "password"
    ) as HTMLInputElement;
    const user: User = {
      id: 0,
      firstName: firstNameValue.value || "",
      name: nameValue.value || "",
      email: emailValue.value || "",
      password: passwordValue.value || "",
      role: "user",
      createdAt: "",
      updatedAt: "",
      avatar: "",
    };

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        toast.success("Compte créé avec succès");
        window.location.href = "/pages/login";
      } else {
        toast.error("Erreur lors de la création du compte");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Erreur lors de la création du compte");
    }
  };

  return (
    <div className="w-[900px] h-[550px] bg-white flex shadow-lg items-center ml-auto mr-auto rounded-lg">
      {/* Left Side */}
      <div className="flex flex-col gap-3 items-start justify-center bg-[#0A726F] w-[40%] h-full px-[4%] rounded-l-lg shadow-lg">
        <h2 className="font-outfit font-bold text-white text-4xl">
          Bienvenue sur{" "}
          <span className="text-5xl text-[#30C1BD]">Moduloop</span>
        </h2>
        <hr className="w-48 h-2 px-[4%] my-4 bg-[#30C1BD] border-0 rounded dark:bg-bg-[#30C1BD]"></hr>
        <p className="font-outfit text-white text-base opacity-[90%]">
          Créer un compte pour accéder à toutes les fonctionnalités de l'outil
          Moduloop.
        </p>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-10 items-center justify-center w-[60%] h-full">
        {/* Head Section */}
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-black font-outfit font-bold text-5xl">
            S'inscrire
          </h2>
          <p className="mt-2 text-black font-outfit text-md">
            Vous avez déjà un compte ?
          </p>
          <p
            onClick={() => {
              window.location.href = "/pages/login";
            }}
            className="cursor-pointer text-black font-outfit text-md font-bold transition-all hover:opacity-[75%]"
          >
            Connectez-vous
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full flex flex-col items-center gap-3">
          <input
            style={{ width: "75%" }}
            id="firstName"
            type="text"
            placeholder="Prénom"
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
          ></input>
          <input
            style={{ width: "75%" }}
            id="name"
            type="text"
            placeholder="Nom"
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
          ></input>
          <input
            style={{ width: "75%" }}
            id="email"
            type="text"
            placeholder="Addresse Mail"
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
          ></input>
          <input
            style={{ width: "75%" }}
            id="password"
            type="password"
            placeholder="Mot de passe"
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
          ></input>

          {/* Submit Button */}
          <div
            onClick={handleSubmit}
            className="mt-3 bg-[#0A726F] px-8 py-4 rounded-lg text-white font-outfit text-lg w-[75%] text-center transition-all cursor-pointer hover:opacity-[75%]"
          >
            Inscription
          </div>
          {/* Reset Password */}
          <p
            onClick={() => {
              alert("Fonctionnalité encore en développement");
            }}
            className="cursor-pointer transition-all hover:opacity-[75%] text-left text-[#0A726F] font-bold text-md"
          >
            Mot de passe oublié ?
          </p>
        </div>
      </div>
    </div>
    // <div className="flex justify-center items-center my-auto mt-20">
    //     <div className="flex flex-col justify-center items-center mx-auto">
    //         <h1 className="text-6xl font-bold mb-10">Créer un compte</h1>
    //         <form onSubmit={handleSubmit}>
    //             <div className="mb-5">
    //                 <label hidden htmlFor="firstName">Prénom</label>
    //                 <input
    //                     type="text"
    //                     id="firstName"
    //                     name="firstName"
    //                     placeholder="Prénom"
    //                     className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
    //                     required
    //                 />
    //             </div>

    //             <div className="mb-5">
    //                 <label hidden htmlFor="name">Nom</label>
    //                 <input
    //                     type="text"
    //                     id="name"
    //                     name="name"
    //                     placeholder="Nom"
    //                     className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
    //                     required
    //                 />
    //             </div>

    //             <div className="mb-5">
    //                 <label hidden htmlFor="email">Email</label>
    //                 <input
    //                     type="text"
    //                     id="email"
    //                     name="email"
    //                     placeholder="Email"
    //                     className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
    //                     required
    //                 />
    //             </div>

    //             <div className="mb-5">
    //                 <label hidden htmlFor="password">Mot de passe</label>
    //                 <input
    //                     type="password"
    //                     id="password"
    //                     name="password"
    //                     placeholder="Mot de passe"
    //                     className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
    //                     required
    //                 />
    //             </div>

    //             <div className="items-center justify-center ml-20">
    //                 <button
    //                     type="submit"
    //                     className="bg-blue-500 text-white p-2 rounded-md w-48">
    //                         <p className="text-xl">Valider</p>
    //                 </button>
    //             </div>
    //         </form>
    //     </div>
    // </div>
  );
}
