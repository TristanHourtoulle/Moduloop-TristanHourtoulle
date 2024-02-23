import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from '@models/Product'
import Card from '@components/products/Card'

export default function page() {

    let products: ProductType[] = [];

    products = [
        {
            id: 1,
            name: "Chaise en bois",
            image: "/products/chaise_en_bois.png",
            unit: "pièce",
            base: "Impact",
            nrc_manufacturing: null,
            nrc_installation: null,
            nrc_usage: null,
            nrc_end_of_life: null,
            nerf_manufacturing: null,
            nerf_installation: null,
            nerf_usage: null,
            nerf_end_of_life: null,
            nase_manufacturing: null,
            nase_installation: null,
            nase_usage: null,
            nase_end_of_life: null,
            nem_manufacturing: null,
            nem_installation: null,
            nem_usage: null,
            nem_end_of_life: null,
            rrc_manufacturing: null,
            rrc_installation: null,
            rrc_usage: null,
            rrc_end_of_life: null,
            rerf_manufacturing: null,
            rerf_installation: null,
            rerf_usage: null,
            rerf_end_of_life: null,
            rase_manufacturing: null,
            rase_installation: null,
            rase_usage: null,
            rase_end_of_life: null,
            rem_manufacturing: null,
            rem_installation: null,
            rem_usage: null,
            rem_end_of_life: null

        },
        {
            id: 2,
            name: "Etagère",
            image: "/products/etagere.png",
            unit: "pièce",
            base: "Impact",
            nrc_manufacturing: null,
            nrc_installation: null,
            nrc_usage: null,
            nrc_end_of_life: null,
            nerf_manufacturing: null,
            nerf_installation: null,
            nerf_usage: null,
            nerf_end_of_life: null,
            nase_manufacturing: null,
            nase_installation: null,
            nase_usage: null,
            nase_end_of_life: null,
            nem_manufacturing: null,
            nem_installation: null,
            nem_usage: null,
            nem_end_of_life: null,
            rrc_manufacturing: null,
            rrc_installation: null,
            rrc_usage: null,
            rrc_end_of_life: null,
            rerf_manufacturing: null,
            rerf_installation: null,
            rerf_usage: null,
            rerf_end_of_life: null,
            rase_manufacturing: null,
            rase_installation: null,
            rase_usage: null,
            rase_end_of_life: null,
            rem_manufacturing: null,
            rem_installation: null,
            rem_usage: null,
            rem_end_of_life: null

        },
        {
            id: 3,
            name: "Etagère",
            image: "/products/etagere.png",
            unit: "pièce",
            base: "Impact",
            nrc_manufacturing: null,
            nrc_installation: null,
            nrc_usage: null,
            nrc_end_of_life: null,
            nerf_manufacturing: null,
            nerf_installation: null,
            nerf_usage: null,
            nerf_end_of_life: null,
            nase_manufacturing: null,
            nase_installation: null,
            nase_usage: null,
            nase_end_of_life: null,
            nem_manufacturing: null,
            nem_installation: null,
            nem_usage: null,
            nem_end_of_life: null,
            rrc_manufacturing: null,
            rrc_installation: null,
            rrc_usage: null,
            rrc_end_of_life: null,
            rerf_manufacturing: null,
            rerf_installation: null,
            rerf_usage: null,
            rerf_end_of_life: null,
            rase_manufacturing: null,
            rase_installation: null,
            rase_usage: null,
            rase_end_of_life: null,
            rem_manufacturing: null,
            rem_installation: null,
            rem_usage: null,
            rem_end_of_life: null

        },
        {
            id: 4,
            name: "Etagère",
            image: "/products/etagere.png",
            unit: "pièce",
            base: "Impact",
            nrc_manufacturing: null,
            nrc_installation: null,
            nrc_usage: null,
            nrc_end_of_life: null,
            nerf_manufacturing: null,
            nerf_installation: null,
            nerf_usage: null,
            nerf_end_of_life: null,
            nase_manufacturing: null,
            nase_installation: null,
            nase_usage: null,
            nase_end_of_life: null,
            nem_manufacturing: null,
            nem_installation: null,
            nem_usage: null,
            nem_end_of_life: null,
            rrc_manufacturing: null,
            rrc_installation: null,
            rrc_usage: null,
            rrc_end_of_life: null,
            rerf_manufacturing: null,
            rerf_installation: null,
            rerf_usage: null,
            rerf_end_of_life: null,
            rase_manufacturing: null,
            rase_installation: null,
            rase_usage: null,
            rase_end_of_life: null,
            rem_manufacturing: null,
            rem_installation: null,
            rem_usage: null,
            rem_end_of_life: null

        },
        {
            id: 4,
            name: "Etagère",
            image: "/products/etagere.png",
            unit: "pièce",
            base: "Impact",
            nrc_manufacturing: null,
            nrc_installation: null,
            nrc_usage: null,
            nrc_end_of_life: null,
            nerf_manufacturing: null,
            nerf_installation: null,
            nerf_usage: null,
            nerf_end_of_life: null,
            nase_manufacturing: null,
            nase_installation: null,
            nase_usage: null,
            nase_end_of_life: null,
            nem_manufacturing: null,
            nem_installation: null,
            nem_usage: null,
            nem_end_of_life: null,
            rrc_manufacturing: null,
            rrc_installation: null,
            rrc_usage: null,
            rrc_end_of_life: null,
            rerf_manufacturing: null,
            rerf_installation: null,
            rerf_usage: null,
            rerf_end_of_life: null,
            rase_manufacturing: null,
            rase_installation: null,
            rase_usage: null,
            rase_end_of_life: null,
            rem_manufacturing: null,
            rem_installation: null,
            rem_usage: null,
            rem_end_of_life: null

        },
        {
            id: 4,
            name: "Etagère",
            image: "/products/etagere.png",
            unit: "pièce",
            base: "Impact",
            nrc_manufacturing: null,
            nrc_installation: null,
            nrc_usage: null,
            nrc_end_of_life: null,
            nerf_manufacturing: null,
            nerf_installation: null,
            nerf_usage: null,
            nerf_end_of_life: null,
            nase_manufacturing: null,
            nase_installation: null,
            nase_usage: null,
            nase_end_of_life: null,
            nem_manufacturing: null,
            nem_installation: null,
            nem_usage: null,
            nem_end_of_life: null,
            rrc_manufacturing: null,
            rrc_installation: null,
            rrc_usage: null,
            rrc_end_of_life: null,
            rerf_manufacturing: null,
            rerf_installation: null,
            rerf_usage: null,
            rerf_end_of_life: null,
            rase_manufacturing: null,
            rase_installation: null,
            rase_usage: null,
            rase_end_of_life: null,
            rem_manufacturing: null,
            rem_installation: null,
            rem_usage: null,
            rem_end_of_life: null

        }
    ]

    const title: TitleType = {
        title: "Vos produits",
        image: "/icons/entrepot.svg",
        number: products.length.toString()
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

        <div className='ml-5 scroll-view'>
            <div className='products-cards'>
                {products ? (
                    products.map((product: ProductType) => (
                        <Card key={product.id} {...product}/>
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
