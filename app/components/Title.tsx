import React from 'react'
import { TitleType } from '@models/Title'
import Image from 'next/image'
import { useState } from 'react'

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
    const [nameOfPage, setNameOfPage] = useState<string>(number);
    const [displayChange, setDisplayChange] = useState<boolean>(false);

    const handleSubmitTitle = () => {
      setDisplayChange(false)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNameOfPage(e.target.value)
    }

    const handleCancelChangeTitle = () => {
      setNameOfPage(number)
      setDisplayChange(false)
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
        {title.canChange && displayChange ? ( <input onChange={handleChange} type="text" className="title-input" value={nameOfPage} /> )
        : ( <p className='page-number'>{nameOfPage}</p> )}

        {title.canChange && !displayChange && (
          <Image
            src="/icons/lien.png"
            alt="Change"
            width={50}
            height={50}
            className='cursor-pointer'
            onClick={() => setDisplayChange(!displayChange)}
          />
        )}

        {title.canChange && displayChange && (
          <div className='flex'>
            <Image
              src="/icons/validé.png"
              alt="Change"
              width={50}
              height={50}
              className='cursor-pointer'
              onClick={() => handleSubmitTitle()}
            />
            <Image
              src="/icons/close.png"
              alt="Cancel"
              width={50}
              height={50}
              className='cursor-pointer'
              onClick={() => handleCancelChangeTitle()}
            />
          </div>
        )}
    </div>
  )
}
