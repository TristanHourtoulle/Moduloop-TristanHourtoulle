import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = () => {
  return (
    <Link href='/' className='flex gap-2 flex-center nav-logo'>
        <Image
            src="/icons/logoImage.svg"
            alt="Moduloop Logo"
            width={30}
            height={30}
            className='object-contain'
        />
        <p className='nav-logo-text text'>Moduloop</p>
    </Link>
  )
}
