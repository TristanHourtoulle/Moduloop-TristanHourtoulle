"use client";

import Loader from "@components/Loader";
import { Dialogs, DialogsProps } from "@components/features/Dialogs";
import ImpactSection from "@components/projects/ImpactSection";
import ProductCardWithToaster from "@components/projects/ProductCard";
import ProductInProjectCard from "@components/projects/ProductInProjectCard";
import { ShowInformations } from "@components/projects/ShowInformations";
import { useRenderPNG } from "@components/projects/download/UseRenderPng";
import { getSession } from "@lib/session";
import { AddProductType } from "@models/AddProduct";
import { ProductType } from "@models/Product";
import { ProjectType } from "@models/Project";
import { TitleType } from "@models/Title";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { Spinner } from "@nextui-org/spinner";
import { getGroupById } from "@utils/database/group";
import { getProductById, getProducts } from "@utils/database/product";
import {
  addProductInProject,
  deleteAllProductInProject,
  getProjectById,
} from "@utils/database/project";
import { getProductByBase } from "@utils/projects";
import { Download, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { databaseToGroupModel } from "../../../utils/convert";

export default function Page({ params: { id } }: { params: { id: string } }) {
  const [user, setUser] = useState(null);
  const [project, setProject] = useState<ProjectType | null>(null);
  const [productsInProject, setProductsInProject] = useState<
    AddProductType[] | null
  >(null);
  const [storeProducts, setStoreProducts] = useState<ProductType[]>([]);
  const [productsImpact, setProductsImpact] = useState<AddProductType | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [addProductLoader, setAddProductLoader] = useState<boolean>(false);
  const [addProductLoaderAI, setAddProductLoaderAI] = useState<boolean>(false);
  const [storeProductsInies, setStoreProductsInies] = useState<ProductType[]>(
    []
  );
  const [storeProductsAutres, setStoreProductsAutres] = useState<ProductType[]>(
    []
  );
  const [allIsLoaded, setAllIsLoaded] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [section, setSection] = useState<string>("products");
  const [kartLoaded, setKartLoaded] = useState<boolean>(false);
  // Select Product To add
  const [SelectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [value, setValue] = useState(new Set([]));
  const [isDownloadLoading, setIsDownloadLoading] = useState(false);

  const { downloadPNG } = useRenderPNG({
    project,
    setIsLoading: setIsDownloadLoading,
  });

  useEffect(() => {
    const fetchSelectedProduct = async () => {
      if (!SelectedProductId) {
        console.log("No product selected");
        return;
      }
      const product = await getProductById(SelectedProductId);
      if (!product) {
        console.log("Product not found");
        return;
      }
      setSelectedProduct(product);
    };
    fetchSelectedProduct();
  }, [SelectedProductId]);

  const dialogProps: DialogsProps = {
    title: "Supprimer tous les produits",
    content: "Voulez-vous vraiment supprimer tous les produits ?",
    validate: "Confirmer",
    cancel: "Annuler",
    cta: () => deleteAllProducts(),
    cancelCta: () => setDialogOpen(false),
  };

  const deleteAllProducts = async () => {
    let res = await deleteAllProductInProject(Number(id));

    if (res) {
      setProductsInProject([]);
      setProductsImpact(null);
      updateProductsInProject();
      setDialogOpen(false);
      toast.success("Les produits ont été supprimés avec succès");
    } else {
      alert("Failed to delete products");
      setDialogOpen(false);
      toast.error(
        "Une erreur s'est produite lors de la suppression des produits"
      );
    }
  };

  const addProductWithoutFormSubmit = async (origin: string) => {
    const productId = selectedProduct?.id ? selectedProduct?.id : null;
    let qNew = document.getElementById("qNew-addProduct") as any;
    let qUsed = document.getElementById("qUsed-addProduct") as any;
    if (origin === "AI") {
      setAddProductLoaderAI(true);
      qNew = document.getElementById("qNew-addProduct-AI") as any;
      qUsed = document.getElementById("qUsed-addProduct-AI") as any;
    } else {
      setAddProductLoader(true);
    }

    if (
      !productId ||
      !qNew ||
      !qUsed ||
      (qNew.value === "0" && qUsed.value === "0")
    ) {
      return;
    }

    await addProductSubmitWithoutForm(
      productId,
      Number(qNew.value),
      Number(qUsed.value)
    );
    (document.getElementById("qNew-addProduct") as HTMLInputElement).value =
      "0";
    (document.getElementById("qUsed-addProduct") as HTMLInputElement).value =
      "0";
    updateProductsInProject();
    setAddProductLoader(false);
    setAddProductLoaderAI(false);
    toast.success("Le produit a été ajouté avec succès");
  };

  const updateProductsInProject = async () => {
    if (!id) return;
    const projectData = await getProjectById(Number(id));
    if (!projectData) {
      console.log("No project found for this id:", projectData);
      console.error("Failed to fetch project:");
      toast.error(
        "Une erreur s'est produite lors de la récupération du projet"
      );
      return;
    }
    let products = Array.isArray(projectData.products)
      ? projectData.products
      : [projectData.products];
    if (products && products.length > 0) {
      setProductsInProject(products.reverse());
      setProductsImpact(products as AddProductType | null);
    } else {
      setProductsInProject([]);
      setProductsImpact(null);
    }

    const groupData = await getGroupById(Number(projectData.group));
    if (groupData) {
      projectData.groupInfo = databaseToGroupModel(groupData);
      setProject(projectData);
    } else {
      console.log("No group found for this project");
    }

    setProject(projectData);
    // Get stored products
    const productsData = getProducts();
    setStoreProductsInies([]);
    setStoreProductsAutres([]);
    setStoreProducts([]);
    if (productsData) {
      let tempInies = getProductByBase(await productsData, "Inies");
      setStoreProductsInies(tempInies);
      if (tempInies.length > 0) {
        setSelectedProductId(tempInies[0].id);
      }
      let tempAutres = getProductByBase(await productsData, "Autre");
      setStoreProductsAutres(tempAutres);
      let tempResProducts: ProductType[] = [];
      tempResProducts.push(...tempInies);
      tempResProducts.push(...tempAutres);
      setStoreProducts(tempResProducts);
    } else {
      console.log("No products found");
    }
  };

  const addProductSubmitWithoutForm = async (
    productToAdd: Number,
    qNew: Number,
    qUsed: Number
  ) => {
    const product = await getProductById(Number(productToAdd));
    if (!product) {
      console.log("Ce produit n'existe pas");
      return;
    }
    const finalProduct: any = product;
    const tempProductToAdd: AddProductType = {
      product: [finalProduct],
      idProject: Number(id),
      qNew: Number(qNew),
      qUsed: Number(qUsed),
      addOn: null,
      updatedOn: null,
    };
    let res = await addProductInProject(tempProductToAdd);
    if (res) {
      updateProductsInProject();
    } else {
      console.log("Failed to add product", await res);
      alert("Failed to add product");
      toast.error("Une erreur s'est produite lors de l'ajout du produit");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Get user session
      let res = await getSession();
      const session = await res;
      if (!session) {
        console.error("Failed to fetch session:", session.error);
        alert(session.error);
        toast.error(
          "Une erreur s'est produite lors de la récupération de la session"
        );
      } else {
        await setUser(session.user);
        // Get project by id
        res = await getProjectById(Number(id));
        const data = await res;
        if (data) {
          const projectData = data;
          //setDescription(projectData.description ?? "");
          res = await getGroupById(projectData.group ?? 0);
          const groupData = await res;
          if (groupData) {
            projectData.groupInfo = databaseToGroupModel(groupData);
            setProject(projectData);
            let products = Array.isArray(projectData.products)
              ? projectData.products
              : [projectData.products];
            if (products && products.length > 0) {
              setProductsInProject(products.reverse());
              setProductsImpact(products as AddProductType | null);
            } else {
              setProductsInProject([]);
              setProductsImpact(null);
            }
            // Get stored products
            res = await getProducts();
            const productsData = await res;
            if (productsData) {
              let tempInies = getProductByBase(productsData, "Inies");
              setStoreProductsInies(tempInies);
              if (tempInies.length > 0) {
                setSelectedProductId(tempInies[0].id);
              }
              let tempAutres = getProductByBase(productsData, "Autre");
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

  const handleDownloadProject = async () => {
    toast.warning("Cette fonctionnalité n'est pas encore disponible.");
  };

  return (
    <div className="project-page w-full">
      {/* Header */}
      <div className="flex gap-2 items-start md:items-center lg:items-center justify-between w-full">
        {/* Colonne gauche avec le titre et les informations */}
        <div className="flex items-center gap-3">
          {/* <Title {...title} /> */}
          <Button
            isIconOnly
            color="danger"
            onClick={handleDownloadProject}
            size="lg"
            className="text-md rounded-full outfit-regular w-full"
          >
            <X strokeWidth={1.5} />
          </Button>
          <h2 className="outfit-semibold text-4xl tertiary-color tracking-wider">
            {project?.name}
          </h2>
          <Chip
            size="lg"
            color="primary"
            variant="flat"
            className="outfit-regular text-sm"
          >
            {project && project.groupInfo
              ? project.groupInfo.name
              : "N'appartient à aucun groupe"}
          </Chip>
        </div>

        {/* Colonne droite avec les boutons */}
        <div className="flex items-center gap-3 ml-auto">
          <Button
            color="primary"
            startContent={
              isDownloadLoading ? <Spinner /> : <Download strokeWidth={1.5} />
            }
            onClick={downloadPNG}
            size="lg"
            variant="ghost"
            className="text-md rounded-full outfit-regular w-full"
          >
            Télécharger
          </Button>
          <ShowInformations
            project={project}
            ctaSave={() => {
              updateProductsInProject();
            }}
          />
        </div>
      </div>

      {/* Products */}
      {project && productsInProject ? (
        <div className="mt-5">
          <div className="px-0 lg:px-0">
            <div className="flex md:items-end justify-between">
              <div className="flex flex-wrap md:items-end w-full">
                {section === "products" && (
                  <div className="flex flex-wrap gap-3 w-full items-center">
                    <div className="text-lg flex flex-wrap items-center gap-2 w-full">
                      <Select
                        items={storeProductsInies}
                        labelPlacement="outside"
                        label="Aménagement intérieur"
                        placeholder="ex: Cloison en plâtre"
                        size="lg"
                        variant="bordered"
                        radius="full"
                        className="max-w-xs text-lg rounded-full bg-white font-outfit"
                        onChange={(event) => {
                          setSelectedProductId(parseInt(event.target.value));
                        }}
                      >
                        {(product) => (
                          <SelectItem
                            key={product.id ?? -1}
                            value={product.id ?? -1}
                            className="text-black font-outfit text-lg"
                          >
                            {product.name?.replace("Inies - ", "")}
                          </SelectItem>
                        )}
                      </Select>
                      <Input
                        type="text"
                        isReadOnly
                        label="Unité"
                        labelPlacement="outside"
                        value={selectedProduct?.unit ?? ""}
                        variant="bordered"
                        size="lg"
                        radius="full"
                        className="w-[150px] max-w-[20%] text-lg bg-white rounded-full outfit-regular"
                      />
                      <Input
                        type="number"
                        label="Quantité Neuve"
                        labelPlacement="outside"
                        size="lg"
                        id="qNew-addProduct-AI"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-lg bg-white rounded-full outfit-regular"
                      />

                      <Input
                        type="number"
                        label="Quantité Réemploi"
                        labelPlacement="outside"
                        id="qUsed-addProduct-AI"
                        size="lg"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-md bg-white rounded-full outfit-regular"
                      />

                      {addProductLoaderAI ? (
                        <Loader />
                      ) : (
                        <Button
                          color="primary"
                          variant="ghost"
                          className="text-md rounded-full outfit-regular mt-6"
                          size="lg"
                          onClick={() => {
                            const qNew = document.getElementById(
                              "qNew-addProduct-AI"
                            ) as HTMLInputElement;
                            const qUsed = document.getElementById(
                              "qUsed-addProduct-AI"
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
                            addProductWithoutFormSubmit("AI");
                          }}
                        >
                          Ajouter
                        </Button>
                      )}
                    </div>

                    <div className="text-lg flex flex-wrap items-center gap-2 w-full">
                      <Select
                        items={storeProductsAutres}
                        labelPlacement="outside"
                        label="Mobilier"
                        placeholder="ex: Chaise en bois et textile"
                        size="lg"
                        variant="bordered"
                        radius="full"
                        className="max-w-xs text-lg rounded-full bg-white font-outfit"
                        onChange={(event) => {
                          setSelectedProductId(parseInt(event.target.value));
                        }}
                      >
                        {(product) => (
                          <SelectItem
                            key={product.id ?? -1}
                            value={product.id ?? -1}
                            className="text-black font-outfit text-lg"
                          >
                            {product.name?.replace("Inies - ", "")}
                          </SelectItem>
                        )}
                      </Select>
                      <Input
                        type="text"
                        isReadOnly
                        label="Unité"
                        labelPlacement="outside"
                        value={selectedProduct?.unit ?? ""}
                        variant="bordered"
                        size="lg"
                        radius="full"
                        className="w-[150px] max-w-[20%] text-lg bg-white rounded-full outfit-regular"
                      />
                      <Input
                        type="number"
                        label="Quantité Neuve"
                        labelPlacement="outside"
                        size="lg"
                        id="qNew-addProduct"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-lg bg-white rounded-full outfit-regular"
                      />

                      <Input
                        type="number"
                        label="Quantité Réemploi"
                        labelPlacement="outside"
                        id="qUsed-addProduct"
                        size="lg"
                        min={0}
                        placeholder="0"
                        variant="bordered"
                        radius="full"
                        className="w-[150px] text-md bg-white rounded-full outfit-regular"
                      />

                      {addProductLoader ? (
                        <Loader />
                      ) : (
                        <Button
                          color="primary"
                          variant="ghost"
                          className="text-md rounded-full outfit-regular mt-6"
                          size="lg"
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
                            addProductWithoutFormSubmit("");
                          }}
                        >
                          Ajouter
                        </Button>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center justify-center md:items-end md:gap-8"></div>
                  </div>
                )}
              </div>
              {/* Dialog */}
              {dialogOpen && <Dialogs {...dialogProps} />}
            </div>

            {section === "products" && (
              <div className="flex items-center justify-center my-[5%] md:my-[2%]">
                <Divider />
              </div>
            )}

            <div className="flex flex-wrap items-center gap-1 md:gap-5 text-lg">
              {section === "products" &&
                productsInProject &&
                productsInProject.length > 0 &&
                productsInProject[0] && (
                  <Button
                    color="primary"
                    size="lg"
                    radius="full"
                    onClick={() => {
                      section === "products"
                        ? setSection("impact")
                        : setSection("products");
                    }}
                    className="text-lg w-fit-content rounded-full outfit-regular"
                  >
                    {section === "products"
                      ? "Afficher l'impact"
                      : "Afficher les produits"}
                  </Button>
                )}
            </div>
          </div>
          {section === "products" ? (
            <div className="my-[5%] md:my-[2%] flex flex-wrap items-center justify-between gap-y-3 md:gap-5">
              {kartLoaded ? (
                <Loader />
              ) : /* productCards */
              (productsInProject && productsInProject.length === 0) ||
                !productsInProject ||
                productsInProject === undefined ||
                !productsInProject[0] ? (
                <div className="mt-10 flex flex-col gap-7 items-center justify-center">
                  <p className="text outfit-regular">
                    Il n'y a pas de produits dans votre projet...
                  </p>
                </div>
              ) : (
                productsInProject?.map((product, index) => {
                  return (
                    <ProductInProjectCard
                      product={product}
                      qNewReceived={product?.qNew || 0}
                      qUsedReceived={product?.qUsed || 0}
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
              <ImpactSection
                products={productsImpact as AddProductType[]}
                project={project}
                ctaView={(view: string) => {
                  setSection(view);
                }}
              />
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
