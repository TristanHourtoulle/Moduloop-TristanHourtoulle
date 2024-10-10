"use client";

import { getSession } from "@lib/session";
import { GroupType } from "@models/Group";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem, SelectSection } from "@nextui-org/select";
import { Key } from "@react-types/shared";
import { databaseToSeveralGroupModel } from "@utils/convert";
import { getGroupsByUserId } from "@utils/database/group";
import { createProjectInDatabase } from "@utils/database/project";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const [idUser, setIdUser] = useState<string>("");
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [value, setValue] = useState<Iterable<Key> | "all" | undefined>(
    undefined
  );
  const [selectedKey, setSelectedKey] = useState(null); // Pour afficher la clé
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupBudget, setGroupBudget] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let res = await getSession();
      const data = await res;
      if (data) {
        await setIdUser(data.user.id);
      } else {
        console.error("Failed to fetch user:", data.error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      if (idUser) {
        let res = await getGroupsByUserId(parseInt(idUser));
        const groupData = await res;
        if (groupData) {
          const backupGroup = {
            id: -2,
            name: "Créer un nouveau groupe",
            description: "",
            budget: "0",
            user_id: Number(idUser),
            image: "",
          };
          groupData.push(backupGroup);
          setGroups(databaseToSeveralGroupModel(groupData.reverse()));
        } else {
          console.error("Failed to fetch groups:", groupData.error);
        }
      }
    };
    fetchGroups();
  }, [idUser]);

  const [createGroup, setCreateGroup] = useState(false);

  const createProject = async () => {
    try {
      const nameProject = document.getElementById(
        "name-createProject"
      ) as HTMLInputElement;
      console.log("Nom du projet:", nameProject.value);
      const groupId = value;
      console.log("Groupe du projet:", groupId);

      if (!nameProject.value) {
        alert("Veuillez renseigner le nom du projet.");
        return;
      } else if (
        nameProject.value.length <= 0 ||
        nameProject.value.length >= 49
      ) {
        alert("Le nom du projet doit contenir entre 1 et 50 caractères.");
        return;
      }

      if (groupId === "-10") {
      } else {
        const formData = new FormData();

        formData.append("user_id", idUser);
        formData.append("name", nameProject.value);
        formData.append("description", "");
        formData.append("company", "");
        formData.append("location", "");
        formData.append("area", "");
        formData.append("budget", "");
        // Convertir `groupId` en une chaîne si c'est un ensemble
        if (groupId && groupId !== "all") {
          const groupAsString = Array.isArray(groupId)
            ? groupId.join(",") // Si c'est un tableau de valeurs
            : Array.from(groupId).join(","); // Si c'est un ensemble
          formData.append("group", groupAsString);
        } else {
          formData.append("group", ""); // Gérer les cas où `groupId` est `undefined` ou `all`
        }
        if (createGroup) {
          const groupNew = document.getElementById(
            "group-NewGroup"
          ) as HTMLInputElement;
          formData.append("group-name", groupNew.value);
          formData.append("group-description", "");
          formData.append("group-budget", "");
        }

        const response = await createProjectInDatabase(formData);

        const data = await response;

        if (data) {
          const createdProject = data;
          toast.success("Le projet a bien été créé !");
          setTimeout(() => {
            window.location.href = "/pages/projects/" + createdProject.id;
          }, 1000);
        } else {
          alert("Failed to create project.");
        }
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
    }
  };

  const handleGroupChange = (value: any) => {
    setCreateGroup(value === "-2" ? true : false);
  };

  return (
    <div>
      <div className="border-2 border-[#D0D0D0] border-opacity-50 mt-[10%] md:mt-[3%] flex flex-col gap-5 px-8 py-4 bg-white items-start justify-center w-[75%] md:w-[50%] lg-[50%] rounded-lg mt-auto mb-auto ml-auto mr-auto">
        {/* Header */}
        <div className="flex flex-col items-start gap-1">
          <h1 className="outfit-regular text-4xl tertiary-color">
            Créer votre projet
          </h1>
          <p className="text-md outfit-light tertiary-color opacity-50">
            Remplissez les champs obligatoire (*) et cliquer sur le bouton
            "créer".
          </p>
        </div>
        {/* Input */}
        {/* <div className="w-[100%]">
          <label
            htmlFor="name-createProject"
            className="block mb-2 text-sm font-bold text-gray-900"
          >
            Nom
          </label>
          <input
            style={{ width: "100%" }}
            id="name-createProject"
            type="text"
            placeholder="Quel est le nom de votre projet ?"
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-md md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
          ></input>
        </div> */}
        <Input
          type="text"
          id="name-createProject"
          placeholder="Quel est le nom de votre projet ?"
          variant="bordered"
          className="outfit-regular text-lg tertiary-color w-[100%]"
          size="lg"
          label="Nom de votre projet"
          labelPlacement="outside"
          radius="full"
        />

        <div className="flex flex-col gap-1 w-[100%]">
          {/* <div className="w-[100%]">
            <label
              htmlFor="group-createProject"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Voulez-vous relié ce projet à un groupe ?
            </label>

            <select
              onChange={handleGroupChange}
              id="group-createProject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-md md:text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option className="" value={-1}>
                Aucun Groupe
              </option>
              {Array.isArray(groups) &&
                groups.map((group) => (
                  <option key={group.id} value={group.id || -10}>
                    {group.name}
                  </option>
                ))}
              <option value="-2">Créer un nouveau groupe</option>
            </select>
          </div> */}
          <div>
            <Select
              items={groups}
              label="Groupe"
              labelPlacement="outside"
              placeholder="Relié ce projet à un groupe ? (exemple: Etage 2)"
              size="lg"
              radius="full"
              variant="bordered"
              className="outfit-regular text-lg tertiary-color w-[100%]"
              defaultOpen={false}
              onSelectionChange={(selected) => {
                setValue(selected as Iterable<Key> | "all");
                const selectedAsString = Array.from(selected).join(","); // Si `selected` est un ensemble, le transformer en chaîne
                handleGroupChange(selectedAsString);
              }}
              selectedKeys={value}
            >
              <SelectSection title={"Vos groupes"} className="text-black">
                {groups.map((group) => (
                  <SelectItem
                    key={group.id ?? "-2"}
                    value={group.id ?? "-3"}
                    className="text-black font-outfit text-xl"
                  >
                    {group.name ?? "Aucun nom"}
                  </SelectItem>
                ))}
              </SelectSection>
            </Select>

            {/* Affichage de la clé sélectionnée */}
            {/* {value && (
              <p className="mt-4">Clé de l'élément sélectionné : {value}</p>
            )} */}
          </div>

          {createGroup && (
            // <div className=" flex flex-col gap-1">
            //   <label hidden htmlFor="group-NewGroup" className="form-label">
            //     Nom du Groupe
            //   </label>
            //   <input
            //     style={{ width: "100%" }}
            //     id="group-NewGroup"
            //     type="text"
            //     placeholder="Quel est le nom de votre nouveau groupe ?"
            //     className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
            //   ></input>
            // </div>
            <Input
              type="text"
              id="group-NewGroup"
              placeholder="Quel est le nom de votre nouveau groupe ?"
              variant="bordered"
              className="outfit-regular text-lg tertiary-color w-[100%]"
              size="lg"
              label="Nom de votre groupe"
              labelPlacement="outside"
              radius="full"
            />
          )}
        </div>

        {/* Cta */}
        {/* <div
          onClick={createProject}
          className="py-2 px-4 border-2 border-[#30C1BD] rounded-[8px] bg-primary-transparent cursor-pointer transition-all duration-250 hover:opacity-50"
        >
          <p className="text-md md:text-lg font-bold text-[#30C1BD]">Créer</p>
        </div> */}
        <div className="flex items-center justify-between w-full">
          <Button
            color="primary"
            onClick={() => {}}
            size="lg"
            variant="ghost"
            className="text-md rounded-full outfit-regular px-[10%] mt-2"
          >
            Annuler
          </Button>
          <Button
            color="primary"
            onClick={createProject}
            size="lg"
            className="text-md rounded-full outfit-regular px-[10%] mt-2"
          >
            Créer
          </Button>
        </div>
      </div>
    </div>
  );
}

export default page;
