'use client';
import {useRouter} from "next/navigation";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const token = localStorage.getItem("token");
    const router = useRouter();
    if (!token) {
        return <>{children}</>;
    } else {
        router.push("/");
    }
}