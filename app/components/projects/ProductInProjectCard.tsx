import React from 'react'
import { AddProductType } from '../../models/AddProduct';
import { useState } from 'react'
import Image from 'next/image';

const ProductInProjectCard = (props: { product: AddProductType }) => {
    const { product } = props;
    const [qNew, setQNew] = useState(product.qNew)
    const [initialQNew, setInitialQNew] = useState(product.qNew)
    const [qUsed, setQUsed] = useState(product.qUsed)
    const [initialQUsed, setInitialQUsed] = useState(product.qUsed)
    const [isDifferent, setIsDifferent] = useState(false)

    const handleQNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setQNew(newValue);
        if ((newValue !== initialQNew || qUsed !== initialQUsed) && !isDifferent) {
            setIsDifferent(true);
        } else if (isDifferent && newValue === initialQNew && qUsed === initialQUsed) {
            setIsDifferent(false);
        }
    }

    const handleQUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = Number(e.target.value);
        setQUsed(newValue);
        if ((qNew !== initialQNew || newValue !== initialQUsed) && !isDifferent) {
            setIsDifferent(true);
        } else if (isDifferent && qNew === initialQNew && newValue === initialQUsed) {
            setIsDifferent(false);
        }
    }

    const handleUpdate = async () => {
        alert("I have to update the product in this project")
    }

  return (
    <div className='product-in-project-card w-[20%] px-[2%] py-[1%]  flex flex-col items-center'>
        <p className="font-2xl">{product.product.name}</p>
        <Image
            src={product.product.image ? product.product.image : '/icons/no-image.png'}
            alt={product.product.name ? product.product.name : ''}
            width={40}
            height={40}
        />
        <div className='flex items-center justify-center w-[75%] gap-3'>
            <div className="flex flex-col justify-center">
                <label className="text-xs" htmlFor={`new`}>Neuf</label>
                <input type="number" name={`new`} id={`new`} value={qNew} onChange={handleQNewChange} className="w-full text-right input-bg-gray-200"></input>
            </div>
            <div className="flex flex-col">
                <label className="text-xs" htmlFor={`reuse`}>Réemploi</label>
                <input type="number" name={`reuse`} id={`reuse`} value={qUsed} onChange={handleQUsedChange} className="w-full text-right input-bg-gray-200"></input>
            </div>
            <button onClick={handleUpdate} className={ isDifferent ? "text-bottom project-product-button" : "hidden text-bottom project-product-button"}>Modifier</button>
        </div>
    </div>
  )
}

export default ProductInProjectCard