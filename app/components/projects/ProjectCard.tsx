import { Button } from "@components/button/Button";
import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import { deleteProject, duplicateProject } from "@utils/database/project";
import dateFormater from "@utils/dateFormater";
import Image from "next/image";
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
    <div className="flex flex-col project-card gap-2 project-zoom">
      {group && group.name !== "Aucun Groupe" ? (
        <p className="text-in-single-line text-lg opacity-80">{group.name}</p>
      ) : (
        <p className="text-in-single-line text-lg opacity-80">Aucun Groupe</p>
      )}
      <p className="name text-in-single-line">{project.name}</p>
      <p className="description text-in-single-line">
        {project.description ? project.description : "Aucune description"}
      </p>
      <div className="flex">
        <p className="date mr-auto">Dernières modifications:</p>
        <p className="date mr-5">
          {project.updated_at && dateFormater(project.updated_at).date} à{" "}
          {project.updated_at && dateFormater(project.updated_at).time}
        </p>
      </div>
      <div className="line"></div>
      <div className="flex justify-center items-center gap-5">
        <div
          className="flex items-center gap-2 delete-btn cursor-pointer"
          onClick={() => setIsOpenDialog(true)}
        >
          <Image
            src="/icons/trash-can.svg"
            alt="Supprimer le projet"
            width={30}
            height={30}
          />
        </div>
        <Button
          variant="secondary"
          onClick={() => {
            handleDuplicateProject(project.id ?? -1);
          }}
          content="Dupliquer"
          disabled={false}
          image={null}
          size="medium"
          moreClasses="font-bold border-3"
        />
        <Button
          variant="secondary"
          onClick={() => (window.location.href = showProjectUrl)}
          content="Ouvrir"
          disabled={false}
          image={null}
          size="medium"
          moreClasses="font-bold border-3"
        />
      </div>

      {isOpenDialog && <Dialogs {...dialogProps} />}
    </div>
  );
};
