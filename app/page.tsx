import { LoginButton } from "@components/header/LoginButton";
import { RegisterButton } from "@components/header/RegisterButton";
import { getSession } from "@lib/session";
import { SessionType } from "@models/Session";

export default async function Home() {
  const session: SessionType = await getSession();
  const username = " " + session?.user?.name || "";
  const firstName = " " + session?.user?.firstName || "";
  let initials = " " + firstName + " " + (username.substring(0, 2) || "");
  if (initials.includes("undefined")) {
    initials = "";
  }

  return (
    <div className="flex flex-col items-center justify-between text-center w-full h-full">
      <h1 className="text-2xl md:text-5xl lg:text-5xl text-center">
        Bonjour<strong>{initials}</strong>,
      </h1>
      <h2 className="text-3xl md:text-6xl lg:text-6xl mb-[5%]">
        {" "}
        Bienvenue sur l'outil{" "}
        <span className="text-4xl md:text-7xl lg:text-7xl font-bold text-[#30c1bd]">
          Moduloop
        </span>{" "}
        !
      </h2>

      {!session && (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-lg">
            Vous avez besoin d'avoir un compte pour utiliser{" "}
            <strong>gratuitement</strong> notre outil.
          </p>
          <div className="flex gap-4">
            <LoginButton />
            <RegisterButton />
          </div>
        </div>
      )}
    </div>
  );
}
