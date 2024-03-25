import { AddProductType } from "@/models/AddProduct";
import TrashCan from "@components/button/TrashCan";
import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";

const ProductInProjectCard = (props: {
  product: AddProductType;
  idProject: number;
}) => {
  const { product, idProject } = props;
  const [qNew, setQNew] = useState(product.qNew);
  const [initialQNew, setInitialQNew] = useState(product.qNew);
  const [qUsed, setQUsed] = useState(product.qUsed);
  const [initialQUsed, setInitialQUsed] = useState(product.qUsed);
  const [isDifferent, setIsDifferent] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = async () => {
    const addProduct: AddProductType = {
      product: product.product,
      idProject: idProject,
      qNew: qNew - initialQNew,
      qUsed: qUsed - initialQUsed,
      addOn: null,
      updatedOn: null,
    };

    let res = await fetch(`/api/project/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addProduct),
    });

    if (res.ok) {
      toast.success(
        "Quantité correctement modifié ! La page va se recharger...",
        { duration: 2000 }
      );
      setInitialQNew(qNew);
      setInitialQUsed(qUsed);
      setIsDifferent(false);
      window.location.reload();
    } else {
      console.error("Erreur lors de l'ajout du produit au projet");
      toast.error("Erreur lors de l'ajout du produit au projet.", {
        duration: 2000,
      });
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
    let res = await fetch(
      `/api/project/list?id_project=${idProject}&id_product=${product.product.id}`,
      {
        method: "DELETE",
      }
    );
    if (res.ok) {
      toast.success("Produit supprimé du projet");
      setDialogOpen(false);
      window.location.reload();
    } else {
      setDialogOpen(false);
      console.error("Erreur lors de la suppression du produit du projet");
      toast.error("Erreur lors de la suppression du produit du projet.");
    }
    setDialogOpen(false);
  };

  const dialogProps: DialogsProps = {
    title: "Supprimer le produit " + "'" + product.product.name + "'",
    content: "Voulez-vous vraiment supprimer ce produit ?",
    validate: "Confirmer",
    cancel: "Annuler",
    cta: confirmDeleteProduct,
    cancelCta: () => setDialogOpen(false),
  };

  return (
    <div className="product-in-project-card w-[30%] px-[2%] py-[2%] flex flex-col justify-center">
      {/* Header */}
      <div className="flex item-center justify-between">
        <div className="flex flex-col items-start">
          <p className="name">{product.product.name.replace("Inies - ", "")}</p>
          <p className="base">{product.product.base}</p>
        </div>
        <div onClick={handleDeleteProduct} className="cursor-pointer">
          <TrashCan />
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src={
            product.product.image
              ? product.product.image
              : "/icons/no-image.png"
          }
          alt={product.product.name ? product.product.name : ""}
          width={150}
          height={150}
        />
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col w-[25%]">
          <label className="text-xs" htmlFor={`new`}>
            Neuf
          </label>
          <input
            min={0}
            type="number"
            name={`new`}
            id={`new`}
            value={qNew}
            onChange={handleQNewChange}
            className="w-full text-right input-bg-gray-200"
          ></input>
        </div>
        <div className="w-auto pt-[5%]">
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
        </div>
        <div className="flex flex-col  w-[25%]">
          <label className="text-xs" htmlFor={`reuse`}>
            Réemploi
          </label>
          <input
            min={0}
            type="number"
            name={`reuse`}
            id={`reuse`}
            value={qUsed}
            onChange={handleQUsedChange}
            className="w-full text-right input-bg-gray-200"
          ></input>
        </div>
      </div>

      {/* Dialog */}
      {dialogOpen && <Dialogs {...dialogProps} />}
    </div>
  );
};

export default ProductInProjectCard;
