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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1631133183786', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; MSNRPSShare=1; at_check=true; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18878|MCMID|32606165887524311583660282503796334325|MCAAMLH-1631587963|4|MCAAMB-1631587963|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1558211478|MCOPTOUT-1630990363s|NONE|MCAID|NONE|MCSYNCSOP|411-18882|vVersion|4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665169863|session#f5b172bb07544d59bc01ca50bb7cafa0#1630985024; _cs_cvars={"1":["signedInStatus","false"]}; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.27.1630983167.1630983167.1613561419.1656238930741; __CT_Data=gpv=54&ckp=tld&dm=microsoft.com&apv_1067_www32=43&cpv_1067_www32=43&rpv_1067_www32=43&apv_1011_www32=5&cpv_1011_www32=5&rpv_1011_www32=5&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; graceIncr=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9S04xKNnhrQdHdluvYU%2bLEnSOpfY%2f1VkLMjKysMlXurLoVKr4Pf3LKEUj8bNHKllifi0MUHlymENyie%2bFyxAP7cDm3JxhoREejG5my3NB11z3YQIccaxtagLgIfhgukEUJe%2fCfgO%2bOIoEoqPb1IAXV%2fGUngnB7c%2bpxM%2bu2mamkBOnMjWj6cbrGBmqo55Ce5aypySk68qzDVVQpaErEIt%2fUYW8cFAw1Kh9RsY0DxdpnA7MCqM8muU5uT630cRU2GSNaXirr9skZ7FNYNImWEYKUo4%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2ucrZm1qAGoQA*2PM0YpuXKl9bsokFOd6WLmrzW2jEOG4koVpYRcu2lB*8nFpUYyd99sgJJ*3GMPH*AMnpRAmA6XTpsgiCNfKoBI2kuzm3cBcU8e33tYy3XlTCC4V0Co23hIriDyk3iEg$; MSPProf=23PJ7S0M0FNf5HpoIECpSBsfj4Cb4dU8QfMRJGvK!TguVlO6cZkgaWUmf7I5Tx4PrhltmudoyMdy77kNn4CcU2b7X1cggROni8iTDqRCr2XTi9FvIIjYYTAMFgqAL3aBIRIygJP5v2UrJHobdjQbXMkgcFMjieQDdsXJZIDVM494l1CKOr6zap0d7VCWJhpn3cwbqwnwMvDk!Dwzuuln0NbKBorZjkvxlt; ASP.NET_SessionId=fkpwxx3qvr3s5zldmeo2fryv; InsiderGroups=a78287f79f56ddc1-insider; MS0=97369f3bd158483fb745e81a7671ca55; MS-CV=tXWCm2jCcUqoZn8e.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}