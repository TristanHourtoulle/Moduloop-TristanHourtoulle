import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import UploadForm from '@components/products//UploadMaj'

export default function page() {

    const title: TitleType = {
        title: "Mettre à jour vos produits",
        image: "/icons/admin.svg",
        number: null
    }

  return (
    <div>
        <Title {...title} />

        <div className='flex flex-col items-center add-product-card ml-auto mr-auto mt-10'>
          <div className='flex flex-col items-center tutoriel'>
            <p>
              Pour mettre à jour vos produits, veuillez vous référer à ce tutoriel:
            </p>
            <button type="button">Tutoriel</button>
          </div>

          <div className='flex flex-col items-center upload'>
            <p>Ensuite, uploader votre fichier ici:</p>
            <UploadForm />
          </div>
        </div>
    </div>
  )
}
