"use client"

import React, { useEffect, useState } from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from '@models/Product'
import Card from '@components/products/Card'

export default function page() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/product/list', {
                method: 'GET'
            });
            const data = await res.json();
            if (data.success) {
                setProducts(data.data);
            } else {
                console.error('Failed to fetch products:', data.error);
            }
        };
        fetchData();
    }, []);

    const title: TitleType = {
        title: "Vos produits",
        image: "/icons/entrepot.svg",
        number: products.length.toString(),
        back: "#",
        canChange: false,
        id_project: 0
    }

  return (
    <div>
        <div className='flex items-center mb-10'>
            <div className='mr-auto'>
                <Title {...title} />
            </div>

            <Link href="/pages/products/add">
                <div className='flex items-center justify-center gap-2 mr-5 handle-product-button'>
                        <Image
                            src="/icons/reglages.svg"
                            alt="Add Product"
                            width={30}
                            height={30}
                            className='object-contain handle-product-image'
                        />
                        <p className='handle-product-text'>Gérer</p>
                </div>
            </Link>
        </div>

        <div className='ml-[3%] scroll-view overflow-y-hidden'>
            <div className='products-cards mb-[3%]'>
                {products ? (
                    products.map((product, index) => (
                        <Card key={index} {...product}/>
                    ))
                ) : (
                    <div className='flex items-center justify-center'>
                        <p className='no-product-text'>Oh, c'est bien vide par ici...</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

