import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { deleteProject, duplicateProject } from "@utils/database/project";
import { dateFormater } from "@utils/dateFormater";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export type ProjectCardProps = {
  project: any;
  ctaUpdate: () => void;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { project, ctaUpdate } = props;
  const group = project.groupInfo;
  const showProjectUrl = "/pages/projects/" + project.id;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const dialogProps: DialogsProps = {
    title: "Supprimer ce projet",
    content:
      "Voulez-vous vraiment supprimer ce projet ?\n Cette action est irréversible.",
    validate: "Confirmer",
    cancel: "Annuler",
    cta: () => handleDeleteProject(project.id ?? -1),
    cancelCta: () => setIsOpenDialog(false),
  };

  const handleDeleteProject = async (id: number) => {
    let res = await deleteProject(id);
    if (res) {
      ctaUpdate();
      setIsOpenDialog(false);
    } else {
      alert("FAILED");
      setIsOpenDialog(false);
    }
  };

  const handleDuplicateProject = async (id: number) => {
    let res = await duplicateProject(id);
    if (res) {
      ctaUpdate();
    } else {
      alert("FAILED");
    }
  };

  return (
    <div className="flex flex-col justify-between gap-1 bg-white px-4 py-4 md:px-8 md:py-6 rounded-[16px] shadow-lg w-[100%] md:w-[350px] lg:w-[350px] h-[333px]">
      {group && group.name !== "Aucun Groupe" ? (
        <p className="text-in-single-line text-md md:text-lg lg:text-lg opacity-80">
          {group.name}
        </p>
      ) : (
        <p className="text-in-single-line text-lg opacity-80">Aucun Groupe</p>
      )}
      <p className="text-[1.5rem] md:text-[2rem] lg:text-[2rem] font-bold">
        {project.name}
      </p>
      <p className="text-md md:text-lg lg:text-lg line-clamp-3">
        {project.description ? project.description : "Aucune description"}
      </p>
      <div className="flex items-center justify-between gap-3">
        <p className="mr-auto text-xs md:text-sm lg:text-sm opacity-65">
          Dernières modifications:
        </p>
        <div className="opacity-65 text-xs md:text-sm lg:text-sm flex flex-col items-center">
          <p>{project.updated_at && dateFormater(project.updated_at).date}</p>
          <p>à {project.updated_at && dateFormater(project.updated_at).time}</p>
        </div>
      </div>
      <Divider className="my-3" />
      <div className="flex justify-center items-center gap-5 max-w-[75%] ml-auto mr-auto">
        <Button
          isIconOnly
          aria-label="Supprimer"
          color="danger"
          onClick={() => setIsOpenDialog(true)}
          className="rounded-lg transition-all duration-300 ease-in-out hover:rotate-12 text-md md:text-lg lg:text-lg"
          size="md"
          variant="solid"
        >
          <Trash2 />
        </Button>
        <Button
          color="primary"
          variant="ghost"
          onClick={() => {
            handleDuplicateProject(project.id ?? -1);
          }}
          size="md"
          className="rounded-lg text-md md:text-lg lg:text-lg"
        >
          Copier
        </Button>
        <Button
          color="primary"
          variant="ghost"
          onClick={() => (window.location.href = showProjectUrl)}
          className="rounded-lg text-md md:text-lg lg:text-lg"
          size="md"
        >
          Ouvrir
        </Button>
        {/* <Button
          variant="secondary"
          onClick={() => (window.location.href = showProjectUrl)}
          content="Ouvrir"
          disabled={false}
          image={null}
          size="medium"
          moreClasses="font-bold border-3"
        /> */}
      </div>

      {isOpenDialog && <Dialogs {...dialogProps} />}
    </div>
  );
};
