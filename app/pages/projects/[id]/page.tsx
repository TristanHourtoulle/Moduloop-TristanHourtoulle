"use client";

import Loader from "@components/Loader";
import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import ImpactSection from "@components/projects/ImpactSection";
import ProductInProjectCard from "@components/projects/ProductInProjectCard";
import { ShowInformations } from "@components/projects/ShowInformations";
import { useRenderPNG } from "@components/projects/download/UseRenderPng";
import {
  useProductsInProject,
  useProject,
  useStoreProducts,
  useUpdateProductsInProject,
} from "@hooks/useProjectData";
import { ProductType } from "@models/Product";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Tooltip } from "@nextui-org/tooltip";
import { useQueryClient } from "@tanstack/react-query";
import { Download, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const queryClient = useQueryClient();
  const { data: project, isLoading: isProjectLoading } = useProject(Number(id));
  const { data: productsInProject = [], refetch: refetchProducts } =
    useProductsInProject(Number(id));
  const { data: storeProducts = { inies: [], autres: [] } } =
    useStoreProducts();
  const { add, clear } = useUpdateProductsInProject();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [section, setSection] = useState<string>("products");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);
  const { downloadPNG } = useRenderPNG({
    project,
    setIsLoading: setIsDownloadLoading,
  });

  const ctaSave = () => {
    queryClient.invalidateQueries({ queryKey: ["project", Number(id)] }); // Invalider la cache pour forcer un refetch
  };

  // Filtrer les produits à ajouter
  const selectedProduct = storeProducts.inies
    .concat(storeProducts.autres)
    .find((p: any) => p.id === selectedProductId);

  // Suppression des produits
  const deleteAllProducts = async () => {
    try {
      await clear(Number(id));
    } catch (error) {
    } finally {
      setDialogOpen(false);
    }
  };

  // Ajout d'un produit
  const addProduct = async (quantityNew: number, quantityUsed: number) => {
    if (!selectedProductId || (!quantityNew && !quantityUsed)) {
      toast.error(
        "Veuillez sélectionner un produit et indiquer une quantité valide."
      );
      return;
    }
    try {
      await add({
        idProject: Number(id),
        product: selectedProductId,
        qNew: quantityNew,
        qUsed: quantityUsed,
      });
      refetchProducts(); // Rafraîchir la liste des produits
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Erreur lors de l'ajout du produit.");
    }
  };

  // Afficher un loader si le projet n'est pas encore chargé
  if (isProjectLoading) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader />
      </div>
    );
  }

  const dialogProps: DialogsProps = {
    title: "Supprimer tous les produits",
    content: "Voulez-vous vraiment supprimer tous les produits ?",
    validate: "Confirmer",
    cancel: "Annuler",
    cta: deleteAllProducts,
    cancelCta: () => setDialogOpen(false),
  };

  return (
    <div className="project-page w-full">
      {/* Header */}
      <div className="flex flex-col lg:flex-row gap-2 items-start lg:items-center justify-between w-full">
        {/* Colonne gauche avec le titre et les informations */}
        <div className="flex items-center gap-3">
          {/* <Title {...title} /> */}
          <Button
            isIconOnly
            color="danger"
            onClick={() => history.back()}
            size="lg"
            className="text-md rounded-full outfit-regular w-full"
          >
            <X strokeWidth={1.5} />
          </Button>
          <h2 className="outfit-semibold text-xl lg:text-4xl tertiary-color tracking-wider">
            {project?.name}
          </h2>
          <Chip
            size="lg"
            color="primary"
            variant="flat"
            className="outfit-regular text-xs lg:text-sm"
          >
            {project && project.groupInfo
              ? project.groupInfo.name
              : "N'appartient à aucun groupe"}
          </Chip>
        </div>

        {/* Colonne droite avec les boutons */}
        <div className="flex items-center gap-3 lg:ml-auto">
          <Tooltip
            content={
              <div className="px-1 py-2 max-w-[300px]">
                <div className="text-sm outfit-regular">
                  {
                    "Télécharge un fichier contenant un récapitulatif complet de votre projet. C'est-à-dire l'ensemble des produits et de leur quantité, l'impact de ce projet ainsi que des comparaisons avec d'autres projets."
                  }
                </div>
              </div>
            }
            showArrow={true}
            color="default"
            className="categorize"
          >
            <Button
              color="primary"
              startContent={
                isDownloadLoading === false ? (
                  <Download strokeWidth={1.5} />
                ) : (
                  <></>
                )
              }
              onClick={() => {
                setIsDownloadLoading(true);
                downloadPNG().then(() => {
                  setIsDownloadLoading(false);
                });
              }}
              size="lg"
              variant="ghost"
              className="text-md rounded-full outfit-regular w-full"
              isLoading={isDownloadLoading}
            >
              Télécharger
            </Button>
          </Tooltip>

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
            showArrow={true}
            color="default"
            className="categorize"
          >
            <ShowInformations project={project} ctaSave={ctaSave} />
          </Tooltip>
        </div>
      </div>

      {/* Products */}
      {project && productsInProject ? (
        <div className="mt-5">
          <div className="px-0 lg:px-0">
            <div className="flex md:items-end justify-between">
              <div className="flex flex-wrap md:items-end w-full">
                {section === "products" && (
                  <div className="flex flex-wrap gap-3 w-full items-center">
                    <div className="text-lg flex flex-wrap items-center gap-2 w-full">
                      <Select
                        items={storeProducts.inies}
                        labelPlacement="outside"
                        label="Aménagement intérieur"
                        placeholder="ex: Cloison en plâtre"
                        size="lg"
                        variant="bordered"
                        radius="full"
                        className="max-w-xs text-lg rounded-full bg-white font-outfit"
                        onChange={(event) => {
                          setSelectedProductId(parseInt(event.target.value));
                        }}
                      >
                        {(product: ProductType) => (
                          <SelectItem
                            key={product.id ?? -1}
                            value={product.id ?? -1}
                            className="text-black font-outfit text-lg"
                          >
                            {product.name?.replace("Inies - ", "")}
                          </SelectItem>
                        )}
                      </Select>
                      <Input
                        type="text"
                        isReadOnly
                        label="Unité"
                        labelPlacement="outside"
                        value={selectedProduct?.unit ?? ""}
                        variant="bordered"
                        size="lg"
                        radius="full"
                        className="w-[150px] max-w-[20%] text-lg bg-white rounded-full outfit-regular"
                      />
                      <Input
                        type="number"
                        label="Quantité Neuve"
                        labelPlacement="outside"
                        size="lg"
                        id="qNew-addProduct-AI"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-lg bg-white rounded-full outfit-regular"
                      />

                      <Input
                        type="number"
                        label="Quantité Réemploi"
                        labelPlacement="outside"
                        id="qUsed-addProduct-AI"
                        size="lg"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-md bg-white rounded-full outfit-regular"
                      />

                      <Button
                        color="primary"
                        variant="ghost"
                        className="text-md rounded-full outfit-regular mt-6"
                        size="lg"
                        onClick={() => {
                          const qNewInput = document.getElementById(
                            "qNew-addProduct-AI"
                          ) as HTMLInputElement;
                          const qUsedInput = document.getElementById(
                            "qUsed-addProduct-AI"
                          ) as HTMLInputElement;

                          const qNew = parseInt(qNewInput?.value || "0", 10);
                          const qUsed = parseInt(qUsedInput?.value || "0", 10);

                          if (
                            isNaN(qNew) ||
                            isNaN(qUsed) ||
                            (qNew === 0 && qUsed === 0)
                          ) {
                            toast.error("Veuillez saisir une quantité valide.");
                            return;
                          }

                          addProduct(qNew, qUsed);
                        }}
                      >
                        Ajouter
                      </Button>
                    </div>

                    <div className="flex lg:hidden items-center justify-center w-full">
                      <Divider />
                    </div>

                    <div className="text-lg flex flex-wrap items-center gap-2 w-full">
                      <Select
                        items={storeProducts.autres}
                        labelPlacement="outside"
                        label="Mobilier"
                        placeholder="ex: Chaise en bois et textile"
                        size="lg"
                        variant="bordered"
                        radius="full"
                        className="max-w-xs text-lg rounded-full bg-white font-outfit"
                        onChange={(event) => {
                          setSelectedProductId(parseInt(event.target.value));
                        }}
                      >
                        {(product: any) => (
                          <SelectItem
                            key={product.id ?? -1}
                            value={product.id ?? -1}
                            className="text-black font-outfit text-lg"
                          >
                            {product.name?.replace("Inies - ", "")}
                          </SelectItem>
                        )}
                      </Select>
                      <Input
                        type="text"
                        isReadOnly
                        label="Unité"
                        labelPlacement="outside"
                        value={selectedProduct?.unit ?? ""}
                        variant="bordered"
                        size="lg"
                        radius="full"
                        className="w-[150px] max-w-[20%] text-lg bg-white rounded-full outfit-regular"
                      />
                      <Input
                        type="number"
                        label="Quantité Neuve"
                        labelPlacement="outside"
                        size="lg"
                        id="qNew-addProduct"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-lg bg-white rounded-full outfit-regular"
                      />

                      <Input
                        type="number"
                        label="Quantité Réemploi"
                        labelPlacement="outside"
                        id="qUsed-addProduct"
                        size="lg"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-md bg-white rounded-full outfit-regular"
                      />

                      <Button
                        color="primary"
                        variant="ghost"
                        className="text-md rounded-full outfit-regular mt-6"
                        size="lg"
                        onClick={() => {
                          const qNewInput = document.getElementById(
                            "qNew-addProduct"
                          ) as HTMLInputElement;
                          const qUsedInput = document.getElementById(
                            "qUsed-addProduct"
                          ) as HTMLInputElement;

                          const qNew = parseInt(qNewInput?.value || "0", 10);
                          const qUsed = parseInt(qUsedInput?.value || "0", 10);

                          if (
                            isNaN(qNew) ||
                            isNaN(qUsed) ||
                            (qNew === 0 && qUsed === 0)
                          ) {
                            toast.error("Veuillez saisir une quantité valide.");
                            return;
                          }

                          addProduct(qNew, qUsed);
                        }}
                      >
                        Ajouter
                      </Button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:items-end md:gap-8"></div>
                  </div>
                )}
              </div>
              {/* Dialog */}
              {dialogOpen && <Dialogs {...dialogProps} />}
            </div>

            {section === "products" && (
              <div className="flex items-center justify-center my-[5%] md:my-[2%]">
                <Divider />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-1 md:gap-5 text-lg">
              {section === "products" &&
                productsInProject &&
                productsInProject.length > 0 &&
                productsInProject[0] && (
                  <Button
                    color="primary"
                    size="lg"
                    radius="full"
                    onClick={() => {
                      section === "products"
                        ? setSection("impact")
                        : setSection("products");
                    }}
                    className="text-lg w-fit-content rounded-full outfit-regular"
                  >
                    {section === "products"
                      ? "Calculer l'impact"
                      : "Revenir au(x) produit(s)"}
                  </Button>
                )}
            </div>
          </div>
          {section === "products" ? (
            <div className="my-[5%] md:my-[2%] flex flex-wrap items-center justify-between gap-y-3 md:gap-5">
              {(productsInProject && productsInProject.length === 0) ||
              !productsInProject ||
              productsInProject === undefined ||
              !productsInProject[0] ? (
                <div className="mt-10 flex flex-col gap-7 items-center justify-center">
                  <p className="text outfit-regular">
                    Il n'y a pas de produits dans votre projet...
                  </p>
                </div>
              ) : (
                productsInProject?.map((product, index) => {
                  return (
                    <ProductInProjectCard
                      product={product}
                      qNewReceived={product?.qNew || 0}
                      qUsedReceived={product?.qUsed || 0}
                      idProject={Number(id)}
                      key={index}
                      ctaDelete={() => {
                        // updateProductsInProject();
                        refetchProducts();
                      }}
                    />
                  );
                })
              )}
            </div>
          ) : (
            <div>
              <ImpactSection
                projectId={project.id ?? 0}
                ctaView={(view: string) => {
                  setSection(view);
                }}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-7 items-center justify-center">
          <p className="text">Il n'y a pas de produits dans votre projet...</p>
        </div>
      )}
    </div>
  );
}
