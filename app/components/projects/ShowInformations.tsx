import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/features/Sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/input/Select";

import { Button } from "@components/button/Button";
import { Input } from "@components/input/Input";
import { Label } from "@components/input/Label";
import { Textarea } from "@components/input/TextArea";
import { getGroupsByUserId } from "@utils/database/group";
import { updateAllFieldsInProject } from "@utils/database/project";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type ShowInformationsProps = {
  project: any;
  ctaSave: () => void;
};

export const ShowInformations = ({
  project,
  ctaSave,
}: ShowInformationsProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userGroups, setUserGroups] = useState<any[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(
    project.groupInfo ? project.groupInfo.id ?? null : null
  );

  const [selectedName, setSelectedName] = useState<string | null>(
    project.name // Initialisez la valeur avec la valeur actuelle du projet
  );
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    project.description // Initialisez la valeur avec la valeur actuelle du projet
  );

  const [backupData, setBackupData] = useState<any>({
    name: project.name,
    description: project.description,
    group: project.groupInfo ? project.groupInfo.id ?? null : null,
  });

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      const data = {
        name: selectedName,
        description: selectedDescription,
        group_id: selectedGroup,
      };
      if (data.group_id === "-1") {
        data.group_id = null;
      }
      const newProject = {
        ...project,
        name: selectedName,
        description: selectedDescription,
        group: selectedGroup,
      };
      const response = await updateAllFieldsInProject(newProject);
      if (!response) {
        toast.error(
          "Une erreur est survenue au moment de la sauvegarde. Veuillez réessayer."
        );
        setIsLoading(false);
        return;
      }
      ctaSave();
      setIsLoading(false);
      toast.success("Les informations ont été sauvegardées avec succès.");
    } catch (error: any) {
      toast.error(
        "Une erreur est survenue au moment de la sauvegarde. Veuillez réessayer."
      );
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const idUser = project?.user_id;

      if (!idUser) return;
      const data = await getGroupsByUserId(idUser);
      setUserGroups(data);
      setIsLoading(false);
    };
    fetchData();
  }, [project]);

  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/icons/Edit.svg"
          alt="Change"
          width={50}
          height={50}
          className="cursor-pointer hover:opacity-50 transition-opacity duration-200"
        />
      </SheetTrigger>

      {!isLoading && (
        <SheetContent side={"right"}>
          <SheetHeader>
            <SheetTitle>Informations du projet</SheetTitle>
            <SheetDescription>
              Faites des modifications sur les informations de votre projet ici.
              Cliquez sur "sauvegarder" une fois que vous avez mis à jour vos
              données.
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nom
              </Label>
              <Input
                id="name"
                value={selectedName ?? ""}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setSelectedName(event.target.value)
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={selectedDescription ?? ""}
                className="col-span-3"
                onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setSelectedDescription(event.target.value)
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="group" className="text-right">
                Groupe
              </Label>
              <div style={{ width: "150px" }}>
                <Select onValueChange={(value) => setSelectedGroup(value)}>
                  <SelectTrigger className="w-full">
                    {project.groupInfo ? (
                      <SelectValue placeholder={project.groupInfo.name} />
                    ) : (
                      <SelectValue placeholder="Aucun Groupe" />
                    )}
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"-1"}>Aucun Groupe</SelectItem>
                    {userGroups &&
                      Array.isArray(userGroups) &&
                      userGroups.length > 0 &&
                      userGroups.map((group) => (
                        <SelectItem key={group.id} value={group.id}>
                          {group.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <SheetFooter>
            <SheetClose asChild>
              {(backupData.name !== selectedName ||
                backupData.description !== selectedDescription ||
                String(backupData.group) !== selectedGroup) && (
                <Button
                  variant="secondary"
                  onClick={handleSaveChanges}
                  image={null}
                  size="small"
                  content="Enregistrer"
                  disabled={isLoading}
                  moreClasses="ml-auto mr-auto"
                />
              )}
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      )}
    </Sheet>
  );
};
