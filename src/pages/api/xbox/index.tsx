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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=9c014618f2f4614b&xhr=true&X-Requested-With=XMLHttpRequest&_=1625493092605', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam%3D12322074%2Caam%3D12321301; _CT_RS_=Recording; _fbp=fb.1.1624584421901.1136163943; AAMC_mscom_0=REGION%7C4; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.15.1625274519.1625274519.1613561419.1656238930741.None.1; __CT_Data=gpv=36&ckp=tld&dm=microsoft.com&apv_1067_www32=31&cpv_1067_www32=31&rpv_1067_www32=31&apv_1011_www32=3&cpv_1011_www32=3&rpv_1011_www32=3; NAP=V=1.9&E=1953&C=GFylFlLXmztAfVS__sVRpw-L-C8E3rCX7kb34vVuLMnUGVJ5EmcbQQ&W=3; _gid=GA1.2.615603165.1625345711; market=BR; at_check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18812%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1625979370%7C4%7CMCAAMB-1625979370%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C-842020641%7CMCOPTOUT-1625381770s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18816%7CvVersion%7C4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659561270|session#d7c18dde8e9f4ec599061a3020d40e09#1625376430; aam_uuid=11062451314358537881498287062699608140; ANON=A=43CCF616199CCADF7396AF50FFFFFFFF&E=19ae&W=4; me-ct=1; MSCOMRPSSecAuth=FAAqBxSJK4YRnp0%2B%2B4Mpqw4HWhSmhVMzgQNmAAAEgAAACN1ogxV94GwH6Abg5kSjyAI0mVISGYc0zKCJdLKS1uCM/pAoK52UKFpkGq1qUGLAfAlX8FJ1kjWTokPUXiafi%2BXrhxj5WXlMfJ8KTcFnFtWTf%2BQLv063WxZjkISpamw7W1DaWF4HH9ZwyI6XrJSDGuo7CkBveqJvDCFYJIWc%2Bcz8srKcZ/XCpFEzzHEq56uPy3NRGtXfJLYD7VWngHhz8jSjvSeaek1N0w8vpsG%2BVmP2lqIft7Zzu2d3sVQ70oqhWM%2BVYmF1LCuaDZnYZ34H5FrYywdf7NqmoTnFFpdZpcvcLpmS2yv%2BJdp5h25FrGnQs5pVmuEP1DrIIVJ6kO/QrdzRdZEv%2BZITRsKoYxsv0wD9cUbHtHLT63oapbXCIS2zRm742XnE0bZaIyZrdF34%2BG4TIeKbT8M9sTNuIeC/7o83DYmYg3gS3JMa4qB9WegDu28jT8SLDHymDOKjnglcINZfNfRIvSGpEdqIdl7DGRdRaDjdij/FA%2Boq39K/2R6bt8iiM2m65HtHUqSLmRKis/sMQFHHc8YnOQfJsQzCS0V6YjoDFLSeeY8nfChJeWgwae2dq/XkI%2Bp/FskBb4EuWH1ektOMDUJpMkSDZihJEpcU7duY699k15bWsckFfgPv47jKroZbGeAYPFG2uVuJTyUszQpKNxGy/CiUx756dIQBSVfb9f2Lm8fFRE%2BKul/dqDNNuXvnfK9SCkPIQO8FfDLiIv1pHt8Rr8nZb8r6F5B0NopHGtRAPPo3Td6qB6KgnaBaYMsnHtn%2BP2WhQSnFTeetUfrqRGAN/AsfCgmpkQ1YCMddAXcFOhO1W8i2FseM/A2rRw0Kc7ja5UJ7S0vI%2BeLv2RaOKziwZ%2BP70%2Btvsf0xlvqQYdZhFUs22Kw8VNpIb8Yyb3nm2v6NQKwM0/jacD9%2BvUhDNgdeO1DnjTy8RbPtsk65z83uVbuqPkHAcSGTVfCd92%2BnzSbfJqF%2B1YSh748DzoFV6FqMLzqg1xPEsdxxYYnOLSV/aJwju33hAoAV%2B/Koc4DtmkajJNjsBv56BBgEbcLOKGPUfmh6y8/NvAHkps9gN4wOxz0KOLPwMZYDP4U3zypparLxVeA9ghcNltPK1xrhmDy0X6y3b%2B8aBTfbei0hsvy1L6tnRGN2pHgcZQ02a0GFrqTkr33XRmjAnQalId3L4tdHnvnFqjfcL8izEXxgbxKDF1/Kd8oeGMiFk38Ts9fg2vvGg3LNKy6XoQhqCAtQemFlZVajHxPY0sN439Up1AjWK6n6soJznsRBu5LhiJp9PS3b8KY7e39ipbxH7schqj3kLqlcm6hwyvwaVrEVdUH9eC6la%2BAdH8ussQ2xTRIqZ7D7efM%2BMnG6KLQdOvW6nl4ZsgnLSHvse/hFwI3pAc%2BVIMmEfwNDXSPUHLrwA%2BaV%2BMJGMsw1V5/266PWZ1PJiFT7vt/WP47RJo363lcJ7E4mGYxnjA9uCsJWw0e8sHCoWIq5oKmVcUwOZ6k2HWQ5QX3G3kL2PXAYR01NVDP%2BJH3OzL6Bl12LdJ%2BwdFHll%2BAsX%2BlLMI12NsAv1iATY1jXV9ieb2bYgipPJfs8uRyo6Wh2N0Al4PQSXJjk1UZKX7XpnYlrpEMAOab/vnaYWVoYizG72XQFbHekwRflRIhc1nwpvJ9Bx4rSG/0%2BEWUXG1B9QgZ93As9sXucC8/aHsCLpFiIOXY7WaQFeqRagN09KkGMwv1bcTLEvPwZmZIR45Wy4hXhajV45kLZpizKzth4JL8APyMyDy/p/UXXPQyY%2B6a/sIJdzek1r0vHptQXW2IrF8OLTf/OBBqf3ExlrB78fVYs0ph8fPEtsDpeeGmzYAwow2tJTooBCeW5UsVqEMGPjsS9hsmhuo2OdO7XfgrLo%2BR7X49088bncb/lbZGHWX5uOENMf4T6PmsL7wB4ULbLJ9W/iKYs4%2BPYqMLJWjMqXoq8qtnoIvZMQ7z8d8ulhrsuVMP5YZrZtY6Eo1jjjA5QASUst5idyaqU2oo7X0nzcJptn1heWa5l0HukO4BPq85Ut%2BxFkEpXYf/GgNkR1m7hvSnq6oMugNcT2VjbIML7JAtQBrZyCm068KDHw9TxFDiqTgTY/8Za9FagziNVBVzqZ/kk3rdEfCwBdQpgfguVctKIwxIqlQ7dNcu/JLI7pGeIYVflOTdpy6VXp6tFwK0fISVgBQKw75Wpmu0c/ElHm7ovLJHsG8LrN27Evf03GrtqgWMjS4fRJZ3R2XKfeyGKmRKZWPDyB2iDBRoJWDR/dhbw9Ovn8J0oyhjyuf/vgBEueI72bBgtFEoPeBDWusAsPD4hNcuvVZNtoZNMflcE/qtkP6bLj8orOzkuTpm3iAFLkTwK2%2Bw4v/0XBC%2BfFAB7iVmgYgRiUMoP2FjLW9TPZYhsCw%3D%3D; MSNRPSShare=1; MSPAuth=2bVJQi*xHEbXDpiPA9FE*ce6Gq3tCWU25253RZgYQVvTJO!Ohg8pruZg2tS5OiWMapEo1yZUMJxc8*c9rHcyU3Tn!bsfGh18OFMjxGc7k6skvKzrRn0OC28VlP2ty!kj*R; MSPProf=2lftyi85kCDWfFTDa8Yr2TahG0axL42oSTim1g!F5V6*XYwLhBm*RQNJ5tPCjNnR4fe!SADhfyUWXOAxGW2Xg3WJKNAyBh!afmc9HYtV!Qholp7HtL2T5SzGABVuz8*ZknNZWES5mdorfFm!miql8Xoxm0UEEl7WLj8370mfXJN6M$; ANON=A=43CCF616199CCADF7396AF50FFFFFFFF&E=19ae&W=4; NAP=V=1.9&E=1953&C=GFylFlLXmztAfVS__sVRpw-L-C8E3rCX7kb34vVuLMnUGVJ5EmcbQQ&W=3; ASP.NET_SessionId=ko0lqipoc3facwwhdwnkawzv; InsiderGroups=9c014618f2f4614b-; fptctx2=H3ihr9e92IdW6yd1ZgQ9Sx9IbKBLOSUOGuHkYIM1YFEn%252b9pPehewj1hDOm9d4wnldG4LiJlKNEQG0rpItna%252f8ljNRiLjtOYBQd53lAtex8jmm3lcHsq0DwP6J1PIDjrAdsdfya5tTlsTkK5ZwK%252fyR4Zkv8n%252f4pPTdhkUxNrhuHSaKNNj9jeITiXwqazC4mDpdcqZgUtjtn%252fKhhAh%252f5iCWA3N2wf123s4gzICR1pjOdwSEUCdwt5g2se9z%252bWAwiZK1%252fRJZc0oilY7r%252b8oJZQ%252fnZGEH37Xm2%252bGoG1%252fe%252fbTsQw%253d; MS0=bb06f6f5b8054b6584f14c83b935d8b0; MS-CV=K3PNG+BA0EqjFUKs.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}