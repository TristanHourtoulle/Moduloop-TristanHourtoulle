"use client";

import { Title } from "@components/Title";
import { GroupType } from "@models/Group";
import { TitleType } from "@models/Title";
import { databaseToSeveralGroupModel } from "@utils/convert";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function page() {
  const [idUser, setIdUser] = useState<string>("");
  const [groups, setGroups] = useState<GroupType[]>([]);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [groupBudget, setGroupBudget] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch("/api/session", {
        method: "GET",
      });
      const data = await res.json();
      if (data.success) {
        await setIdUser(data.session.user.id);
      } else {
        console.error("Failed to fetch user:", data.error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      if (idUser) {
        let res = await fetch(
          `/api/group/list?id=${encodeURIComponent(idUser)}`,
          {
            method: "GET",
          }
        );
        const groupData = await res.json();
        if (groupData.success) {
          setGroups(databaseToSeveralGroupModel(groupData.data));
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
      const groupId = document.getElementById(
        "group-createProject"
      ) as HTMLSelectElement;

      if (!nameProject.value) {
        alert("Veuillez renseigner le nom du projet.");
        return;
      } else if (
        nameProject.value.length <= 4 ||
        nameProject.value.length >= 49
      ) {
        alert("Le nom du projet doit contenir entre 5 et 50 caractères.");
        return;
      }

      if (groupId.value === "-10") {
      } else {
        const formData = new FormData();

        formData.append("user_id", idUser);
        formData.append("name", nameProject.value);
        formData.append("description", "");
        formData.append("company", "");
        formData.append("location", "");
        formData.append("area", "");
        formData.append("budget", "");
        formData.append("group", groupId.value);
        if (createGroup) {
          const groupNew = document.getElementById(
            "group-NewGroup"
          ) as HTMLInputElement;
          formData.append("group-name", groupNew.value);
          formData.append("group-description", "");
          formData.append("group-budget", "");
        }

        const response = await fetch("/api/project", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data.success) {
          const createdProject = data.data;
          toast.success("Le projet à bien été créé, vous allez être redirigé.");
          setTimeout(() => {
            window.location.href = "/pages/projects/" + createdProject.id;
          }, 2000);
        } else {
          alert("Failed to create project.");
        }
      }
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      //   window.location.href = "/pages/projects";
      // TODO: redirect to the project page just created ! :)
    }
  };

  const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCreateGroup(e.target.value === "-2" ? true : false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("user_id", idUser);
      const name = e.currentTarget.name;
      if (typeof name === "string") {
        formData.append("name", name);
      }
      formData.append("description", e.currentTarget.description.value);
      formData.append("company", e.currentTarget.company.value);
      formData.append("location", e.currentTarget.location.value);
      formData.append("area", e.currentTarget.area.value);
      formData.append("budget", e.currentTarget.budget.value);
      formData.append("group", e.currentTarget.group.value);
      if (createGroup) {
        formData.append("group-name", groupName);
        formData.append("group-description", groupDescription);
        formData.append("group-budget", groupBudget);
      }

      const response = await fetch("/api/project", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.href = "/pages/projects";
      } else {
        alert("Failed to create project.");
      }
    } catch (error) {
      alert(error);
    }
  };

  const title: TitleType = {
    title: "Votre nouveau projet",
    image: "/icons/close.svg",
    number: "",
    back: "/pages/projects",
    canChange: false,
    id_project: undefined,
  };

  return (
    <div>
      <Title {...title} />

      <div className="mt-[3%] flex flex-col gap-5 px-8 py-4 bg-white items-center justify-center w-[50%] rounded-[16px] ml-auto mr-auto">
        {/* Header */}
        {/* Input */}
        <div className="w-[100%]">
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
            className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
          ></input>
        </div>

        <div className="flex flex-col gap-1 w-[100%]">
          <div className="w-[100%]">
            <label
              htmlFor="group-createProject"
              className="block mb-2 text-sm font-bold text-gray-900"
            >
              Voulez-vous relié ce projet à un groupe ?
            </label>

            <select
              onChange={handleGroupChange}
              id="group-createProject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
          </div>

          {createGroup && (
            <div className=" flex flex-col gap-1">
              <label hidden htmlFor="group-NewGroup" className="form-label">
                Nom du Groupe
              </label>
              <input
                style={{ width: "100%" }}
                id="group-NewGroup"
                type="text"
                placeholder="Quel est le nom de votre nouveau groupe ?"
                className="text-left bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
              ></input>
            </div>
          )}
        </div>

        {/* Cta */}
        <div
          onClick={createProject}
          className="py-2 px-4 border-2 border-[#30C1BD] rounded-[8px] bg-primary-transparent cursor-pointer transition-all duration-250 hover:opacity-50"
        >
          <p className="text-lg font-bold text-[#30C1BD]">Créer</p>
        </div>
      </div>
    </div>
  );
}

export default page;
