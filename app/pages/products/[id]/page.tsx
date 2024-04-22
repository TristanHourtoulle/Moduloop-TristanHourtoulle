"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import ImpactTable from "@components/products/impactTable";
import InfoTable from "@components/products/infoTable";
import { ProductType } from "@models/Product";
import { TitleType } from "@models/Title";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [myProduct, setMyProduct] = useState<ProductType | null>(null);
  const [title, setTitle] = useState<TitleType | null>(null);
  const [view, setView] = useState("new"); // "new" - "reuse"
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Set initial value to true

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file); // Ajoutez votre fichier upload à FormData
      formData.append("productId", myProduct?.id); // Ajoutez l'id du produit à FormData

      const response = await fetch("/api/upload/image/product", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        let res = await fetch(`/api/product?id=${encodeURIComponent(id)}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (res.ok) {
          const product = await res.json();
          setMyProduct(product.product);
        } else {
          // Handle error
        }
      } else {
        alert("Failed to upload image.");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true); // Set isLoading to true before fetch operation
      try {
        const response = await fetch(
          `/api/product?id=${encodeURIComponent(id)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const product = await response.json();
          setMyProduct(product.product);
          if (product.product) {
            const title: TitleType = {
              title: "Votre produit: ",
              image: "/icons/close.svg",
              number: product.product.name,
              back: "/pages/products",
              canChange: false,
            };
            setTitle(title);
          }
        } else {
          // Handle error
        }
      } catch (error) {
        alert(error);
      } finally {
        setIsLoading(false); // Set isLoading to false after fetch operation
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="">
      {!isLoading ? (
        myProduct ? (
          <div className="">
            <div className="flex items-center mb-10">
              <div className="mr-auto">
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
                {myProduct.image != "" && myProduct.image ? (
                  <Image
                    src={myProduct.image ?? ""}
                    alt={myProduct.name ?? ""}
                    width={450}
                    height={450}
                    className="object-contain"
                  />
                ) : (
                  <Image
                    src="/icons/no-image.png"
                    alt=""
                    width={450}
                    height={450}
                    className="object-contain"
                  />
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => setFile(e.target.files?.[0])}
                  />
                  <input type="hidden" name="productId" value={id} />
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
                  <button
                    className={
                      view === "new"
                        ? "inter-nav-bar"
                        : "inter-nav-bar-selected"
                    }
                    onClick={() => setView("new")}
                  >
                    Neuf
                  </button>
                  <button
                    className={
                      view === "reuse"
                        ? "inter-nav-bar"
                        : "inter-nav-bar-selected"
                    }
                    onClick={() => setView("reuse")}
                  >
                    Reuse
                  </button>
                </div>
                <ImpactTable product={myProduct} type={view} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p>Produit introuvable</p>
          </div>
        )
      ) : (
        <div>
          <Loader />
        </div>
      )}
    </div>
  );
}
