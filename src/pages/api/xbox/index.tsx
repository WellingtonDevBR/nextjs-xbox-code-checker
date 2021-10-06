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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1633516667951', {
        headers: {
            Cookie: `_clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxLzXxHcL2CcU%2fZDGCdp0wEcB2Tvg1lQxe995sv5S8XP8eBkhQ7YQ9dnOnrNUF1txRT1Z%2buoKXAacbK2JdMnBPnE4DDcoXTX2tc%2b%2bDbNXHtb9%2f5sT%2fSe2%2f7a4A44E7ZSseMWChaEwO61Mecz6K%2fafhXjEFtPtSCd7ZTtCV1Sob2MPDqajRBhCnA%2bPEyOH%2bE3ylfbRV9FMAuxmKpoGo%2bkTQsceQnNtuVe7%2bchYQYKhaXcT6FNbEK1X7GjaWLH%2b%2faWH94HL5kE76rZ1BsEirCMpDo%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2lR0t96oWG3WQE4pAmJZD0JYqpm5u8Vv5SgGfLfrrs8IBIiJ0ieIIZEr6lHrPZhKS55qHt7!5Dm8jhnanoM8tb0Yo7IP9CZ72larYhd6VIZNsVlp1RjnUdGJyng1mTb!hEQKpihVZyVxg$; MSPProf=2jr046TMMFNW1U8XMRgDJJrjjwrRAxXPKSafpTwEJFmqMqI47QC*tJqQxB39QnphAHe93DQibHsmFsN2GEY*BwKoTQBCfTEbumIdWwjkMcpmFZgkdBLSDsKK27l3DauWU*pJlRoKvCjMXE8TydcO100NA2usSFine32A9qYO*zi35SA8GruT0UqB88IHtShrZ3w3hpSuDYenhSz6gdRTXHypjs9me1QmKY; ASP.NET_SessionId=pxip4x1ph1ixyg2c1mifd5au; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=G5dOfpLtH0WTXxdr.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}