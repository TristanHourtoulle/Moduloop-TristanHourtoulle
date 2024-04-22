import Loader from "@components/Loader";
import { AddProductType } from "@models/AddProduct";
import { ProjectType } from "@models/Project";
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

const ImpactSection = (props: {
  products: AddProductType[];
  project: ProjectType;
}) => {
  const { products, project } = props;

  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<ProjectType[] | null>(null);
  const [impactSelect, setImpactSelect] = useState("global");
  const [isCompare, setIsCompare] = useState(false);
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
    let result = rcValue / 434;
    setPlaneEquivalent(Number(result.toFixed(0)));
    // Person equivalent
    result = rcValue / 32.6;
    setPersonEquivalent(Number(result.toFixed(0)));
    // Km equivalent
    result = rcValue / 0.17;
    setKmEquivalent(Number(result.toFixed(0)));
    // Petrol equivalent
    result = erfValue / 5861;
    setPetrolEquivalent(Number(result.toFixed(0)));
    // Lamp equivalent
    result = erfValue / 648;
    setLampEquivalent(Number(result.toFixed(0)));
    // House equivalent
    result = erfValue / 147.96;
    setHouseEquivalent(Number(result.toFixed(0)));
    setIsLoaded(true);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoaded(false);
      let res = await fetch("/api/session", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      setSession(data.session);

      res = await fetch(
        `/api/project/list?id=${encodeURIComponent(data.session.user.id)}`,
        {
          method: "GET",
        }
      );
      data = await res.json();
      if (data.success) {
        setProjects(data.data);
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
        console.log("Les projets ont des impacts équivalents.");
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
        let result = delta / 434;
        setPlaneEquivalent(Number(result.toFixed(0)));
        // Person equivalent
        result = delta / 32.6;
        setPersonEquivalent(Number(result.toFixed(0)));
        // Km equivalent
        result = delta / 0.17;
        setKmEquivalent(Number(result.toFixed(0)));
        // Petrol equivalent
        delta = erfValue1 - erfValue2;
        result = delta / 5861;
        setPetrolEquivalent(Number(result.toFixed(0)));
        // Lamp equivalent
        result = delta / 648;
        setLampEquivalent(Number(result.toFixed(0)));
        // House equivalent
        result = delta / 147.96;
        setHouseEquivalent(Number(result.toFixed(0)));
      } else {
        percentage = ((value2 - value1) / value2) * 100;
        setBetterProject(project);
        setWorstProject(compareWith);

        // Plane equivalent
        let delta = value2 - value1;
        let result = delta / 434;
        setPlaneEquivalent(Number(result.toFixed(0)));
        // Person equivalent
        result = delta / 32.6;
        setPersonEquivalent(Number(result.toFixed(0)));
        // Km equivalent
        result = delta / 0.17;
        setKmEquivalent(Number(result.toFixed(0)));
        // Petrol equivalent
        delta = erfValue2 - erfValue1;
        result = delta / 5861;
        setPetrolEquivalent(Number(result.toFixed(0)));
        // Lamp equivalent
        result = delta / 648;
        setLampEquivalent(Number(result.toFixed(0)));
        // House equivalent
        result = delta / 147.96;
        setHouseEquivalent(Number(result.toFixed(0)));
      }

      setRcPercentage(Number(percentage.toFixed(0)));
      // console.log("Initial project: ", project);
      // console.log("Compare project: ", compareWith);
      // console.log("RC percentage: ", rcPercentage);
      // console.log("ERF percentage: ", erfPercentage);
      // console.log("ASE percentage: ", asePercentage);
      // console.log("EM percentage: ", emPercentage);
      setIsLoaded(true);
    } else {
      getEquivalenceWithoutCompare();
    }

    console.log("Actual Project: ", project);
    console.log("Compare with: ", compareWith);
    console.log("Better project: ", betterProject);
    console.log("Worst project: ", worstProject);
  }, [compareWith, project?.products]);

  return (
    <div className="impact flex flex-col items-start gap-5 my-[2%] mx-[5%]">
      <div className="w-full flex flex-col gap-6">
        {/* Select project for compare */}
        <div className="flex items-center gap-5">
          <p className="font-bold text-lg">Comparer</p>
          <p className="font-bold text-lg">avec</p>
          <div className="h-10 w-72 min-w-[200px]">
            <select
              id="projectSelect"
              className="w-[100%] h-full rounded-[8px] font-bold text-lg px-[5%]"
              onChange={(event) => {
                if (projects === null) return;
                if (event.target.value === "-1") {
                  setCompareWith(null);
                  setIsCompare(false);
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
                    return;
                  } else if (event.target.value === "-3") {
                    // Comparer avec du réemploi
                    const reusedProject = convertProjectToUsedProducts(
                      products,
                      project
                    );
                    setCompareWith(reusedProject);
                    setIsCompare(true);
                    return;
                  }
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
              <option value="-2">{project.name} (tout en neuf)</option>
              <option value="-3">{project.name} (tout en réemploi)</option>
              <option selected value="-1">
                Aucun Projet
              </option>
              {projects?.map(
                (temp) =>
                  temp.id &&
                  temp.id !== project.id && (
                    <option key={temp.id} value={temp.id}>
                      {temp.name}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>

        {isLoaded && isCompare && compareWith && (
          <div
            className="p-[20px] rounded-[16px]"
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
            className="p-[20px] rounded-[16px]"
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
              unit1="Aller - Retour"
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
            className="p-[20px] rounded-[16px]"
            style={{ backgroundColor: "rgba(255, 48, 48, 0.25)" }}
          >
            <EquivalenceImpact
              project={project}
              worstProject={project}
              value1={petrolEquivalent}
              value2={lampEquivalent}
              value3={houseEquivalent}
              title1="pétrol brut"
              title2="éclairage d'un lampadaire"
              title3="chauffage"
              unit1="Barils"
              unit2="Années"
              unit3="Jours"
              type="Don't compare"
              impactType="ERF"
              impactUnit="MJ"
            />
          </div>
        )}

        {isLoaded && !isCompare && <MostImpact project={project} />}

        {!isLoaded && <Loader />}
      </div>
    </div>
  );
};

export default ImpactSection;
