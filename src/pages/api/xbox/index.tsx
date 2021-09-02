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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1630599394631', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18862|MCMID|32606165887524311583660282503796334325|MCAAMLH-1630210925|4|MCAAMB-1630210925|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1629613325s|NONE|MCAID|NONE|MCSYNCSOP|411-18864|vVersion|4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1663792824|session#7fa04f0b504c4000ac89b3d6fa9ad5ac#1629607986; __CT_Data=gpv=52&ckp=tld&dm=microsoft.com&apv_1067_www32=42&cpv_1067_www32=42&rpv_1067_www32=42&apv_1011_www32=4&cpv_1011_www32=4&rpv_1011_www32=4&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.25.1629608266.1629608266.1613561419.1656238930741.None.1; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2yKXiLeUgGkqCg0tNLhh*K1UQcVf8wE7YoNw4fumLiC6rQDUIMCAvttJO1OYN2aeZH0dukJYuN*zbgQPhionUpqqzFNh2xMRMIUq9IDDPuoX*YCD*dDAVTffLeiFZA3FiWlLknvX9wwfo$; MSPProf=2vBvilbVzFiR4NffaHeDRh8n1CKoT1Bx35MRahHPXpdkWy!9s!5Ux!N46NxyoRvXnb!wamuIE!JghVtlk4J*D2Eg67rvNE3KafpzR9RMy9VMdcaPMaPm*BfHGai*JReZ6!yqO54frIRafuzKYRcArwxbxv3hE4DT6iTd36CkpspmBTcgT*ou5KqGb*4u5NBYOrvl6n9CJktGqZ30ed48Vdwa!V0OPyFlbF; ASP.NET_SessionId=j51x1jox2mskzb3gmtgvbrma; InsiderGroups=a78287f79f56ddc1-insider; MS0=bb73e0a3f2574ae8a8af8fd0b47faad0; MS-CV=nxd2oKEy7UOE7A76.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}