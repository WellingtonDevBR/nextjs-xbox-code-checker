import axios from "axios";
import cors from 'cors';

interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}

export async function getXboxValidator(code: string) {

    let keys = await axios.get<XboxKey>(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US&supportMultiAvailabilities=true`, {
        headers: {
            Authorization: process.env.NEXT_PUBLIC_XBOX_AUTHENTICATION
        }
    }).then((response) => {
        return response.data;
    });
    return keys;
}