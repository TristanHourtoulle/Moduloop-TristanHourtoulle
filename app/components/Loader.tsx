import React from 'react'
import Image from 'next/image';

const Loader = () => {
    return (
        <Image
            src="/icons/logoImage.svg"
            alt="Loader"
            width={50}
            height={50}
            className='loader'
        />
    )
}

export default Loader