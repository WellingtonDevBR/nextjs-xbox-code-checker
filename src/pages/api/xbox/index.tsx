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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1627318193233', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9Sz4bj6XMGo9empP83sM5ewd8V7xj3ZIk7la9mmAiQDGo12B9wc%2buMyk1cEHeFpdgGx9jhOLuzg8rASvCJVftX48hH889am%2fLAn30hwjS5yPlMt%2b%2fiunyh%2b4Ca%2bAl2D%2b8TR2uaO8L8vVXW9x0icSvRUF%2fqm13rdwMi8XvPBWS8NNM88pz1wN7MkMxggXifQnqqmNaYJzlJtz2kq%2bPrksB3ew1RpMc7%2fTv7c1ysM7VMrbFpgpsNacX3A8p6x809C5kylBSh5MN6lxMHWidGxxNXb8%3d; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2Vk0JFmA*GSRkMTxXj0TR6JlPyeBpkijsDH0X*GPhfwISptnTyzbjBdacDFkx!wgJvd4TZPe*3W18r*JH5daFscHvbZdipp2vGXIBwO43h1AmFf8DPdZLa!!IKvDOKjfuwKR5abMxqmTU$; MSPProf=2YzWzyfmkF6290*SNUnXbpjh8Lih1FavwWOAmEvqHddCJoR0aVkvyJfa*oJQaXzeZDu0QEZ!FWuWyj3cdyEWevbgRtH7LsM9GH9VhV5c7ZhRmBDRifpwr4L*F4QeYmQbA5Wwaa7m!Hskaj5re7L*IRks5e7o3HT9As2sz!CwEhJ4Pr8Bxc2NGz5TxTAyK2fKEysOrbnD*9gNtyen!!7Mcxe!fAWis3QdV1; ASP.NET_SessionId=5i0cefinpdre02ae3rwbry33; InsiderGroups=a78287f79f56ddc1-insider; MS0=9a8973fdcf6f45068daf2a479c797b52; MS-CV=LKBNLTgT7Ema4YPC.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}