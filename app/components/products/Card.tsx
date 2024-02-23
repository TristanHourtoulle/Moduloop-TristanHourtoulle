import React from 'react'
import { ProductType } from '@models/Product'
import Image from 'next/image'
import Link from 'next/link'

const Card = (product: ProductType) => {
  return (
    <div className="product-card">
        <div className='product-header'>
            <h2 className='product-title'>{product.name}</h2>
        </div>
        <div className='product-content-space'>
            <div className='product-image'>
                <Image
                    src={product.image ?? ''}
                    alt={product.name ?? ''}
                    width={100}
                    height={100}
                    className='object-contain'
                />
            </div>
            <div className='product-base'>
                <h3>{product.base}</h3>
            </div>
        </div>
        <div className="product-separation"></div>
        <Link href='#'>
            <p className='product-button link-to-scale'>Ouvrir</p>
        </Link>
    </div>
  )
}

export default Card