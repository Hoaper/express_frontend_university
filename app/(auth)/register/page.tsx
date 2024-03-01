'use client';
import React from 'react';
import {useRouter} from "next/navigation";
import toast, {toastConfig} from "react-simple-toasts";



toastConfig({theme: "chroma", duration: 1000, position: "top-center", className: "bg-[#675335] p-2"})
function Page() {
    const router = useRouter();
    const [login, setLogin] = React.useState('')
    const [password, setPassword] = React.useState('')

    const password_regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (
            !password_regex.test(login)
        ) {
            return toast("🔑 Invalid mail")
        }
        const res = await fetch('https://golang-university.onrender.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password})
        })
        if (res.ok) {
            const data = await res.json()
            if (typeof window !== 'undefined') localStorage.setItem('token', data.token)
            router.push('/')
        } else {
            const data = await res.json()
            toast("🔑" + data.message || "❌ Something went wrong")
        }
    }


    return (
        <div>
            <div className="h-screen overflow-hidden flex items-center justify-center">
                <div className="bg-[#675335] border-2 border-black rounded-xl lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
                    <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor" className="w-10 h-10">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                        </svg>

                    </div>
                    <form className="p-12 md:p-24" onSubmit={onSubmit}>
                        <div className="flex items-center text-lg mb-6 md:mb-8">
                            <svg className="absolute ml-3" width="24" viewBox="0 0 24 24">
                                <path
                                    d="M20.822 18.096c-3.439-.794-6.64-1.49-5.09-4.418 4.72-8.912 1.251-13.678-3.732-13.678-5.082 0-8.464 4.949-3.732 13.678 1.597 2.945-1.725 3.641-5.09 4.418-3.073.71-3.188 2.236-3.178 4.904l.004 1h23.99l.004-.969c.012-2.688-.092-4.222-3.176-4.935z"/>
                            </svg>
                            <input value={login} onChange={(e) => setLogin(e.target.value)} type="text" id="username" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Username" />
                        </div>
                        <div className="flex items-center text-lg mb-6 md:mb-8">
                            <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                                <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                            </svg>
                            <input value={password} onChange={(e) => setPassword(e.target.value)}  type="password" id="password" className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Password" />
                        </div>
                        <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full">Register!</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Page;