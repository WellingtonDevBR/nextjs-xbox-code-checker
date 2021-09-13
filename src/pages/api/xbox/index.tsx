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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1631547787191', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; MUID=10E1011E62B967790FF01189636C66C0; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; display-culture=pt-BR; _CT_RS_=Recording; WRUID=3462427315635251; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18882|MCMID|32606165887524311583660282503796334325|MCAAMLH-1632004992|4|MCAAMB-1632004992|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1631407392s|NONE|MCAID|NONE|MCSYNCSOP|411-18889|vVersion|4.4.0; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.29.1631400192.1631400190.1613561419.1656238930741; __CT_Data=gpv=2&ckp=tld&dm=microsoft.com&apv_1067_www32=2&cpv_1067_www32=2&rpv_1067_www32=2; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665596992|session#56a892089c264316bef00036a6ed6fc9#1631412153; MSNRPSShare=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; MS0=120a4b4f10fa45048b122ff591b84f91; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2zHiNQ2lWGE9xVlhK67Y3UMqWjBVrv*dwCJfqfgMe0LoKpqhiPfI1IyR!O!lRXgsYvL!C4XErnIgf3*L3d5KZumqTeCToY*Jh4eveqfSAHVpC3XTq28ATAtugc8qozYNmJCpvUSwMwUE8$; MSPProf=2pQ7V4S17FZTtqjs7S3OdjoGalwa!jXLcGZunC63VsbWrncmfRPXqbg2cNznWPS!f7uL21neKaVTlhPM0wRFWmRbK!d!yk8xQmP11QsL2rEmoYZQNWrE3yUm5yEIuibpPVKW6P5ihO8qBCnrHvLpMuz!tH5YDZglGJaWKA**cZtRahfjjJfgiXBdt9!yX8OGr7JC!QSP5!XyE3hNMs5519EksX3*X!5vAq; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; NAP=V=1.9&E=199a&C=ofcw6aBFNV2dWQXa4SWg6RvWmKey3Egkx4iv1nL6zwOlCYGhU7DuEA&W=f; ASP.NET_SessionId=xwa1kqx1miqxlggzkgqpiw3s; InsiderGroups=a78287f79f56ddc1-insider; fptctx2=H3ihr9e92IdW6yd1ZgQ9S5rgl8oOzJXlGHKxtZ4bVKooyVXgbB5MoCuJoZsp9LQyewvDJ9pR7BmfcAUccCSi%2bN4nKv%2b1tmDEEMfFe16hjtVLaFnGhVEXxUMSJnPvZ37p0uvOiQ6xgjSlpF1S0KjUk8RyFcIvWDL7JVV1gnV05sD29TEU%2b84EV%2ffbstbsqzHhRat3LYtksIit1GFrU%2bzDaGzQnp56tooQmWUqb4aIQK5mhiX%2fjxKpmJ9NxecGp%2bTO%2bt72v%2fwPDqNrJV11r6eK2dEnxskpT9pyeoV4lCaZ7%2fE%3d; MS-CV=tdzanUjBeE2x5wkj.6.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}