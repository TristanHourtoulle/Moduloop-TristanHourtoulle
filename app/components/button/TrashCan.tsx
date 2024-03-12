import React from 'react'
import Image from 'next/image';

const TrashCan = () => {
  return (
    <div className='delete-btn flex'>
        <Image
        src="/icons/trash-can.svg"
        alt="Supprimer le produit du projet"
        width={25}
        height={25}
        />
    </div>
  )
}

export default TrashCan