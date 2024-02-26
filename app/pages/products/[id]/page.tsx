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
            alert(product);
            setMyProduct(product.product);
            if (product.product) {
              const title: TitleType = {
                title: "Votre produit: ",
                image: "/icons/close.svg",
                number: product.product.name,
                back: "/pages/products"
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
                    <button type="button" className="open-button">
                        <p className="text">Changer</p>
                    </button>
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
