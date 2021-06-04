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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1622841896049', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; _CT_RS_=Recording; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=198d&W=10; NAP=V=1.9&E=1933&C=OuEM5g5IwTnl-t_g1tXYYNmRP2HYD8G4SD2YZzsc5m7pU6_IsW0avA&W=9; _gid=GA1.2.1549271822.1622786245; at_check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18783%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1623438097%7C4%7CMCAAMB-1623438097%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1558211478%7CMCOPTOUT-1622840497s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18790%7CvVersion%7C4.4.0; aamoptsegs=aam%3D12322074%2Caam%3D12321301; aam_uuid=11062451314358537881498287062699608140; _cs_cvars=%7B%221%22%3A%5B%22signedInStatus%22%2C%22false%22%5D%7D; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1657020573|session#2a626fd8b9b7402da91fc072f000ddef#1622835158; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.4.1622833876.1622833299.1613561419.1656238930741.None.1; __CT_Data=gpv=8&ckp=tld&dm=microsoft.com&apv_1067_www32=6&cpv_1067_www32=6&rpv_1067_www32=6&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACJXSnl31qJTMWAcCVwjX6PSjykub3JNMbO4J0einkmRDaHMCPS/pjLSnQcUd0bqWWo8jsrjXI11/dLfB7Q5lvD8zv5%2BRdNCckyRWEnPUvlwLbhDTmiiM8xZioR2VDHsNfyLGfZJKqoAf1zTUvribKO20/xaE7XpY/zvg7Kt8fPGTv%2BFry750N1eYHBeyqoVxtVVMyJacrnhfEStaD7NBfnrX5IP0SuWEsfi09x%2B8sICu6/Un1wAceAQjkPq%2BO1P4iDOD5uc0mXnlCrMd8KmWC2EGPZeqPHGvYN6s3fyDkBXWFfGfdWQwkOsF9iPhu0sa4WknztmONUshpFAQsYKpkaU1BL0xPARt6QnKyIwe1HLJ1tk6gqFDqDiN1bqWdiNsO5wzOqVWvbV%2BeSB80CB0f/HJ8WBoC0lEYjSNcihASzf6Xfuoo8fGK5dEzQz8/zEPvkRm/CuUJYG%2Bx/yD63dHt6uZmibiS3OPxkyozDqqbHbXM/M8hJhts8R2HtDErxmQX1s73wre3LuoBFW3LF%2BEsIimULDf4aqOGxGNEzWIK6FBYPQB%2BtS7EqZLxeSG4gIP3jSjIOGsDMu50VeWRcsmd5l7NQIeVS0eJxFsuO6FJ4dP6w9gujBP/r3c7ZtDrp6LZ8usUdqfmyQ5FEFAPdnS5y1UenStrapdOI%2BdYsgmnhcX1jXKhHCxRTJQb3fP8BUxQyg/COrqVB9ahyy4iob07%2BYsGNqtSezFFSlLWU0IVx3CwWlg3faK1eRvz7UWxdR8OPvaxSwaHS52MEaZ1Xzpcn%2BhbmeyVMdQUikE7u5FencvcwA8M69M0L2ovpzeZQUs9zh7faiuE67FzuV0bi7a19sGYxztvq8Dr8q9Vinl6LrVrxIyAdaTXJvOl3T5yVeCzaoUzf5Q15X%2BVRCiuLCWfhyZzcZqOfsLd8fsOYd6cNGCPy802eV20KJbvl3AM0OqIZJC5utMPDAmIMrbL4cJoPZ2GgBDGOUBi9Clj8mHDwWeefWKSXds4uD8l9FKeR31yplhiEycvD17W5qHuM8T1oxGI/29ejYQZuuC8c6pmr7zpcmFHQdPpcv2DwNmTzwoKYA%2B1wZT3PuiijLlhVgLmzINrP0kMstYGpGqroMzmCrSayZMeVS0ep/z6H14x7e4TQsXiFzGLvr6E4pmNbKGEYV8Qi2Z6pCckj/QrhCelX85MrTuiIiPUDlooXyZZA/KW2WnVeX6l3lcOsRIn573j9Iuzt2asjNxXUkxD7gAdkQYaQ1lLyvN6uOrhOw5FNScALK9814N20X7EqIor8cOlbfKSt77UCmBVm219SIhd3TFC3E9odrnijbTVQRVoYMmDKQZNQ2%2BV3/GfcrDO%2BlVfo46j21qgYSS/b9EMmiMg8ZyiFa/8svfCFjgJC7ddAYdaTz060Lzg5ZbQhHsBxgxYiE33faGZ65L38oraRWTbIx7t69MUI/PtxAYdMdAKaOm4EC31dtDe60tZYHMu5%2Brwj70rJW23JuyhKt3OWEwVmwIcsEoebU15ipmOA%2BGjbB06o6Zt5Y10s0TxmeBFLTnaTf7/CQsYCb/wtbY84V2CJj9bzlj%2BM6vTAK3k7JWbs5AhZ2LqDqdeIt8dQ/SaRiQmbLkco7Xz7b/nw%2BohCIpOux3pzYXzI%2B36LWqVz4DdGWDwAiovrPxhREOBeMZevYsqICBK7xsCeD9Sr7GRRNsz/YNcIAHEZ5qb73jtHhmuHyPj%2BiQJErLo/xTziVYTiJTjaLauuF9ds3mmbOEmg3U/q4vWA0RRWrNf8yBBSgu5ZAYkDDNLtd0bjnBLG2XEI8TZFvFcKz/pRDsLlASbbJbmhmYa0dMCx36MVSS6%2BWExXUm5pBWRc9XeUB8pKky78k03NrOo5EWk5o02FSMxON%2BC0hSr/qvU8G4ohK82PNxCQmRMW2ehLFOKhWE/0ZhfvXgBuMiFqBg%2BG7nyo/4/7/KWlr3pjjtiLCFFg1YR60fj2VPMi7EQFXC%2BJ5Hd4JHVQo8BqtaiNieJ7Sp6Cfeav0BrwGPr6D%2B/%2BkDAMwKXNO4Zvb3Y7ZnsHVyCtapIqYpEgR%2BtPD6Q%2BqPHmgMl3/DOCC%2B9UW2tqwGFw8076QKFTBEl0kxm7ixls6sL9bqYRKMRgsGM1/fI09fEvRWCcZfqq%2ByKakZuC4KxmKVoS4eaEQBgHUxv5DB1EgN4SZUDdKb8zECk0F7S%2BCFu1JaJMmw0rf1HabU4IGy8w1l5u3XkrcXYVBcMBPDs7HuJfXWjt0uJT213PWqJyy99T%2B2rbGarLlq0ieljQUUhW58VLM4bBN4llVIwS7A59ArzVwmTaS6628YT%2BxA4HN6pCXKMNNfolnGu1Nun5oVr3MDEmVWYXQO/EeHLrSL5h2caiYK2paAmBp4sxf%2BQQHvxsXw8C3Xsz4SatOOnbL6864rSpj66y81VWTDRUuucZn8SAc93kzLatP%2BDuficAw%2Bld6Tb0dOPB7cfMhPVIXvenjzGd5%2BC%2BQUGGVPRo6d0tygLMXWoXFnS9aAwGD%2BTRQAx5oVkwk5ha5warKtUbHvPmRUW1U%3D; MSNRPSShare=1; MSPAuth=2wiysWrb9GL6kEIGtcatsFNW7QkCSKG!NCArI5THYJ24lUoVW!v5u*Q5Hapa1vFoXzMyQuS5Xb1Iuup6kPaGhs2h!zKpCRaMPROdOPtNiVc5Iw!!ArKcZdoAQb5s9mVgR9zvHnyhs5cN0$; MSPProf=2aIVhhoOgFHiL8KVaCgWBo4!V!CaxYbwbr5WRIHq1etUXWMOMQV!AJD8WMqwAdp6sQbu3UJUSnNuD7WM0bvsz8M!KGiKBxvoyzUITHZEzCxWeWp8GRCZLjTKsC0rImqgcKXJ765zgKqCxwrK5op8J2YOTCWWEEpnwjGIZy5EuJzKPC9h4ZA8e8Kpnm2cqAOCc6hZ7ui9IDqaM8kclsqUqsKakrp90PVEJP; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1990&W=1; NAP=V=1.9&E=1936&C=tlvNYWjS5WqXSb09GvNIWFKUssHbNnjMot7p_J2fbWQ3tXaYc-USMA&W=1; ASP.NET_SessionId=4r1n2a1vyp00qlygqx5vlin2; InsiderGroups=a78287f79f56ddc1-insider; MS0=2e1db497e2a049c785f1c829bc844487; MS-CV=U1LOhBY0iE+cZSmX.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}