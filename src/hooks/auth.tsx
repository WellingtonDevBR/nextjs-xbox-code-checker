import React, {
    createContext, useContext, useCallback, useState, ReactNode,
} from 'react';

interface CartProviderProps {
    children: ReactNode;
  }

interface CookieContextData {
    addCookie: (cookie: string) => Promise<void>;
}

const CookieContext = createContext<CookieContextData>({} as CookieContextData);

export function CookieProvider({ children }: CartProviderProps) {
    const [cookie, setCookie] = useState<CookieContextData>();
    
    
    async function addProduct(cookie: number)  {
        console.log('testtt');
    }
}


export function useCookie(): CookieContextData {
    const context = useContext(CookieContext);

    if (!context) {
        throw new Error('deu algo de errado ai');
    }

    return context;
}