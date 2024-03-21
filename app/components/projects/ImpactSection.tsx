import { AddProductType } from "@models/AddProduct";
import { ProjectType } from "@models/Project";
import {
  getASEimpact,
  getCO2impact,
  getEMimpact,
  getERFimpact,
} from "@utils/getImpact";
import { useEffect, useState } from "react";
import { CompareImpact } from "./impact/Compare/CompareImpact";
import { EquivalenceImpact } from "./impact/Compare/EquivalenceImpact";
import { ImpactGlobalProject } from "./impact/ImpactGlobalProject";
import { MostImpact } from "./impact/MostImpact";

const ImpactSection = (props: {
  products: AddProductType[];
  project: ProjectType;
}) => {
  const { products, project } = props;
  const [projects, setProjects] = useState<[]>([]);
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

  useEffect(() => {
    const fetchProjects = async () => {
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
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    if (compareWith !== null) {
      console.log("isCompare value changed: ", compareWith);
      const value1: number = Number(getCO2impact(project));
      const value2: number = Number(getCO2impact(compareWith));
      const erfValue1: number = Number(getERFimpact(project));
      const erfValue2: number = Number(getERFimpact(compareWith));
      const aseValue1: number = Number(getASEimpact(project));
      const aseValue2: number = Number(getASEimpact(compareWith));
      const emValue1: number = Number(getEMimpact(project));
      const emValue2: number = Number(getEMimpact(compareWith));
      let percentage;
      if (erfValue1 > erfValue2) {
        percentage = ((erfValue1 - erfValue2) / erfValue1) * 100;
      } else {
        percentage = ((erfValue2 - erfValue1) / erfValue2) * 100;
      }
      setErfPercentage(Number(percentage.toFixed(0)));
      if (aseValue1 > aseValue2) {
        percentage = ((aseValue1 - aseValue2) / aseValue1) * 100;
      } else {
        percentage = ((aseValue2 - aseValue1) / aseValue2) * 100;
      }
      setAsePercentage(Number(percentage.toFixed(0)));
      if (emValue1 > emValue2) {
        percentage = ((emValue1 - emValue2) / emValue1) * 100;
      } else {
        percentage = ((emValue2 - emValue1) / emValue2) * 100;
      }
      setEmPercentage(Number(percentage.toFixed(0)));

      if (value1 > value2) {
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
    } else {
      console.log("Don't compare with any project");
    }
  }, [isCompare]);

  return (
    <div className="impact flex flex-col items-start gap-5 my-[2%] mx-[5%]">
      <div className="w-full flex flex-col gap-6">
        {/* Select project for compare */}
        <div className="flex items-center gap-5">
          <p className="font-bold text-lg">Comparer</p>
          <p className="font-bold text-lg">avec</p>
          <div className="h-10 w-72 min-w-[200px]">
            <select
              className="w-[100%] h-full rounded-[8px] font-bold text-lg px-[5%]"
              onChange={(event) => {
                for (let i = 0; i < projects.length; i++) {
                  if (projects[i].id === parseInt(event.target.value)) {
                    setCompareWith(projects[i]);
                    setIsCompare(!isCompare);
                    return;
                  }
                }
                setCompareWith(null);
                setIsCompare(false);
              }}
            >
              <option selected value="-1">
                Aucun Projet
              </option>
              {projects.map(
                (temp) =>
                  temp.id !== project.id && (
                    <option key={temp.id} value={temp.id}>
                      {temp.name}
                    </option>
                  )
              )}
            </select>
          </div>
        </div>

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
          />
        )}
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
          />
        )}

        {isCompare && compareWith && (
          <CompareImpact
            project_one={project}
            project_two={compareWith}
            percentage={asePercentage}
            type="Acidification des sols et eaux"
          />
        )}

        {isCompare && compareWith && (
          <div className="hidden">
            <CompareImpact
              project_one={project}
              project_two={compareWith}
              percentage={emPercentage}
              type="Eutrophisation marine"
            />
          </div>
        )}

        {!isCompare && <ImpactGlobalProject project_one={project} />}

        {!isCompare && <MostImpact project={project} />}
      </div>
    </div>
  );
};

export default ImpactSection;
