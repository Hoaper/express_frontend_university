'use client';
import React from 'react';
import {useRouter} from "next/navigation";

function Layout({ children }: { children: React.ReactNode }) {
    const token = localStorage.getItem('token');
    const router = useRouter();
    if (!token) {
        router.push("/login");
        return;
    } else {
        return (
            <div>
                {children}
            </div>
        );
    }
}

export default Layout;