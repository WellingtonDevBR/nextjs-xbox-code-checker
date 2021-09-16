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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1631804634488', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; MUID=10E1011E62B967790FF01189636C66C0; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; display-culture=pt-BR; _CT_RS_=Recording; WRUID=3462427315635251; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18882|MCMID|32606165887524311583660282503796334325|MCAAMLH-1632004992|4|MCAAMB-1632004992|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1631407392s|NONE|MCAID|NONE|MCSYNCSOP|411-18889|vVersion|4.4.0; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.29.1631400192.1631400190.1613561419.1656238930741; __CT_Data=gpv=2&ckp=tld&dm=microsoft.com&apv_1067_www32=2&cpv_1067_www32=2&rpv_1067_www32=2; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665596992|session#56a892089c264316bef00036a6ed6fc9#1631412153; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; NAP=V=1.9&E=199a&C=ofcw6aBFNV2dWQXa4SWg6RvWmKey3Egkx4iv1nL6zwOlCYGhU7DuEA&W=f; MSNRPSShare=1; MS0=6470f6e2f0a64a9eb04044778881fa4d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2isAhIR!QGmwyGMdKb3bmhq0ogAugQqZMfBu2CnCdEMz3KGHnG7*InvNEb9oktwKF!COag6Nv*3Vf2WT7uXjORBE9CZNjrEXPPV3IWcKUQx5S7AkgZem4ezUo6VGyOhHqNhO3NS*uKpHo$; MSPProf=2V!eLe2tWFSYuRENVwwgGhXu8GhQK8eR4uIOZzOzYZQkgf!JG3a!PMdCvu4JuBjZWyB6ganawPFlyVdSg!qmN1EbbRVCKHFu1A1pWMFQxzaG9xio7Csv32r9HDb8t!DoWyby!397xZa1arrZ7bB5Z6vQSOQiqF*AhADlzqD3eUjgZt3DqVx8XqCFuR0gm4px0SGUQEB0ANFhH!6CwsMMPO!E1J*v8N6FFI; ASP.NET_SessionId=0pddzdbuauesw4ppvvhcq3nj; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=5xvVdWTGgUSfHokV.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}