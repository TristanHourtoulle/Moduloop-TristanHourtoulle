import { Carousel } from "@components/Carousel";
import { GetStarted } from "@components/GetStarted";
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
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center md:justify-center gap-5 h-screen pb-[15%] w-full">
        <div className="flex flex-col gap-4 items-start mb-auto md:mb-0 md:justify-center w-full md:w-[55%]">
          <h1
            className="w-full text-2xl md:text-5xl lg:text-5xl font-semibold text-center md:text-left"
            style={{ lineHeight: "1.25" }}
          >
            Calculez le réel <strong className="text-primary">impact</strong> de
            vos projets d&apos;aménagement sur{" "}
            <strong className="text-primary">l&apos;environnement</strong>
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
        <h1 className="text-primary text-2xl md:text-5xl font-semibold">
          Comment ça fonctionne
        </h1>
        <p className="text-xl md:text-2xl">Créer un projet</p>
        <hr className="w-[35%] md:w-[10%] border-primary border-1 rounded-full opacity-30" />
        <p className="text-xl md:text-2xl">
          Ajouter des produits à ce projet en choisissant les quantité neuves et
          de réemplois
        </p>
        <hr className="w-[35%] md:w-[10%] border-primary border-1 rounded-full opacity-30" />

        <p className="text-xl md:text-2xl">
          Calculer l&apos;impact environnemental
        </p>
        <hr className="w-[35%] md:w-[10%] border-primary border-1 rounded-full opacity-30" />

        <p className="text-xl md:text-2xl">
          Comparer votre projet avec tous vos produits en Neufs ou en Réemplois
        </p>
        <hr className="w-[35%] md:w-[10%] border-primary border-1 rounded-full opacity-30" />
        <p className="text-xl md:text-2xl">
          Télécharger la fiche projet afin de la partager avec vos
          collaborateurs !
        </p>
      </div>

      <div className="flex flex-col items-center justify-center gap-8 mt-[10%]">
        <h1 className="text-primary text-2xl md:text-5xl font-semibold text-center">
          Comment est calculé l’impact de vos projets ?
        </h1>
        <p className="text-xl md:text-2xl text-justify max-w-[90%] md:max-w-[70%]">
          Tous les produits que nous vous proposons sur cet outil dispose de
          fiche Inies et Impact qui nous permet de récupérer toutes les
          informations nécessaire comme l’impact sur l’environnement tout au
          long de son cycle de vie (de sa fabrication à sa destruction).
        </p>

        <p className="text-lg md:text-xl text-justify max-w-[90%] md:max-w-[70%]">
          Les valeurs que nous récupérons sont des <strong>moyennes</strong>.
          Ainsi, les résultats que nous vous apportons sont des{" "}
          <strong>estimatifs d&apos;impact</strong>.
        </p>
      </div>
    </div>
  );
}
