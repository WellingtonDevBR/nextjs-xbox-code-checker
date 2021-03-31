import axios from "axios";

interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}

export async function getXboxValidator(code: string) {
    let keys = await axios.get<XboxKey>(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US&supportMultiAvailabilities=true`, {
        headers: {
            Authorization: 'WLID1.0="GABRAgMAAAAMgAAADAAgVKIMgJ9oJNGpbdcCURNR+Z1izpBVZ0wwhKuHiaQKnjgAAbWREA9m22+gqjjTGUVrSmfU3fSV9jotB+gdEPOkoPW7WsGMxOl/JhznJ/GyKDCKS5V2Zf/QH7ADA5VUdzg04oiFxzhoA9DaLvQP0Zt2c3nFpnX8Ogi8xwfG6RWYOoPha8XSUZ+dTxTG6B98OmxaBDmXeqGlnd/CMOdtsYuyNDH/O6u9TIxqbH24tYXTIxtLfNLNAYdH6MdyGaUa/Cz9RLWlMdnlwJCxVuAcOXrKAxq3jZ0BuEdMxRPrW2GcvDrQ8ruv6TPNJclT5P7qxNVR2QiV3CHIied4orpWVRhL+ov/TN2YGIn/9uPGuIJapRo8Ynad+PX6sgZy1QCQhIdkBHAeAXsAHgEAAAYAa0givmdnY2A0Y2NgXyIBAAoQIAAQHAB3ZWxsaW5ndG9uLjAwNzFAaG90bWFpbC5jb20AXgAAG3dlbGxpbmd0b24uMDA3MUBob3RtYWlsLmNvbQAABt9VUwAFOTMxMDEAABXfBBYCAACFkm1AEARDAAp3ZWxsaW5ndG9uAAZzYW50b3MAAAAAAAAAAAAAAAAAAAAAAACfVt3Bp4KH9wAAZ2djYOe4ZGAAAAAAAAAAAAAAAAAOADE3Ny44MS43NS4yMTAABQMAAAADQBgA1lbW8wQQBQAAAAAAAAAAAAAAAAAAAE3fykG2SWn+/78YAB+GVBX/vxgAHoZUFQAAAAAAAAAAAAAAAAAA/z8jAEAoUIAIAAAAAwA="'
        }
    }).then((response) => {
        return response.data;
    });
    return keys;
}