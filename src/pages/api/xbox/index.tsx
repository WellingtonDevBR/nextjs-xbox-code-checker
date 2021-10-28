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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1635448987233', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; _clck=1nikvr0|1|etu; MUID=10E1011E62B967790FF01189636C66C0; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; display-culture=pt-BR; WRUID=3462427315635251; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18882|MCMID|32606165887524311583660282503796334325|MCAAMLH-1632004992|4|MCAAMB-1632004992|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1631407392s|NONE|MCAID|NONE|MCSYNCSOP|411-18889|vVersion|4.4.0; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.29.1631400192.1631400190.1613561419.1656238930741; __CT_Data=gpv=2&ckp=tld&dm=microsoft.com&apv_1067_www32=2&cpv_1067_www32=2&rpv_1067_www32=2; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665596992|session#56a892089c264316bef00036a6ed6fc9#1631412153; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; NAP=V=1.9&E=199a&C=ofcw6aBFNV2dWQXa4SWg6RvWmKey3Egkx4iv1nL6zwOlCYGhU7DuEA&W=f; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2mJBzt*jTGBzJfS4q*AzGqiqL7b7ISCHADGXpYZTMHStpOKjAClYLpLDFPQgnP7M4MwiABt7AV8ro40N0B8gqPA56!XHXiy5q0eVqub36tMVNOlhmXzERGYCR!XUuprRQ0**rW37ACbNI$; MSPProf=2*y9RmRwdF9jR14Yvoh0!n3fr1F3BSuzxtlrXBTJWDKu52qIcDDaOAVVSwJFdjThyt28VoJEXsAeRIXVknqunF3Oanpgf4XrJzApWmxvhafz1gCLBg6cn2Zz3q9B4JWJTvZY6lvQ7QVWv*VcT0GtH!6qMHqowF*2ykAZ0oPHy7X9C*7DAQpazm1jRXrBWUbfL3EYHFYnwVJW11Yh0SUGBnpea0p7Wy9XPQ; ASP.NET_SessionId=ukc4khn3lqslqrgabzyy1izd; InsiderGroups=a78287f79f56ddc1-insider; MS0=a11fe0a9c1134c509e06b8e15ae16e91; MS-CV=grzvEj0MyUCrGR4T.5.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}