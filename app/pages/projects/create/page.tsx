"use client"

import React from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'

function page() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        alert("Hello")
    }

    const title: TitleType = {
        title: "Votre nouveau projet",
        image: "/icons/close.svg",
        number: "",
        back: "/pages/projects"
      }

  return (
    <div>
        <Title {...title} />
        <div className='create-project-section'>
            <form onSubmit={handleSubmit}>
                <div className='flex items-center justify-center gap-7'>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-center mb-5'>
                            <label hidden htmlFor="name" className='form-label'>Prénom</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Quel est le nom de votre projet ?"
                                className="border-2 border-gray-300 p-2 rounded-md w-96 font-sans"
                                required
                            />
                        </div>

                        <div className='flex items-center justify-center'>
                            <label hidden htmlFor="description" className='form-label'>Prénom</label>
                            <textarea
                                id="description"
                                name="description"
                                placeholder="Vous pouvez décrire votre projet ici"
                                className="border-2 border-gray-300 p-2 rounded-md w-96 h-48 large-input"
                            />
                        </div>

                        <div className='flex items-center justify-center mb-5'>
                            <label hidden htmlFor="company" className='form-label'>Prénom</label>
                            <input
                                type="text"
                                id="company"
                                name="company"
                                placeholder="Pour quelle entreprise est-ce destiné ?"
                                className="border-2 border-gray-300 p-2 rounded-md w-96 font-sans"
                            />
                        </div>

                        <div className='flex items-center justify-center mb-5'>
                            <label hidden htmlFor="location" className='form-label'>Prénom</label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Où votre entreprise est-elle situé ?"
                                className="border-2 border-gray-300 p-2 rounded-md w-96 font-sans"
                            />
                        </div>

                        <div className='flex items-center justify-center mb-5'>
                            <label hidden htmlFor="group" className='form-label'>Prénom</label>
                            <input
                                type="text"
                                id="group"
                                name="group"
                                placeholder="Vos groupes..."
                                className="border-2 border-gray-300 p-2 rounded-md w-96 font-sans"
                            />
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='separator-form'></div>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex items-center justify-center mb-5'>
                            <label hidden htmlFor="area" className='form-label'>Prénom</label>
                            <input
                                type="text"
                                id="area"
                                name="area"
                                placeholder="Quelle est la superficie de votre projet ?"
                                className="border-2 border-gray-300 p-2 rounded-md w-96 font-sans"
                            />
                        </div>

                        <div className='flex items-center justify-center mb-5'>
                            <label hidden htmlFor="budget" className='form-label'>Prénom</label>
                            <input
                                type="text"
                                id="budget"
                                name="budget"
                                placeholder="Quelle est votre budget ?"
                                className="border-2 border-gray-300 p-2 rounded-md w-96 font-sans"
                            />
                        </div>

                        <div className='flex items-center justify-center mb-5'>
                            <label hidden htmlFor="image" className='form-label'>Prénom</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                placeholder="Ajoutez une image"
                                className="border-2 border-gray-300 p-2 rounded-md w-96 font-sans"
                            />
                        </div>

                        <div className='mt-auto ml-auto mr-auto'>
                            <button type="submit" className='validate'>
                                Créer
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default page