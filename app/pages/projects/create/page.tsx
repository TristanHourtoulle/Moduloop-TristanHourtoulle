"use client"

import React, {useState, useEffect} from 'react'
import { TitleType } from '@models/Title'
import { Title } from '@components/Title'
import Image from 'next/image'
import { User } from '@models/User'
import { GroupType } from '@models/Group'
import { databaseToGroupModel } from '@utils/convert'

function page() {
    const [idUser, setIdUser] = useState(null)
    const [groups, setGroups] = useState<GroupType | null>(null)

    useEffect (() => {
        const fetchData = async () => {
            let res = await fetch('/api/session', {
                method: 'GET'
            })
            const data = await res.json()
            if (data.success) {
                console.log("GET: ", data.session.user)
                await setIdUser(data.session.user.id)
                console.log("ID: ", data.session.user.id); // Afficher la valeur juste après l'avoir définie
            } else {
                console.error('Failed to fetch user:', data.error)
                alert("ERROR")
            }
            res = await fetch('/api/group/list?id=${encodeURIComponent(idUser)}', {
                method: 'GET'
            });
            const groupData = await res.json();
            if (groupData.success) {
                console.log("GROUP GET: ", groupData.data)
                setGroups(databaseToGroupModel(groupData.data));
            } else {
                console.error('Failed to fetch groups:', groupData.error);
                alert("ERROR")
            }
        }
        fetchData()
    }, [])

    const [createGroup, setCreateGroup] = useState(false);

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCreateGroup(e.target.value === "-1" ? true : false)
    }

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
            <div className='flex-container'>
                <div className='create-project-section'>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-7 md:flex-row'>
                            <div className='flex flex-col md:w-1/2'>
                                <div className='flex items-center justify-center mb-5'>
                                    <label hidden htmlFor="name" className='form-label'>Prénom</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Quel est le nom de votre projet ?"
                                        className="border-2 border-gray-300 p-2 rounded-md w-full md:w-96 font-sans"
                                        required
                                    />
                                </div>

                                <div className='flex items-center justify-center'>
                                    <label hidden htmlFor="description" className='form-label'>Prénom</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Vous pouvez décrire votre projet ici"
                                        className="border-2 border-gray-300 p-2 rounded-md w-full md:w-96 h-48 large-input"
                                    />
                                </div>

                                <div className='flex items-center justify-center mb-5'>
                                    <label hidden htmlFor="company" className='form-label'>Prénom</label>
                                    <input
                                        type="text"
                                        id="company"
                                        name="company"
                                        placeholder="Pour quelle entreprise est-ce destiné ?"
                                        className="border-2 border-gray-300 p-2 rounded-md w-full md:w-96 font-sans"
                                    />
                                </div>

                                <div className='flex items-center justify-center mb-5'>
                                    <label hidden htmlFor="location" className='form-label'>Prénom</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        placeholder="Où votre entreprise est-elle situé ?"
                                        className="border-2 border-gray-300 p-2 rounded-md w-full md:w-96 font-sans"
                                    />
                                </div>

                                <div className='flex items-center justify-center mb-5'>
                                    <label hidden htmlFor="group" className='form-label'>Prénom</label>
                                    <select name="group" id="group" className='border-2 border-gray-300 p-2 rounded-md w-full md:w-96 font-sans' required onChange={handleGroupChange}>
                                        <option value="">Aucun groupe</option>
                                        <option value="1">Strasbourg</option>
                                        <option value="2">Paris</option>
                                        <option value="3">Nice</option>
                                        <option value="-1">
                                                Créer un groupe
                                        </option>
                                    </select>
                                    {/* Display only if he wants to create a group */}
                                </div>
                                {createGroup &&
                                    <div className=' flex flex-col gap-2 create-group-section'>
                                        <label hidden htmlFor="group-name" className='form-label'>Prénom</label>
                                        <input
                                            type="text"
                                            id="group-name"
                                            name="group-name"
                                            placeholder="Nom du groupe"
                                            className="border-2 border-blue-400 p-2 rounder-md w-full md:w-48 font-sans"
                                            required
                                        />
                                        <label hidden htmlFor="group-description" className='form-label'>Prénom</label>
                                        <textarea
                                            id="group-description"
                                            name="group-description"
                                            placeholder="Description du groupe"
                                            className="border-2 border-blue-400 p-2 rounder-md w-full md:w-48 font-sans large-input"
                                        />
                                        <label hidden htmlFor="group-budget" className='form-label'>Prénom</label>
                                        <input
                                            type="text"
                                            id="group-budget"
                                            name="group-budget"
                                            placeholder="Budget de votre groupe"
                                            className="border-2 border-blue-400 p-2 rounder-md w-full md:w-48 font-sans"
                                        />
                                        <label hidden htmlFor="group-image" className='form-label'>Prénom</label>
                                        <input
                                            type="file"
                                            id="group-image"
                                            name="group-image"
                                            placeholder="Ajoutez une image"
                                            className="border-2 border-blue-400 p-2 rounder-md w-full md:w-48 font-sans"
                                        />
                                    </div>
                                }
                            </div>
                            <div className='md:hidden ml-auto mr-auto' style={{ borderLeft: '1px solid black', height: '100%', alignSelf: 'center' }}></div>
                            <div className='flex flex-col md:w-1/2'>
                                <div className='flex items-center justify-center mb-5'>
                                    <label hidden htmlFor="area" className='form-label'>Prénom</label>
                                    <input
                                        type="text"
                                        id="area"
                                        name="area"
                                        placeholder="Quelle est la superficie de votre projet ?"
                                        className="border-2 border-gray-300 p-2 rounded-md w-full md:w-96 font-sans"
                                    />
                                </div>

                                <div className='flex items-center justify-center mb-5'>
                                    <label hidden htmlFor="budget" className='form-label'>Prénom</label>
                                    <input
                                        type="text"
                                        id="budget"
                                        name="budget"
                                        placeholder="Quelle est votre budget ?"
                                        className="border-2 border-gray-300 p-2 rounded-md w-full md:w-96 font-sans"
                                    />
                                </div>

                                <div className='flex items-center justify-center mb-5'>
                                    <label hidden htmlFor="image" className='form-label'>Prénom</label>
                                    <input
                                        type="file"
                                        id="image"
                                        name="image"
                                        placeholder="Ajoutez une image"
                                        className="border-2 border-gray-300 p-2 rounded-md w-full md:w-96 font-sans"
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
                <div className='image-container'>
                    <Image
                        src="/icons/create-project-page.svg"
                        alt="Créer un projet"
                        width={400}
                        height={400}
                    />
                </div>
            </div>
        </div>
    )
}

export default page