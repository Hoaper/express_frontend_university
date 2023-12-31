'use client';
import React, {useCallback, useEffect, useState} from 'react';
import {Book} from "@/types/book";

function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [almost, setAlmost] = useState<Book[]>([]);
    const [topRating, setTopRating] = useState<Book[]>([]);

    useEffect(() => {
        (async () => {
            const almost = await fetch("http://localhost:5000/books/almost");
            const almost_data = await almost.json();
            setAlmost(almost_data);
            const topRating = await fetch("http://localhost:5000/books/top_rating");
            const topRating_data = await topRating.json();
            setTopRating(topRating_data);
        })();
    }, []);

    const fetchMoreBooks = useCallback(async () => {
        const apiUrl = `http://localhost:5000/books/?page=${page}&limit=40`;
        setLoading(true);
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Update the books state with the new data
            setBooks(prevBooks => [...prevBooks, ...data]);

            // Increment the page number for the next fetch
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching more books:', error);
        }
        setLoading(false);
    }, [page]);

    useEffect(() => {
        // Fetch initial set of books
        fetchMoreBooks();
    }, []);

    useEffect(() => {
        // Add scroll event listener to detect when the user reaches the bottom
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight &&
                !loading // Add a loading state to prevent multiple simultaneous requests
            ) {
                // Fetch more books when the user reaches the bottom
                fetchMoreBooks();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchMoreBooks, loading])

    return (
        <div>
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-white">Топовые книги:</h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {topRating.map((book) => (
                        <div key={book._id} className="group relative">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-200">
                                        <a href={`/books/${book._id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {book.title}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-400">{book.description.slice(0, 100)}...</p>
                                </div>
                                <p className="text-sm flex font-medium text-gray-900">
                                    {book.rating}
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


                <h2 className="text-2xl font-bold tracking-tight text-white">Почти закончились:</h2>
                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {almost.map((book) => (
                        <div key={book._id} className="group relative">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-200">
                                        <a href={`/books/${book._id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {book.title}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-400">{book.description.slice(0, 100)}...</p>
                                </div>
                                <p className="text-sm flex font-medium text-gray-900">
                                    {book.rating}
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


                <h2 className="text-2xl font-bold tracking-tight text-white">Книги, которые могут вам понравиться:</h2>

                <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-5 xl:gap-x-8">
                    {books.map((book) => (
                        <div key={book._id} className="group relative">
                            <div
                                className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-sm text-gray-200">
                                        <a href={`/books/${book._id}`}>
                                            <span aria-hidden="true" className="absolute inset-0"/>
                                            {book.title}
                                        </a>
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-400">{book.description.slice(0, 100)}...</p>
                                </div>
                                <p className="text-sm flex font-medium text-gray-900">
                                    {book.rating}
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
            {loading
                &&
                <div role="status" className={"flex justify-center"}>
                    <svg aria-hidden="true"
                         className="w-20 h-20 animate-spin text-amber-400 fill-amber-600"
                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"/>
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>
    );
}

export default Books;