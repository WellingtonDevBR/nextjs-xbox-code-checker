import axios from "axios";
import Cors from 'cors'
import { GetServerSideProps } from "next";
import { api } from "../../../services/api";


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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1626188022803', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam=12322074,aam=12321301; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2qMRkrLjLGLF1GHdT*oHIu9UAoD1mzdb0jibILeu8gCqcBhkPslEM0oE5TxgPX*kuOZ1TTSCo!J9WdIglv*WOPZ8s3CL5wU8l8aWpfCCvEtG7gxgL6WeRaYGssEjr7b6*TMMwi4Wu6gZI$; MSPProf=2GEho!f!6F!EidBPF*!t1WO7Onvogy6NCvTpPBiDN02X6FCAldJ93VVl6vqzYPS8Dertve!vPovLcbPYiDVGdmSNTDaN4QNsgWeDCN6fHDyBZrJh0DOs!UTJqPQu7urH5CqbNoOqWMmYvBU*FIym6hP41Wx5D9y!SABaI9M0mP97raZqJe1Pwz1ias2XFVLpARmDKKn1NWgnN9zm*!ePjLrFrWSeVGcCFI; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ASP.NET_SessionId=pkxskxrqblffc0fy2j0zny1n; InsiderGroups=a78287f79f56ddc1-insider; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; MS0=4d3e75f2ed864209859077559f71b807; MS-CV=9wWKf9tR602mEx0F.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}