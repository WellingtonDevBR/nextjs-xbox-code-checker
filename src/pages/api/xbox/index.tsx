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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1627485617970', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; aam_uuid=11062451314358537881498287062699608140; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659880755|session#96788eba51124417ba1c8db403ca42d5#1625695900; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b6&W=a; NAP=V=1.9&E=195c&C=KjHUuBcOkNGCRQ65kPKIKPieXKdmYomzWTvgzdeTDuJ6VKa2kSTG-A&W=9; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19b1&W=9; NAP=V=1.9&E=1957&C=_z4VRRT5pKZVmdJOreCT7P6DGeErgPE0UX5a06QkneUdXX2fhswIgw&W=8; MSNRPSShare=1; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxLzXxHcL2CcU%2fZDGCdp0wFnS9iE3fCvD6Q8dw%2bLOvc9m4F1YLdkK9wNMVdUTV6kIhBUBLhHRHgIhD9QYnoalXOj5Wy%2fU6aBvXPGrGAD8gY1wjk82TRcTe9m0TkRUR90%2bmOA5HiRmhxHADlkEO1l%2fVhauvxUTxr4wZGuD3BG6KlJQofN04WcfVDUUfDYcVcKE%2fimfqzk64CudvC73tYU3IDtfUlaAO1VdRw18PrLxPISQ%2fzRqsDFbbYSruepsGH1WT36kpcxuwoMuXG3RF6Q%2f4g%3d; me-ct=1; MSCOMRPSSecAuth=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; MSPAuth=2gp9p9KJqG*vaAM6s*KrO3s2WFIA7pD0yseZg86K4JrYgV4rl5T02OdfwNdTxKzNJbf5AcCxudG7aA8ILz*dqUKtLZ2tlVFrTuvJmuhYBuhkyu85Ld4E9XvzI1ynE0djVxsuB65Fq*gpg$; MSPProf=2XV!!pHlRFo33TiLiCHSNzOzTazcp3GqY29gcIG6Ptd2joqgoW1it!pf7cm8A*i7Rp7DGMNBT5hQp2I5BdnKByYgIX2*j4vzAcovmdBsORAgRpTspkZ4EvrWKhFyap8OqP7SfsNXg77FSzMLQ!loAvFImaKgVOlTj1yCbc4!tFHDsURSG!LlsRtslqYjfPwrjiwiPOvUKCIJ6*r0L1ZB0OFLd8wLtznRIP; ASP.NET_SessionId=akns4axm4fuq5epvleafdfxp; InsiderGroups=a78287f79f56ddc1-insider; MS0=85ad34d31182408db780759e9c764de5; MS-CV=+0d5oHjZTE6sGQHz.3.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}