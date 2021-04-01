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
            Authorization: process.env.NEXT_PUBLIC_XBOX_AUTHENTICATION ? process.env.NEXT_PUBLIC_XBOX_AUTHENTICATION : 'WLID1.0="GABRAgMAAAAMgAAADAAgF/4FUvGuSIrmC/deOMpDiOcMpPFIc9QwdAZPNjoxRV8AAU7gCgIgtf9z30CJ8zLpRByjIliBifnBcq6EVo8hO9ENGVCWUBlrL+q/fpRMfi2x80aKcgTKmapjUs8x6RPOfCdAL4HQj3ex0rxQzh8gwr4CdCOaOm3ICh5n16BbHvwfGDTHSaF3U6yQQ5B+fEv3YNN+cGFjiOjmhmaJSPlwSpWHbatwk2aOFxgwS50KwkHo53aOiY7Ga8RUPhtx1+GXMML5totfF5Z99ScUhVsdngYiWmyewO9JPVbl+HeZ57VKqFXQ97KnEwPFAN6YbNjryt355weCQvYrO9vkL6DY7v+KCndgrRItUFY4t0YArBJmUNDeLzE9jYSHfz+dqF8uQFEeAXsAHgEAAAYAa0givm3GZGBtxmRgXyIBAAoQIIAQHAB3ZWxsaW5ndG9uLjAwNzFAaG90bWFpbC5jb20AXgAAG3dlbGxpbmd0b24uMDA3MUBob3RtYWlsLmNvbQAABuBVUwAFOTMxMDEAABXfBBYCAACFkm1AEARDAAp3ZWxsaW5ndG9uAAZzYW50b3MAAAAAAAAAAAAAAAAAAAAAAACfVt3Bp4KH9wAAbcZkYHJt22AAAAAAAAAAAAAAAAAOADE3Ny44MS43NS4yMTAABQMAAAADQBgA1lbW8wQQBQAAAAAAAAAAAAAAAAAAACnt/xy9EeBo/78YAB+GVBX/vxgAHoZUFQAAAAAAAAAAAAAAAAAA/z8jAEAoUIAIAAAAAwA="'
        }
    }).then((response) => {
        return response.data;
    });
    return keys;
}