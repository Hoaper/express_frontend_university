'use client';
import React from 'react';
import {useRouter} from "next/router";

function Layout({ children }: { children: React.ReactNode }) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') as string : "";
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