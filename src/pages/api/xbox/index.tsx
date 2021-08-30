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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1630354147729', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18862|MCMID|32606165887524311583660282503796334325|MCAAMLH-1630210925|4|MCAAMB-1630210925|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1629613325s|NONE|MCAID|NONE|MCSYNCSOP|411-18864|vVersion|4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1663792824|session#7fa04f0b504c4000ac89b3d6fa9ad5ac#1629607986; __CT_Data=gpv=52&ckp=tld&dm=microsoft.com&apv_1067_www32=42&cpv_1067_www32=42&rpv_1067_www32=42&apv_1011_www32=4&cpv_1011_www32=4&rpv_1011_www32=4&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.25.1629608266.1629608266.1613561419.1656238930741.None.1; MSNRPSShare=1; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2DDJfr1gcGxqpDKhQ8RLmVKltXq2RnJF8yz2jT2XZcwUrG5uwiddtPjU8f21l1B5jWudq85IXorS4CU9BsNvp4zXvGLD95IpWonzdVOdgsIoRUUcdGNLLDgQQOIMPHKPFDo68POtQs03A$; MSPProf=2Hn1AkZdEFoUJiG696vwo0Eqp0vYI5duyFWCWo2sZH60pQJ46DYLOLNv5PDaAwc!Rafv5lFWre6Ix!8W9dZfE9RSKj6krW8r*81ertWPoOM*FhOnuH*CKYNBU**hhu7RLuaxtZuxkEuFpUVlFz*bcUEzeWL0jcAOiMRg2JL!VME*ud!RP6nTt10mgdqs7qzuccGlSFm5F9ErJTyXS15L3IzEToGygEq!AM; ASP.NET_SessionId=51z0qp4ppzw5zrxh3owl11lg; InsiderGroups=a78287f79f56ddc1-insider; MS0=2048e9afd05947d2880d15627e2258bf; MS-CV=O1k+hRjIQkidNjf0.3.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}