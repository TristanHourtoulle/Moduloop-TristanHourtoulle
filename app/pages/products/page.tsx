import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'

export default function page() {

    const title: TitleType = {
        title: "Vos produits",
        image: "/icons/entrepot.svg",
        number: "245"
    }

  return (
    <div>
        <Title {...title} />
    </div>
  )
}
