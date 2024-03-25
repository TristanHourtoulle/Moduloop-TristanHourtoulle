import Card from "@components/projects/products/Card";
import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

const ProductCard = (props: {
  product: ProductType;
  idProject: number;
  cta: () => void;
}) => {
  const { product, idProject, cta } = props;
  const [qNew, setQNew] = useState(0);
  const [qUsed, setQUsed] = useState(0);

  const handleQNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQNew(Number(e.target.value));
  };

  const handleQUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQUsed(Number(e.target.value));
  };

  const handleAdd = async () => {
    const addProductData: AddProductType = {
      product: product,
      idProject: idProject,
      qNew: qNew,
      qUsed: qUsed,
      addOn: null,
      updatedOn: null,
    };

    let res = await fetch(`/api/project/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(addProductData),
    });

    if (res.ok) {
      toast.success("Produit ajouté au projet", { duration: 2000 });
      setQNew(0);
      setQUsed(0);
      cta();
    } else {
      console.error("Erreur lors de l'ajout du produit au projet");
      toast.error("Erreur lors de l'ajout du produit au projet", {
        duration: 2000,
      });
    }
  };

  return (
    <div className="project-product-card flex flex-col">
      {/* Afficher les informations sur le produit */}
      <Card {...product} />
      <div className="flex gap-1 items-center justify-center">
        <div className="flex flex-col justify-center">
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
            className="w-3/4 text-right input-bg-gray-200"
          ></input>
        </div>
        <div className="flex flex-col">
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
            className="w-3/4 text-right  input-bg-gray-200"
          ></input>
        </div>
        <button
          onClick={handleAdd}
          className="text-bottom project-product-button"
        >
          Ajouter
        </button>
      </div>
    </div>
  );
};

const ProductCardWithToaster = (props: {
  product: ProductType;
  idProject: number;
  cta: () => void;
}) => {
  return (
    <>
      <ProductCard {...props} />
      <Toaster richColors position="top-center" expand={false} />
    </>
  );
};

export default ProductCardWithToaster;
