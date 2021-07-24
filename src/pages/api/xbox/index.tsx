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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1627088969183', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam=12322074,aam=12321301; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2uREQDxWdGhaEaxYEHYXTDCyag1h24Q3*fUmSIpbGEWt90MCai!f4x!HbY5BNjuxJqVvutwCamRdXGJOtLqGFzNxAu6THjnIPbkhENanYguxhF5AfdmQqMepyAQuhnRUZywZ9UX9u9FmE$; MSPProf=2tYbj3rr2F8LwUbCVJkNWpKfsucRimlRg9XOACniM7*1McYwmwGlk9q0JH9h4SOvjXJiQ*mnabKUpfMUuO!ELB8XYsn3ZYhBoj82KXeYWZ69wO98NpmBLiSbj3LMDN3RPTE5PoD6YFlX4dRIPzwH2s8q9gvB3bK0i6Jcat0vciH33y63PwalSVrlV1k4ZZts7m*j8vDavhIEnGrNcbQmDtr7u3h3dQPCLE; ASP.NET_SessionId=g1tgh2vkgmeuomcjdhfgrrks; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=QW5gIbH6cE6WQucj.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}