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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1632564159744', {
        headers: {
            Cookie: `at_check=true; _clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; RPSShare=1; market=US; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9S5rgl8oOzJXlGHKxtZ4bVKpyRZ6Xwkn%2fvxMLN0JoCH8DO4%2frPH7oB1kXnZQQReharI5GG4aAkwDE6fPUZT7j9aivKLWp1%2b2r4S7GvBwT1PaWQZgDtLIdv77Ef4P55m560x8bIuCQdiWCvleHeqIFhUa7wcClaa71%2fXXFpWOmH7y4MbPW6AU7wGOhmGCxMaAJ9VftbKSF1JpqAEA03b2U6OEiLAZMFbFUV7jD3WLCwkjT4Iv36fbmw%2bvfmWZJfmTwGklQr0Kg%2bf1jmgr%2bCUxYZ2w%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2oaGgMPU6GCi1GnWxAtt*WaiJP*EmoR6Pn7CuQioPqdpYI!drAHbGmrwXBY*G!kPT9GHnffQC2GqXemoqmf!d5o5Hazq0L2pBdVRC*qgIGV*yaHI611r8egX81V41vWH7yZDJkvmZmDZM$; MSPProf=2pacezhsNFQSqNRIBdzx0BemTeTKUzvNFjAaRlTmBwGdFguU13!23ZrEPlrAByzX1jn51dfDQ2sdy!bE4MIOLWMx9QLa5wMjc*l1ktubWWrvZOBh9CTzJgwGleoshgRJP2jgrMl3yPwXYzTUezE42g5QofrBKQeZ5iNYulKreD0wnu!SKi4hb2jpVtTOaUx5uveOJuiQ03Hm1gU2MnoBcby9uHb0t0Bu4b; ASP.NET_SessionId=prueyjod2amwm4ngoju4a4rx; InsiderGroups=a78287f79f56ddc1-insider; MS0=79ae14240ac24b4da7d2cafcc8ffb201; MS-CV=CVNjqVUvQUS8Chsn.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}