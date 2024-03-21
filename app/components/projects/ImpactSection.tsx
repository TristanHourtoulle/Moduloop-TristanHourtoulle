import { AddProductType } from "@models/AddProduct";
import { ProjectType } from "@models/Project";
import { useEffect, useState } from "react";
import { getCO2impact } from "./impact/Card/CardImpactProject";
import { CompareImpact } from "./impact/Compare/CompareImpact";
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
  const [percentage, setPercentage] = useState<number>(0.0);

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
      let percentage;

      if (value1 > value2) {
        percentage = ((value1 - value2) / value1) * 100;
      } else {
        percentage = ((value2 - value1) / value2) * 100;
      }

      setPercentage(Number(percentage.toFixed(0)));
      console.log("Percentage: ", Number(percentage.toFixed(0)));
    } else {
      console.log("Don't compare with any project");
    }
  }, [isCompare]);

  return (
    <div className="impact flex flex-col items-start gap-5 my-[2%] mx-[5%]">
      {/* isCompare
      <div
        className="btn-compare cursor-pointer transition-all hover:opacity-80"
        onClick={() => {
          setIsCompare(!isCompare);
        }}
      >
        <GitCompareArrows size={25} />
        <p className="text-lg font-bold">
          {isCompare ? "Arrêter de comparer" : "Comparer à un autre projet"}
        </p>
      </div> */}

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
            percentage={percentage}
          />
        )}
        {/* Impact Globale Project */}
        <ImpactGlobalProject project_one={project} />
        {/* Most Impact List */}
        <MostImpact project={project} />
      </div>
    </div>
  );
};

export default ImpactSection;
