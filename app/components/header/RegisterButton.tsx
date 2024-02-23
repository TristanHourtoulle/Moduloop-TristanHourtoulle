import React from 'react'
import Link from 'next/link'

export const RegisterButton = () => {
  return (
    <div className='auth-button'>
      <Link href="/register">
        <p className='auth-button-text text'>S'inscrire</p>
      </Link>
    </div>
  )
}
