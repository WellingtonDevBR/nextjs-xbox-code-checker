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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=2747c49045b247bc&xhr=true&X-Requested-With=XMLHttpRequest&_=1628105866694', {
        headers: {
            Cookie: "MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9S6iHaRiejIdk0aIJJ5j7uH4XSaCNwGn7p7gQ4ZpAC0VMEegfeOT8DX9wg1cEp3l%2b9%2bZSf%2bKuqPt2tG7dSRavZ%2fu5lKOsU1148uHv9uYsARBVw5q%2fDzBNmWLbD6iB1bp0QoOp4YLoUFR49I1MEDlyFvq%2beIymSULrtTetf7Tn724mEpozHsMYMZgkV8Pz2qcyQ7RNAa99g9FEyjykDeeFjtE6guquuSJZIwkrKdLqhatBa8zGGkAgF5qE7FU1bwAsbK1jXOLOHMerouTjqlQoYJc%3d; at_check=true; AMCVS_EA76ADE95776D2EC7F000101@AdobeOrg=1; _cs_c=0; _CT_RS_=Recording; LPVID=EzMjJkODc2YTEyZGEzMTdh; _gid=GA1.2.175117795.1628030770; ANON=A=3547CB54ACF2832A5CCBAE8BFFFFFFFF&E=19cc&W=b; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; LPSID-60270350=XQJzutabTu2q2fxvaylAvA; aam_uuid=33068285850847972413634353341059332090; WRUID=3309642234806449; _cs_cvars={"1":["signedInStatus","false"]}; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.20.1628095877.1628091751.1613561419.1656238930741.None.1; __CT_Data=gpv=46&ckp=tld&dm=microsoft.com&apv_1067_www32=40&cpv_1067_www32=40&rpv_1067_www32=40&apv_1011_www32=3&cpv_1011_www32=3&rpv_1011_www32=3&apv_1009_www32=1&cpv_1009_www32=1&rpv_1009_www32=1; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18843|MCMID|32606165887524311583660282503796334325|MCAAMLH-1628700781|4|MCAAMB-1628700781|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|546802409|MCOPTOUT-1628103181s|NONE|MCAID|NONE|MCSYNCSOP|411-18850|vVersion|4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1662282680|session#09c44089cf8c40fb8352060e5c47a450#1628097715; me-ct=1; MSCOMRPSSecAuth=FADSBxSJK4YRnp0++4Mpqw4HWhSmhVMzgQNmAAAEgAAACB3WmBx8vMF7kAdTEvMaBpkRHR8U8MJlSSxDnN6uuA1bLrGTSQfdLcBwnfbeHzceImGJ9Z2pD3A7yk79cpGVduZFTBCuh6VSk559rbuOdl1WuU47zneZe3G6XnoOKgq9Cqw0XRktmPABSmekOyUqF1Lxa+0NiIsC+GdzgKcfY4Ovp1SrL9sXdKOaZ8jvcZoasT9+M9gV7Zukkg5pEHOj8lx4eSNq1XXce2pK1O34dzkp3lquC6j3AF5ewINtmZLmjiA3blyn2sPSMnfhXxZmORvgKjG+Rla9VCbUPViS4xpec3B+kl6GMrGONlKTH842yTiDxijdYUIrZYPl2YouuXxEAzZZJsZPDs5o25H+YH7oO93eQpKXLMJGfYR2YfEnE7eouhEX1uBKeJ6tzzjlcnWFvjGsPbQiSaWmXTldu2RcO9/C0YmnrvvSfIi0XQDpdwWMvpEN31Jop+YhuWIKuu6q3XQjC2cgOtwhhCMCe2WMDwb+0bd+Yoa0TCJ/jXGGfqk86O+5bptIlHwDAg/4kDjpausNOgPKJ8U8ulm1Kd/4L9Z3/Cjsn1cD1OwLUxwQQwKM+huFuCLDU/IxU+utwPbUsyLHQPpNNsND9yyyqIImlQttXUOBnDpi85r4h0oyFoG3kQQtmqPhmV00qNkToCdQyeES9dcUdhjBxMowcHpdcBWD2uRuBRauXVZuWJ0u+xiAJ4sV/QGoHnMtYY+l+w4j7U4MJlqC1DSBefACgIRCatqGJdzKoXTPZao9AkwXSDgUaSQ0g1/w3hIIO94j+0h1IOsJDp2mDLKnSerK/JpMB8BdHjOOBJcHge1DZX3wq29i10AMRkDJWUydlPkyEyaiYhAOBzqg82ZO5oF5BY9XKt1dPCe/Miptb6TWQS9miEdoOeWPg3mOgv1t9Sz5/rRAIFHD6DgwiWlnZ50sSTW0I6cJhboa2yyjQ3a/QnLk+aXGbM9bGidzllKA6/x2C+uxXCIngP3KHFvQfqLkqIQHdUefxjqGq7TQhzSvK5xZNLSKZFlBdDi2ZfocYxhu0CsHXhoisOjnCQJBD02G4ceJnZ9H2GB4EVhl5gTukJ5Eah29Yu7YY3b55UKJd5GPituvjVtsyyOQaclz/kjBMJVlAFTr07OPgA1aaktgombAd9EficQtxafP6rh0V+iostnu4zM0Y+tpfCeiavGJ9Ylw0ntGs0tqB9amYBs0ZY8PGgwK+YDTE8DvhQWK/0CK56oCbrU16kigwsdOFiSwO11vHRn+mnfLFWdK9xHhOrbIrGYARoc4U3BaqwXYbEIRcbUkbqtn6l3LuDvihusgFSo+RCiJCWYLKQAjqZGcqOiPxfSFQTslKqtl+KrFiu3AotKaK5Oh3t6wks16/XSQTdFNDeLyDt0hiuf3uLUTcO8awNSc7YzzM4fHJtBkte9yrwn/g846aKVZPBWiJNz+i81PKbNR2XFnZjeZOCQkaK6BO8N/0/HMgSMQnI3YiDFzzUNb0CtcnnV8gfq46+Rne0G2azCrpd73KZcxYm3V4msSrybh+BZLKeuqscsjjuX3KJJs9HUB85/C9iNAWWEGEClrDeo4OJ+V2u4W0+XBo4YEnenModDBhg5V9Y7zRk/7bvCQUYrNTasPjy7XJeR4Pczfl6n4E1/0joSrtmG5u1qOrYT5TrUuTV4tmA2JSuD4R8UUfjEFllB2+6vY3vkQnjkSsLWf8Yc1k8/uSDDqpPQBfGPtEknMvPXXeTO8v/YIddrX8saMzmi/vSEptsLeeYiFTxWktjTDO6K5jBlrQ5ysrLmYcX5m2WxlJrqyEOZG7OnIHzt7a4/fJIT1bpUj5paHB5ZZkXdHtb5Y0BPKjZ/npZoa54n/XWDYDN6F8IpY4AjL/98gWr5nt0r5osqu1ZfXP7ipnI+obnqghoKWyeL0p+jPQ8MPbkFdkL2nUtG0aDnrlnI6CG3wz2C3kFbA4IVr0f06dbZ3uQNaApN+ZXV/S2OZZ5YXXoObXOn9oTnEd6btoW/sN4ExiBpUoDBVgGj2FJliBI4uOnxbuSOlRCISG7yUNTfFgTx/+R6crelEUaqz/DR1Ohg0WVHo5+hCZf+wmo3UGAhoXuzWM24XQFqBUSZmHkQQNA1DNoU6XIs5dV1/gmSkf4tiwcEGgKy4s5eu5CreedRXQTQUcAKsMMvMKmxNMkwdRsowNVQqMBkbiPl7eTJXPwogkkShYX74DJYQLDy5DHX+BtXygHQLb7HIuapAjcChDvPnaT9rxe0vshLYSplmdzQSKPr3KUhpSfboTYYN2Yp5bAmws9GRxEDX1YNzmoSK3twtAI3GqF/TRfXRAx67TVk4xqP6mVV/lsQkukKwvKweOyfJ7d0bIp8C5gdM8tj+VtGnUoDk/1DsSsK+bsv/X3MxgZDdzDVbMN4VN3ZkjrQgPHAq4XQTilklkNBCqAyKakVN0LCjiZfVMUUwoJl2WPBGVdf+JZAAPLDB/sQiZ9/NKm99Nv9v8t8cw+DJRFGb0JkdU6zJMhjZM5wfbxsYdZ/1SNLybPekPTA6IBS3LjmmCvuwL7bBgMnhHV3JRJCxAIqJs5gBEfpAyfaTO8x5x+KSJT9eFABscqduFXmH/YNEdrFMpvOgYfEO7Q==; MSPAuth=2KIJ!S*VoFr9ovXHXZlpvdz0Bj80GXLkOiqXWPex7m8ZsoMKvuzz3QvSiM9lqP5VeIdbY!a1v4zFhwMNDR2*7WvLkwVLuIMZZeBFgPcd0PlfFXLnD6oAIRIPY2gS6LOBFGWhB8suWUTYBOpfoxcPgs906zyPg9*Zo0; MSPProf=2vOTymzL3F0z2OZQm0WVBTbmwStmxEn5z8JOLkgBf*wa2qpXnA9RoMtPLlSewNTDzl0nETgWyVWlJs!PgAXbUlG*5iYa1RazKGxFvAG8pbOMbNKH1udHPpK5vdioelPckHbV72U1l8HQt7*oqCZCt0srzB*QMwoCbwqMS*japKBLZ09HAwOo1Vj26edVZ81YoCbHyNCMqqEiqnaeijxMsWSDjr1ruBuqPOLe1csj1COSrEDxPxuAZQAA$$; ANON=A=3547CB54ACF2832A5CCBAE8BFFFFFFFF&E=19cc&W=b; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; ASP.NET_SessionId=jjc2lsoqjeids4sc3u3yc1ic; InsiderGroups=2747c49045b247bc-; MS0=9cc6a1132e2249f1b81536748888f97b; MS-CV=d08eVAsS+k+j2vOX.3.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}