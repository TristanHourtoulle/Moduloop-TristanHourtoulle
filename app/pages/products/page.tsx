import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import Link from 'next/link'
import Image from 'next/image'
import { ProductType } from '@models/Product'
import Card from '@components/products/Card'

export default function page() {

    let products: ProductType[] = [];

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

