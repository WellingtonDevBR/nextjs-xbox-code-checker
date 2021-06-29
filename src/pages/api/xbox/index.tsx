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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=2747c49045b247bc&xhr=true&X-Requested-With=XMLHttpRequest&_=1624990682521', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam%3D12322074%2Caam%3D12321301; aam_uuid=11062451314358537881498287062699608140; _CT_RS_=Recording; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.14.1624345090.1624345079.1613561419.1656238930741.None.1; __CT_Data=gpv=33&ckp=tld&dm=microsoft.com&apv_1067_www32=31&cpv_1067_www32=31&rpv_1067_www32=31&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19a3&W=1; NAP=V=1.9&E=1949&C=yrKQqffXFyFP_k_xf6JBdWpCCuUWdeukNxquY2OV7aPCflBsyidOCA&W=1; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18804%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1625189220%7C4%7CMCAAMB-1625189220%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1558211478%7CMCOPTOUT-1624591620s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18807%7CvVersion%7C4.4.0; _fbp=fb.1.1624584421901.1136163943; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1658771292|session#6a8855b1c18a4cdaa63e6d8897350588#1624586280; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACEgfC37%2BoU7qWAdbh9OIuugmX7c6/ZcUcoqtD25VCiLqD7bNlIvw5VidwkQikmJ4EfzWGSJACs4zAY8TGCHx2g3/1H21i6uMq49fkQlfsXZAWsCPktDg%2BcYcBdwQMSV78YJrSKjcgDoKC47BVhp3bm08j6N64tJdlv%2BBNatEhGxSQ0h2glP2Mu68OucYKZt5N2X2e5n8M3RdiaAJgKHWmYOdVxXC0vVnGGz%2BHrBZBLu2hTxPfuxiX2iMrSHIFyTvasHJw7q4jBWhyqB%2BVr6h2uBCjN87OfJ2RzqQNunEtmG/6cX2vVHJb6iykcr8cLBnYFGWmlq/a7%2BKe3BNipx%2BJCzwmbsxqXHOoQsolFXk01FzsmFSmrVfXvWtRK4GdJSIrwFWvDo9jQ4N4Wl6cmoDWkjhCryPxeUSCkkPBB6czmkmx9VIrM3U5weQxBlhevW8KxIyx0otedmGwTOcCeAoynZN9gkMt6f5roRNyIZpekuG3qtzrbTpb50/G7H/Cb762Slnft1W0pszJig2cxdCcZe46r46O2s3FmHj6BslPe4ci%2Bnrts/yE3VOGdH2MvXVFqDb5bBznbQpSa5RatMJdkPkEayjQzs5ZvC1U6PM0Uu8OMTZ4%2BUCElgW4PYPJLMn6iS4NHLXRxFMOASY1e7gSyPmMKmQK6s6VGiH7rlR2vscAMuIs/LyBY9R9uQ6QxjvJ0VvVn1n5Q08vfVrq0cNeY/cIChfIUFgVPXWjF9Cua8ZTksL7%2Buw%2BoBIIdna01HopeJRSn2GDuqWZzqNXOMX71C2Me9nohgtEgxHHaXvmZFygGF%2Bz1XD%2Bl8U192jJqwZZ1CRnVBL91OL2v0oQfNqE93E647%2BRuKI%2BgsSCximraZSdWA/K77MCHRwUOJBa%2BCwH5sbjHDBSUGGp5P7md8kLiTUsHrwC/mMR5oWArpqYvidpTWquaIT8zgS4CdBdQiN1szijiSWjawVvKiAIF6pPXI6BZKaaYW/6lEbnGHcdFG3OwYnUmcbjPn3G7F6KEtIOzHBu91jkMfFQK8Osg17enNZlHpW1/%2BXA7zF8iCf0Fv98qU/%2BAv7GdkN%2Bf1E89//tO4FviORd6uaQ/c8GaaT%2BBXSgwlVHbFwyPiNeQKZGv6k8J9uDliN3NY1pJ9gwrYwEC0f2U0mJORKOAwzvB6lG5KSLJrbR7bNxXktJxOcAIc3aGBkwaxW1vXY7UW3fRuTj7ApcMeAYf5HkDz4bAH/Vkk0Bo56eOUzyl15FkZrbiff06rEHAt020lryXykfyin3oJ2ZXg0z0evlCWWhBWS1HMSo3JsgI79g2vSpgOJdQcdEm/hc5kHHXJ8LbaLE/qKpsAjubdrx9Wg45FvEMDeVmcHegQMm/m4dK1eFES%2BmfUwJI14jf3axYDgf/a4XC3XqW/u3cb9J6aoUSA6%2BoT3/1WNQgr9z8Jkkud2027i78F9I6nDbiY49hGZ4CKeQlI2dPtwtOuSOx1RJvvot5pvbkTGjahz0WKYmTRSOjb/rw9r3N0g4NVUZW9Q9KKnw%2BR6Fba3lrWFf6L3UhNeOkp8ao9h46gP6RaZHzjLDEmfL8cnimwFIiYB5QlDUk6QDwYpIJPzG3JWBXHrjcVGog2OPCorcIL13ZZUlqhlAIN8V/IVswDqzZahGJ/2Nk/ujJJYGVg/5V7XIHoK4yjSKjdmjGVnUoFYwBqLhfA/y83d2zys/oRi0N9e1Dhp/hE45SDp9v4sg7i7Q/7wLkIiv7/cY19T0z0B30nUsGoM7UOhkdND/b%2BdknbQnPGuZjHWcBjhU9SKwnXNL0hsE9gqlqYGDtmE%2BJqFgkcCWNuSvhWftQD3T8NzJVMOo5vdFuo7dR0viX8dFzto9KoI6N0ABxv/jzCOEJk6cqBJ42JpinW7kTmrf8wjuuYRT2wNBe22DX25Og0QvisJ57y2U2jKBn/29cbQ5r44f/8yfX0ehXskrQkOEbOgW1z38VTL2fdQ5XuhV3W4xLrOIpznOp4pwe8JyF8Mlcvw3h0aYF/h5HGDqGZ2zouxyjHRd9Cj7mAjDPeK8Pur%2BoUwnePTO/5rtLkGG52OV6p3%2BdNAqlOqtlnwhmaBZUB15rdqfn8ac%2BLazp4B1P469Z4WxTOJZozX3jPk9iNs7XniZh2/HTGYhYCqSMhoUiIcwZ%2B/M/VdgMu7nxhBPPfdtPEn%2BbvWyU0brVWwotzXOnU/4nLSKZ0ZUeecN/nqVqkIe6Buxq/B0Z05QqGgrWLfygM2xuTJLcAc5iBlFjlFg6158fIvfOVO5C78H18SlSXQR5TQA9w7CkwpM3VdlVFij7qQKlmibkOOwKDPYQnqZKvZeMdyVS8D0bGNS88wpp9AdhvkPJOb1hszXAysfcCsPOFzQW%2B7QUe4t6ahH9N/gGR78Rd/aYAF62DveSXwd9ly/vYWjHCXSUkPuWR1cTn6tD4cRVzzBwlaeqb4UeaSz%2B1SxikWY0pGxElrkGHCkdN1KX9YPjATzZPKLo7q8xphInybs04wVdFiISvoulf1pBQApAxQxegBUhhwlvXQozYUhtg9/aM%3D; MSNRPSShare=1; MSPAuth=2qfB0U3oXFwiYzi4*oF24I64HdPQKqUPV88nbJbsbgJI!jCf5DmQpWdqicACAG19MTKk97hDglEyIUmU*0TIvSqxoZpbdDw7lZZms3APBmEX1SmW7mmvw1ooNkOvmFBnHBxWMtfKDWldFdaxQdi1hZ8wfJmVWc!vMA; MSPProf=2GeQIDQRRHxFhrBZrPSfIVUCcgFo12GDJ7pxASju5NmrKGUXftZlJUpYT59My3vLaVNAn4fsdjT069gFTDjdqwFAyCpehKVEd8XsSXZeIolwKaKaz63NiIefZ*Zyj8yZPjHgEbuB*BbX3ODS*gGE4oghVY4BIFYKDpVlL0jYJS09GweFcragve3Q0MwgbVhY4ubm43f05T9YXDf5AbpfioAg$$; ANON=A=3547CB54ACF2832A5CCBAE8BFFFFFFFF&E=19a9&W=1; NAP=V=1.9&E=194f&C=JXNM-rUbr6YGkxMvZYwRMxpn-kKKXFTqomDkpQcSm9A_enTX-yrNQA&W=1; ASP.NET_SessionId=oatetdzgsac343y5t1reui15; InsiderGroups=2747c49045b247bc-; MS-CV=DSall09uJk29Y3Mp.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}