import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { deleteProject, duplicateProject } from "@utils/database/project";
import { ArrowUpRight, Copy, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export type ProjectCardProps = {
  project: any;
  ctaUpdate: (res: any, baseId: number) => void;
  ctaDelete: (id: number) => void;
};

export const ProjectCard = (props: ProjectCardProps) => {
  const { project, ctaUpdate, ctaDelete } = props;
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
      ctaDelete(id);
      setIsOpenDialog(false);
    } else {
      alert("FAILED");
      setIsOpenDialog(false);
    }
  };

  const handleDuplicateProject = async (id: number) => {
    let res = await duplicateProject(id);
    console.log("res:", res);
    if (res) {
      ctaUpdate(res, id); // Passe le projet dupliqué à la fonction de mise à jour
    } else {
      alert("FAILED");
    }
  };

  return (
    <div className="px-4 py-4 md:px-8 md:py-6 bg-white rounded-lg border-2 border-[#D0D0D0] flex flex-col justify-between gap-3 w-[100%] md:w-[350px] lg:w-[425px] h-full md:h-[275px] w-full">
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-1 w-full max-w-[75%]">
          <p className="outfit-regular text-2xl tertiary-color">
            {project.name}
          </p>
          <div className="flex items-center justify-center rounded-full px-[5%] py-[2.5%] border-2 border-[#2b2c2d] w-fit">
            <p className="text-sm tertiary-color outfit-light">
              {group && group.name !== "Aucun Groupe"
                ? group.name
                : "Aucun Groupe"}
            </p>
          </div>
        </div>

        <Button
          isIconOnly
          aria-label="Supprimer"
          color="danger"
          onClick={() => setIsOpenDialog(true)}
          className="rounded-full bg-white border-[#FF0000] border-2 transition-all duration-300 ease-in-out hover:rotate-12"
          size="lg"
          variant="solid"
        >
          <Trash2 className="text-[#FF0000]" />
        </Button>
      </div>

      {/* Description */}
      <p className="text-md md:text-lg lg:text-lg outfit-light tertiary-color opacity-75 line-clamp-3">
        {project.description ? project.description : "Aucune description"}
      </p>

      <Divider className="my-3" />

      {/* CTA Section */}
      <div className="flex items-center justify-between">
        <Button
          color="primary"
          variant="ghost"
          onClick={() => {
            handleDuplicateProject(project.id ?? -1);
          }}
          size="md"
          className="rounded-full text-md outfit-regular"
          endContent={<Copy />}
        >
          Dupliquer
        </Button>
        <Link
          href={`${showProjectUrl}`}
          className="bg-primary text-white py-2 px-4 rounded-full text-md outfit-regular flex items-center justify-center hover:bg-opacity-85 transition-all"
        >
          Ouvrir
          <ArrowUpRight className="ml-2" />
        </Link>
      </div>
      {isOpenDialog && <Dialogs {...dialogProps} />}
    </div>
  );
};
