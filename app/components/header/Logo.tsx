import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Logo = () => {
  return (
    <Link href='/' className='flex gap-2 flex-center nav-logo'>
        <Image
            src="/icons/logo.png"
            alt="Moduloop Logo"
            width={150}
            height={150}
            className='object-contain'
        />
    </Link>
  )
}
