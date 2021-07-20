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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1626816183049', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam=12322074,aam=12321301; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; MSNRPSShare=1; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2yfRj5ehPGrGvVv7wTT9dM0Lffk3upZNaoUG8iWIhIJ9jGdYKMMn5xDWiUibBZpHPo2fxl*l2IEoIlRzilZOT9UMvU2bMcPPohOkyVImOXa0c4I5KhcoIRF4F6AmzjhgyVqek88dL8sTY$; MSPProf=2E2dGreI5FdCf3*khUeo3i9p6ExUTWyIjvNOtSvHwHNKzab2Y90*lRHoF4FUEsoEhBI3x*0ejcnmXLKeNK3a*RNIM4ACuckcyJZoR9YUZPN0KQTAslwmt9ncbFQ47WNaxEDzHHHPSN3iGjRhMwsm9hDdNHCoDh!xX!JOVEfWBGLWSP8YSSyE*M7AzjPOWlaX75AURXNQmdG*puApWVtIsbJ8Pod1yWh!XS; ASP.NET_SessionId=ksfk1vkiiw1xishcwb2ivkhw; InsiderGroups=a78287f79f56ddc1-insider; MS0=16b0d434edb548d9b2a553cf1005bee8; MS-CV=pzUTaUp6AEqziQR/.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}