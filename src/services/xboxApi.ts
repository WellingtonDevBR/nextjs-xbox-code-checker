import axios from "axios";
import { GetStaticProps } from "next";
import { useState } from "react";
import { api } from "./api";

interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}

export async function getXboxValidator(code: string) {

    const token = await api.post('/xbox')
    .then((response) => {
        return response.data.Authorization
    }).catch(err => {
        return err;
    })

    let keys = await axios.get<XboxKey>(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US&supportMultiAvailabilities=true`, {
        headers: {
            Authorization: `WLID1.0=${token}`
        }
    }).then((response) => {
        return response.data;
    })
    return keys;
}