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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1629897983996', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; MSNRPSShare=1; at_check=true; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18862|MCMID|32606165887524311583660282503796334325|MCAAMLH-1630210925|4|MCAAMB-1630210925|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1629613325s|NONE|MCAID|NONE|MCSYNCSOP|411-18864|vVersion|4.4.0; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1663792824|session#7fa04f0b504c4000ac89b3d6fa9ad5ac#1629607986; __CT_Data=gpv=52&ckp=tld&dm=microsoft.com&apv_1067_www32=42&cpv_1067_www32=42&rpv_1067_www32=42&apv_1011_www32=4&cpv_1011_www32=4&rpv_1011_www32=4&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; LPSID-60270350=0hecrejnSUO8jsSDlhfZtw; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.25.1629608266.1629608266.1613561419.1656238930741.None.1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SzatWryjyxVbTdQYFEUia0YdzGsUYvGpTWEI4998bACQBXv9vliISQ1R9gJ567QksDijEol1d9WBKYDcYSaO6BYfcENs5yUmx9uGCzOAznbwRagM9ZSXj98bZj5H1sHqOXf1lGSvFh3Ey07mM670psl4bVBgNp9w8fqonVVqcPCLiDrxiUUYciz2P40Tm%2bZMkhhifxx%2bS7MiTeaHc3ALFTKIyjaIFPGcf1Ph6%2bzaGExpk3Cv1AnXd5o3XzahBKX1iyGkjwy1i4Tfs1LcYP9kPOk%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=23DgMR9R*GLeMbRnWJGwis8zaMHOZsKciXKuB1!8xw4B0D9tNx1Y0J*aiudASVeKK5Dedh6m1z*N5bHYXGnqwhORwv8vRQwiiV3OvbhCFB2xd0JXxD9ZhEv4SpALtcUGWHpiosrHaGQC4$; MSPProf=2yA*H8Gc0FnkJbeuD8Zn8hn8Citq!0jRO2uipJrhSxhkssYSO5l77CzjvTVIhPNt!aKgCzo6rkU4fCkFSGJAer8x9FXhiRasW5Me3ya5uur2D*oyjoEj4Aa2PMoi*DpJ3Rv*Apu4NkIyd6WH4fdB2nHpkobkL3FtOESM1HqMdoqoADOdwBNHEXcq*wnGh2s*yDg3Xa!tpRWHOT3pBf7SxJ8iya3cpifBk*; ASP.NET_SessionId=5l0wro4h504ajxwfev4cmisf; InsiderGroups=a78287f79f56ddc1-insider; MS0=a021ea212b6e4113a539fff88c1276cc; MS-CV=nmWkH+Qw6kKPjKpw.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}