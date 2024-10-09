import { GetStarted } from "@components/GetStarted";
import { Card, NoticeCard, SmallerCard } from "@components/landingPage/Card";
import { Header } from "@components/landingPage/Header";
import { getSession } from "@lib/session";
import { SessionType } from "@models/Session";
import {
  Calculator,
  GitCompareArrows,
  HandHelping,
  Radical,
  Repeat,
  ShoppingCart,
  TrendingDown,
} from "lucide-react";
import Image from "next/image";

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
      <div className="flex flex-col items-center gap-8 h-screen w-full">
        <div className="flex flex-col items-center gap-2 w-full">
          <h1 className="w-full text-3xl md:text-4xl lg:text-5xl text-center outfit-bold tertiary-color">
            Calculateur d'impact environnemental
          </h1>
          <p className="w-full text-sm lg:text-md text-center outfit-regular tertiary-color">
            Ajoutez vos produits, et obtenez un estimatif de l'impact
            environnemental en quelques secondes.
          </p>
        </div>

        <GetStarted />

        <Image
          src="/Landing Page/ImpactExempleOne.svg"
          alt="Impact environnemental"
          width={1000}
          height={1000}
        />
      </div>

      <div className="flex flex-col items-center w-full gap-8">
        {/* Les avantages clés */}
        <Header
          title="Les avantages clés"
          subtitle="Pourquoi utiliser notre outil ?"
        />
        <div className="w-full flex-col gap-3 lg:flex-row lg:gap-0 justify-between items-center">
          <Card
            icon={<TrendingDown className="primary-color" size={50} />}
            title="éco-responsable"
            description="Optimisez vos projets en choisissant des matériaux et du mobilier avec une faible empreinte écologique, grâce à des estimations précises d’impact."
          />
          <Card
            icon={<HandHelping className="primary-color" size={50} />}
            title="aide à la décision"
            description="Comparez facilement différents scénarios (neuf, réemploi, projet personnalisé) pour identifier la solution la plus durable."
          />
          <Card
            icon={<Repeat className="primary-color" size={50} />}
            title="économie circulaire"
            description="Encouragez le réemploi et la durabilité en intégrant des matériaux et des produits déjà utilisés, tout en mesurant leur impact sur l’environnement."
          />
        </div>

        <hr className="w-[50%] border-[#A0A0A6] border-1 rounded-full opacity-25 my-[2.5%]" />
      </div>

      <div className="flex flex-col items-center w-full gap-8">
        <Header
          title="Comment ça marche ?"
          subtitle="Un guide en 4 étapes simples !"
        />
        <div className="w-full flex flex-wrap gap-4 justify-center items-center">
          <SmallerCard
            icon={<ShoppingCart className="primary-color" size={50} />}
            title="choix des produits"
            description="Choisissez dans les listes déroulantes dédiées vos éléments de mobilier (chaises, tables, etc.) et vos matériaux d'aménagement (cloisons, sols, plafonds, etc.)."
          />
          <SmallerCard
            icon={<Calculator className="primary-color" size={50} />}
            title="indiquer les quantités"
            description="Renseignez la quantité de chaque produit sélectionné pour obtenir une estimation précise en fonction de votre projet."
          />
        </div>

        <div className="w-full flex flex-wrap gap-4 justify-center items-center">
          <SmallerCard
            icon={<Radical className="primary-color" size={50} />}
            title="estimation d'impact"
            description="L'outil calcule instantanément l’impact environnemental de vos choix. Vous pouvez ajuster vos sélections pour optimiser votre empreinte écologique."
          />
          <SmallerCard
            icon={<GitCompareArrows className="primary-color" size={50} />}
            title="comparaison de projets"
            description="Comparez l'impact entre un projet tout en neuf, en réemploi, ou avec un autre projet pour choisir la solution la plus écologique."
          />
        </div>
        <hr className="w-[50%] border-[#A0A0A6] border-1 rounded-full opacity-25 my-[2.5%]" />
      </div>

      <div className="flex flex-col items-center w-full gap-8">
        <Header
          title="Avis sur notre outil"
          subtitle="Besoin d'être convaincu ?"
        />
        <div className="w-full flex flex-wrap gap-4 justify-center items-center">
          <NoticeCard
            profilePicture="/Landing Page/Ellipse 19.png"
            fullName="Marc Lefèvre"
            role="Architecte d'intérieur"
            notice="En tant qu'architecte, il est crucial pour moi de faire des choix éclairés. Ce calculateur m'a permis de comparer facilement plusieurs options et d'opter pour la solution la plus éco-responsable. Je le recommande vivement !"
          />
          <NoticeCard
            profilePicture="/Landing Page/Ellipse 19-1.png"
            fullName="Gabriel Dumas"
            role="Restaurateur"
            notice="J'apprécie particulièrement la fonctionnalité de comparaison des projets. Cela m'a aidé à voir l'impact des matériaux réemployés par rapport aux neufs, et à faire des choix plus durables pour notre rénovation."
          />
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row items-center md:justify-center gap-5 h-screen pb-[15%] w-full">
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
      </div> */}
    </div>
  );
}
