import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'

export default function page() {

    const title: TitleType = {
        title: "Utilisateurs",
        image: "/icons/admin.svg",
        number: "5",
        back: "#"
    }

  return (
    <div>
        <Title {...title} />
    </div>
  )
}
