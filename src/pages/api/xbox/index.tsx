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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1631398413790', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; me-ct=1; InsiderGroups=a78287f79f56ddc1-insider; display-culture=pt-BR; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2nO*R9RAXGQtAccU39koc9Vn4OnLHRO7HB0UhWJDje85O9BmPcxm0BtXMCyMEjbwf8R9jpWJkSPHet2teDEJjXg4HqbuWN2zhqG*IU*ZLqv9!5zqkdTELEHGiT*Yb6wrf!aPCeu14DmLI$; MSPProf=2Uj05rAJtFVlXREi0lWuz0Sa!2v0pa0np5js74my*Eg*NIpjQmATOLIri0VcPbfguRMUAnTbtPVptSUZiTgdw*ndi!xU01X6zfTDlf2qRXNi0GZDrhW3JEWeuYOtgDqc*RDJt7dejt03pSViRWAxPnsBZ!6WIg2rcs63D9aDQ7cPGGJaeliy4EYYMyKwbYnRfuqCinBnxKWDZ3QvbzIV8tno*9fSNmUY3*; ASP.NET_SessionId=vtnj5msgcbvcxvripwd4j4py; MS0=a3c3141074e74954bf24f2df5f6bdbbc; at_check=true; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665584825|session#f3903fd3b7c042daa3310ea15c0dc04e#1631399987; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18882|MCMID|32606165887524311583660282503796334325|MCAAMLH-1632002926|4|MCAAMB-1632002926|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1558211478|MCOPTOUT-1631405326s|NONE|MCAID|NONE|MCSYNCSOP|411-18889|vVersion|4.4.0; _cs_cvars={"1":["signedInStatus","false"]}; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.28.1631398128.1631398128.1613561419.1656238930741; _cs_s=1.1.0.1631399928109; RPSShare=1; MS-CV=ZQr6+H9wdkiT5eK1.3.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}