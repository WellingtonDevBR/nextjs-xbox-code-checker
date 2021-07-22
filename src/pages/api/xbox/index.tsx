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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1626968673346', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam=12322074,aam=12321301; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; MSNRPSShare=1; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2XZq5pkXYGddGLojv1iZ7B4N68E5drpx3VRB4uqVqr*sSdKH2bitXW5fC5SrkQjnTiQa2O9VDorxotSEc7hy!I4s*27zAYxWXz21ZXCmuqcFnFZ7RkvKZa9nMi85XOT!suRGmExA8FI6Q$; MSPProf=2VljwELllFvZfD0bZqR8flEK5s5ykowrlkddidalhCpP9l0K33Q*I5Fgz78w67ozRqy7n!ERhEfSFn12QYdzvraH2b6kUiQ00!3fCAYK4IKFiW0pLlgg!nFR!g4RrmLmpftbNHiDWz9ZvHCmEXH1R01JghY5vryigeg0nDFmJsGk0FpAVu8DMjh2XVfVDpTYb17f!ve7moRI3bfSp26yg1F3tIQdDlqVhE; ASP.NET_SessionId=qu5nrdbb0hdxfbuwoaijh41d; InsiderGroups=a78287f79f56ddc1-insider; MS0=ba59bf0754ba4e7a93c7660cd7ca15da; market=US; ak_bmsc=DB33D04E88C5411FC2A2416FCFC06FAB~000000000000000000000000000000~YAAQZ9hHaEMDk5x6AQAA7DHjzgzY2uZQY0BNiU/91lEwWV7RORgTDwoCT2BM3jglrx3hA21NfrflaghAYr8lMlSDXGh3C5luZ43hHskorjwBXz6mlV2biAV/CdY0UzYBO0rj6STgzeqoVcdbLDFAYF0LGH2FuqcpwPyPZIM9jjh+GaOJBlmwtIA/F07pQcmPEFNzX33pYGbooxi2U09jYnQWPoqGL19FrRbrBSO2SK30irOESg9cs54esivzlCbrlyq4uFoP4xgjm4L0bFJGXy/Atb8gIYElPRlCIZBAxcHbtxGE0Qndu4+gp8Z979eCglaFeaEfKdRudZi3dg31S8tXeyZERV4LuKNJqM9Qf14TMQPHmpk50DMOzgS2cS06IR+D; bm_sv=01A19CC872ACFD2138B2039756824DF7~cgQ9cRuxsEcO2MaLAs60uUED5RzYhAidEtZzpC53jK2mcIwM2FaKBksn4EJFW8WxcGLQvEYjjTBWUsd/vxL21FstBvfH4PXKpe9o4xDPNqRTqLx9Ddqxd7jMSdeRKMoSBa6h7ogJ6pYunh1zrkp0do3EBpOtUQ0Is+r4iz7Ul0w=; MS-CV=dzlQYV1hnEesIi6V.3.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}