import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'

export default function page() {

    const title: TitleType = {
        title: "Mettre à jour vos produits",
        image: "/icons/admin.svg",
        number: null
    }

  return (
    <div>
        <Title {...title} />
    </div>
  )
}
