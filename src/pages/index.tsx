import FileLocate from '../components/FileLocate'
import { Header } from '../components/Header'
import axios from 'axios';
import { api } from '../services/api';
import { useCookie } from '../hooks/auth';
import React, { useEffect } from 'react';

export default function Home() {
    return (
        <div>
            <Header />
            <FileLocate />
        </div>
    )
}