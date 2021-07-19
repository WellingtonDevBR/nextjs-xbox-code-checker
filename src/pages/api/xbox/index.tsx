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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1626718713896', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam=12322074,aam=12321301; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2psjkamZ8GJjbRloJmTRts2uf9mSMGjYo5tSOEdtn5YbBkfQrKja!9ZuXUG9P98gLcYjJL1HgOz3UoTkNE!z*ZwY*YJy8AsYd1PtIse*MAVzAPvhlEnIW1!Uz3SANNndp901JIdabesb8$; MSPProf=2CKEdBpWCFz6W5M8fFLx3iGHZ838p2Z18pV2Mn9EErxmIPnWXq7uKYqNyvllA8tXnUKdnSIk6vxt9AHrW8JHzOmI5sYvWfEuey55cdmqk6ClpxnslhXroZYxm9s!*vHjV7h!wQPVzQJ4wVtfrNUPuNEiCnF!MVc5tgMBlEQYKHpojUPwnTMTEzRdA7EsIDm5F0T4tD0GL9B8J5VZ!Merb3vm6twyRcaMXW; ASP.NET_SessionId=ywdqoaajy3ncat0ha1hydq3d; InsiderGroups=a78287f79f56ddc1-insider; MS0=b012b4c8bdc94445b1a8ff198acf1639; MS-CV=6jyA2FBsGUCT2zGQ.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}