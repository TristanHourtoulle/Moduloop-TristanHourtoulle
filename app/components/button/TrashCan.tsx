import React from 'react'
import Image from 'next/image';

const TrashCan = () => {
  return (
    <div className='delete-btn'>
        <Image
        src="/icons/trash-can.svg"
        alt="Supprimer le produit du projet"
        width={20}
        height={20}
        />
    </div>
  )
}

export default TrashCan