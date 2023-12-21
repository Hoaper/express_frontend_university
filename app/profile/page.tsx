'use client';
import React, {useEffect} from 'react';
import jwt from 'jsonwebtoken';
import {DecodedToken} from "@/types/token";
import {Book} from "@/types/book";
import {formatDate} from "@/utils/date";

const SECRET_KEY = "1oic2oi1ensd0a9dicw121k32aspdojacs";

function Page() {
    const [books, setBooks] = React.useState([]);

    useEffect(() => {
        (async () => {
            const token = localStorage.getItem('token') as string;
            const decoded_token = jwt.decode(token) as DecodedToken;
            const resp = await fetch(`http://localhost:5000/profile/${decoded_token.userId}`, {
                method: "GET",
            });
            const data = await resp.json();
            data.forEach((book:any) => {
                console.log(book)
            })
            setBooks(data);
        })()
    }, []);

    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">Книги у вас на руках:</h2>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {books.map((book: any) => (
                        <div key={book.book_id} className="group relative">
                            <div className={"text-white "}>
                                Вернуть до: {formatDate(new Date(book.due_date))}
                            </div>
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={book.book.image}
                                    alt={book.book.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>

                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-200">
                                        <a href={`/books/${book.book_id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {book.book.title}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-400">{book.book.description.slice(0, 100)}...</p>
                                </div>
                                <p className="text-sm flex font-medium text-gray-900">
                                    {book.book.rating}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="-mt-0.5 w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                                    </svg>

                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Page;