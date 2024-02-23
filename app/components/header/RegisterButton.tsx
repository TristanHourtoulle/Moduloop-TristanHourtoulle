import React from 'react'
import Link from 'next/link'

export const RegisterButton = () => {
  return (
    <div className='auth-button'>
      <Link href="/pages/register">
        <p className='auth-button-text text'>S'inscrire</p>
      </Link>
    </div>
  )
}
