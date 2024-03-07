import React from 'react'
import GlobalTable from './impact/GlobalTable'
import { AddProductType } from '@models/AddProduct'

const ImpactSection = (props: { products: AddProductType[] }) => {
    const { products } = props;

    return (
        <div className='flex flex-col items-start gap-5 my-[2%] mx-[5%]'>
            <p className='text-2xl font-medium'>Impact Section</p>
            <GlobalTable products={products}/>
        </div>
    )
}

export default ImpactSection