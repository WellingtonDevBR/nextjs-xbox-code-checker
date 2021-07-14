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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1626277719320', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam=12322074,aam=12321301; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; MSNRPSShare=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2bognnZy9Ga6qVUZLnIUN9Bxz2Mqo2ddJFnYK1yevGGg1KaxqSNm9TLXBeoa8gm4vlDsNWPpeqcQg074ov1RAitX5NYxx3hf1YVe4hiErQpCkjPGeVP4kUtf6wM*!aoQ1A2lsvnmOmcK8$; MSPProf=22ZwBlGwOFd2YNFsOWR1AQLiCN9y6En!GyoIU3rFuzuiZ2vgj0XRvpnSRRidgz5XAwqyV4xxBoFsip9BWd4xlL05hcNHJ8Xcqss0*t!JN9LKuXQmsjFc!BaRcb4pP16KZ96iVioHf!Rdo7nW6Y2r4M0q5CQ*zdHXnD2JGG6Sz3mXhY7S8lcN7yC6q*Y9bR9arbYcG999003KxIhi28*5mdbRsrWZsX97Kg; ASP.NET_SessionId=wta0aqibthmhntugyzyvc1k2; InsiderGroups=a78287f79f56ddc1-insider; MS0=9be3d92f54b9448097127005c4277844; MS-CV=rOW3PTtgl0WrIcc7.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}