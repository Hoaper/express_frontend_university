import React from "react";
import Link from "next/link";
import {isAllowAccess} from "@/utils/role";
import jwt from "jsonwebtoken";
import {DecodedToken} from "@/types/token";
import BookModal from "@/components/BookModal";
import toast from "react-simple-toasts";
import {configToast} from "@/utils/toast";
import {useRouter} from "next/navigation";

configToast();

const texts = {
    default: "У вас будет ровно неделя с момента получения книги, чтобы ее прочитать и вернуть.",
    teacherAlert: "Обратите внимание, что вы берете книгу из запаса! У вас есть неделя чтобы изучить книгу, после чего вы должны будете её вернуть.",
}

export default function BookDescription({data}: {data: any}) {

    const token = localStorage.getItem('token') as string;
    const router = useRouter();
    const decoded_token = jwt.decode(token) as DecodedToken;
    const [isModalOpen, setIsModalOpen] = React.useState(false);

    const processOrder = async () => {
        const res = await fetch("http://localhost:5000/process_order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token,
                book_id: data._id,
            }),
        })
        const res_json = await res.json();
        toast(res.ok ? "⭐ Книга успешно добавлена в вашу библиотеку!" : `❌ ${res_json.message}`);
        setIsModalOpen(false);
        if (res.ok) setInterval(() => window.location.reload(), 1300);

    }

    return (
        <div className={"flex mt-10 mx-20"}>
            {isModalOpen
                && <BookModal text={data.stock <= 3 && decoded_token.role === "teacher" ? texts.teacherAlert : texts.default}  processOrder={processOrder} onClose={() => setIsModalOpen(false)} /> }
            <figure className="w-[1024px] mr-20">
                <img className="h-auto max-w-[1024px] rounded-lg" src={data.image} alt="image description"/>
                <figcaption className="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
                    {data.stock >= 1 && decoded_token && isAllowAccess(decoded_token.role, data.stock)
                        &&
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-gray-800 float-left hover:bg-gray-700 w-full text-white font-bold py-2 px-4 rounded-xl"
                        >
                            Получить!
                        </button>
                    }
                </figcaption>
            </figure>

            <div className={"max-w-full"}>
            <div className="px-4 sm:px-0">
                    <h3 className="text-2xl font-semibold leading-7 text-white">
                        {data.title}
                        <p className={"text-sm"}>
                            {data.date}
                        </p>
                        <p className="text-sm mt-2 flex font-medium text-gray-900">
                            {data.rating}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24"
                                 strokeWidth={1.5} stroke="currentColor" className="-mt-0.5 w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
                            </svg>
                        </p>
                    </h3>
                </div>

                <div className="mt-6">
                    <p className="text-lg flex font-medium text-black">
                        <span className={"text-white"}>{data.author}</span>
                    </p>
                    <p className="mt-2 text-lg text-black">
                        Осталось:
                        <span className={`text-white`}> {data.stock}</span>
                    </p>
                    <p className={"mt-2 text-lg text-black"}>
                        Категория: <Link className={"text-white underline"} href={`/books?category=${data.category}`}>{data.category}</Link>
                    </p>
                    <p className={"mt-2 text-lg text-black"}>
                        Язык: <span className={"text-white"}>{data.languages}</span>
                    </p>
                    <p className={"mt-2 text-lg text-black"}>
                        Страниц: <span className={"text-white"}>{data.pages}</span>
                    </p>
                    <p className={"mt-2 text-lg text-white"}>
                        {data.description}
                    </p>
                </div>
            </div>
        </div>
    )
}
