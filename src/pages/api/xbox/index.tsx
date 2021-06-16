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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1623853068370', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; _CT_RS_=Recording; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam%3D12322074%2Caam%3D12321301; aam_uuid=11062451314358537881498287062699608140; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9S5rgl8oOzJXlGHKxtZ4bVKrnCEhahk3B35wzI6et6yURNjZD8zIhawFkq2SxcFMqsoyXNr%252b%252fQxYxWZoPSvr0j4XPh1Y3LMIDW919WHEfn95AYoMrIUHiSWuOdGkQ1jM7prmO91Nig7D7KjShJgjeVSiyovlCfKsbrQEFZFpwNgZ3wbF1EM5W%252bqMtVojtlICVArdN%252b743IJIAmvOZLjoW94Hd9k%252fzK1X6GPBvbUdSZTj4CfVyQSFGQR7g8Xe7qwCMBu2PBTotDSG0bezsvc2RoNw%253d; at_check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1996&W=2; NAP=V=1.9&E=193c&C=lFIY0lITDLmclX_dEAjpLoXEGzL4P2QbQNEsmVsAUqwbH-loyjQtTw&W=2; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18789%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1624035627%7C4%7CMCAAMB-1624035627%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1839229455%7CMCOPTOUT-1623438027s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18797%7CvVersion%7C4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1657617526|session#bf249bc974f24007bf76e4d94829b142#1623432677; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.8.1623430827.1623430817.1613561419.1656238930741.None.1; __CT_Data=gpv=16&ckp=tld&dm=microsoft.com&apv_1067_www32=14&cpv_1067_www32=14&rpv_1067_www32=14&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1998&W=3; NAP=V=1.9&E=193e&C=izIbUW5dHS_x49K4U0tKYP1m9Kot6jjQ_HtrGBxfO9q9RCjtdVEtaQ&W=3; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACC%2BmUjqShdaWWAcVM6xl9qJfXBpd%2B0/jLkQSc5sbPrQeettzerR034/cxPHmuvE2Aa3zz1fElBfd06SIPeEGnc5YeSaA7hRzcJGR4oItQjeX7bXNvZY%2B0VhrWjm6sqN2z9F/6o64IdQj4WNTFWb77ZfDIHfMAA72Ejdd5OguPxhpmJ3TmmbLUJNpzouWU22csZTlcgmgLsp2E/o5Hu79vFeqcZqDVQ%2B7HaRV/MFWkJqhXzQ6TZtr9npvv95t0NREc6qYGQ2L05f3CHBLP2ifQU/MWcq/HFYWW8M1KPY1SrZuYA/jqFgkLTJ8qULW7kpNaizEqQSCmFWZJamlm%2BmO/1HWw9U0LFNjjPuAQCchU7/JMRqDtmtcgiWG3OSiO5anpWnJGIr0uhRNXCcri3Ccg7hX7ohgp6yw8ZB5lW6LMK6LGMorW9YboGc0AcEHFppDVF9iHuow8dUrt6mNJTro8aYOFuba8nXSvpwoueJSfJCjrrDNpfVYP1cLMumlrj%2BR7iUqgBqQkuF9eBO2GuWa2Dacy1zMfFnmuAflB0Y9YRBKRjrqgOLKcqfzOjG9PspP9sOnu0XDnmcMc3W5V9dL452lcC%2B5M8DcB/d8PTKuz3Xobw%2B2G3aezVJsr0tvqqlwdXuSWVvAcqUfx4J5O7DQFKbUyHhgcG60lyX/s9HYJTETy2jw8Qfh%2BtbPf3g6bRRSg8KRZo4%2BNdxZ8H8L4huBDFfBs6v3x3a%2BbPjyZX37%2BaN9jHVFk%2BdTJr0ziY3XZc6h%2BmMlYAg1SiWamchI0s2FrwwNUi4p%2BzJIsta1HxA5fEdnrOWzlia3l2QQ3SJmUviLnqb6VLRCQi2RHra8DIPFtTXxrDUxvO2RJ%2BzeOju6tCYSyrTmkZwLZ4ThXnT6jJ9Abz%2Bz0T3OiYyU%2BTzn7QoJA9Wuxvp7mDnLd3kVt4cLS9H0DXM99yte2lpAqDFT3h%2BKtkDWkxsu8ixYgBp7E8J9QttIk%2ByDbPjsw%2B6oJ2eEBS98RNu83STrZMThehlXxEBMSQDzbhlGoczrkV65J%2BiwJ6%2BLhQ%2B5PDlAo0UINcV1HJZP%2BXSy81OupjPx04E1gtza2WFJmLQ/32iKoXG9PCbZ7zDMHTxKfzqAFFmF8DtZA8Ffl26WWEEEeiBj45oErcjJINuHd0WSDtdmn7rl8X6buN0lD7Bf0GcE9xxTR2O00UyD%2BZ63%2BzoQqiGxq4OOgwTVMfFXyFCbAC6O64LoMqexKqC0ZvWUwpV2gfc8H9c/6xjkSRyjmewnuzODbK2bgfK/Zk%2BV5s/uiUvAn0seknTmh9fWkZ/%2B6V6MgFCbFc7D77cIGZJTYNqSJNDjWNjgCuBdkpYvYyUFhDYa1i0LYkH1jTSl3taIG%2BmR90/SBkopDNdJMIhxEpOpYWIAYfBTnhL%2BYQQiyooaQ2Ky2k8v/7aDKwdADqBQ/mZDKa7BRa9s3HRtNEbbW1IEBb3f/BOBIoClaOOER%2BfbKiGCeMZq9fuDNNxnUzU4SexeUK86HNDRzeL5Uv5jeRdzQJdgStaOFEmS9UhxZPWoBDInbJgj/q3onbzqa09CrWwAMNa5H28DwZyC50sxKTCQgh6PWsq8YbYAJYglFN6X6eX9Ic54z%2BaJD3vVzt55wivzyyMMaNgKeHE4id47OZMtiN2lYckGqV%2BDvk1IWmgoAztJWiqekvJbEepL%2BIxF6eTuVRyuxtkrdaDskjzasaVxalhefWy1LXV5t5ePB/Jq47CtYt79laMLqQyKz/lp96cTf7Yut54GUvpu6sVvC6fX01Aq%2BY5h5KKqRfPEZCgYDLkyCFTjx2piyTloEkeCEDeu1lSr%2B60qIYQwTcLfLlxqI3/ApgUtzHR9QAkeV13oT1iB2tAFuhrZu2hn3nVCUUbxunDRTJ32uNjEvLDtUtwR76NAhr32np3EqtiH9118HjV4Fy5H7M994uiqmyV8SGKargmegNGeOEZWdwiEH/rZ/UxP%2BlBgxjccIj0Ar71Se82ly5PrruRyHvAQqo97dTV6UkzVLXzR2CGTnnWn5MllJBXLzzk4lTRq4yQbDTQIevSp9a18ymqDx7Cqcy4NrD7NvFOejSohMJAa60VvRe/pLY0ngQ51bQSom4KzSDgHI0Gsp21WwGFKdAAT1%2BqwCvl1KJoLY5HNyhLejJOVKqC4fXrxcOwRPQqWnIllxwyLvnfp6/QCgDRYxp1LUrqZB1iUuAByQ5uftF8e8kzNr3f98xiUreTsYJKtVHIptb6xg%2Bt0LiVriH0l5gIu5p9uz/lYCzi%2BUTQfXL8l44kT5q6qvMpM1uc1zzulv0dy410D4XVITdmXefb0VN5fjG9eFqH5iEZdOqjfN2y5oD%2BshIm8xeOmy13soGSj2QiRVZaHxb/Tbzb8ci8GYDzlGtc%2BDWRd3pBMHe71HwDOjZhkNCv0%2BlFls%2BIdv/Ex3c3lhi09MkybFu3JMOaiaQFgCZGNXzhh79c0UqHPtE9wh2pLyV2nKV68VOhLozqNNP3ljBNwDD2PMz2p7Ffke5/x1BQAsR%2Be94nIeFE7Vf3wUZQLVnsXqO4%3D; MSPAuth=20WzDDE3TGiLmPrVBM8Vy5EUkdbRM71JI4dPPmaEUcKKMtJn5NEtDCByIOW*jqSrCgKBS5NdlxDsYAWPwTi0YWhy0U*T5uj4EW3HdPgJKArtsMKz0yt8oNeUGOENqPPt8TzsqJWzvQ5wI$; MSPProf=2DiEUHXizFbtvq5ZZJDtAnP7mpWenjJRFXRXp6F3KeF*hxo1CqEaSOmyUXLGyTw2v99SlaYmu8*n4uJv4YGDfsft7RC*xiBBwxwb1tPFsKNkX6LS7ysLLkiymZZpRJRX7o7AVCUWeeijY*6BGIF7kj9VFZ5fbzToljfiLrjkJISrKEkmMSDEUC0jkVhCRKX7sh4B6Dh0khs!NBWkdt4xnbJL!EaY5A5UcN; ASP.NET_SessionId=5xtk2n5kpt03urqmab0nyjaw; InsiderGroups=a78287f79f56ddc1-insider; MS0=4be8cf57c4714112a2a69d5bc7759c22; MS-CV=tvYbqxuXwEKQe+Yp.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}