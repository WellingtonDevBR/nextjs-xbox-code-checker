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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1631117419001', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; MSNRPSShare=1; at_check=true; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18878|MCMID|32606165887524311583660282503796334325|MCAAMLH-1631587963|4|MCAAMB-1631587963|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1558211478|MCOPTOUT-1630990363s|NONE|MCAID|NONE|MCSYNCSOP|411-18882|vVersion|4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665169863|session#f5b172bb07544d59bc01ca50bb7cafa0#1630985024; _cs_cvars={"1":["signedInStatus","false"]}; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.27.1630983167.1630983167.1613561419.1656238930741; __CT_Data=gpv=54&ckp=tld&dm=microsoft.com&apv_1067_www32=43&cpv_1067_www32=43&rpv_1067_www32=43&apv_1011_www32=5&cpv_1011_www32=5&rpv_1011_www32=5&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; graceIncr=1; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2Hxc7Y0b!Gx9rutkd*AQngtRGNv*DXfcP1IaBfqlge1St6*xPgFQkPy1fnFyYgDHJcUXGwu*hWc!GhcZFpmy79XLfJcHBgvecxShvxfILNSSbvaXbXgfP9TRvZn!5C0lGZuQregcRA10k$; MSPProf=2b8XoEC0RFnpwLL0UJtvaEUAd8ehwb8tcUefLGmO!BfiMj9dlBLUyQrMctBzI4IY*kM2uIUyt!lPyfmL!HzE5yglakC3uKWs5XkVLYJGKN*yWKd0lNT5gUfB3NBe*dpdcCuMl1qgZi!OMXnsHc2I5TZNocnhtbliNndq5RE1geCgw1f16IB!fG7dIZ3gb6HeMuc5E5XOlwig9XzFm7AjnI0!!UiVLqwIiH; ASP.NET_SessionId=fv23rksqolmsiquvjqwogaaz; InsiderGroups=a78287f79f56ddc1-insider; fptctx2=H3ihr9e92IdW6yd1ZgQ9S04xKNnhrQdHdluvYU%2bLEnRHIkqq83rbeAdK5XOxXLaryausoxKLX4kRqkEHpA8lmxnbBo0Bn7Mh1Ap2Daezf8FREyuENsSXPt%2bnZ9ul5s9iUqPSI1ph9cCFKFJSKDQ4WddGNvbifcAgz9ynpskDMekoKHnF0VXylIRi%2b%2f6dl1Xv86Iiyu5KuoDspODCigbJlzF4BffTttq9fk5dSdk4TLhzHvPkNUK15bvxg1XXbcPljSDIzwhZwrJDKZlCfvtRQ78nsNUipJy%2bNjRpOb%2fdQmM%3d; MS-CV=e6m/fCgTJk2Zy+VT.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}