import { AddProductType } from "@/models/AddProduct";
import TrashCan from "@components/button/TrashCan";
import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import {
  deleteProductInProject,
  updateProductInProject,
} from "@utils/database/project";

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
      toast.success(
        "Quantité correctement modifié ! La page va se recharger...",
        { duration: 2000 }
      );
      setInitialQNew(qNew);
      setInitialQUsed(qUsed);
      setIsDifferent(false);
      ctaDelete();
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
    <div className="product-in-project-card w-[30%] px-[2%] py-[2%] flex flex-col justify-between">
      {/* Header */}
      <div className="flex item-center justify-between">
        <div className="flex flex-col items-start">
          <p className="name">
            {product.product?.[0]?.name?.replace("Inies - ", "")}
          </p>
          <div className="flex items-center gap-2">
            <p className="base text-lg">{product.product?.[0]?.unit}</p>
            <p className="base text-lg"> - </p>
            <p className="base text-lg">{base}</p>
          </div>
        </div>
        <div onClick={handleDeleteProduct} className="cursor-pointer">
          <TrashCan />
        </div>
      </div>

      {/* Image */}
      <div className="flex justify-center">
        <Image
          src={product.product?.[0]?.image ?? "/icons/no-image.png"}
          alt={product.product?.[0]?.name ?? ""}
          width={150}
          height={150}
        />
      </div>

      {/* Quantity */}
      <div className="flex items-center justify-between">
        <div>
          <label
            htmlFor={`new`}
            className="block mb-1 text-sm font-medium text-gray-900 opacity-75"
          >
            Neuf
          </label>
          <input
            style={{ width: "75px" }}
            min={0}
            type="number"
            name={`new`}
            id={`new`}
            value={qNew}
            onChange={handleQNewChange}
            className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
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

        <div>
          <label
            htmlFor={`reuse`}
            className="block mb-1 text-sm font-medium text-gray-900 opacity-75"
          >
            Réemploi
          </label>
          <input
            style={{ width: "75px" }}
            min={0}
            type="number"
            name={`reuse`}
            id={`reuse`}
            value={qUsed}
            onChange={handleQUsedChange}
            className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
          ></input>
        </div>
      </div>

      {dialogOpen && <Dialogs {...dialogProps} />}
    </div>
  );
};

export default ProductInProjectCard;
