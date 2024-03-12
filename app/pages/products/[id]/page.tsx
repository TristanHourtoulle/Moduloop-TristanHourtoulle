"use client"

import { ProductType } from "@models/Product"
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { TitleType } from "@models/Title";
import { Title } from "@components/Title";
import Image from "next/image";
import InfoTable from "@components/products/infoTable";
import ImpactTable from "@components/products/impactTable";

export default function Page({
    params: { id },
  }: {
    params: { id: string }
  }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [myProduct, setMyProduct] = useState<ProductType | null>(null);
  const [title, setTitle] = useState<TitleType | null>(null);
  const [view, setView] = useState("new") // "new" - "reuse"
  const [file, setFile] = useState(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file); // Ajoutez votre fichier upload à FormData
      formData.append("productId", myProduct?.id); // Ajoutez l'id du produit à FormData

      const response = await fetch("/api/upload/image/product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        window.location.reload();
      } else {
        alert("Failed to upload image.")
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/product?id=${encodeURIComponent(id)}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            const product = await response.json();
            setMyProduct(product.product);
            if (product.product) {
              const title: TitleType = {
                title: "Votre produit: ",
                image: "/icons/close.svg",
                number: product.product.name,
                back: "/pages/products",
                canChange: false
              }
              setTitle(title);
            }
        } else {
            // Handle error
        }
      } catch (error) {
        alert(error)
      } finally {
        setLoading(false); // Marquer le chargement comme terminé, que la requête réussisse ou échoue
      }
    };

    fetchProduct();
  }, [id]);


  return (
    <div className="">
      {loading ?
        <div className="m-auto">
            <FontAwesomeIcon icon={faSpinner} spin /> Chargement...
        </div> : myProduct ?
        <div className="">
            <div className="flex items-center mb-10">
                <div className='mr-auto'>
                    <Title {...title} />
                </div>
                <button type="button">
                    <div className="flex items-center gap-2 download-button ">
                        <Image
                            src="/icons/telecharger.svg"
                            alt="download"
                            height={30}
                            width={30}
                            />
                        <p>Télécharger</p>
                    </div>
                </button>
            </div>

            <div className="flex items-center">
                <div className="flex flex-col items-center mr-auto">
                    {myProduct.image != '' && myProduct.image ? <Image
                        src={myProduct.image ?? ''}
                        alt={myProduct.name ?? ''}
                        width={450}
                        height={450}
                        className='object-contain'
                    /> : <Image
                    src="/icons/no-image.png"
                    alt=""
                    width={450}
                    height={450}
                    className='object-contain'
                />}
                <form onSubmit={handleSubmit}>
                  <input
                    type='file'
                    name='file'
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                  <input
                    type="hidden"
                    name="productId"
                    value={id}
                  />
                  <input
                    type="submit"
                    value="Changer"
                    className="open-button"
                  />
                </form>
                </div>
                <div className="flex flex-col items-center gap-10 mr-20">
                    <InfoTable {...myProduct} />
                    <div className="flex items-center gap-10">
                        <button className={view === 'new' ? "inter-nav-bar" : "inter-nav-bar-selected" } onClick={() => setView("new")}>Neuf</button>
                        <button className={view === 'reuse' ? "inter-nav-bar" : "inter-nav-bar-selected" } onClick={() => setView("reuse")}>Reuse</button>
                    </div>
                    <ImpactTable product={myProduct} type={view} />
                </div>
            </div>

        </div> :
        <div>
            Erreur de chargement du produit
        </div>}
    </div>
  )
}
