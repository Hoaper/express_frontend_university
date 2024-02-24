'use client';
import React from 'react';
import {useRouter} from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/login');
        }
    }, []);

    return (
        <div>
            {children}
        </div>
    );
}

export default Layout;