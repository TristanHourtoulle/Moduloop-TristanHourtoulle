import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { TitleType } from '@models/Title';

function isOnlyNumber(str: string) {
    return /^\d+$/.test(str);
}

export const Title = (title: TitleType) => {
    const [nameOfPage, setNameOfPage] = useState(title.number || "");
    const [displayChange, setDisplayChange] = useState(false);

    useEffect(() => {
      setNameOfPage(title.number || "");
    }
    , [title.number]);

    const handleSubmitTitle = () => {
        setDisplayChange(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameOfPage(e.target.value);
    };

    const handleCancelChangeTitle = () => {
        setNameOfPage(title.number || "");
        setDisplayChange(false);
    };

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

            {title.canChange && (
                <div className='flex gap-5'>
                    {displayChange ? (
                        <input onChange={handleChange} type="text" className="title-input" value={nameOfPage} />
                    ) : (
                        <p className='page-number'>{nameOfPage}</p>
                    )}

                    {!displayChange ? (<Image
                        src="/icons/Edit.svg"
                        alt="Change"
                        width={50}
                        height={50}
                        className='cursor-pointer'
                        onClick={() => setDisplayChange(!displayChange)}
                    />) :
                      (<div className='flex'>
                          <Image
                              src={"/icons/validé.svg"}
                              alt={"Change"}
                              width={50}
                              height={50}
                              className='cursor-pointer'
                              onClick={() => setDisplayChange(!displayChange)}
                          />
                          <Image
                              src="/icons/close.svg"
                              alt="Cancel"
                              width={50}
                              height={50}
                              className='cursor-pointer'
                              onClick={() => handleCancelChangeTitle()}
                          />
                      </div>)}
                </div>
            )}

            {!title.canChange && <p className='page-number'>({title.number})</p>}
        </div>
    );
};
