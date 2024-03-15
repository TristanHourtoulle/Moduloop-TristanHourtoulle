import TrashCan from '@components/button/TrashCan'
import { ProductType } from '@models/Product'
import Image from 'next/image'
import Link from 'next/link'

const Card = (product: ProductType) => {
    const showProductUrl = '/pages/products/' + product.id
    const nameProduct = product.name?.replace("Inies - ", "")
    const baseName = product.base?.toLowerCase()?.replace(/^\w/, (c) => c.toUpperCase());
  return (
    <div className='product-card w-[30%] px-[2%] py-[2%] flex flex-col gap-2'>
        {/* Header */}
        <div className='flex items-center justify-between'>
            <div className='flex flex-col'>
                <h2 className='name'>{nameProduct}</h2>
                <p className='base'>{baseName}</p>
            </div>
            <TrashCan size={23} />
        </div>
        {/* Content */}
        <div className='flex justify-center'>
            <Image
                src={product.image ? product.image : '/icons/no-image.png'}
                alt={nameProduct ? nameProduct : ''}
                width={150}
                height={150}
            />
        </div>
        {/* CTA */}
        <div className='flex items-center gap-3 justify-center link-cta ml-auto mr-auto'>
            <Link href={showProductUrl} className='flex items-center gap-15 bg-white border-10'>
                <Image
                    src="/icons/link.svg"
                    alt="Ouvrir"
                    width={27}
                    height={27}
                    className='object-contain'
                />
                <p>Ouvrir</p>
            </Link>
        </div>
    </div>
  )
}

{/* <div className="product-card">
    <div className='product-header'>
        <h2 className='product-title'>{product.name}</h2>
    </div>
    <div className='product-content-space'>
        <div className='product-image'>
            {product.image != '' && product.image ? <Image
                src={product.image ?? ''}
                alt={product.name ?? ''}
                width={100}
                height={100}
                className='object-contain'
            /> : <Image
            src="/icons/no-image.png"
            alt=""
            width={100}
            height={100}
            className='object-contain'
        />}
        </div>
        <div className='product-base'>
            <h3>{product.base}</h3>
        </div>
    </div>
    <div className="product-separation"></div>
    <Link href={showProductUrl}>
        <p className='product-button link-to-scale'>Ouvrir</p>
    </Link>
</div> */}

export default Card
