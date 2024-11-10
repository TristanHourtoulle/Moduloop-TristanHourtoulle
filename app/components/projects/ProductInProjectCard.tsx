import { AddProductType } from "@/models/AddProduct";
import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import {
  deleteProductInProject,
  updateProductInProject,
} from "@utils/database/project";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductInProjectCard = (props: {
  product: AddProductType;
  idProject: number;
  qNewReceived: number;
  qUsedReceived: number;
  ctaDelete: () => void;
}) => {
  const { product, idProject, qNewReceived, qUsedReceived, ctaDelete } = props;
  const [qNew, setQNew] = useState(qNewReceived);
  const [initialQNew, setInitialQNew] = useState(qNewReceived);
  const [qUsed, setQUsed] = useState(qUsedReceived);
  const [initialQUsed, setInitialQUsed] = useState(qUsedReceived);
  const [isDifferent, setIsDifferent] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [base, setBase] = useState<string>("Inies");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dialogProps: DialogsProps = {
    title: "Supprimer ce produit du projet",
    content:
      "Êtes-vous sûr de vouloir supprimer ce produit du projet ? Cette action est irréversible.",
    validate: "Confirmer",
    cancel: "Annuler",
    cta: () => confirmDeleteProduct(),
    cancelCta: () => setDialogOpen(false),
  };

  useEffect(() => {
    // Mettre à jour les états locaux lorsque les nouvelles quantités sont reçues via les props
    setQNew(qNewReceived);
    setQUsed(qUsedReceived);
  }, [qNewReceived, qUsedReceived]); // Exécuter l'effet chaque fois que qNewReceived ou qUsedReceived change

  const handleAdd = async () => {
    setIsLoading(true);
    const addProduct: AddProductType = {
      product: product.product,
      idProject: idProject,
      qNew: qNew,
      qUsed: qUsed,
      addOn: null,
      updatedOn: null,
    };

    let res = await updateProductInProject(addProduct);

    if (res) {
      // toast.success(
      //   "Quantité correctement modifié ! La page va se recharger...",
      //   { duration: 2000 }
      // );
      setInitialQNew(qNew);
      setInitialQUsed(qUsed);
      setIsDifferent(false);
      ctaDelete();
      setIsLoading(false);
    } else {
      console.error("Erreur lors de l'ajout du produit au projet");
      toast.error("Erreur lors de l'ajout du produit au projet.", {
        duration: 2000,
      });
      setIsLoading(false);
    }
  };

  const handleQNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setQNew(newValue);
    if ((newValue !== initialQNew || qUsed !== initialQUsed) && !isDifferent) {
      setIsDifferent(true);
    } else if (
      isDifferent &&
      newValue === initialQNew &&
      qUsed === initialQUsed
    ) {
      setIsDifferent(false);
    }
  };

  const handleQUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setQUsed(newValue);
    if ((qNew !== initialQNew || newValue !== initialQUsed) && !isDifferent) {
      setIsDifferent(true);
    } else if (
      isDifferent &&
      qNew === initialQNew &&
      newValue === initialQUsed
    ) {
      setIsDifferent(false);
    }
  };

  const handleDeleteProduct = () => {
    setDialogOpen(true);
  };

  const confirmDeleteProduct = async () => {
    if (product.product !== undefined && product.product[0].id !== null) {
      let res = await deleteProductInProject(idProject, product.product[0].id);
      if (res) {
        toast.success("Produit supprimé du projet");
        setDialogOpen(false);
        ctaDelete();
      } else {
        setDialogOpen(false);
        console.error("Erreur lors de la suppression du produit du projet");
        toast.error("Erreur lors de la suppression du produit du projet.");
      }
    }
    setDialogOpen(false);
  };

  useEffect(() => {
    if (
      product.product?.[0]?.name &&
      !product.product[0].name.includes("Inies")
    ) {
      setBase("Autres");
    }
  }, []);

  return (
    <div className="px-6 py-6 max-w-[350px] md:w-auto h-auto flex flex-col justify-between bg-white rounded-[16px] shadow-md transition-all duration-400">
      {/* Header */}
      <div className="flex flex-wrap gap-5 item-center justify-between">
        <div className="flex flex-col items-start">
          <p className="text-lg outfit-regular md:text-xl tertiary-color">
            {product.product?.[0]?.name?.replace("Inies - ", "")}
          </p>
          <div className="flex items-center tertiary-color gap-2 text-md md:text-lg outfit-regular opacity-75">
            <p>{product.product?.[0]?.unit}</p>
            <p> - </p>
            <p>{base}</p>
          </div>
        </div>
        <Button
          isIconOnly
          aria-label="Supprimer"
          color="danger"
          onClick={handleDeleteProduct}
          className="rounded-full bg-white border-[#FF0000] border-2 transition-all duration-300 ease-in-out hover:rotate-12"
          size="lg"
          variant="solid"
        >
          <Trash2 className="text-[#FF0000]" />
        </Button>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src={product.product?.[0]?.image ?? "/icons/no-image.png"}
          alt={product.product?.[0]?.name ?? ""}
          width={100}
          height={100}
        />
      </div>

      <div className="w-full flex items-center justify-between mt-3">
        <Divider className="flex-1 opacity-50 my-[5%] md:my-[4%]" />
        <p className="outfit-light tertiary-color opacity-50 mx-10">Quantité</p>
        <Divider className="flex-1 opacity-50 my-[5%] md:my-[4%]" />
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between mt-[5%] md:mt-[2%] gap-2 tertiary-color">
        <Input
          type="number"
          label="Neuf"
          labelPlacement="outside"
          value={qNew.toString()}
          onChange={handleQNewChange}
          min={0}
          variant="bordered"
          radius="full"
          size="md"
          className=" tertiary-color outfit-regular"
        />

        <Input
          type="number"
          label="Réemploi"
          labelPlacement="outside"
          value={qUsed.toString()}
          onChange={handleQUsedChange}
          min={0}
          variant="bordered"
          size="md"
          radius="full"
          className=" tertiary-color outfit-regular text-right"
        />
      </div>
      {/* <div className="w-auto pt-[5%] ml-auto mr-auto">
        <button
          onClick={handleAdd}
          className={
            isDifferent
              ? "project-product-button"
              : "hidden project-product-button"
          }
        >
          Modifier
        </button>
      </div> */}
      <Button
        color="primary"
        variant="ghost"
        size="md"
        isLoading={isLoading}
        className={
          "text-md rounded-full outfit-regular mt-6" +
          (isDifferent ? "" : " hidden")
        }
        onClick={handleAdd}
      >
        Modifier
      </Button>

      {dialogOpen && <Dialogs {...dialogProps} />}
    </div>
  );
};

export default ProductInProjectCard;
