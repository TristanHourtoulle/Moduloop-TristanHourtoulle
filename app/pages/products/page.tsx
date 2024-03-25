"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import Card from "@components/products/Card";
import { getSession } from "@lib/session";
import { TitleType } from "@models/Title";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [userSession, getUserSession] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const temp = await getSession();

      if (
        temp &&
        !temp.user.name.includes("undefined") &&
        temp.user.role === "admin"
      ) {
        getUserSession(temp);
        fetchData();
        return;
      }
      window.location.href = "/";
    };
    fetchSession();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await fetch("/api/product/list", {
      method: "GET",
    });
    const data = await res.json();
    if (data.success) {
      setProducts(data.data);
    } else {
      console.error("Failed to fetch products:", data.error);
    }
    setIsLoading(false);
  };

  const title: TitleType = {
    title: "Vos produits",
    image: "/icons/entrepot.svg",
    number: products.length.toString(),
    back: "#",
    canChange: false,
    id_project: 0,
  };

  return (
    <div>
      <div className="flex items-center mb-10">
        <div className="mr-auto">
          <Title {...title} />
        </div>

        <Link href="/pages/products/add">
          <div className="flex items-center justify-center gap-2 mr-5 handle-product-button">
            <Image
              src="/icons/reglages.svg"
              alt="Add Product"
              width={30}
              height={30}
              className="object-contain handle-product-image"
            />
            <p className="handle-product-text">Gérer</p>
          </div>
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="ml-[3%] scroll-view overflow-y-hidden">
          <div
            className="products-section my-[2%] mx-[5%]"
            style={{
              display: "flex",
              flexWrap: "wrap",
              flexDirection: "row",
              gap: "25px",
              justifyContent: "space-between",
            }}
          >
            {products ? (
              products.map((product, index) => (
                <Card key={index} {...product} onDeleteSuccess={fetchData} />
              ))
            ) : (
              <div className="flex items-center justify-center">
                <p className="no-product-text">
                  Oh, c'est bien vide par ici...
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
