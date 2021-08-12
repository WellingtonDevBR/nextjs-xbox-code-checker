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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=2747c49045b247bc&xhr=true&X-Requested-With=XMLHttpRequest&_=1628780641804', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; ANON=A=3547CB54ACF2832A5CCBAE8BFFFFFFFF&E=19d1&W=d; NAP=V=1.9&E=1977&C=ix9nWQbr3H_QbxtynyIlYFs46vBeb_EWfU0xPeyyW3I-KThm6d7d_g&W=c; _clck=1nikvr0|1; _gid=GA1.2.590395890.1628615856; ANON=A=3547CB54ACF2832A5CCBAE8BFFFFFFFF&E=19d1&W=d; me-ct=1; InsiderGroups=2747c49045b247bc-; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18852|MCMID|32606165887524311583660282503796334325|MCAAMLH-1629354490|4|MCAAMB-1629354490|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|611216252|MCOPTOUT-1628756890s|NONE|MCAID|NONE|MCSYNCSOP|411-18857|vVersion|4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1691994552|session#4cefcca63070479aa56b8104560594b8#1628751551; _uetsid=785e3700fb3611eb804f1bb891741a78; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.22.1628749757.1628749694.1613561419.1656238930741.None.1; MS0=fc8f1eccf53e4ba0a306529678495f27; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=29q0NzzpjFHk13bgx3IX8OPJ3AOSRgEB1UoLlfk*XKw!HsgdxvN4JYZ*9GTGMVCunoeRLeDKQAzoNAzXu7SFeFLUZeCBGAagdFPL!5X3zAVkmxMfZjoWF1q2C*x2POtes7l5RgTxvtmSHb51TXM2YOPmet7b*9ETwn; MSPProf=2irh17jn!F3Eia5DRR!GIUuLHRJH9DfJOudYYbwYq7f7lipoS5NXIPl*C76yV0xkFia*uxZS80UFJ0coQoF14!tO6Kd*BeA6pYQac5JfNkCAbbvlmd2lw7uSUim5DFTKeBG5sfllCZRaKTDbL5aOkEaFGlYIG4bwte2BLokEWZTrcN2wV0HcmEkEzUUQuFYQ8Ima3HUfO55aAZsmDoxOaP8OBi9NUWrZ3HPmDHLMkM0RF7a3EtMeO0nA$$; ASP.NET_SessionId=z2biqgeq14fqftm1vzpcms0c; MS-CV=Q4uYAp71e0u5+9N6.3.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}