import axios from "axios";
import Cors from 'cors'


const cors = Cors({
    methods: ['GET', 'HEAD', 'POST'],
})

function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function handler(req, res) {

    await runMiddleware(req, res, cors);

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1632681468734', {
        headers: {
            Cookie: `_clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; me-ct=1; MS0=a1b5ef0ddbd94306ad2a8d2afe5ba10e; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2FCV2!YDhGDPSl0oGTZ25hEsvaeT1O43I*svN0JGpEwIwOpJRIrk5Szox8ghT4Ib7AmgOMdTsr6VVfts1kUNb**MrKCOkIHh2JTEZs*yahID*HRDZK0*5CXWqGJAOJo8!aumrUrH3kyTs$; MSPProf=2k4gUMqqVF7iZ5juZJC0MZhQYheplSsNKVc4!ji3VjMaPT1pNMAGpYSF52mAPrxijKO6YplvrpZstSuIiku*bz7EiJ3cQn2s9PjxvrF4gQvw6iRUIzQfLmmCagBUPyZ38n3CAtmxaTXvW2kZrLpnzapsEphVKR5ZbcUgIXp!mTUh3pQ2q!Jz7TikKkrIZHHrF8x2R6vEUBQO6uD*kiToYxDr*b9q0y3oyN; ASP.NET_SessionId=33tbwj1umk5s0r1tq5dw2rha; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=13grz+zP0U2wk6aP.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}