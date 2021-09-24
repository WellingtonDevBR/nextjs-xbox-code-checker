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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1632443496190', {
        headers: {
            Cookie: `at_check=true; _clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; RPSShare=1; market=US; fptctx2=H3ihr9e92IdW6yd1ZgQ9SzatWryjyxVbTdQYFEUia0YRE%2fAHY9JuVYssefMuPllkg1yFaDE6zmx3cNhELM4cOgq3egAi8v1rvYQ1Aqu4jVnOb8zgcF00CzTpnhCsdBjhBUKh6%2biYdwmeUS3AzB8pqmzZNBJ41Vr%2bnMk9C6BO0Kpxy3HzRocn1gwGvwpYErxkqAAY7%2fTN5EEM%2bt%2bEiDvs9XDWm30loaRepUeA4bPpbrsXMaHkDj0DFaXxEaFgYlN6V9BmRiDe1puISax6sMLiun9vEDc0DVgMFAbZhtGsEG8%3d; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2*2hFP2gTGQGKjypKWApFgQUZSXubaJk9mqg2aPc88p7IgBFgpN2WiEL6RlLQDWZN4Q5P1PMn9drRHEGWkKHFCUyiNv3r4cDjislTff10rW2JKQ3Kw3o!PvD2xAZ*Gnc32RJBkWBLBguI$; MSPProf=2R0axioYsFv6!Wx4hVtlbWbdrV499hMyhudiTuEONp*b!*MSNCQjp6h8kQLQpyqbJsO5YRhgIclboJoNGu9DEfls2uHObntCdkxt4TrOu0gKBU4D7GhL5Or3T8syVNcdk2UZIOjCqWMDE5MnipKimnmnxpMw5T3vhKcS!*dctkaacDswb*1OFPuZcW6nMCfajdoBTUZBZLAHJySca3GdFN8ji*NeYLpvm3; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ASP.NET_SessionId=zulv5oea2rxxqkmrjj5ruf4w; InsiderGroups=a78287f79f56ddc1-insider; MS0=694a5181591047cd9f922eb788a8f5f2; MS-CV=zTTfcyXnpEaB87pD.1.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}