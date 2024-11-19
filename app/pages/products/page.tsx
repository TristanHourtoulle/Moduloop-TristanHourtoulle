"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import Card from "@components/products/Card";
import { getSession } from "@lib/session";
import { TitleType } from "@models/Title";
import { getProducts } from "@utils/database/product";
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
      window.location.href = "/pages/projects";
    };
    fetchSession();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const res = await getProducts();

    const data = await res;
    if (data) {
      setProducts(data);
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
        <Link
          href="/pages/products/add"
          className="bg-primary text-white py-2 px-6 rounded-full text-lg outfit-regular flex items-center justify-center hover:bg-opacity-85 transition-all mr-5"
        >
          <img src="/icons/reglages.svg" alt="Gérer" className="w-5 h-5 mr-2" />
          Gérer
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="ml-[3%]">
          <div
            className="products-section my-[2%] mx-[5%] scroll-smooth"
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
                <Card
                  key={index}
                  id={(product as any).id}
                  name={(product as any).name}
                  image={(product as any).image}
                  base={(product as any).base}
                  unit={(product as any).unit}
                  new={(product as any).new}
                  reuse={(product as any).reuse}
                  onDeleteSuccess={fetchData}
                />
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
