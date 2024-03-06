"use client"

import { ProjectType } from "@models/Project"
import { useEffect, useState } from "react";
import { TitleType } from '@models/Title';
import { databaseToGroupModel, databaseToSingleProjectModel } from '../../../utils/convert';
import { Title } from '@components/Title'
import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from "@models/Product";
import ProductCard from "@components/projects/ProductCard";
import ProductInProjectCard from "@components/projects/ProductInProjectCard";

export default function Page({
    params: { id },
} : {
    params: { id: string }
}) {
    const [user, setUser] = useState(null);
    const [project, setProject] = useState<ProjectType | null>(null);
    const [products, setProducts] = useState<ProductType | null>(null);
    const [storeProducts, setStoreProducts] = useState<ProductType[] | null>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [productCards, setProductCards] = useState([]);

    const updatePopupState = () => {
        setIsPopupOpen(!isPopupOpen);
    }

    useEffect(() => {
        const fetchData = async () => {
            // Get user session
            let res = await fetch('/api/session', {
                method: 'GET'
            });
            const session = await res.json();
            if (!session.success) {
                console.error('Failed to fetch session:', session.error);
                alert(session.error);
            } else {
                await setUser(session.session.user);
                // Get project by id
                res = await fetch(`/api/project?id=${encodeURIComponent(id)}`, {
                    method: 'GET'
                });
                const data = await res.json();
                if (data.success) {
                    const projectData = databaseToSingleProjectModel(data.product);
                    res = await fetch(`/api/group/id?id=${encodeURIComponent(projectData.group)}`, {
                        method: 'GET'
                    });
                    const groupData = await res.json();
                    if (groupData.success) {
                        projectData.groupInfo = databaseToGroupModel(groupData.data);
                        setProject(projectData);
                        let index = 0
                        let products = Array.isArray(projectData.products) ? projectData.products : [projectData.products];
                        let tempProductCards = [];
                        for (let item of products) {
                            tempProductCards.push(<ProductInProjectCard product={item} key={index} />);
                            index++;
                        }
                        setProductCards(tempProductCards);
                        // Get stored products
                        res = await fetch(`/api/product/list`, {
                            method: 'GET'
                        });
                        const productsData = await res.json();
                        if (productsData.success) {
                            setStoreProducts(productsData.data);
                        } else {
                            console.error('Failed to fetch products:', productsData.error);
                            alert(productsData.error);
                        }
                    } else {
                        console.error('Failed to fetch group:', groupData.error);
                        alert(groupData.error);
                    }
                } else {
                    console.error('Failed to fetch project:', data.error);
                    alert(data.error);
                }
            }
        }

        fetchData()
    }, []);

    const addProductSubmit = async () => {
        updatePopupState();
    }

    const addProductForm = async (product: ProductType, index: number) => {
        alert(index)
    }

    const title: TitleType = {
        title: "Votre projet",
        image: "/icons/close.svg",
        number: project ? project.name : "Chargement...",
        back: "/pages/projects"
    }

    return (
        <div className="project-page w-full">
            {/* Header */}
            <div className="flex items-center">
                <Title {...title} />
                <Link href="/pages/projects/create" className='create-project-button'>
                    <div className='flex gap-5'>
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
                            <Image
                                src="/icons/lien.svg"
                                alt=""
                                width={20}
                                height={20}
                            />
                            <p>{project.groupInfo.name}</p>
                        </div>
                    ) : (
                        "Chargement..."
                    )}
                </Link>
            </div>
            {/* Infos */}
            <div className="flex items-center justify-center gap-20 section-infos">
                {/* SearchBar */}
                <div className="flex items-center gap-2">
                    {/* Input */}
                    <div className="flex items-center search-bar-input">
                        <input className="input" type="text" value="" placeholder="Chercher un produit dans votre projet..." />
                        <Image
                            src="/icons/chercher.svg"
                            alt="Rechercher"
                            width={20}
                            height={20}
                        >

                        </Image>
                    </div>
                    {/* Filter btn */}
                    <button className="filter-btn title-image">
                        <Image
                            src="/icons/filtre.svg"
                            alt="Filtrer"
                            width={30}
                            height={30}
                        >
                        </Image>
                    </button>
                </div>
                {/* Description */}
                <div>
                    <textarea value={project?.description} className="description-input">
                    </textarea>
                </div>
                {/* Cost & number Products -> to do later */}
            </div>
            {/* Products */}
            {project?.products ? (
                <div className="flex items-center justify-start mx-[5%] my-[2%]">
                    <div className="">
                        <button onClick={addProductSubmit} className="flex items-center justify-center gap-5 add-product-btn">
                            <Image
                                src="/icons/plus-blanc.svg"
                                alt="Ajouter un produit"
                                width={20}
                                height={20}
                            >
                            </Image>
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
                                        >
                                        </Image>
                                    </button>
                                    <h2 className="title mr-auto">Ajouter un produit</h2>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-center form">
                                        <div className="flex items-center gap-2">
                                            {/* Input */}
                                            <div className="flex items-center search-bar-input">
                                                <input className="input" type="text" value="" placeholder="Chercher un produit dans votre projet..." />
                                                <Image
                                                    src="/icons/chercher.svg"
                                                    alt="Rechercher"
                                                    width={20}
                                                    height={20}
                                                >

                                                </Image>
                                            </div>
                                            {/* Filter btn */}
                                            <button className="filter-btn">
                                                <Image
                                                    src="/icons/filtre.svg"
                                                    alt="Filtrer"
                                                    width={30}
                                                    height={30}
                                                >
                                                </Image>
                                            </button>
                                        </div>
                                        <div className="products-section" style={{ display: 'flex', flexWrap: 'wrap', maxHeight: 'calc(100% - 200px)', overflowY: 'auto', flexDirection: 'row', gap: '2px', margin: '1rem', justifyContent: 'center' }}>
                                            {storeProducts && storeProducts.map((product, index) => (
                                                <ProductCard key={index} product={product} idProject={Number(id)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {productCards}
                </div>
                
            ) : (
                <div className="mt-10 flex flex-col gap-7 items-center justify-center">
                    <p className="text">Il n'y a pas de produits dans votre projet...</p>
                    <div className="">
                        <button onClick={addProductSubmit} className="flex items-center justify-center gap-5 add-product-btn">
                            <Image
                                src="/icons/plus-blanc.svg"
                                alt="Ajouter un produit"
                                width={20}
                                height={20}
                            >
                            </Image>
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
                                        >
                                        </Image>
                                    </button>
                                    <h2 className="title mr-auto">Ajouter un produit</h2>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex flex-col items-center form">
                                        <div className="flex items-center gap-2">
                                            {/* Input */}
                                            <div className="flex items-center search-bar-input">
                                                <input className="input" type="text" value="" placeholder="Chercher un produit dans votre projet..." />
                                                <Image
                                                    src="/icons/chercher.svg"
                                                    alt="Rechercher"
                                                    width={20}
                                                    height={20}
                                                >

                                                </Image>
                                            </div>
                                            {/* Filter btn */}
                                            <button className="filter-btn">
                                                <Image
                                                    src="/icons/filtre.svg"
                                                    alt="Filtrer"
                                                    width={30}
                                                    height={30}
                                                >
                                                </Image>
                                            </button>
                                        </div>
                                        <div className="products-section" style={{ display: 'flex', flexWrap: 'wrap', maxHeight: 'calc(100% - 200px)', overflowY: 'auto', flexDirection: 'row', gap: '2px', margin: '1rem', justifyContent: 'center' }}>
                                            {storeProducts && storeProducts.map((product, index) => (
                                                <ProductCard key={index} product={product} idProject={Number(id)} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}