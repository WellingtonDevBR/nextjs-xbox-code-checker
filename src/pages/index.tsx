import FileLocate from '../components/FileLocate'
import { Header } from '../components/Header'
import React, { useEffect } from 'react';

export default function Home() {
    return (
        <div>
            <Header />
            <FileLocate />
        </div>
    )
}