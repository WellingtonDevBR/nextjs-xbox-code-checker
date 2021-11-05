import axios from "axios";
import { useState } from "react";
import { api } from "./api";

interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}

export async function getXboxValidator(code: string) {

    const token = await api.get('/xbox')
    .then((response) => {
        return response.data.Authorization
    }).catch(err => {
        return err;
    })

    console.log(token)
    let keys = await axios.get<XboxKey>(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US&supportMultiAvailabilities=true`, {
        headers: {
            Authorization: `${token}`
        }
    }).then((response) => {
        return response.data;
    })
    return keys;
}