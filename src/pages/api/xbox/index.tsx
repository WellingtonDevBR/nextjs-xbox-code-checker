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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1624043616516', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; aam_uuid=11062451314358537881498287062699608140; aamoptsegs=aam%3D12322074%2Caam%3D12321301; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18795%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1624491472%7C4%7CMCAAMB-1624491472%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1839229455%7CMCOPTOUT-1623893872s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18797%7CvVersion%7C4.4.0; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.10.1623886672.1623886666.1613561419.1656238930741.None.1; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1658073371|session#73db26a1a0004607b670f9904d995851#1623888527; __CT_Data=gpv=26&ckp=tld&dm=microsoft.com&apv_1067_www32=24&cpv_1067_www32=24&rpv_1067_www32=24&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=199c&W=4; NAP=V=1.9&E=1942&C=sr92jFjpocZIUrldj72aSlHUY9Pd-dhCDrZMWuy4EHK42gK8YqCWOg&W=4; me-ct=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=199d&W=5; NAP=V=1.9&E=1943&C=86kuE11QmE-zDbSkURjKEPXYcEvRPbRoQQP9mnjSDsZzERvM0Bnk5Q&W=5; ASP.NET_SessionId=dbtr1r53xxugo1gv02rnba2r; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACJv16idGV2EyWAeJeqB7Z2kT5Ub46uqkQ7zw5o6ZYXTo/KOURPGufYW1Rj9PgQ7fgMUzjdM7X6kOdjZZuyDORpDggHFQh1S6g6Tx2SCBJ8ZdKWPXwSBkRKCsTCkxkwRKUPs2I41fjDkH6yOP6QlahI7RbaxTd2CoD4IzTBvcY/L3oM6c%2Bh//Tx6HVxV3Zw5p06kY53RJOSAOWeNonNO%2BuPOm%2B0EGLpr%2BxC5%2Baw4JfkfkCpsdLg4xw6uNIrvCrUFfCfrpvGaYkkx3wKd23oa7SiyIUX13lpb7T9vWQiPdF33u78tQ1CfCYnNT4ZAucpD9jzN%2B3574n1De3v/V6KMqeq2RFI6fGSg3Ek87wL3J0bfsTprV%2B6gh7LHpSXieYSEm3Bf/nO/WXsVD40jyYnuXgYt24G6Dll4a%2BGfp9xrHxK5JRWSKhDjjz0zR66Nm9rY3wge8zZjNo%2BD/Xm0RJxHYJcJGw0bac42oA1j0H0o3g8t0L9NCYzYQIyXi5K9abUHDrPoXl3%2B0rGGAWgJqcrtG79BsALph7B48E0x3KXcpqxjjUr5toa43WV3fykDaiOZhcFmMxdOh7nxKlJXTY2kyHecr9%2BIxBp2t4K/KeU/b8pLGutebQgnD/HWRqTpjnwR36MRDyyeoAYj/YGXH5TpFqEQDh%2BIW1WjN4vszc1q06Whi7qiYls0SU9en0EcANKQbgNuvhHuMRAoKU65MGSo8VGnd801ZoydIIevw5QDC31UnU%2BmGBhOZcKuc0WVRHyEyEbjM/XApOjbposNq9dvM/CwDVFKt41LmwO896tG6W6c1rluKwwYplm7BOKL7bsHMZ6XYYgBdrcE9%2Bg6SsjuSkRAxziYS3pkPS6jDTzWT3RqtaJO00vm9MgLQhEvw3vQoyQZ4%2BwcG/BTxV6UG8q7QCxkUHu4DNV1rU2p%2BcTA4ybWOzJ%2BehesTiig8OfDbaVM1O/l%2BmLaZEVnWF8iE7naLfoAd8BJPaCCuoZKIHc%2BGAZErbhB87r1Dqx1ufhrb1wBJqRnMI8LM17SbdgwKzGuJ4Ug7uJVu/KrzWCtU/JVcI1EmBG5nOZhqshlGpSCiOMDRZhQWMdyA5GgTlYaErG9wwPb9nNGusjvmFOj977TBri0ifF1%2BTnCH/HueR2mtN0N1dzlCt8Hr9SVd5m0TQLArrT%2BdTPPIFDZN4EBWEz0jEy8alR6HsiOYR0N/q7XyyNwOla089j8JJHz%2BPssVkdBRGJ%2BX4y2uV0zKq%2BS0Zm%2BG1Ld08Hba2m86mzC2selotUs/y7Dw6m7I4/gL8RzcPjiSujCV7v%2BmXlicSm%2BZiHWHwhB8OavGfjte9hORHG87BJh75yVdi/2sYIdkCOHywXzEqb3gNcDLk0SPEaz72d4N8rFBnahLIvvXOp1Ep5nvxpH552EomgrDZI1FP6WGDBUEqEOn4Ul5kf5/MXfM91SXWaDdmYpLZXS6iJHR9GXtmi6ifOYsH5brSydyrHhCDxkeGvpLAOtvF4iOzwRNZzW5OEz2bmFVsMSDuFtYJFzlVf3MA3NcGTJA3YKvOzAgLcrqCa0BAAnsVu/7ajZUP0Hx/SynWtCmC9xYPjaCKAtqDxffyNQ84oPBjVWRAArqIIX6iEtD952loL9%2BIhqCyqpT17l3c5qmVpuqNjdq8H1m1OOkolOsh5%2B2cGAkwKs6mzour%2B/i%2BDDxgir6xIBMhUoEOPgFIhA2P4v70YGETiphYSoVLXy7KRmxVsO5nsWUx6htHUE%2BD9ZM1MTewzUyaAH/WGmxgZLEAu91twNmukmyEaA%2BVV6lUKWpXcYzgI7RwrrY00aRkTuMBn11CD0AYt/p/OsL495meEiGHddIRQ6nA91fexzpff9ye5OhJhbfXKYnXc3aiQ3T58qMEcN1uMUJcS2WGCcUQ17C474AYkv1OQkIgjDlymJYAea7/9Qc/rUNuNSVesjzKr0RSt6J5Mp9O0Wo1N%2BN8gfzm9iFh1KSqazmEXJMogijzq0hI1snyA9ena9KgFkImrIU7bAqESepoxG0U5uPAdgqBlzJbIswiPdydBuGCwbg4uXtsCmb7supcAq7nACRYtbWgEj6lSA67/B8rt8ui656w3L9a5e%2Bfm4btGFpSkeJtzMUjvDVOdPmOWtodaN2cQ8XJvdjpDCyY4C1mRpe0EEE4e6qikUhxnoZo2b0rqPzFdxV4LOHYefj31xtJIb6OiCd22abUevf2afLjj9iqHiCmbHy7iQ/Y2JHcNYEbrAAwCoThiOva3GgaMCg2Uec0JFRtRTHreWUjadX9IVi%2BywsIoCwnO8N/Ppz5Sk/P0dYKRBs1g5x5lCnUsYjc/HA6C4gD9XMw/Ng8pS5aCglJpEwC%2BwEmaMnzh//f1L%2BHmOCipACWuWl6MXcTuZ/fzQb6sHYPDHxTqzvKv9X7AmYDgZFnnz9gcHaDkSW44A/bg4yOwndKEA5hWub%2BxzqOhyZxVq0VWnrUzH/1mPo1hWdC4sTHJmbtLgT7yyhsFmiklNr3QMveo48CYLPT8fhHxQAujKT8yQdR5zI196HCOKWtV177x8%3D; MSNRPSShare=1; MSPAuth=2v8N4M5iVGh6n1EZI9lZ!KN70sBF*itYnciUgFLH8IKWL1haeg!lQidAc1CXcB6kOpmsU4sABmVmM7Cz4QHevFHz!2mhPIopy7wGIfuptuOY9JwOzGilY!ZkhLdxcw0YnDfj1jbttgDkE$; MSPProf=2BHpu8P2QF4Wb37CLGwsna1o5RYqucIjUshteQ4bxUwoFJG20PzaVzn8i!orZtw*rvEnUEtEo8IIcTHUrImRdwsvBMV!!M5RQxyemmNHNttM!lolRTG7IsodwpVbi2cqlRXSGKvgdtDFSlIiUtgkX058JwD2dS!IcTUvjmG1qcWpC2wX*jd1rv9Zhp3tRGJK0rP7zexHumNmT1X0ujJewryYeDiX!lx15A; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxSk4vLz7GBD1517G7IdE7gbnu78ZNXmwcTGN42pHCZHqIqe6fskwU9avksURVXQ6vQEWSZoLYYXg0hkGejErnu5gRj1bai8VzjBPjWOXIpFqacJ180%252bD%252bbsDil2r3TSIZm%252bNjhgvnCu2XcXfAx4cX5df9mcJb%252fuJ7SYXtoWZ5AZ1jvk3flynOqCxHKV1lPHJAjBuaNyOEJsxqL2pjtx4QGyrZkCZWhj3l%252foaLpAITNnMuX2s1pLF%252bDMGMCpStsz2QE2wpZe4mHqMUIIi6tSzDE%253d; InsiderGroups=a78287f79f56ddc1-insider; MS0=d962d13f3412406186ca2de0a6c77183; MS-CV=JZSZHkcMIkSJVvvs.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}