import {
  Sheet,
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

import { Input } from "@components/input/Input";
import { Label } from "@components/input/Label";
import { Textarea } from "@components/input/TextArea";
import { Button as Button2 } from "@/components/ui-compat/button";
import { Tooltip } from "@/components/ui-compat/tooltip";
import { getGroupsByUserId } from "@utils/database/group";
import { updateAllFieldsInProject } from "@utils/database/project";
import { Settings } from "lucide-react";
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
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false); // État pour contrôler la fermeture de la popup
  const [userGroups, setUserGroups] = useState<any[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<string | null>(
    project?.groupInfo ? project.groupInfo.id ?? null : null
  );

  const [selectedName, setSelectedName] = useState<string | null>(
    project?.name ?? null // Initialisez la valeur avec la valeur actuelle du projet
  );
  const [selectedDescription, setSelectedDescription] = useState<string | null>(
    project?.description ?? null // Initialisez la valeur avec la valeur actuelle du projet
  );

  const [backupData, setBackupData] = useState<any>({
    name: project?.name ?? null,
    description: project?.description ?? null,
    group: project?.groupInfo ? project.groupInfo.id ?? null : null,
  });

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);

      const newProject = {
        id: project.id,
        name: selectedName,
        description: selectedDescription,
        group: selectedGroup === "-1" ? null : selectedGroup,
        products: project.products,
      };

      const response = await updateAllFieldsInProject(newProject);
      console.log("response", response);
      if (!response) {
        console.log("Error updating project 1");
        toast.error(
          "Une erreur est survenue au moment de la sauvegarde. Veuillez réessayer."
        );
        setIsLoading(false);
        return;
      }

      // Mettre à jour les données de backup après sauvegarde réussie
      setBackupData({
        name: selectedName,
        description: selectedDescription,
        group: selectedGroup,
      });

      toast.success("Projet mis à jour avec succès !");
      ctaSave();
      setIsSheetOpen(false); // Fermer la popup une fois la sauvegarde terminée
    } catch (error: any) {
      console.log("Error updating project 2", error);
      toast.error(
        "Une erreur est survenue au moment de la sauvegarde. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false); // Arrêter le chargement même en cas d'erreur
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
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger>
        <Tooltip
          content={
            <div className="px-1 py-2 max-w-[300px]">
              <div className="text-sm outfit-regular">
                {
                  "Accéder aux paramètres de votre projet. Vous pourrez modifier le nom de votre projet, le groupe auquel il appartient, ou encore la description."
                }
              </div>
            </div>
          }
          showArrow={false}
          color="default"
          className="categorize"
        >
          <Settings
            strokeWidth={1.5}
            size={45}
            className="cursor-pointer transition-opacity duration-200 px-2 py-2 rounded-full border-2 border-[#30c1bd] text-[#30c1bd] hover:bg-[#30c1bd] hover:bg-opacity-25"
          />
        </Tooltip>
      </SheetTrigger>

      <SheetContent side={"right"} className="outfit-regular">
        <SheetHeader>
          <SheetTitle>Informations du projet</SheetTitle>
          <SheetDescription>
            Faites des modifications sur les informations de votre projet ici.
            Cliquez sur "sauvegarder" une fois que vous avez mis à jour vos
            données.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4 outfit-regular text-xs lg:text-md">
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
                  {project?.groupInfo ? (
                    <SelectValue placeholder={project.groupInfo.name} />
                  ) : (
                    <SelectValue placeholder="Aucun Groupe" />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <option value={"-1"}>Aucun Groupe</option>
                  {userGroups &&
                    Array.isArray(userGroups) &&
                    userGroups.length > 0 &&
                    userGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <SheetFooter>
          {(backupData.name !== selectedName ||
            backupData.description !== selectedDescription ||
            String(backupData.group) !== selectedGroup) && (
            <Button2
              color="primary"
              size="lg"
              onClick={handleSaveChanges}
              disabled={isLoading}
              className="w-full"
              isLoading={isLoading}
            >
              Sauvegarder
            </Button2>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
