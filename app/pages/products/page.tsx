"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import { Button } from "@components/button/Button";
import Card from "@components/products/Card";
import { getSession } from "@lib/session";
import { TitleType } from "@models/Title";
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
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/pages/products/add")}
          content="Gérer"
          disabled={false}
          image="/icons/reglages.svg"
          size="large"
          moreClasses="mr-5"
        />
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
