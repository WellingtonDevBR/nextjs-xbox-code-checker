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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1623517970883', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; _CT_RS_=Recording; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; NAP=V=1.9&E=1933&C=OuEM5g5IwTnl-t_g1tXYYNmRP2HYD8G4SD2YZzsc5m7pU6_IsW0avA&W=9; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18783%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1623438097%7C4%7CMCAAMB-1623438097%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1558211478%7CMCOPTOUT-1622840497s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18790%7CvVersion%7C4.4.0; aamoptsegs=aam%3D12322074%2Caam%3D12321301; aam_uuid=11062451314358537881498287062699608140; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1657020573|session#2a626fd8b9b7402da91fc072f000ddef#1622835158; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.4.1622833876.1622833299.1613561419.1656238930741.None.1; __CT_Data=gpv=8&ckp=tld&dm=microsoft.com&apv_1067_www32=6&cpv_1067_www32=6&rpv_1067_www32=6&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1990&W=1; NAP=V=1.9&E=1936&C=tlvNYWjS5WqXSb09GvNIWFKUssHbNnjMot7p_J2fbWQ3tXaYc-USMA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1990&W=1; MSNRPSShare=1; market=US; fptctx2=H3ihr9e92IdW6yd1ZgQ9S5rgl8oOzJXlGHKxtZ4bVKpeolzCeDwap1E5ZBsXpiihnWNxAU7AAjU%252feNgv4f5L%252fEgaY2A0rzuhMJN7BFohAaFmbj4yidtZdCarZA12NtkZLVBAZi0ZJDK%252bnW9e1e9XVogD2zHIiGNHWMAyU%252btQlJpl%252fLFB3xA6jJGg6zw3BMQOiWQuZ1Uxu61jJ07tfFbQ4F26jUVsinL9j4eDmj2C6LLTQzUEE83A53%252buF8lxBn7%252fB6Ef9eU9BBkDu%252bH5TgQBH4%252bBVUQfS7H6x45NMNH5rrs%253d; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACKvc9RPNflLIWAfbF/dy8qaHO9q2w7GMPc3qNlSdwn0jehxQmYrd1MZWvcocR/8jGP63umlDPQzz1iaoZ12G3inhUufxZ%2BLdpU6Q9gsRqQUXoUrhfoaLZbueGC2fBIFHnW6%2Bt1qp%2BxERmqAaVcd4nS%2BIeizyaoS8pYL5LV/Dld0n9QOUnfwBUkMZtiURVmxLwtvXzq58jzzLlM53xvoivcIFVjHOqNaQykugfQQok6KfyOK%2B/sZmv/wbFTzKRY0jr/4f8/yCLON%2B4CqsHi7SC0F/7u433TF7jRsizHCbkVHXf7f3BZE2DZgy0diNtY6L6pf9DOmE9XUrNV3Cz3riJZM8uEqtJvyi76BXLMyGkcDybi4MvEiVsOuxJOxhhazIYYhBmtNKD1oZlahmrjzvuEPQA2EWSHfbPy%2Bf565ep2SxQiqXZw4jG5FisYeQK2eam2A4ZiNmwwMCI9p6Oowm/eKsSMQ9Y62er6SEMv0aujFDc%2BqqUqKu6BDCzx47T4BkHuQVlbq7Bk7lEnPgb1x/TyCiCU5LRK3IbKjzyajPxyBWvIuWL1MuBLwilyTmA8Y%2Bw2mdbSd200qRIvMYUkCea0PDZ5WefkI4/56FbobtGxc60y/YeP/Kr11bHMFJpJPlTw/hc3U2YFzo30OTJ2Is%2B1i%2BYO0GD5qzZ6y5bYEb4el7w6DwU4WnXFyRvp9dCggwRtzYP5yB2lHmc5BSV%2B8ayqorL6v%2BhzgCB/r77jRXbqR1egk/JIg2k6UaYjZGDhqLhMZnG86aEHIm2yPggiKYjf%2BMgBXa9gMyN3G9ktA0HbINuvQwU%2Bh/3L26i3H6jpGHsU%2Blae0zhnkjabSMsjY3%2BklgsV2xx8MinidePP62TVmerGBqgMPrM7u4wYPs%2BUlsUIQfZXR0RyaeL28HtQlm3tvkJeZcSsCsAAnYQLaePXe0sJw3nyB0nnAk4CMBp3WNscekAMobifuKAZBI%2Bl%2BYRx1g0b/LfXEVs1h1r2WlfKIkRHmK6qEnB5MeZi7JnJSBerY90YdEzxrNzy2HKqwQcMh2%2BI%2BV8wo0wKaA72JZ9WgbpN5pf0lk6RJeaz9m1o6itSQ32pnqzT7LRS%2B6lXt5MRJS0AisF7SVVO1SiLGZfrEkLNg/jHL%2BcPglAoaf0rmLaGQcPsRmVwgIe3kU00fCbjnMKgTG7vjeiAlqtfeEM5Be6L/P%2BCgysXRRh94M4zMMVkIf2YZtwf1tF42tpt9OhbvKB1ALVW9xh1GYFhrTGnAmcCf%2BIadGw%2BAUaPnvShI3rbYLKKKoze0kdXtzxr7oBnkcHc/2GvtDZZT8BGAlG6Pto2ZOMsNyUMCC8UDtRePKoFgjiYDXq80Eh9wLO3MUW2ajm6KiTWqkqQZHzIfheAD3k6Jl2MwHaxPOTgMOderY%2ByNDz5KZL9X/qa2qvlaE%2BWdE0yaVz58olzwW%2B80t1fbFFfm/0ndFby5vNhA470fAF3vQ81vaGqxnqa8gQJQZKsEBdi4iR%2Br32xGmpLw6xKQ1z/86aOrJdkaAg/dhDm3RCGora5dER3h6Vkgw1eVU/wbhVt3XE6pw0ohkyQRihjvY1XX2N1SUvyyQUsTEp/IW%2Bf4nPsoO/FUfN1DmaIxOiaQCJAk2QAvyrGvn%2BowoaC1tYFFeVJfkqscxwYnvxV9yQYIcRKG1eSFPI4HhKd8ZqesIi7yzO58ayFLeZqUh2IRnn0q24za7AYqtKW5PsUVqveF7FSQuq6uy8fs1LJgeMVSOXz9QRPZkyH1/dRmiXtfRo%2BNNCdm3L8TkRDv4kk1vsnTHGkkuXKdT1A7GiJv7ywhaibR6BpVbPu7/GGRpBBa/PrcWyUE2TGi41tWp412g0s%2Bq%2BbSNmVPzn/WyGJaPZ3SzXh/9Gruu/VV668M7JzsHvDawKOZQFuZS6frDvlpd8yKnnwVq7tyUalGWmP1LmpzWfdCZYgCgCQOCkTyvReLnvKFOxjvXIoLHf%2BLazEajR5oTfbtzvsIW6NIRTGRlAAzMjhNDEItbmWhoRq0xfKSpo1gkVx6dmsAhwVAIzQEakj4ApoW5sW%2B10N58GeJYoss6kdIj%2B1oWajN9V0q%2B2ZOHxdtCjH8oVL%2B8W%2B%2BfCmz4MXovPpkgbmSzahTnGhoxKjjn8Uh1eiqODL2Xhmj9pP4BUR1CL6Sg8KqRgkdn4gNIlN19pMf30owGtPzRRiY8K6hayLk9P8XsFNMVkmsvuQYdcUnvxlkcnYd%2Bt8fc6eJbq7OuOL3zrZ1KStpbNSX5kiTSprGYZElpOc9a5yoCrevs99fabikHpvLFIEXROFluGNbkJWi70KkFjDRUFQt4N1ck9%2BE0NHOHBGTJHscK1b3B50CulMw04h83TboxcbeB907KnsXvLwgkAuMr%2BcTKXSWsxWhY6uiqJ534jZZQHQSrwJXHsFEwXH3o0Cv4YWl210%2BoIcPGSiEOLfWzfHhwv2jNjQSLPbYdi332Q9klOBW8rv0%2BxVB5N87u6ooX2Jy0pRMlrQS8IUKMZpLeulzrPSWQLxQAZu/RM3DSLLpEzdq/6JkY%2BsOv8lA%3D; MSPAuth=2vkIcvue*Gi638rO!cxZDwJnxautbsKYxXPzo0RWuE3z7Z4OtUK4Hnj6oDNV9Jw71sjD8uG9HOYib0!nekMVZdVw!iRpbgV*iLi7TDHn!uCV30mbMbj*H5*959dnSjju0OTM*KMTGXLWc$; MSPProf=2pLcQPG5FFH*txQTbMNRBvNnb6JCXW3vLsgKEmvYGRsMyNMdamr1LyPWK9VK1aaKAha6YyxoUV6OBzm1RSPBF6unBhj5NBWn4GszZsQslin9*eCUCvwWPPOGfdnSA7jIiXY6*Fx6bzGHtUVz35bevdD6I5kCb1O7VzhUVj8xZuRMFJIAe39628oNZWbhoA70jdjEsasxnOCUxHEKz0nw9a4mGM!pVeRPNF; ASP.NET_SessionId=npsnfwaeizlif242oadz2vjo; InsiderGroups=a78287f79f56ddc1-insider; MS0=de507cfe300043f3afa5f3872b4e8381; MS-CV=ZWzqHzNGrkmYWGBY.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}