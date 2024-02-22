"use client"

import { User } from '@/models/User';

export default function Login() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        alert("Form submitted !")
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const user: User = {
            id: 0,
            firstName: "",
            name: "",
            email: formData.get("email") as string,
            password: formData.get("password") as string,
            role: "",
            createdAt: "",
            updatedAt: "",
            avatar: "",
        }
        console.log("Value from form: ", user)

        try {
            const email = user.email || '';
            const password = user.password || '';
            const url = `/api/user?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                console.log("Successfully logged in !")
                window.location.href = "/"
            } else {
                console.log("Error: ", response.statusText)
                alert("Error: " + response.statusText)
            }
        } catch (error) {
            console.log("Error: ", error)
            alert("Error: " + error)
        }
    }

  return (
    <div className='flex justfy-center items-center my-auto mt-20'>
        <div className='flex flex-col items-center mx-auto'>
            <h1 className='text-6xl font-bold mb-10'>Se connecter</h1>
            <form onSubmit={handleSubmit}>
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

