import axios from "axios";
import { api } from "./api";

interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}

let cookie = '';

export async function getXboxValidator(code: string) {

    if (!cookie) {
        cookie = await api.post('/xbox').then((response) => {
            return response.data;
        })
    }

    let keys = await axios.get<XboxKey>(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US&supportMultiAvailabilities=true`, {
        headers: {
            Authorization: `WLID1.0=${cookie}`
        }
    }).then((response) => {
        return response.data;
    })
    return keys;
}