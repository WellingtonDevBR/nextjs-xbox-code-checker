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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1633637086864', {
        headers: {
            Cookie: `_clck=1rqm6vq|1|euy|0; MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; mslocale={'u':'en-us'}; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxLzXxHcL2CcU%2fZDGCdp0wEcB2Tvg1lQxe995sv5S8XP8eBkhQ7YQ9dnOnrNUF1txRT1Z%2buoKXAacbK2JdMnBPnE4DDcoXTX2tc%2b%2bDbNXHtb9%2f5sT%2fSe2%2f7a4A44E7ZSseMWChaEwO61Mecz6K%2fafhXjEFtPtSCd7ZTtCV1Sob2MPDqajRBhCnA%2bPEyOH%2bE3ylfbRV9FMAuxmKpoGo%2bkTQsceQnNtuVe7%2bchYQYKhaXcT6FNbEK1X7GjaWLH%2b%2faWH94HL5kE76rZ1BsEirCMpDo%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2gd!67kDYGgaDuneESdSyttzOVF3PP01ekjYSh8S1hxYDwaqWwn3LTKYgA7PiX3xIfF5UL8K8JjHU1CRKBE69uVK1NoyNl6bJJsnHfP2fXXDU5opPGwH4WCB0ohFnLBKom3EtztcpSZg8$; MSPProf=2sMEsZKynFH1*hZsrJNYaizVM6iDQoc7WA*YACdcfwMpU7*g*4wK1kL1FHyzJOwCWspu8Fba7FxgzVRx2t0GSHttWbioKCmPMe4T803XSFmbCmNUn3czHxZpKCNmNKKEZKLhJa7eM6a2HfoOKjb7gm4xAjcu93xdG!4xhJuGCWorWB5nrh2!EEZ5*X7XCtpkPvJ*S56IFNq7289JKkfulyqDI*yDUDIFQ5; ASP.NET_SessionId=ligo01apvtaddfcmtsrw4kh0; InsiderGroups=a78287f79f56ddc1-insider; MS0=d555736d65704219991805154e96de00; MS-CV=HhnjfcddqUeEq31a.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}