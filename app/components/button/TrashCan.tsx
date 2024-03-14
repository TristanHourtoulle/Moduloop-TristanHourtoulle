import React from 'react'
import Image from 'next/image';

export interface TrashCanProps {
  size?: number;
}

const TrashCan = ({ size }: TrashCanProps) => {
  return (
    <div className='delete-btn flex cursor-pointer'>
        <Image
        src="/icons/trash-can.svg"
        alt="Supprimer le produit du projet"
        width={size || 25}
        height={size || 25}
        />
    </div>
  )
}

export default TrashCan