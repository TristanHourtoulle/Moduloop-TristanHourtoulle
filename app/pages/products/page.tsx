import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import Link from 'next/link'
import Image from 'next/image'

export default function page() {

    const title: TitleType = {
        title: "Vos produits",
        image: "/icons/entrepot.svg",
        number: "245"
    }

  return (
    <div>
        <div className='flex items-center'>
            <div className='mr-auto'>
                <Title {...title} />
            </div>

            <Link href="/products/add">
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
    </div>
  )
}
