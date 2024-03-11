import React from 'react'
import GlobalTable from './impact/GlobalTable'
import ListMostImpact from './impact/ListMostImpact'
import { AddProductType } from '@models/AddProduct'

const ImpactSection = (props: { products: AddProductType[] }) => {
    const { products } = props;
    const [impactSelect , setImpactSelect] = React.useState('global');

    return (
        <div className='flex flex-col items-start gap-5 my-[2%] mx-[5%]'>
            <div className='flex gap-5 items-center mb-[1%]'>
                <p onClick={() => {setImpactSelect("global")}} className={impactSelect === 'global' ? "cursor-pointer text-xl font-bold" : "cursor-pointer text-xl opacity-50"}>Global</p>
                <p onClick={() => {setImpactSelect("ranking")}} className={impactSelect === 'ranking' ? "cursor-pointer text-xl font-bold" : "cursor-pointer text-xl opacity-50"}>Classement</p>
            </div>
            <p className='text-2xl font-medium mb-[1%]'>Impact de votre projet sur l'environnement</p>
            {impactSelect === 'global' && <GlobalTable products={products}/> }
            {impactSelect === 'ranking' && <ListMostImpact products={products}/> }
        </div>
    )
}

export default ImpactSection