"use client";

import Loader from "@components/Loader";
import { getSession } from "@lib/session";
import { AddProductType } from "@models/AddProduct";
import { ProjectType } from "@models/Project";
import { Button } from "@nextui-org/button";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import { getProjectsByUserId } from "@utils/database/project";
import {
  convertTime,
  getNonNumbers,
  getNumbersOnly,
} from "@utils/dateFormater";
import {
  getASEimpact,
  getCO2impact,
  getEMimpact,
  getERFimpact,
} from "@utils/getImpact";
import {
  convertProjectToNewProducts,
  convertProjectToUsedProducts,
} from "@utils/projects";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CompareImpact } from "./impact/Compare/CompareImpact";
import { EquivalenceImpact } from "./impact/Compare/EquivalenceImpact";
import { ImpactGlobalProject } from "./impact/ImpactGlobalProject";
import { MostImpact } from "./impact/MostImpact";

function initCompareWithProjects(project: ProjectType) {
  const result: ProjectType[] = [];
  const newProject: ProjectType = project;
  const usedProject: ProjectType = project;

  newProject.name = project.name + " (tout en neuf)";
  newProject.id = -2;
  usedProject.name = project.name + " (tout en réemploi)";
  usedProject.id = -3;
  result.push(newProject);
  result.push(usedProject);
  return result;
}

