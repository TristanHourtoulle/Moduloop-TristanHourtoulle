"use client";

import { TitleType } from "@models/Title";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function isOnlyNumber(str: string) {
  return /^\d+$/.test(str);
}

export const Title = (title: TitleType) => {
  const [nameOfPage, setNameOfPage] = useState(title.number || "");
  const [displayChange, setDisplayChange] = useState(false);
  const [apiRoutes, setApiRoutes] = useState<string>("");
  const [isApiRoutesSet, setIsApiRoutesSet] = useState(false);
  const router = useRouter();

  if (!isApiRoutesSet && title.back === "/pages/projects") {
    setApiRoutes(`/api/project`);
    setIsApiRoutesSet(true);
  }

  useEffect(() => {
    if (title.number !== undefined) {
      setNameOfPage(title.number || "");
    } else if (title.number === null) setNameOfPage("");
  }, [title.number]);

  const handleSubmitTitle = async () => {
    try {
      const tempApiRoutes = `${apiRoutes}?id=${title.id_project}&name=${nameOfPage}`;
      const res = await fetch(tempApiRoutes, {
        method: "PUT",
      });
      if (!res.ok) {
        alert("ERROR");
        throw new Error("Erreur lors de la modification du titre");
      }
      setDisplayChange(false);
    } catch (error) {
      console.error(error);
      alert("Erreur lors de la modification du titre");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameOfPage(e.target.value);
  };

  const handleCancelChangeTitle = () => {
    setNameOfPage(title.number || "");
    setDisplayChange(false);
  };

  return (
    <div className="flex ml-5 mr-5 gap-5 items-center md:mr-0 lg:mr-0">
      <div
        className="cursor-pointer"
        onClick={() => {
          router.back();
        }}
      >
        <Image
          src={title.image || ""}
          alt="Page Logo"
          width={50}
          height={50}
          className=""
        />
      </div>

      <h1 className="font-bold text-[1.5rem] md:text-[3rem] lg:text-[3rem]">
        {title.title}
      </h1>

      {title.canChange && (
        <div className="flex gap-5">
          {displayChange ? (
            <input
              onChange={handleChange}
              type="text"
              className="title-input"
              value={nameOfPage}
            />
          ) : (
            <p className="page-number">{nameOfPage}</p>
          )}

          {!displayChange ? null : (
            <div className="flex">
              <Image
                src={"/icons/validé.svg"}
                alt={"Change"}
                width={50}
                height={50}
                className="cursor-pointer"
                onClick={() => handleSubmitTitle()}
              />
              <Image
                src="/icons/close.svg"
                alt="Cancel"
                width={50}
                height={50}
                className="cursor-pointer"
                onClick={() => handleCancelChangeTitle()}
              />
            </div>
          )}
        </div>
      )}

      {!title.canChange && (
        <p className="page-number font-bold text-[1.5rem] md:text-[3rem] lg:text-[3rem] ml-auto">
          {title.number}
        </p>
      )}
    </div>
  );
};
