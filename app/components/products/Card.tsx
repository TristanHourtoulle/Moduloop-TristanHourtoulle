import TrashCan from "@components/button/TrashCan";
import { ProductType } from "@models/Product";
import Image from "next/image";
import Link from "next/link";

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

  const handleDelete = async () => {
    const response = await fetch(`/api/product?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      onDeleteSuccess();
    } else {
      alert("Product not deleted");
    }
  };

  return (
    <div className="product-card w-[30%] px-[2%] py-[2%] flex flex-col justify-between gap-2">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="name">{nameProduct}</h2>
          <p className="base">{baseName}</p>
        </div>
        <div onClick={handleDelete}>
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
      <div className="flex items-center gap-3 justify-center link-cta ml-auto mr-auto">
        <Link
          href={showProductUrl}
          className="flex items-center gap-15 bg-white border-10"
        >
          <Image
            src="/icons/link.svg"
            alt="Ouvrir"
            width={27}
            height={27}
            className="object-contain"
          />
          <p>Ouvrir</p>
        </Link>
      </div>
    </div>
  );
};

export default Card;