const ImpactSection = (props: {
  products: AddProductType[];
  project: ProjectType;
  ctaView: (view: string) => void;
}) => {
  const { products, project, ctaView } = props;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [isCompare, setIsCompare] = useState(false);
  const [isCompareWithTemplate, setIsCompareWithTemplate] =
    useState<boolean>(false);
  const [session, setSession] = useState(null);
  const [compareWith, setCompareWith] = useState<ProjectType | null>(null);
  const [rcPercentage, setRcPercentage] = useState<number>(0.0);
  const [erfPercentage, setErfPercentage] = useState<number>(0.0);
  const [asePercentage, setAsePercentage] = useState<number>(0.0);
  const [emPercentage, setEmPercentage] = useState<number>(0.0);
  const [betterProject, setBetterProject] = useState<ProjectType>(project);
  const [worstProject, setWorstProject] = useState<ProjectType>(project);
  const [planeEquivalent, setPlaneEquivalent] = useState<number>(0);
  const [personEquivalent, setPersonEquivalent] = useState<number>(0);
  const [kmEquivalent, setKmEquivalent] = useState<number>(0);
  const [petrolEquivalent, setPetrolEquivalent] = useState<number>(0);
  const [lampEquivalent, setLampEquivalent] = useState<number>(0);
  const [houseEquivalent, setHouseEquivalent] = useState<number>(0);

  const getEquivalenceWithoutCompare = () => {
    if (project === null) return;
    setIsLoaded(false);
    const rcValue: number = Number(getCO2impact(project));
    const erfValue: number = Number(getERFimpact(project));

    // Plane equivalent
    let result = rcValue / 100; // Convertir kg en tonnes
    result = result / 0.524; // 0.524 => Emission d'un vol Paris-Nice en tonne de CO2 par passager
    setPlaneEquivalent(Number(result.toFixed(0)));
    // Person equivalent
    result = rcValue / 24.38; // 24.38 => Consommation moyenne d'un français en kg de CO2 par jour
    setPersonEquivalent(Number(result.toFixed(0)));
    // Km equivalent
    result = rcValue * 0.17; // 0.17 => Emission d'un km en kg de CO2 en SUV
    setKmEquivalent(Number(result.toFixed(0)));
    // Petrol equivalent
    result = erfValue / 5861.52; // 5861.52 => Equivalence d'un baril de pétrole en MJ
    setPetrolEquivalent(Number(result.toFixed(0)));
    // Lamp equivalent
    result = erfValue / 648;
    setLampEquivalent(Number(result.toFixed(0)));
    // House equivalent
    result = erfValue * 0.2778; // Convertir MJ to kWh
    result = result / (2223 / 365); // 2223 => Consommation moyenne d'un français en kWh par an; 365 => Convertir en consommation journalière
    setHouseEquivalent(Number(result.toFixed(0)));
    setIsLoaded(true);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoaded(false);
      let response = await getSession();
      let data = await response;
      setSession(data);
      response = await getProjectsByUserId(data.user.id);
      if (response) {
        setProjects(response); // Fix: Pass response as a spread argument
      }
      await getEquivalenceWithoutCompare();
      setIsLoaded(true);
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (compareWith !== null && project !== null) {
      setIsLoaded(false);
      const value1: number = Number(getCO2impact(project));
      const value2: number = Number(getCO2impact(compareWith));
      const erfValue1: number = Number(getERFimpact(project));
      const erfValue2: number = Number(getERFimpact(compareWith));
      const aseValue1: number = Number(getASEimpact(project));
      const aseValue2: number = Number(getASEimpact(compareWith));
      const emValue1: number = Number(getEMimpact(project));
      const emValue2: number = Number(getEMimpact(compareWith));

      if (
        value1 === value2 &&
        erfValue1 === erfValue2 &&
        aseValue1 === aseValue2 &&
        emValue1 === emValue2
      ) {
        // Gérer le cas où les valeurs d'impact sont identiques pour les deux projets
        setIsLoaded(true);

        const selectElement = document.getElementById(
          "projectSelect"
        ) as HTMLSelectElement;
        if (selectElement) {
          selectElement.value = "-1";
        }

        setCompareWith(null);
        setIsCompare(false);
        // TODO: display an warning toast to inform the user that the projects have the same impact
        toast.warning(
          "Inutile de comparer ces projets car les impacts sont équivalents."
        );
        return;
      }

      let percentage = 0;
      if (erfValue1 >= erfValue2) {
        percentage = ((erfValue1 - erfValue2) / erfValue1) * 100;
      } else {
        percentage = ((erfValue2 - erfValue1) / erfValue2) * 100;
      }
      setErfPercentage(percentage);
      if (aseValue1 >= aseValue2) {
        percentage = ((aseValue1 - aseValue2) / aseValue1) * 100;
      } else {
        percentage = ((aseValue2 - aseValue1) / aseValue2) * 100;
      }
      setAsePercentage(percentage);
      if (emValue1 >= emValue2) {
        percentage = ((emValue1 - emValue2) / emValue1) * 100;
      } else {
        percentage = ((emValue2 - emValue1) / emValue2) * 100;
      }
      setEmPercentage(percentage);

      if (value1 >= value2) {
        percentage = ((value1 - value2) / value1) * 100;
        setBetterProject(compareWith);
        setWorstProject(project);

        // Plane equivalent
        let delta = value1 - value2;
        let result = delta / 100; // Convertir kg en tonnes
        result = result / 0.524;
        setPlaneEquivalent(Number(result.toFixed(0)));
        // Person equivalent
        result = delta / 24.38;
        setPersonEquivalent(Number(result.toFixed(0)));
        // Km equivalent
        result = delta * 0.17;
        setKmEquivalent(Number(result.toFixed(0)));
        // Petrol equivalent
        delta = erfValue1 - erfValue2;
        result = delta / 5861.52;
        setPetrolEquivalent(Number(result.toFixed(0)));
        // Lamp equivalent
        result = delta / 648;
        setLampEquivalent(Number(result.toFixed(0)));
        // House equivalent
        result = delta * 0.2778; // Convertir MJ to kWh
        result = result / (2223 / 365);
        setHouseEquivalent(Number(result.toFixed(0)));
      } else {
        percentage = ((value2 - value1) / value2) * 100;
        setBetterProject(project);
        setWorstProject(compareWith);

        // Plane equivalent
        let delta = value2 - value1;
        let result = delta / 100;
        result = result / 0.524;
        setPlaneEquivalent(Number(result.toFixed(0)));
        // Person equivalent
        result = delta / 24.38;
        setPersonEquivalent(Number(result.toFixed(0)));
        // Km equivalent
        result = delta * 0.17;
        setKmEquivalent(Number(result.toFixed(0)));
        // Petrol equivalent
        delta = erfValue2 - erfValue1;
        result = delta / 5861.52;
        setPetrolEquivalent(Number(result.toFixed(0)));
        // Lamp equivalent
        result = delta / 648;
        setLampEquivalent(Number(result.toFixed(0)));
        // House equivalent
        result = delta * 0.2778; // Convertir MJ to kWh
        result = result / (2223 / 365);
        setHouseEquivalent(Number(result.toFixed(0)));
      }

      setRcPercentage(Number(percentage.toFixed(0)));
      setIsLoaded(true);
    } else {
      getEquivalenceWithoutCompare();
    }
  }, [compareWith, project?.products]);

  const handleCreateProjectFromTemplate = async () => {
    const formData = new FormData();
    formData.append("name", compareWith?.name ?? "");
    formData.append("products", JSON.stringify(compareWith?.products));
    formData.append("user_id", String(compareWith?.user_id) ?? "");
    formData.append("group_id", String(compareWith?.group) ?? "");
    formData.append("group_name", compareWith?.groupInfo?.name ?? "");
    let result = await fetch("/api/project/duplicate/template", {
      method: "POST",
      body: formData,
    });
    let data = await result.json();
    if (data.success) {
      toast.success("Le projet a été créé avec succès.");
    } else {
      toast.error("Une erreur est survenue lors de la création du projet.");
    }
  };

  return (
    <div className="impact flex flex-col items-start gap-5">
      <div className="w-full flex flex-col gap-2 md:gap-6">
        {/* Select project for compare */}
        <div className="flex flex-wrap items-start justify-start gap-1 md:gap-5">
          <div className="flex flex-wrap items-center w-full gap-5">
            {/* <Button
              onClick={() => ctaView("products")}
              content="Afficher les produits"
              variant="secondary"
              size="medium"
              disabled={false}
              image={null}
              moreClasses="mb-[5%] md:mb-0"
            /> */}
            <Button
              color="primary"
              variant="flat"
              size="lg"
              onClick={() => {
                ctaView("products");
              }}
              className="text-lg px-7 rounded-lg border-1 border-primary-500"
            >
              Afficher les produits
            </Button>

            <Select
              items={projects ?? []}
              labelPlacement="inside"
              label="Comparer avec un autre projet"
              size="md"
              color="primary"
              className="font-medium max-w-[300px]"
              defaultOpen={false}
              onChange={(event) => {
                if (projects === null) return;
                if (event.target.value === "-1") {
                  setCompareWith(null);
                  setIsCompare(false);
                  setIsCompareWithTemplate(false);
                  return;
                } else {
                  if (event.target.value === "-2") {
                    // Comparer avec du neuf
                    const newProject = convertProjectToNewProducts(
                      products,
                      project
                    );
                    setCompareWith(newProject);
                    setIsCompare(true);
                    setIsCompareWithTemplate(true);
                    return;
                  } else if (event.target.value === "-3") {
                    // Comparer avec du réemploi
                    const reusedProject = convertProjectToUsedProducts(
                      products,
                      project
                    );
                    setCompareWith(reusedProject);
                    setIsCompare(true);
                    setIsCompareWithTemplate(true);
                    return;
                  }
                  setIsCompareWithTemplate(false);
                  for (let i = 0; i < projects.length; i++) {
                    if (
                      projects &&
                      projects[i].id === parseInt(event.target.value)
                    ) {
                      setCompareWith(projects[i]);
                      setIsCompare(true);
                      return;
                    }
                  }
                }
              }}
            >
              <SelectSection title={"Templates"} className="text-black text-lg">
                <SelectItem
                  key={-2}
                  value={-2}
                  className="text-black font-outfit text-lg"
                >
                  {project.name + " (Tout en neuf)"}
                </SelectItem>
                <SelectItem
                  key={-3}
                  value={-3}
                  className="text-black font-outfit text-lg"
                >
                  {project.name + " (Tout en réemploi)"}
                </SelectItem>
              </SelectSection>
              <SelectSection
                title={"Vos projets"}
                className="text-black text-lg"
              >
                {projects &&
                  projects.map((temp) => (
                    <SelectItem
                      key={temp.id ?? "-2"}
                      value={temp.id ?? "-3"}
                      className="text-black font-outfit text-lg"
                    >
                      {temp.name ?? "Aucun nom"}
                    </SelectItem>
                  ))}
              </SelectSection>
            </Select>
            {/* If the compareWith are actualProjectNew or actualProjectReuse, we have to permit the creation of that project */}
            {isCompareWithTemplate && (
              <Button
                color="primary"
                variant="light"
                size="md"
                onClick={handleCreateProjectFromTemplate}
                className="text-lg w-fit-content rounded-lg"
              >
                Créer ce projet
              </Button>
            )}
          </div>
        </div>

        {isLoaded && isCompare && compareWith && (
          <div
            className="p-[10px] md:p-[20px] rounded-[16px]"
            style={{ backgroundColor: "rgba(255, 138, 0, 0.25)" }}
          >
            {isCompare && compareWith && (
              <CompareImpact
                project_one={project}
                project_two={compareWith}
                percentage={rcPercentage}
                type="Réchauffement climatique"
              />
            )}
            {isCompare && compareWith && (
              <EquivalenceImpact
                project={betterProject}
                worstProject={worstProject}
                value1={planeEquivalent}
                value2={personEquivalent}
                value3={kmEquivalent}
                title1="paris - nice"
                title2="émission journalière"
                title3="kms parcourus"
                unit1="Aller - Retour"
                unit2="Français"
                unit3="Kms"
                impactType="RC"
                impactUnit="kg éq. CO2"
              />
            )}
          </div>
        )}

        {isLoaded && isCompare && compareWith && (
          <div
            className="p-[20px] rounded-[16px]"
            style={{ backgroundColor: "rgba(255, 48, 48, 0.25)" }}
          >
            {isCompare && compareWith && (
              <CompareImpact
                project_one={project}
                project_two={compareWith}
                percentage={erfPercentage}
                type="Epuisement des ressources fossiles"
              />
            )}
            {isCompare && compareWith && (
              <EquivalenceImpact
                project={betterProject}
                worstProject={worstProject}
                value1={petrolEquivalent}
                value2={lampEquivalent}
                value3={houseEquivalent}
                title1="pétrol brut"
                title2="éclairage d'un lampadaire"
                title3="chauffage"
                unit1="Barils"
                unit2="Années"
                unit3="Jours"
                impactType="ERF"
                impactUnit="MJ"
              />
            )}
          </div>
        )}

        {isLoaded && isCompare && compareWith && (
          <div
            className="p-[20px] rounded-[16px]"
            style={{ backgroundColor: "rgba(0, 164, 16, 0.25)" }}
          >
            {isCompare && compareWith && (
              <CompareImpact
                project_one={project}
                project_two={compareWith}
                percentage={asePercentage}
                type="Acidification des sols et eaux"
              />
            )}

            {isCompare && compareWith && (
              <div className="">
                <CompareImpact
                  project_one={project}
                  project_two={compareWith}
                  percentage={emPercentage}
                  type="Eutrophisation marine"
                />
              </div>
            )}
          </div>
        )}

        {isLoaded && !isCompare && (
          <ImpactGlobalProject project_one={project} />
        )}

        {isLoaded && !isCompare && (
          <div
            className="p-[10px] md:p-[20px] rounded-[16px]"
            style={{ backgroundColor: "rgba(255, 138, 0, 0.25)" }}
          >
            <EquivalenceImpact
              project={project}
              worstProject={project}
              value1={planeEquivalent}
              value2={personEquivalent}
              value3={kmEquivalent}
              title1="paris - nice"
              title2="émission journalière"
              title3="kms parcourus"
              unit1="Aller-Retour"
              unit2="Français"
              unit3="Kms"
              type="Don't compare"
              impactType="RC"
              impactUnit="kg éq. CO2"
            />
          </div>
        )}

        {isLoaded && !isCompare && (
          <div
            className="p-[10px] md:p-[20px] rounded-[16px]"
            style={{ backgroundColor: "rgba(255, 48, 48, 0.25)" }}
          >
            <EquivalenceImpact
              project={project}
              worstProject={project}
              value1={petrolEquivalent}
              value2={lampEquivalent}
              value3={Number(getNumbersOnly(convertTime(houseEquivalent)))}
              title1="pétrol brut"
              title2="éclairage d'un lampadaire"
              title3="Consommation électrique d'un foyer"
              unit1="Barils"
              unit2="Années"
              unit3={getNonNumbers(convertTime(houseEquivalent))}
              type="Don't compare"
              impactType="ERF"
              impactUnit="MJ"
            />
          </div>
        )}

        {isLoaded && !isCompare && (
          <MostImpact project={project} ctaView={ctaView} />
        )}

        {!isLoaded && <Loader />}
      </div>
    </div>
  );
};

export default ImpactSection;
