'use client';
import React from 'react';

import {useRouter} from "next/navigation";
import jwt from "jsonwebtoken";
import {DecodedToken} from "@/types/token";
import toast, {toastConfig} from "react-simple-toasts";
import {configToast} from "@/utils/toast";

configToast()
function Page() {
    const router = useRouter();
    React.useEffect(() => {

        const token = localStorage.getItem('token') as string;
        const decoded_token = jwt.decode(token) as DecodedToken;
        if (token.length == 0 || decoded_token.role !== 'admin') {
            router.push('/');
        }
    }, []);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        toast("Идет добавление вашей книги...")
        const formData = new FormData(e.currentTarget)
        const jsonData = {} as any;
        formData.forEach((value, key) => {
            if (['rating', 'pages', 'date', 'stock'].includes(key)) {
                jsonData[key] = parseFloat(value as string);
            } else {
                jsonData[key] = value;
            }
        });
        jsonData['validUntil'] = new Date(jsonData['validUntil'])
        jsonData["image"] = "https://media.istockphoto.com/id/182174182/photo/open-book.webp?s=2048x2048&w=is&k=20&c=esD9dLU84aBPKQPTDvbHiosAohjIe2ygRF7xL-5G-BE="
        const resp = await fetch("https://golang-university.onrender.com/add_book",{
            method: "POST",
            body: JSON.stringify(jsonData)
        })
        if (resp.ok) {
            toast("Success!")
        } else {
            toast("Something went wrong!")
        }



    }

    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">Добро пожаловать в Админ Панель! Здесь вы можете добавить новую книгу!</h2>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">


                    <form className="max-w-sm mx-auto" onSubmit={submit}>
                        <div className="mb-5">
                            <label htmlFor="title"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                            <input type="text" id="title" name={"title"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   placeholder="Awesome book" required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                            <input type="text" id="description" name={"description"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="author"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                            <input type="text" id="author" name={"author"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="rating"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rating</label>
                            <input type="number" id="rating" name={"rating"}
                                   max={5.0}
                                   aria-valuemax={5.0}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="pages"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Count of pages</label>
                            <input type="number" id="pages" name={"pages"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        {/*refactor*/}
                        <div className="mb-5">
                            <label htmlFor="languages"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Language</label>
                            <input type="text" id="languages" name={"languages"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="date"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Year of publish</label>
                            <input type="number" id="date" name={"date"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        {/*refactor*/}
                        <div className="mb-5">
                            <label htmlFor="category"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <input type="text" id="category" name={"category"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="stock"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                            <input type="number" id="stock" name={"stock"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="validUntil"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valid until</label>
                            <input type="date" id="validUntil" name={"validUntil"}
                                   className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                   required/>
                        </div>

                        <button type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Page;