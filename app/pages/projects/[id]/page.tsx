"use client";

import Loader from "@components/Loader";
import { Title } from "@components/Title";
import { DeleteBtn } from "@components/button/DeleteBtn";
import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import ImpactSection from "@components/projects/ImpactSection";
import ProductCardWithToaster from "@components/projects/ProductCard";
import ProductInProjectCard from "@components/projects/ProductInProjectCard";
import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";
import { TitleType } from "@models/Title";
import { getProductByBase } from "@utils/projects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  databaseToGroupModel,
  databaseToSingleProjectModel,
} from "../../../utils/convert";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [productsInProject, setProductsInProject] = useState<
    AddProductType[] | null
  >(null);
  const [storeProducts, setStoreProducts] = useState<ProductType[] | null>(
    null
  );
  const [storeProductsInies, setStoreProductsInies] = useState<ProductType[]>(
    []
  );
  const [storeProductsAutres, setStoreProductsAutres] = useState<ProductType[]>(
    []
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [section, setSection] = useState("products");
  const [productsImpact, setProductsImpact] = useState([]);
  const [allIsLoaded, setAllIsLoaded] = useState(false);
  const [kartLoaded, setKartLoaded] = useState(false);
  const [description, setDescription] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [addProductLoader, setAddProductLoader] = useState(false);

  const dialogProps: DialogsProps = {
    title: "Supprimer tous les produits",
    content: "Voulez-vous vraiment supprimer tous les produits ?",
    validate: "Confirmer",
    cancel: "Annuler",
    cta: () => deleteAllProducts(),
    cancelCta: () => setDialogOpen(false),
  };

  const deleteAllProducts = async () => {
    let res = await fetch(`/api/project/delete?id_project=${project?.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("Products deleted successfully");
      setProductsInProject([]);
      setProductsImpact([]);
      updateProductsInProject();
      setDialogOpen(false);
      toast.success("Les produits ont été supprimés avec succès");
    } else {
      console.log("Failed to delete products:", res);
      alert("Failed to delete products");
      setDialogOpen(false);
      toast.error(
        "Une erreur s'est produite lors de la suppression des produits"
      );
    }
  };

  const addProductWithoutFormSubmit = async () => {
    setAddProductLoader(true);
    const productId = document.getElementById("products-addProduct") as any;
    const qNew = document.getElementById("qNew-addProduct") as any;
    const qUsed = document.getElementById("qUsed-addProduct") as any;

    if (
      !productId ||
      !qNew ||
      !qUsed ||
      (qNew.value === "0" && qUsed.value === "0")
    ) {
      console.log("Failed to fetch elements");
      return;
    }

    await addProductSubmitWithoutForm(
      productId.value,
      Number(qNew.value),
      Number(qUsed.value)
    );
    (document.getElementById("qNew-addProduct") as HTMLInputElement).value =
      "0";
    (document.getElementById("qUsed-addProduct") as HTMLInputElement).value =
      "0";
    updateProductsInProject();
    setAddProductLoader(false);
    toast.success("Le produit a été ajouté avec succès");
  };

  const updateProductsInProject = async () => {
    let res = await fetch(`/api/project?id=${encodeURIComponent(id)}`, {
      method: "GET",
    });
    const data = await res.json();
    if (data.success) {
      const projectData = databaseToSingleProjectModel(data.product);
      let products = Array.isArray(projectData.products)
        ? projectData.products
        : [projectData.products];
      if (products && products.length > 0) {
        setProductsInProject(products.reverse());
        setProductsImpact(products);
      } else {
        setProductsInProject([]);
        setProductsImpact([]);
      }

      res = await fetch(
        `/api/group/id?id=${encodeURIComponent(projectData.group ?? "")}`,
        {
          method: "GET",
        }
      );
      const groupData = await res.json();
      if (groupData.success) {
        projectData.groupInfo = databaseToGroupModel(groupData.data);
        setProject(projectData);
      } else {
        console.error("Failed to fetch group:", groupData.error);
        alert(groupData.error);
      }

      setProject(projectData);
      // Get stored products
      res = await fetch(`/api/product/list`, {
        method: "GET",
      });
      const productsData = await res.json();
      setStoreProductsInies([]);
      setStoreProductsAutres([]);
      setStoreProducts([]);
      if (productsData.success) {
        let tempInies = getProductByBase(productsData.data, "Autre");
        setStoreProductsInies(tempInies);
        let tempAutres = getProductByBase(productsData.data, "Inies");
        setStoreProductsAutres(tempAutres);
        let tempResProducts: ProductType[] = [];
        tempResProducts.push(...tempInies);
        tempResProducts.push(...tempAutres);
        setStoreProducts(tempResProducts);
      } else {
        console.error("Failed to fetch products:", productsData.error);
        alert(productsData.error);
      }
    } else {
      console.log("Failed to fetch project:", data.error);
      alert(data.error);
    }
  };

  const addProductSubmitWithoutForm = async (
    productToAdd: Number,
    qNew: Number,
    qUsed: Number
  ) => {
    let res = await fetch(
      `/api/product?id=${encodeURIComponent(productToAdd.toString())}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      console.log("Failed to fetch product:", productToAdd);
      alert("Error");
      return;
    }
    const product = await res.json();
    const finalProduct: ProductType = product.product;
    const tempProductToAdd: AddProductType = {
      product: finalProduct,
      idProject: Number(id),
      qNew: Number(qNew),
      qUsed: Number(qUsed),
      addOn: null,
      updatedOn: null,
    };

    res = await fetch(`/api/project/addProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tempProductToAdd),
    });
    if (res.ok) {
      console.log("Product added successfully");
      updateProductsInProject();
    } else {
      console.log("Failed to add product:", res);
      alert("Failed to add product");
      toast.error("Une erreur s'est produite lors de l'ajout du produit");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get user session
      let res = await fetch("/api/session", {
        method: "GET",
      });
      const session = await res.json();
      if (!session.success) {
        console.error("Failed to fetch session:", session.error);
        alert(session.error);
        toast.error(
          "Une erreur s'est produite lors de la récupération de la session"
        );
      } else {
        await setUser(session.session.user);
        // Get project by id
        res = await fetch(`/api/project?id=${encodeURIComponent(id)}`, {
          method: "GET",
        });
        const data = await res.json();
        if (data.success) {
          const projectData = databaseToSingleProjectModel(data.product);
          setDescription(projectData.description ?? "");
          res = await fetch(
            `/api/group/id?id=${encodeURIComponent(projectData.group ?? "")}`,
            {
              method: "GET",
            }
          );
          const groupData = await res.json();
          if (groupData.success) {
            projectData.groupInfo = databaseToGroupModel(groupData.data);
            setProject(projectData);
            let index = 0;
            let products = Array.isArray(projectData.products)
              ? projectData.products
              : [projectData.products];
            setProductsInProject(products.reverse());
            setProductsImpact(products);
            // Get stored products
            res = await fetch(`/api/product/list`, {
              method: "GET",
            });
            const productsData = await res.json();
            if (productsData.success) {
              let tempInies = getProductByBase(productsData.data, "Inies");
              setStoreProductsInies(tempInies);
              let tempAutres = getProductByBase(productsData.data, "Autre");
              setStoreProductsAutres(tempAutres);
              let tempResProducts: ProductType[] = [];
              tempResProducts.push(...tempInies);
              tempResProducts.push(...tempAutres);
              setStoreProducts(tempResProducts);
            } else {
              console.error("Failed to fetch products:", productsData.error);
              alert(productsData.error);
              toast.error(
                "Une erreur s'est produite lors de la récupération des produits"
              );
            }
            // Mettre à jour l'état allIsLoaded à true une fois que tout est chargé
            setAllIsLoaded(true);
          } else {
            console.error("Failed to fetch group:", groupData.error);
            alert(groupData.error);
            toast.error(
              "Une erreur s'est produite lors de la récupération du groupe"
            );
          }
        } else {
          console.error("Failed to fetch project:", data.error);
          alert(data.error);
          toast.error(
            "Une erreur s'est produite lors de la récupération du projet"
          );
        }
      }
    };

    fetchData();
  }, []);

  const addProductSubmit = async () => {
    if (isPopupOpen) {
    }
    setIsPopupOpen(!isPopupOpen);
  };

  // Initialisez title avec une valeur par défaut
  const [title, setTitle] = useState<TitleType>({
    title: "Votre projet",
    image: "/icons/close.svg",
    number: "Chargement...", // Initialisez title.title avec une valeur par défaut
    back: "/pages/projects",
    canChange: true,
    id_project: Number(id),
  });

  useEffect(() => {
    // Mettez à jour le titre une fois que project est chargé
    if (project) {
      setTitle((prevTitle) => ({
        ...prevTitle,
        number: project.name, // Mettez à jour le titre avec le nom du projet une fois qu'il est chargé
      }));
    }
  }, [project]); // Déclenchez cette mise à jour lorsque project change

  // Rendre le contenu de la page uniquement lorsque tout est chargé
  if (!allIsLoaded) {
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader />
      </div>
    );
  }

  return (
    <div className="project-page w-full">
      {/* Header */}
      <div className="flex items-center">
        <Title {...title} />
        <Link href="/pages/projects/create" className="create-project-button">
          <div className="flex gap-5">
            <Image
              src="/icons/telecharger.svg"
              alt="Télécharger"
              width={20}
              height={20}
            />
            Télécharger
          </div>
        </Link>
      </div>
      {/* Group Name And Link */}
      <div className="flex items-center mb-5">
        <p className="group-title">Appartient au groupe: </p>
        <Link href="#" className="group-name">
          {project ? (
            <div className="flex items-center gap-3">
              <Image src="/icons/lien.svg" alt="" width={20} height={20} />
              <p>{project.groupInfo?.name}</p>
            </div>
          ) : (
            "Chargement..."
          )}
        </Link>
      </div>
      {/* Infos */}
      <div className="flex items-center justify-center gap-20 section-infos"></div>
      {/* Products */}
      {project && productsInProject && productsInProject.length > 0 ? (
        <div className="mt-5">
          <div className="px-[5%]">
            <div className="flex items-end justify-between">
              <div className="flex items-end w-[50%]">
                {section === "products" && (
                  <div className="flex items-center gap-8">
                    <div>
                      <label
                        htmlFor="products-addProduct"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Choisissez un produit
                      </label>
                      <select
                        id="products-addProduct"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      >
                        {storeProducts &&
                          storeProducts.map((product, index) => (
                            <option
                              className=""
                              key={index}
                              value={product.id || -1}
                            >
                              <span className="font-bold opacity-50">
                                {product.base} -{" "}
                              </span>{" "}
                              {product.name?.replace("Inies - ", "")}
                            </option>
                          ))}
                      </select>
                    </div>

                    <div className="flex items-end gap-8">
                      <div>
                        <label
                          htmlFor="qNew-addProduct"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Quantité Neuve
                        </label>
                        <input
                          style={{ width: "150px" }}
                          id="qNew-addProduct"
                          type="number"
                          min={0}
                          placeholder="0"
                          className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                        ></input>
                      </div>

                      <div>
                        <label
                          htmlFor="qUsed-addProduct"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Quantité Réemploi
                        </label>
                        <input
                          style={{ width: "150px" }}
                          id="qUsed-addProduct"
                          type="number"
                          min={0}
                          placeholder="0"
                          className="text-right bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 "
                        ></input>
                      </div>

                      {addProductLoader ? (
                        <Loader />
                      ) : (
                        <div
                          className="px-4 py-2 bg-white shadow-lg rounded-[8px] flex items-center border-[#30C1BD] border-[3px] cursor-pointer transform transition-all duration-300 ease-in-out hover:opacity-75"
                          onClick={() => {
                            const qNew = document.getElementById(
                              "qNew-addProduct"
                            ) as HTMLInputElement;
                            const qUsed = document.getElementById(
                              "qUsed-addProduct"
                            ) as HTMLInputElement;
                            if (
                              (qNew?.value === "0" && qUsed?.value === "0") ||
                              (qNew?.value === "" && qUsed?.value === "")
                            ) {
                              toast.error(
                                "Veuillez saisir une quantité valide"
                              );
                              return;
                            }
                            addProductWithoutFormSubmit();
                          }}
                        >
                          {/* <Image
                          src={"/icons/plus-sky-blue.svg"}
                          alt="Ajouter"
                          width={200}
                          height={200}
                        /> */}
                          <p className="text-lg text-[#30C1BD]">Ajouter</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              {/* Dialog */}
              {dialogOpen && <Dialogs {...dialogProps} />}
              <div className="flex items-end justify-end gap-5">
                {section === "products" &&
                  productsInProject &&
                  productsInProject.length > 0 &&
                  productsInProject !== undefined &&
                  productsInProject[0] && (
                    <DeleteBtn
                      text="Supprimer tous les produits"
                      cta={() => {
                        setDialogOpen(true);
                        updateProductsInProject();
                      }}
                    />
                  )}
                {(section === "products" || section === "impact") &&
                  productsInProject &&
                  productsInProject.length > 0 &&
                  productsInProject[0] && (
                    <button
                      className="chooseSection"
                      onClick={() => {
                        section === "products"
                          ? setSection("impact")
                          : setSection("products");
                      }}
                    >
                      {section === "products" ? (
                        <p>Afficher l'impact</p>
                      ) : (
                        <p>Afficher les produits</p>
                      )}
                    </button>
                  )}
              </div>
            </div>
          </div>
          {isPopupOpen && (
            <div className="popup-section w-full">
              <div className="popup-content">
                <div className="header flex items-center">
                  <button onClick={addProductSubmit} className="mr-auto">
                    <Image
                      src="/icons/close.svg"
                      alt="Fermer"
                      width={40}
                      height={40}
                    ></Image>
                  </button>
                  <h2 className="title mr-auto">Ajouter un produit</h2>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col items-center form">
                    <div className="flex items-center gap-2">
                      {/* Input */}
                      <div className="flex items-center search-bar-input">
                        <input
                          className="input"
                          type="text"
                          value=""
                          placeholder="Chercher un produit dans votre projet..."
                        />
                        <Image
                          src="/icons/chercher.svg"
                          alt="Rechercher"
                          width={20}
                          height={20}
                        ></Image>
                      </div>
                      {/* Filter btn */}
                      <button className="filter-btn">
                        <Image
                          src="/icons/filtre.svg"
                          alt="Filtrer"
                          width={30}
                          height={30}
                        ></Image>
                      </button>
                    </div>
                    <div
                      className="products-section scroll-view max-h-[200%]"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        gap: "2px",
                        margin: "1rem",
                        justifyContent: "center",
                      }}
                    >
                      {kartLoaded ? (
                        <Loader />
                      ) : (
                        storeProducts &&
                        storeProducts.map((product, index) => (
                          <ProductCardWithToaster
                            key={index}
                            product={product}
                            idProject={Number(id)}
                            cta={() => {
                              updateProductsInProject();
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {section === "products" ? (
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
              {kartLoaded ? (
                <Loader />
              ) : /* productCards */
              (productsInProject && productsInProject.length === 0) ||
                !productsInProject ||
                productsInProject === undefined ||
                !productsInProject[0] ? (
                <div className="mt-10 flex flex-col gap-7 items-center justify-center">
                  <p className="text">
                    Il n'y a pas de produits dans votre projet...
                  </p>
                </div>
              ) : (
                productsInProject?.map((product, index) => {
                  console.log(product);
                  return (
                    <ProductInProjectCard
                      product={product}
                      qNewReceived={product?.qNew}
                      qUsedReceived={product?.qUsed}
                      idProject={Number(id)}
                      key={index}
                      ctaDelete={() => {
                        updateProductsInProject();
                      }}
                    />
                  );
                })
              )}
            </div>
          ) : (
            <div>
              <ImpactSection products={productsImpact} project={project} />
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-7 items-center justify-center">
          <p className="text">Il n'y a pas de produits dans votre projet...</p>
          <div className="">
            <button
              onClick={addProductSubmit}
              className="flex items-center justify-center gap-5 add-product-btn"
            >
              <Image
                src="/icons/plus-blanc.svg"
                alt="Ajouter un produit"
                width={20}
                height={20}
              ></Image>
              <p className="">Ajouter un produit</p>
            </button>
          </div>
          {isPopupOpen && (
            <div className="popup-section w-full">
              <div className="popup-content">
                <div className="header flex items-center">
                  <button onClick={addProductSubmit} className="mr-auto">
                    <Image
                      src="/icons/close.svg"
                      alt="Fermer"
                      width={40}
                      height={40}
                    ></Image>
                  </button>
                  <h2 className="title mr-auto">Ajouter un produit</h2>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col items-center form">
                    <div className="flex items-center gap-2">
                      {/* Input */}
                      <div className="flex items-center search-bar-input">
                        <input
                          className="input"
                          type="text"
                          value=""
                          placeholder="Chercher un produit dans votre projet..."
                        />
                        <Image
                          src="/icons/chercher.svg"
                          alt="Rechercher"
                          width={20}
                          height={20}
                        ></Image>
                      </div>
                      {/* Filter btn */}
                      <button className="filter-btn">
                        <Image
                          src="/icons/filtre.svg"
                          alt="Filtrer"
                          width={30}
                          height={30}
                        ></Image>
                      </button>
                    </div>
                    <div
                      className="products-section scroll-view"
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        gap: "2px",
                        margin: "1rem",
                        justifyContent: "center",
                      }}
                    >
                      {kartLoaded ? (
                        <Loader />
                      ) : (
                        storeProducts &&
                        storeProducts.map((product, index) => (
                          <ProductCardWithToaster
                            key={index}
                            product={product}
                            idProject={Number(id)}
                            cta={() => {
                              updateProductsInProject();
                            }}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
