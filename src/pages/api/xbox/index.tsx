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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1623069882725', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; _CT_RS_=Recording; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; NAP=V=1.9&E=1933&C=OuEM5g5IwTnl-t_g1tXYYNmRP2HYD8G4SD2YZzsc5m7pU6_IsW0avA&W=9; at_check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18783%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1623438097%7C4%7CMCAAMB-1623438097%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1558211478%7CMCOPTOUT-1622840497s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18790%7CvVersion%7C4.4.0; aamoptsegs=aam%3D12322074%2Caam%3D12321301; aam_uuid=11062451314358537881498287062699608140; _cs_cvars=%7B%221%22%3A%5B%22signedInStatus%22%2C%22false%22%5D%7D; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1657020573|session#2a626fd8b9b7402da91fc072f000ddef#1622835158; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.4.1622833876.1622833299.1613561419.1656238930741.None.1; __CT_Data=gpv=8&ckp=tld&dm=microsoft.com&apv_1067_www32=6&cpv_1067_www32=6&rpv_1067_www32=6&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; MSNRPSShare=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1990&W=1; NAP=V=1.9&E=1936&C=tlvNYWjS5WqXSb09GvNIWFKUssHbNnjMot7p_J2fbWQ3tXaYc-USMA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1990&W=1; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACGbXo7TknPrCWAfc6OxpK%2B8fTUcbDNG7EkjR3i7G%2B0Ml%2BbObOiTL7QD4UXqA96VHbgRWWtMKfWZR4sxm2%2BiNbpPJBxCyYXHzhgPT%2BpSvGBHj4z/4w7YK7iF%2BYtsRbPYijBr6GzLRQguS6cQxdeZE1kVJD9SLbRNE9QR/Ganv3pR%2BEvG7kxwb6k6F8ZXR5hPW%2Bn/YgvKK3awhTxGgqjJk4FceZFpvhBOk8r4JaILbRVA3toARHliwPgOpBxIJHNtL7uKm4%2Bu8lJNX60uLrDHpIWs00UvsTC1gwJb%2BmLjw2HjwLO9CgUAkLwXRR/et5Pl/Nwb/bbQJ66qazeVcSoi8kjMmKGKUcfHwR51LcBrnBYEIpa2sD/s6mKShGOYZgGF8vSGMIpFRNm5VGZpjd0oVZCQ7mcVU1eHlutyeohWBi/kcjqCFKP0D%2BdDCPh%2BilpRad3v0x8o9sHe0jdIa14bxu2zE1Mco0QQZxNriAFtg2egEPfDEy1ADFJAiayxT5aQanYDi/RIizDrtCmmz5e7kyORsKg6SFs2ioMEPM87C9DoWV3%2BzfxR3EOlBryy3a4O32zP0GV9bLTFSP9XVoN%2BFOQ3UERN0A8qOuh4/QaFKPX%2BeERZt7Z2lpN79dm8ooYOctDsW6kgTOCaanUki6zExngUgtnd53rkr5dzzm1HL2Tc04IF7VpSHnCbP2wOkZiczRpWUWLkuRcz70mmUQCdVLYy6rvZYchJSH0V4o9Agvpey0tfQpCAKz2nN1yYgtJbX5AbXHG9IkJwPzJjgTH4By49yDLqA45d/JPrANe/iLo5QV2nCxnorsFQKrBctDWPbNIU3i71eT6Qd/k8pAL4qQ3y97i6gcXOzSPg6A0MJO7cfE6j3Pl6rzoKuBjB5JQm/537kXEKDdhb/kUoxBBlmyMZufd9AjBny290STQfwlA66GtEJRuFIxKJEsSv8VQcqObrTZeLDBH5sv9AZC0uWSy9/WIYZoItfjvjPKDXLXke56e8No3ifpiHWkxd6w2DKkG2BVvZq8urmpDhYiKN7u2VjkgxWaaMsrBhotMCz8aXxmejlxuZXDnQ73u1C/h22vprqnZoxrKEzdbiKIWqixh8BiXF7jM2hM3QOzK4kYNXCcJ05KSBJV9QjNKJRh46TPOSVHaxrg0DhZla1uDraX6vr5LUGEDSyZb1cjXPV%2Bymbd7rvvarUlrxcfITAlZKIlbHeW7kcAuT4vU5/G3vjrZwEIuCYhesL4/cnBCAkFsPqht%2B52ipuXKmao0xOjqgOgtaD37FEo7JmCFStwgbGsPm6TctQueoNPEU0eReDywLoAStVG94sBjmal2qPQXAqYaTOeHfnAHiTut49F/TT/yBRMFp6aFhuBwVh/1Qy9dTfsJ4rtot%2BksWCsaiSe1R2GHpRsnTQomcab8VAK127F37eqtDwzgwG3AnEb26vLHzUdSj053MVnKkDnWoq0MIyyTD0waOkQ4KL67iTKS6qSPkQ/uVGteJgsLiWA8Km0b44RyZupjUz0Ppx/fSsvvXlfor4vm5XOZYCdEaXfAhvepY9rvVsLdPtjnkMGnLCPpg/Fc3Cd0cvvwiVgjJ3jYce1VN1X7bG/xwk1gh/0AowMEfA%2B4HLgmLAMjxqoyq2SFHqyqx5mK5RPXD32sRRR8HFSwotDTh7HgXKgWtoSKm3TkEs1zvYkGR97YAxMy6R6psYEPjKIm4ae/qHG6/EShI33CDAVTDm%2BiekUpZE1Fn/vGMsmKImLFUEO9gqU8kbqDq0g2KJwNsC9L1JU46HCtzW14l%2Bq5j8i5xK1zEX%2Bz1w15Mm/MaAsO9J/ZU9vuJZZ0fzv5kvb1N9C6v6aLUWfhfepg4msXITjtG1YMajdeduuYCtU%2BJSg6lyXQ6RF3KH3oGV9gI0PvRoUck1Uxh9bEdKZJN%2B4uzLNvXplxgHbK87LRZlquLOA8ygon6dlktbBhfEReWixW/cbeHFnS4fmjtzTbhg11zTGEKOezqbhYtJiMQ0YmHVRF%2B1uufOTVKhhbgH11KnLY/byPjfcXJsEFQui2V0uKdX0rS6Fyd64BiLk8zGo6VZbNu5lKvH/vgqKbZPI%2BMHd16tllUfznD4Hzv%2BoIGKV3ouZuAJTeraihUhuImHDDbwBZ7MQThBmY%2BG3FHoNrHgGlC1HRaGBmZhNNntqA6clzqiQAOmvVVqNuyRw7ycLEOeHbp5c2VIPk3x0CcUbgVbSTj68nqV0s36V0gVU6hwd%2BitBbUL88UxO1SmeQZxZCazYbhoHbyJL5zQHAGpMPxE2A/GQKDkAVOXsM4VfRlFuADp2Hln1qAlr%2BVEG5jTuUPtm8L5fwnqb4N01lBGU1SxmzvR9NN%2BpGxKOpNjlTVY79Yxz%2Bvishrb7n4m6qFNpKHqY0W3UrN3Qshoqz5YsILkzSQDwio4h7cQntYgBUWSPl3uDvlsAKY6MvdVEH6VcpnRFh8jgylIfPGyB1VidjqN4NnrcZRBSTkr1f8sRUl8hclGNlvvmM/TxTOoY/AgCRQAlPlAuAiEyZAfa5fg2UBAfX5/lPg%3D; MSPAuth=2H2MLtFFAG0zv8!HpgQpW!sGPkz51ifgW*CvcMJCrruftZs*r*fm80OljB0vic9n5EPSb4OKgzGBjKxX3ynF*NUXGPYjBmUbKfPEeZ*EQaYlkYqZg2MT5QRzZIwAy76LszlUw36jeZmXE$; MSPProf=20Fr*J!q7FTOyHiozuxQPjwOBrU*aT1N6DQFSMuSNwRwBTbwSOKswPxRjotxeRegpA9UuT!BtBSDLDpYAocX3wY2jHGQpz0OBBV6emZSLMo8Xv000ggHeqUVr8IzBzx4oITkj!eC6JQsUca2JAC4W0IGg*lu98Llhvc9dhKh5Vn*wmNDNuCsWlzsGoXk7VvZ69ho!nUkIBl!xym4rHihHOmt060O0zEGqV; ASP.NET_SessionId=gvzp4rogiwcwmcyhkwvqt2zn; InsiderGroups=a78287f79f56ddc1-insider; fptctx2=H3ihr9e92IdW6yd1ZgQ9S1THFw%252fCA4%252b39Yv4fT4Lf4DELcegzl2GxFULfl2CxTx79j8UVMAyBQJNcB2uCwU4HmwSbRnsJs0WvuxxglTRxhCT8iRIZ0h6AIA7Tz2lT5auPgIy%252frVyzQcHsuVJnZiXhuegi2DizN918oVAakKUcU43R0YxATUM6l%252fXB7QMer%252f0rsm2lKIqoiPvcnkfVaI9JLZrQ8EWwZRRxV5zHUEJ%252bnd5Jez%252f0pFFuy9jXMsIrYlYvJipki5gp5%252bEsyTTiCtn67FznczmEs62sjLE5YpZy6A%253d; MS0=00d02685bbe04b9a98c223373cae4862; MS-CV=UZIANbmhiEKiwXZ3.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}