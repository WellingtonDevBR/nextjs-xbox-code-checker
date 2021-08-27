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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1630081573638', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; MSNRPSShare=1; at_check=true; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18862|MCMID|32606165887524311583660282503796334325|MCAAMLH-1630210925|4|MCAAMB-1630210925|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1629613325s|NONE|MCAID|NONE|MCSYNCSOP|411-18864|vVersion|4.4.0; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1663792824|session#7fa04f0b504c4000ac89b3d6fa9ad5ac#1629607986; __CT_Data=gpv=52&ckp=tld&dm=microsoft.com&apv_1067_www32=42&cpv_1067_www32=42&rpv_1067_www32=42&apv_1011_www32=4&cpv_1011_www32=4&rpv_1011_www32=4&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; LPSID-60270350=0hecrejnSUO8jsSDlhfZtw; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.25.1629608266.1629608266.1613561419.1656238930741.None.1; MS0=8038bb90b4e640bd945c6271d16832ff; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2AxHlq70wGQF0ZR9TAHOIfywrgFI!dfSUpPAqyCHD5Ii6mHpbcggcyCf!a1hgfZMEzzp!9pJ2y4CkDqhVXSUMwYGDyRQFamFv5VQ3YWCPJs!eOXjARHC3LwXgl0Xbx4jO75NfNc*hQnG0$; MSPProf=2nT!BBhDLF!7!z5*Hi30ldeJzt7dHXumhtbIDFUJFnbyqXQZoGgaVjm3XkT0qI57G8ioYk*!x7b8uN42B1J7lWGZygD3jKI1SPwHBIJNoRHBE1bfZiu*H8x6QvBogEDmZ3WJG4Q4NSYAYCneC7CQKZ2*Ki*jnMEvCZZFrdY5SwNblUX50I1bZF8NUg!U4Yn5LPczx!2!M2CnZdPrpT6SdSudTTo3fLZnnE; ASP.NET_SessionId=1vqygpkalpdewdyljr5iv2rv; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=k7duBI7UfkOvgW7n.2.0; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxNMSL5fwIGS0iyEDx6kB4%2fRgrhAj7ZusxHy3lwgwqvU9I9ZfKmSek%2f3IpwHOMNyfshA9jyDIRCt59AANmrLpc%2f3I0hIXmUqh3%2f1c1ivwpSnpXnhgDFPhIWmt%2bjG63qCwz7Lc7UztWdjeWJl9rQ92tWcbyuupCDrDp0vbod7UUcvHCPz8ttUzGWz46vBhyzHLOksF%2f6OEtY8iPL6TXjtm9YOWm7HzWZ2PAUrGrncINzD3PlHwtXkSiJMdEhbJGq0R9o2H0OWT9%2fqxjx31%2fLE8qI%3d"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}