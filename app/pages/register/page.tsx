"use client"

import { User } from "@models/User"

export default function Register() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user: User = {
            id: 0,
            firstName: formData.get("firstName") as string,
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: "user",
            createdAt: Date.now().toString(),
            updatedAt: Date.now().toString(),
            avatar: "",
        }

        try {
            const response = await fetch("/api/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                window.location.href = "/pages/login"
            } else {
            }
        } catch (error) {
        }
    }

    return (
        <div className="flex justify-center items-center my-auto mt-20">
            <div className="flex flex-col justify-center items-center mx-auto">
                <h1 className="text-6xl font-bold mb-10">Créer un compte</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label hidden htmlFor="firstName">Prénom</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Prénom"
                            className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label hidden htmlFor="name">Nom</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Nom"
                            className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label hidden htmlFor="email">Email</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Email"
                            className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label hidden htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Mot de passe"
                            className="border-2 border-gray-300 p-2 rounded-md w-96 font-bold font-sans"
                            required
                        />
                    </div>

                    <div className="items-center justify-center ml-20">
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded-md w-48">
                                <p className="text-xl">Valider</p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}