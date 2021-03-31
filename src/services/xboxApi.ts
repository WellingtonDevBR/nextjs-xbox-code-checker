import axios from "axios";
import cors from 'cors';

interface XboxKey {
    id: number,
    tokenState: string,
    description: string,
}




export async function getXboxValidator(code: string) {

    var corsOptions = {
        origin: 'http://google.com',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
      }

    let auth = await axios.get('http://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1617204220580', {
        
        headers: {
            Cookie: "MC1=GUID=3629e5ecbc22454c96a0f20fbb46526c&HASH=3629&LV=202102&V=4&LU=1612838124326; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1933&W=1; NAP=V=1.9&E=18d9&C=gR4P31D6q0gLM8NRlQ3HqUub55LM1Eo_wzzSmZd5kYaluQ4DvXPVFA&W=1; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; MS0=419c003398f54cfebcd2c65aaac27cb8; ak_bmsc=5A1D0E7F2E0E1F7CC67B91E6607A9866C91FFF9CDE7B00004D8B6460BB7FD111~plBPNh68Nz11x7FDDDtEL8EGz48qjqsHijiS+oexkExq60HN7sYoK0Q+fyL7333lczSLogtTbQSDIA4rnO6qa7Y6X4Ges7szQS8cjK8NsR8N7NBVUeSmaqQfkmn/aBvPbeX8Jceo/U6od3WTpwZh5HacdM4kAA9O6elJj7ZyecnBVpwsS911ZGrbEKliFATZalYShW3tWJqxse5mBn5a9Cj1l8rppmFtSgUy72UEScEwM=; MSPAuth=2NXgGqCP2Gik*47osLss7TCbDbd9LFMJWGRbUOTFeBDCcQk7ViWpvRVJVEKwZ3DuMZxlx9K1WQ7z!ttfxOylY45N6lJMORT3ow8tTXo6H4gyAWKgrPIFK8RVgbrNKsTrCeCa1kWM8rEpc$; MSPProf=2sTGlVpKIFwxfCNNenFDFU7yOOQtZC0P5YmEAoqa4T5y!fbwK*oybZnqF*CcJnE0hM*lwNTsSAr4MnRjKkfD!3NwxjLY6M2BvZ8YAW5zu8*Qx!LUCTfGY3**yByBCBZ4q4SYbhWQGzyQm611YsxjdhY1cjHBUt1fqAaVSEMngD7e6divuCvocRAznwLJup2ejDFBkxhQFl8xryfC0XSiTbiWP1pZZGM1Kp; bm_sv=103E025D6C789A80665439FC36ABC6D2~Nqu3DmKnNi/lIiU0IdsdFxRbCZgFJMwpUKwVM/bHWZumLuMNp1hW7ro6Ehso27e/zHtPCh2BkS4cMgwxrETyjC4u9ntQOgRYTCRElwWu2BnFs/URbh6iTu5KBlcF3CuaFd6rzeCBT5aarymzuW02ZQl/LPvGAuYaZo8aoX/vFow=; RPSMaybe=1617202395; oref=http://directvisit/; MS-CV=PdVeot+m5E22mhDF.15.0;"
        }
    }).then((resp) => {
        console.log('test1', resp)
        return resp.data;
    })

    console.log('auth', auth);


    let keys = await axios.get<XboxKey>(`https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/${code}?market=US&language=en-US&supportMultiAvailabilities=true`, {
        headers: {
            Authorization: 'WLID1.0="GABRAgMAAAAMgAAADAAgVKIMgJ9oJNGpbdcCURNR+Z1izpBVZ0wwhKuHiaQKnjgAAbWREA9m22+gqjjTGUVrSmfU3fSV9jotB+gdEPOkoPW7WsGMxOl/JhznJ/GyKDCKS5V2Zf/QH7ADA5VUdzg04oiFxzhoA9DaLvQP0Zt2c3nFpnX8Ogi8xwfG6RWYOoPha8XSUZ+dTxTG6B98OmxaBDmXeqGlnd/CMOdtsYuyNDH/O6u9TIxqbH24tYXTIxtLfNLNAYdH6MdyGaUa/Cz9RLWlMdnlwJCxVuAcOXrKAxq3jZ0BuEdMxRPrW2GcvDrQ8ruv6TPNJclT5P7qxNVR2QiV3CHIied4orpWVRhL+ov/TN2YGIn/9uPGuIJapRo8Ynad+PX6sgZy1QCQhIdkBHAeAXsAHgEAAAYAa0givmdnY2A0Y2NgXyIBAAoQIAAQHAB3ZWxsaW5ndG9uLjAwNzFAaG90bWFpbC5jb20AXgAAG3dlbGxpbmd0b24uMDA3MUBob3RtYWlsLmNvbQAABt9VUwAFOTMxMDEAABXfBBYCAACFkm1AEARDAAp3ZWxsaW5ndG9uAAZzYW50b3MAAAAAAAAAAAAAAAAAAAAAAACfVt3Bp4KH9wAAZ2djYOe4ZGAAAAAAAAAAAAAAAAAOADE3Ny44MS43NS4yMTAABQMAAAADQBgA1lbW8wQQBQAAAAAAAAAAAAAAAAAAAE3fykG2SWn+/78YAB+GVBX/vxgAHoZUFQAAAAAAAAAAAAAAAAAA/z8jAEAoUIAIAAAAAwA="'
        }
    }).then((response) => {
        return response.data;
    });
    return keys;
}