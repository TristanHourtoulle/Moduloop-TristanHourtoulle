import React from 'react'
import { TitleType } from '@models/Title'
import Image from 'next/image'

function isOnlyNumber(str: string) {
    return /^\d+$/.test(str);
}

export const Title = (title: TitleType) => {
    let number = ""
    if (title.number) {
        if (isOnlyNumber(title.number)) {
            number = "(" + title.number + ")"
        } else {
            number = title.number
        }
    }

  return (
    <div className='flex ml-5 gap-5 items-center'>
      <a href={title.back}>
        <Image
            src={title.image}
            alt="Page Logo"
            width={50}
            height={50}
            className='object-contain title-image'
        />
      </a>

        <h1 className='page-title'>{title.title}</h1>
        <p className='page-number'>{number}</p>
    </div>
  )
}
