"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import { FileInput } from "@components/input/FileInput";
import ImpactTable from "@components/products/impactTable";
import InfoTable from "@components/products/infoTable";
import { ProductType } from "@models/Product";
import { TitleType } from "@models/Title";
import { uploadImageProduct } from "@utils/database/file";
import { getProductById } from "@utils/database/product";
import Image from "next/image";
import { use, useEffect, useState } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [myProduct, setMyProduct] = useState<ProductType | null>(null);
  const [title, setTitle] = useState<TitleType | null>(null);
  const [view, setView] = useState("new"); // "new" - "reuse"
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Set initial value to true

  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", String(myProduct?.id));
      const uploadImage = async () => {
        const response = await uploadImageProduct(formData);
        if (response) {
          let res = await getProductById(myProduct?.id ?? -1);
          if (res) {
            const product = await res;
            setMyProduct(product);
          } else {
            console.log("Error in fetch", res);
          }
        } else {
          alert("Failed to upload image.");
        }
      };
      uploadImage();
    }
  }, [file]);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true); // Set isLoading to true before fetch operation
      try {
        const response = await getProductById(Number(id));
        if (response) {
          const product = await response;
          setMyProduct(product);
          if (product) {
            const title: TitleType = {
              title: "Votre produit: ",
              image: "/icons/close.svg",
              number: product.name,
              back: "/pages/products",
              canChange: false,
              id_project: undefined,
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
                <Title
                  title={title?.title}
                  image={title?.image}
                  number={title?.number ?? null}
                  back={title?.back}
                  canChange={title?.canChange}
                  id_project={title?.id_project}
                />
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
              <div className="flex flex-col items-center mr-auto ml-5">
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
                {/* <input
                  type="file"
                  name="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                /> */}
                <FileInput size="large" onSubmit={(file) => setFile(file)} />
              </div>
              <div className="flex flex-col items-center gap-10 mr-5 ml-5">
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
