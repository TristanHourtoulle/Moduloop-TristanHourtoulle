import React from 'react'
import Link from 'next/link'

export const LoginButton = () => {
  return (
    <div className='auth-button'>
      <Link href="/pages/login">
        <p className='auth-button-text text'>Se connecter</p>
      </Link>
    </div>
  )
}
