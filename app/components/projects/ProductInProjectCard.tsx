import React from 'react'
import { AddProductType } from '../../models/AddProduct';
import { useState } from 'react'
import Image from 'next/image';
import { Toaster, toast } from 'sonner';
import TrashCan from '@components/button/TrashCan';

const ProductInProjectCard = (props: { product: AddProductType, idProject: number }) => {
    const { product, idProject } = props;
    const [qNew, setQNew] = useState(product.qNew)
    const [initialQNew, setInitialQNew] = useState(product.qNew)
    const [qUsed, setQUsed] = useState(product.qUsed)
    const [initialQUsed, setInitialQUsed] = useState(product.qUsed)
    const [isDifferent, setIsDifferent] = useState(false)

    const handleAdd = async () => {
        const addProduct: AddProductType = {
            product: product.product,
            idProject: idProject,
            qNew: qNew - initialQNew,
            qUsed: qUsed - initialQUsed,
            addOn: null,
            updatedOn: null,
        };
        console.log("product to change: ", addProduct)

        let res = await fetch(`/api/project/addProduct`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addProduct),
        });

        if (res.ok) {
            toast.success('Produit ajouté au projet', { duration: 2000 });
            setInitialQNew(qNew)
            setInitialQUsed(qUsed)
            setIsDifferent(false)
            window.location.reload()
        } else {
            console.error("Erreur lors de l'ajout du produit au projet");
            toast.error("Erreur lors de l'ajout du produit au projet.", { duration: 2000 });
        }
    };

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

    const handleDeleteProduct = async () => {
        if (window.confirm("Voulez-vous vraiment supprimer ce produit du projet ?\n Cet action est irréversible.")) {
            // Delete product from project
            let res = await fetch(`/api/project/list?id_project=${idProject}&id_product=${product.product.id}`, {
                method: 'DELETE',
            });
            if (res.ok) {
                toast.success('Produit supprimé du projet', { duration: 2000 });
                window.location.reload()
            } else {
                console.error("Erreur lors de la suppression du produit du projet");
                toast.error("Erreur lors de la suppression du produit du projet.", { duration: 2000 });
            }
        } else {
            // Do nothing
            alert("Product not deleted from the project.")
        }
    }

  return (
    <div className='product-in-project-card w-[20%] px-[2%] py-[1%]  flex flex-col items-center'>
        <div className='flex gap-5'>
            <div onClick={handleDeleteProduct} className='cursor-pointer'>
                <TrashCan />
            </div>
            <p className="ml-auto font-2xl">{product.product.name}</p>
        </div>
        <Image
            src={product.product.image ? product.product.image : '/icons/no-image.png'}
            alt={product.product.name ? product.product.name : ''}
            width={40}
            height={40}
        />
        <div className='flex items-center justify-center w-[75%] gap-3'>
            <div className="flex flex-col justify-center">
                <label className="text-xs" htmlFor={`new`}>Neuf</label>
                <input min={0} type="number" name={`new`} id={`new`} value={qNew} onChange={handleQNewChange} className="w-full text-right input-bg-gray-200"></input>
            </div>
            <div className="flex flex-col">
                <label className="text-xs" htmlFor={`reuse`}>Réemploi</label>
                <input min={0} type="number" name={`reuse`} id={`reuse`} value={qUsed} onChange={handleQUsedChange} className="w-full text-right input-bg-gray-200"></input>
            </div>
        </div>
        <button onClick={handleAdd} className={ isDifferent ? "text-bottom project-product-button mt-[5%]" : "hidden text-bottom project-product-button"}>Modifier</button>
        <Toaster richColors position="top-center" expand={false} />
    </div>
  )
}

export default ProductInProjectCard