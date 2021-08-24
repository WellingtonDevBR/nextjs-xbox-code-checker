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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1629818120370', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; MSNRPSShare=1; at_check=true; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18862|MCMID|32606165887524311583660282503796334325|MCAAMLH-1630210925|4|MCAAMB-1630210925|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1629613325s|NONE|MCAID|NONE|MCSYNCSOP|411-18864|vVersion|4.4.0; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1663792824|session#7fa04f0b504c4000ac89b3d6fa9ad5ac#1629607986; __CT_Data=gpv=52&ckp=tld&dm=microsoft.com&apv_1067_www32=42&cpv_1067_www32=42&rpv_1067_www32=42&apv_1011_www32=4&cpv_1011_www32=4&rpv_1011_www32=4&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; LPSID-60270350=0hecrejnSUO8jsSDlhfZtw; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.25.1629608266.1629608266.1613561419.1656238930741.None.1; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2WxJ39YO1GEjmX6QOGRMGdGpkYELJZhFfYIxtF9DGpM4A*P4FIPZA*yu3rigDlZCLWe!k5IKqlzniIdwDd8FmqlJX4B2PM5Fr5kSJHbh8!jaktgNiMPjpzCkFsz5QIxuRWiq71nyYVZv4$; MSPProf=27VPWXlp2F!bv34r0XjNB3jvo9Bf!7iwX2d4e0wShuV!oRJWZhEAsYqCBLYiwg3o2pDOzh3iLvcRrWfbKjz!MUC6na4HZY5l08LTqeAjjTahUWSCKiAbhd40vA!k*zSKrMkdY3*88I1epZccZSqzzflxEpiNww!2MblkN4kCxpvgquBhazyvhe2HAzKXl0B!FplhdJg*pZQFbW1Q700nKdREanKJOyjJSA; ASP.NET_SessionId=jhfospqxtlw1rptrsrvirxbn; InsiderGroups=a78287f79f56ddc1-insider; fptctx2=H3ihr9e92IdW6yd1ZgQ9SzatWryjyxVbTdQYFEUia0YdzGsUYvGpTWEI4998bACQBXv9vliISQ1R9gJ567QksDijEol1d9WBKYDcYSaO6BYfcENs5yUmx9uGCzOAznbwRagM9ZSXj98bZj5H1sHqOXf1lGSvFh3Ey07mM670psl4bVBgNp9w8fqonVVqcPCLiDrxiUUYciz2P40Tm%2bZMkhhifxx%2bS7MiTeaHc3ALFTKIyjaIFPGcf1Ph6%2bzaGExpk3Cv1AnXd5o3XzahBKX1iyGkjwy1i4Tfs1LcYP9kPOk%3d; MS0=dd2ed6a3672d4bad93930d1c43c02409; MS-CV=NIqscguC8E6bk/Bt.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}