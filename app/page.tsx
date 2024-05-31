import { Carousel } from "@components/Carousel";
import { GetStarted } from "@components/GetStarted";
import { LoginButton } from "@components/header/LoginButton";
import { RegisterButton } from "@components/header/RegisterButton";
import { getSession } from "@lib/session";
import { SessionType } from "@models/Session";
import { Image } from "@nextui-org/react";

export default async function Home() {
  const session: SessionType = await getSession();
  const username = " " + session?.user?.name || "";
  const firstName = " " + session?.user?.firstName || "";
  let initials = " " + firstName + " " + (username.substring(0, 2) || "");
  if (initials.includes("undefined")) {
    initials = "";
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 h-screen pb-[15%] w-full">
        <div className="flex flex-col gap-4 items-start md:justify-center h-full w-full md:w-[55%]">
          <h1 className="w-full text-2xl md:text-5xl lg:text-5xl font-semibold leading-loose text-center md:text-left">
            Calculez le réel <strong className="text-[#30c1bd]">impact</strong>{" "}
            de vos projets d'aménagement sur{" "}
            <strong className="text-[#30c1bd]">l'environnement</strong>
          </h1>

          <p className="text-center md:text-left text-lg opacity-90">
            Grâce à cet outil développé et mis à disposition{" "}
            <strong>gratuitement</strong> par Moduloop !
          </p>

          <GetStarted />
        </div>
        <Carousel />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 text-center">
        <h1 className="text-[#30c1bd] text-2xl md:text-5xl font-semibold">
          Comment ça fonctionne
        </h1>
        <p className="text-xl md:text-2xl">Créer un projet</p>
        <hr className="w-[10%] border-[#30c1bd] border-1 rounded-full opacity-30" />
        <p className="text-xl md:text-2xl">
          Ajouter des produits à ce projet en choisissant les quantité neuves et
          de réemplois
        </p>
        <hr className="w-[10%] border-[#30c1bd] border-1 rounded-full opacity-30" />

        <p className="text-xl md:text-2xl">Calculer l'impact environnemental</p>
        <hr className="w-[10%] border-[#30c1bd] border-1 rounded-full opacity-30" />
        <p className="text-xl md:text-2xl">
          Télécharger la fiche projet afin de la partager
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 mt-[10%]">
        <h1 className="text-[#30c1bd] text-2xl md:text-5xl font-semibold text-center">
          Comment est calculé l’impact de vos projets ?
        </h1>
        <p className="text-xl md:text-2xl text-justify max-w-[70%]">
          Tous les produits que nous vous proposons sur cet outil dispose de
          fiche Inies et Impact qui nous permet de récupérer toutes les
          informations nécessaire comme l’impact sur l’environnement tout au
          long de son cycle de vie (de sa fabrication à sa destruction).
        </p>

        <div className="flex items-center justify-center gap-[3%]">
          <Image
            alt="Alerte"
            src="/icons/AlertIcon.svg"
            width={100}
            height={100}
            className="max-w-[50%] md:max-w-full"
          />
          <p className="text-[#FF4040] text-md md:text-xl text-left md:text-justify max-w-[50%]">
            Les valeurs que nous récupérons sont des <strong>moyennes</strong>.
            Ainsi, les résultats que nous vous apportons sont des{" "}
            <strong>estimatifs d'impact</strong>.
          </p>
        </div>
      </div>

      {/* If user is not signed in */}
      {!session && (
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-lg leading-loose">
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
