import React from 'react'
import { useState } from 'react'
import { ProductType } from '@models/Product'
import Card from '@components/projects/products/Card'
import { AddProductType } from '@models/AddProduct'

const ProductCard = (props: { product: ProductType, idProject: number }) => {
    const { product, idProject } = props;

    const [qNew, setQNew] = useState(0)
    const [qUsed, setQUsed] = useState(0)

    const handleQNewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQNew(Number(e.target.value))
    }

    const handleQUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQUsed(Number(e.target.value))
    }

    const handleAdd = async () => {
        const addProduct: AddProductType = {
            product: product,
            idProject: idProject,
            qNew: qNew,
            qUsed: qUsed,
            addOn: null,
            updatedOn: null
        }

        let res = await fetch(`/api/project/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(addProduct)
        })

        if (res.ok) {
        } else {
            console.error('Erreur lors de l\'ajout du produit au projet')
            alert("ERROR")
        }
    }

  return (
    <div className="project-product-card flex flex-col">
        {/* Afficher les informations sur le produit */}
        <Card {...product} />
        <div className="flex gap-1 items-center justify-center">
            <div className="flex flex-col justify-center">
                <label className="text-xs" htmlFor={`new`}>Neuf</label>
                <input type="number" name={`new`} id={`new`} value={qNew} onChange={handleQNewChange} className="w-3/4 text-right input-bg-gray-200"></input>
            </div>
            <div className="flex flex-col">
                <label className="text-xs" htmlFor={`reuse`}>Réemploi</label>
                <input type="number" name={`reuse`} id={`reuse`} value={qUsed} onChange={handleQUsedChange} className="w-3/4 text-right  input-bg-gray-200"></input>
            </div>
            <button onClick={handleAdd} className="text-bottom project-product-button">Ajouter</button>
        </div>
    </div>
  )
}

export default ProductCard