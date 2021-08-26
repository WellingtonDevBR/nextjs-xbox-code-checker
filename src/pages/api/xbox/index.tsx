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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1629993379644', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; MSNRPSShare=1; at_check=true; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18862|MCMID|32606165887524311583660282503796334325|MCAAMLH-1630210925|4|MCAAMB-1630210925|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1629613325s|NONE|MCAID|NONE|MCSYNCSOP|411-18864|vVersion|4.4.0; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1663792824|session#7fa04f0b504c4000ac89b3d6fa9ad5ac#1629607986; __CT_Data=gpv=52&ckp=tld&dm=microsoft.com&apv_1067_www32=42&cpv_1067_www32=42&rpv_1067_www32=42&apv_1011_www32=4&cpv_1011_www32=4&rpv_1011_www32=4&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; LPSID-60270350=0hecrejnSUO8jsSDlhfZtw; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.25.1629608266.1629608266.1613561419.1656238930741.None.1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SzatWryjyxVbTdQYFEUia0YdzGsUYvGpTWEI4998bACQBXv9vliISQ1R9gJ567QksDijEol1d9WBKYDcYSaO6BYfcENs5yUmx9uGCzOAznbwRagM9ZSXj98bZj5H1sHqOXf1lGSvFh3Ey07mM670psl4bVBgNp9w8fqonVVqcPCLiDrxiUUYciz2P40Tm%2bZMkhhifxx%2bS7MiTeaHc3ALFTKIyjaIFPGcf1Ph6%2bzaGExpk3Cv1AnXd5o3XzahBKX1iyGkjwy1i4Tfs1LcYP9kPOk%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2MESeAZ*9GVnCAos1ViQeJlbSuX7C0XcEcIp1k7C0Z5i5HU4VtjqPDt2nvpbt2b!Kvw*14Fyh4kplOaEPelF7iR*SvC9KQdNz2eKJLsxazaKgWLqiUzY!ffk49uqlLjGYZBaOgYbdZVso$; MSPProf=2GyYhiHIYFYYcXRQ2TE87rJACo2LUhfxAfVUkmNiLDLaEFQX6RF2r7TZ*kI5viTxKqobLqUXjtKSXPGQIHl3eoICYwbOkToq5*2WUjnTcrm!KSvnHj2EcmFRvn15YOi5vDE2qEz4AImqYI00PhSjf3C5IdpFOBBoKTLAZOXm!ceX1UjfPppoABSeG2aJyntL3kOlzwkGF59KDYV2H4knFHISsPXbwQk60o; ASP.NET_SessionId=1lzlo5kgxxzdyyvirvsi02dj; InsiderGroups=a78287f79f56ddc1-insider; MS0=6d008dae5f68466fad0c5712fd59f231; MS-CV=qFQ17pOuNUaQ8YwW.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}