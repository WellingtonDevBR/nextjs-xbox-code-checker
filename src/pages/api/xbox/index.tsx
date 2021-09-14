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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1631638912332', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; MUID=10E1011E62B967790FF01189636C66C0; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; display-culture=pt-BR; _CT_RS_=Recording; WRUID=3462427315635251; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18882|MCMID|32606165887524311583660282503796334325|MCAAMLH-1632004992|4|MCAAMB-1632004992|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1631407392s|NONE|MCAID|NONE|MCSYNCSOP|411-18889|vVersion|4.4.0; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.29.1631400192.1631400190.1613561419.1656238930741; __CT_Data=gpv=2&ckp=tld&dm=microsoft.com&apv_1067_www32=2&cpv_1067_www32=2&rpv_1067_www32=2; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665596992|session#56a892089c264316bef00036a6ed6fc9#1631412153; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; me-ct=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; NAP=V=1.9&E=199a&C=ofcw6aBFNV2dWQXa4SWg6RvWmKey3Egkx4iv1nL6zwOlCYGhU7DuEA&W=f; InsiderGroups=a78287f79f56ddc1-insider; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2IN7A6LzyGhb34j!LzZsrmGTHzfHX!2JqGcYYydTYgOMVaFqWP6TEcNz3ab8*wiK5X0U8irABsb3cSlk9fTRGgUGb48uY0G2mYdd9DMx8Acp!LvzfH2phy7Um!GN9Wo1tg79vhRRGJyWs$; MSPProf=2e6ae4bfpFh6KaIB7mUU4M6bccHD671dZfTDMxBeigCnsnSpDrbDqNcVgdID4gong9AhUf5YvtSMuEV1zDo5QsjDva4UoKQVuL*iZEUF*5sRPJKJ4PPFR9DeFwI7gcQzqwq19tRFvhph8hcTrZ9go!6GvLRvCSW25RC6aS3X!3npQEsb6qZ1jgLSt17tlG9lkR*Uc02uGJpv8bjVJ4!fr49KP4gwDH9Y7*; ASP.NET_SessionId=iocpw53cl0vyh3jewhqmavku; MS0=171887ba833745afb24caae8a95bfdde; MS-CV=1a044/HKb0+6cEPX.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}