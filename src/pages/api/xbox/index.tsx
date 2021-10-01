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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1633047084910', {
        headers: {
            Cookie: `_clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; MS0=9417146068614914aa5bf196e983c24e; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2yBhl8FPNGsykyimZJcpkcj!q1Ks!B6x9!ITXsy53vZhRdu2iiKV5loCJ5tEU6igqj9*dQ!QIj45lD0DRJLwsMBSAQNcchgC58EHTFCDyyRJQd4NXAUOA7HnsAfiYWKccydup729k9b1s$; MSPProf=2CC1jdt88FPU*dNQOvgbi!Rbj00i9O7MLaEql44l0G!cQozIT11tKlNbEg9hg6pp4kIxFwgo7!RvM48E4vvfsQ8JXjLf!lGg3jBypgrhXapuxeskhFqBcetSqLTKxbCzg4ZyMeiUc8zjEZcu*IzYLeRmMoxzNC53jNHVJ0OCvXn*s27Vbt3XhCVbfqd9jZqXWL2KlXhlVLjfbCnLeGXTwnAsR5qA7GX2eG; ASP.NET_SessionId=tze4twgqcmfpvuoomgsljj24; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=xDT1EdHOlUmsg2q9.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}