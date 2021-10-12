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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1634052474618', {
        headers: {
            Cookie: `MC1=GUID=9f80e8e79bfd4cd8ad062ff9319a69e6&HASH=9f80&LV=202109&V=4&LU=1632338058837; MUID=389A3582BC9F6FD6050B2538B89F6105; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19fe&W=1; NAP=V=1.9&E=19a4&C=KlhSPbu8rQv6_QCXTBijLEFjx_uyWzY-p7Q1VnSm60BWpYmWEvmHEA&W=1; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9S6iHaRiejIdk0aIJJ5j7uH6xHkNhYxS0TSGEBOMIS0USvyJScezGViQOWrySsnc%2fUalrEcviTPh%2bxhJIzZTYB1%2banexVp%2fiwrivmYxJQYe6U18fjWRJeJLd0BG94GvfPPiGCgjY11FdaqgTHk%2fdWCN2n6uoZENCnVmEqpvqjURqd4NpFdejhsS6FLyg%2ftCOAUL9dcKQdGpFaQnzXd%2fS6iI66Ou5Su9MOPAXpypPezU7Yp2z1EH48ZJsOLOhxVqwfApWGmQ%2bXoa0d%2byRKHfss3uc%3d; _clck=1rqm6vq|1|eve|0; at_check=true; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; aam_uuid=35285642296513185653372843433234478955; MSCC=cid=rl53u1ghwvm9nioy0s4y2wak-c1=2-c2=2-c3=2; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18909|MCMID|34823434385683697063344628246773816932|MCAAMLH-1634382602|6|MCAAMB-1634382602|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|911550667|MCOPTOUT-1633785002s|NONE|MCAID|NONE|MCSYNCSOP|411-18916|vVersion|4.4.0; _cs_c=0; RPSShare=1; IR_gbd=microsoft.com; IR_7791=1633777812517|0|1633777812517||; mslocale={'r':'1'|'u':'en-us'}; mbox=PC#d0ef719631604924b57cbe069a14030f.37_0#1697022620|session#622026ad29d74c8ebbb69a5b278c8217#1633779663; IR_7593=1633777821512|0|1633777821512||; _cs_cvars={"1":["signedInStatus","true"]}; _cs_id=275bf1bd-ddf5-a7ef-9e73-d4bca1cbf784.1632858550.2.1633777821.1633777806.1613561419.1667022550618; _uetvid=75830d2028f111ec8e76293799c0d425; _ga=GA1.2.2088416823.1633968434; _gid=GA1.2.1383535318.1633968434; MS-CV=d5nP03FvKk2Q7S+W.1; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2bILutIXqGyhlIvOZdoThbC9BPMqY!BZ2QHzAN7DDQDv519temlbMKEyuZmq5iAYT2QuPG4xCPtoxHV2Bt0v!ZvAIrecsU2kJCoWnh*czxgvTEY9WVlTMNPRrnchS85vQt1FESr9wGiTQ$; MSPProf=2Hp6Jf9FXFRjz8nmr2aQP3rjtKynDHy3O!ft7HbSnwH!IsKE281zghHzFVcXpxzZS9qNFPrZbM*oDZBFCeCLWapil!RQm8omaKeVvSGeGNjIP3nqTnzhD3QvxjWiAWIsnAeEhbt3londezFYtHtBl2UYHIw5DtANTWdlJi0bCJGREZuayLd9aakRWFNILnBUp*HDfmLtPmbtpjziipvlaVagFsc!VEbYTA; ASP.NET_SessionId=4dxwdlxxwyw1ccqpjv04dpvx; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=d5nP03FvKk2Q7S+W.2.0; MS0=359659d196494eaab0711dcae5bc2782`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}