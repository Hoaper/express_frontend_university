'use client';
import {useRouter} from "next/router";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') as string : "";
    const router = useRouter();
    if (!token) {
        return <>{children}</>;
    } else {
        router.push("/");
    }
}