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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1630953261302', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1694015771|session#1fd9d5af8bc7404680d2046d7feba390#1630772830; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18875|MCMID|32606165887524311583660282503796334325|MCAAMLH-1631375769|4|MCAAMB-1631375769|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1558211478|MCOPTOUT-1630778169s|NONE|MCAID|NONE|MCSYNCSOP|411-18882|vVersion|4.4.0; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.26.1630770971.1630770971.1613561419.1656238930741; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; __CT_Data=gpv=53&ckp=tld&dm=microsoft.com&apv_1067_www32=42&cpv_1067_www32=42&rpv_1067_www32=42&apv_1011_www32=5&cpv_1011_www32=5&rpv_1011_www32=5&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2VdcPRWrZG9MHzg!nAehx7XSxxIDrDWrDHq*uMgaj3VWGd7tjGofBBdHqbvregSafW*Bu6slibTg*pIawxiHjvkDRd9Fxm3L*j47dHhvQbjHlCJ0DB6k3Wj2IsIkOEd5N9laoIs7G3E0s$; MSPProf=2AcZzFcKmFb*WAU7sAE8EstPG!qKDKEjfifIQwI!!KIHJwaCRajLlWoveXeo2DQLC1jjxrDYsw7h4pFcmL49R309VE5SlHTKHBiu23jWm0cDtvbgw4Ypsj5!Wj*vN0O2og0P2HoC5LQgLjwxH7*K7jZcbbAAsS1FmBN6dX!vJPccE0p56cPEBKYApUh0snw0w!QvalMFIoQ68kvqSHQt7Sr1*dtVgDNupc; ASP.NET_SessionId=4jtfqffishynixlphojknhc1; InsiderGroups=a78287f79f56ddc1-insider; MS0=bcaaa5aabb534abd84d0ec576a44197d; MS-CV=M0sxts94dEePky/u.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}