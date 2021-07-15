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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1626367491636', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam=12322074,aam=12321301; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; me-ct=1; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2AYAU*wJ2Ge6yfpSS7HsX8ApWKvFM!RPrfk60ZfUt53aY7Ys*7ALKG4YLyXX34SeZMP3eOv*o1xVg2Kz2fv2kDmge9bDXIEed2TzwrzRPnAB5mPN7P*d73nRLmtzCG5i*07MaDI1W1Ld8$; MSPProf=2vLmFTr*dF43iA2LkgeaJolyX9OoLO65a8EG3Ot*jqLOnmxXHToD8RCj43homTh3oeVYckag6!EbXw5RuHTioS9642QMu0m8*9WtFsEzAZZRfbTos3DMIW5sIuQLCzFS5VXWnaf5wOS8q3r*dgPXmevlRaPk92VwQbpkTxMdsSXAMrubd*2Or*gYeu*CsbOYbmA3tU220BD*lYsceMd937j1*jkUht!3yT; ASP.NET_SessionId=xw3tg4ix2zfeb3iw5lktrkrq; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=7LdVDs7tLE61Ln3j.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}