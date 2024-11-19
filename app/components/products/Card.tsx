import TrashCan from "@components/button/TrashCan";
import { Dialogs } from "@components/features/Dialogs";
import { ProductType } from "@models/Product";
import { deleteProductById } from "@utils/database/product";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Card = ({
  id,
  name,
  image,
  base,
  onDeleteSuccess,
}: ProductType & { onDeleteSuccess: () => void }) => {
  const showProductUrl = "/pages/products/" + id;
  const nameProduct = name?.replace("Inies - ", "");
  const baseName = base?.toLowerCase()?.replace(/^\w/, (c) => c.toUpperCase());
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);

  const handleDelete = async () => {
    if (id !== null) {
      const response = await deleteProductById(id);

      if (response) {
        onDeleteSuccess();
      } else {
        alert("Product not deleted");
      }
    }
  };

  return (
    <div className="product-card w-[30%] px-[2%] py-[2%] flex flex-col justify-between gap-2">
      {dialogIsOpen && (
        <Dialogs
          title="Supprimer le produit"
          content="Êtes-vous sûr de vouloir supprimer ce produit ?"
          validate="Supprimer"
          cancel="Annuler"
          cta={() => {
            handleDelete();
            setDialogIsOpen(false);
          }}
          cancelCta={() => setDialogIsOpen(false)}
        />
      )}
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="name">{nameProduct}</h2>
          <p className="base">{baseName}</p>
        </div>
        <div onClick={() => setDialogIsOpen(true)}>
          <TrashCan size={23} />
        </div>
      </div>
      {/* Content */}
      <div className="flex justify-center">
        <Image
          src={image ? image : "/icons/no-image.png"}
          alt={nameProduct ? nameProduct : ""}
          width={150}
          height={150}
        />
      </div>
      {/* CTA */}
      <div className="flex items-center gap-3 justify-center ml-auto mr-auto">
        <Link
          href={`/pages/products/${id}`}
          className="bg-secondary text-white py-2 px-4 rounded-md flex items-center justify-center hover:bg-secondary-dark transition-all"
        >
          <img
            src="/icons/link.svg"
            alt="Link icon"
            className="mr-2" // Ajoute un espace entre l'image et le texte
            style={{ width: "16px", height: "16px" }}
          />
          Ouvrir
        </Link>
      </div>
    </div>
  );
};

export default Card;
