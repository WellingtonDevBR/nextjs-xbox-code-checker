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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1632909561195', {
        headers: {
            Cookie: `_clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2!eVbSKASGOkf1cMqR*ANuqgnwvH3ymt3xGZbG1lyjOprK2Cj1D2QYmeTsB0RPxcM!SARh1deKZ6iFqSnUhvpi5bni*YMPIexTqRo*2qeV5mJF7nzA3g1!NckmHbCAc!Yc8DP5Y5CbOvk$; MSPProf=2eHdNy2PIFZGopk8rmqNhYSTDLfvBpVhfNNKlsVERmjf0WrCX*GXjAp*IRtbENfSOTeVgoLNNW3zwWr4lKUZS7pg6N7VoILEL8sUcF8GTN7kSEEGjLLUYG1qPHLYAWJF4HFcjcEOG*JKLwyprSz26PEOuwCt46A0wSwNsIcVD!HyJWCfZiiTvH60hKuXihgP28TFklR4ztSoIQawNLOnlnWIvO3NazbV*6; ASP.NET_SessionId=tbfunikijabwvchiw21suqzw; InsiderGroups=a78287f79f56ddc1-insider; MS0=691eb78498ab4ff18aeb4e84abb8ed43; MS-CV=lW8rrZCK8kmdW43Z.1.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}