import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'

export default function page() {

    const title: TitleType = {
        title: "Vos projets",
        image: "/icons/but.svg",
        number: "5"
    }

  return (
    <div>
        <Title {...title} />
    </div>
  )
}
