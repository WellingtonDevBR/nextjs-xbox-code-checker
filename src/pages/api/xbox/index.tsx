<<<<<<< HEAD
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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1633453057143', {
        headers: {
            Cookie: `_clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxLzXxHcL2CcU%2fZDGCdp0wEcB2Tvg1lQxe995sv5S8XP8eBkhQ7YQ9dnOnrNUF1txRT1Z%2buoKXAacbK2JdMnBPnE4DDcoXTX2tc%2b%2bDbNXHtb9%2f5sT%2fSe2%2f7a4A44E7ZSseMWChaEwO61Mecz6K%2fafhXjEFtPtSCd7ZTtCV1Sob2MPDqajRBhCnA%2bPEyOH%2bE3ylfbRV9FMAuxmKpoGo%2bkTQsceQnNtuVe7%2bchYQYKhaXcT6FNbEK1X7GjaWLH%2b%2faWH94HL5kE76rZ1BsEirCMpDo%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2HqX5UGrWGGLuI3QPO!1qMEGnC8y0Mk*GpYdVBrbwX7oTbQkDbuMOZuImw16ErzsIebobnlYpjGsrIfViBIKHbfjHdYy0uKWwebPCYboXK50FfKgA*fbWGNM2qtvp1*bX5!galzHQ2qE0$; MSPProf=2RyRF3mXxF3ln5pIzEXk2FWLSIHVGap4rM4ujWsqzxG2YvY5bvrCGO1I4llpt2tA6AbuLu3Ov2NI7ZmanUoAy!5BRB!YhjqaOlUVyFopw3w*LnvHq*zCeApnhgv68Iq4EEZWaukauGzFuXK8Lm5WaztEkbvRv6Ra1ZEKsiPu2jzu4!MYys0YcfzZQIeNbYwHRxty1vtD!pWAj3vjxEMw8bnF6aFbLZd0ma; ASP.NET_SessionId=ls5xb1wpqarefmnlkr2s25wy; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=STdvGfBLPEqEU9QE.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
=======
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

    const response = await axios.get('/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1633203143080', {
        headers: {
            Cookie: `_clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxLzXxHcL2CcU%2fZDGCdp0wEcB2Tvg1lQxe995sv5S8XP8eBkhQ7YQ9dnOnrNUF1txRT1Z%2buoKXAacbK2JdMnBPnE4DDcoXTX2tc%2b%2bDbNXHtb9%2f5sT%2fSe2%2f7a4A44E7ZSseMWChaEwO61Mecz6K%2fafhXjEFtPtSCd7ZTtCV1Sob2MPDqajRBhCnA%2bPEyOH%2bE3ylfbRV9FMAuxmKpoGo%2bkTQsceQnNtuVe7%2bchYQYKhaXcT6FNbEK1X7GjaWLH%2b%2faWH94HL5kE76rZ1BsEirCMpDo%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2HH3C5ECeGYWPUfXOy*sCk3negqSkeKooMJ*lhRLqKkM9rtyH*hsd0JFVQxGJi8e4M1*xHacvA5DCFa*Ks6OH1knbyYJIm*UkJPruqgLWPhmblHzIoHr!kIVSV893UN548AEUSfdfS*j8$; MSPProf=2N!8tiSpgFddPw1a205UXmKYKndgXhA1uoKnMa1xnvLP3PrQb5oL2yKU8*Gd2E!DBhN8XhmvIqXERmknAk2WNutV5aDSba17qaLaMA9JRg560kxF7S7IrjQkYUE2cg0o3gWA7FOLS3KegsflU01!hCGhK34Vz82VQwv9MzLREPeyc2Suw7xkLBYyh6emKtkww7JW3RtzY!dh35GKPWPbz3NFgfGsv!Rqkh; ASP.NET_SessionId=xefn13reeyiqcqfartdlnvcc; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=efJ3bzFC7ESA4yNc.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
>>>>>>> 15da989be16d9a460261a42896bfb147e4cbe389
}