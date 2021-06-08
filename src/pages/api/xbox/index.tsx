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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1623180003160', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; _CT_RS_=Recording; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; NAP=V=1.9&E=1933&C=OuEM5g5IwTnl-t_g1tXYYNmRP2HYD8G4SD2YZzsc5m7pU6_IsW0avA&W=9; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18783%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1623438097%7C4%7CMCAAMB-1623438097%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1558211478%7CMCOPTOUT-1622840497s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18790%7CvVersion%7C4.4.0; aamoptsegs=aam%3D12322074%2Caam%3D12321301; aam_uuid=11062451314358537881498287062699608140; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1657020573|session#2a626fd8b9b7402da91fc072f000ddef#1622835158; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.4.1622833876.1622833299.1613561419.1656238930741.None.1; __CT_Data=gpv=8&ckp=tld&dm=microsoft.com&apv_1067_www32=6&cpv_1067_www32=6&rpv_1067_www32=6&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1990&W=1; NAP=V=1.9&E=1936&C=tlvNYWjS5WqXSb09GvNIWFKUssHbNnjMot7p_J2fbWQ3tXaYc-USMA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1990&W=1; MS0=5dc01451287540ff9b09d0b62b48a837; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACCtnhhKJoH5QWAfowbL3nhzTIwmdItTjjupVpbTKKVvCl63ebohHMoOhFftonF%2Brz/O9DQP1pdsO6DAD5Twn2nAwM7tdFgtsIiEdhwuyO5CYk5E2P/%2BUWgqceh/%2BmcSOBGm0qWCU/4%2BIOlg3VL%2Bdq/OR77jrjZBo9tSYBS9zDplFQGCWnnLwNif3J6%2Bl%2BQHBYwXUq1w68One2ttM0B%2B%2BYEKkZ1FBMJBQkSiNWRnWYgnioIQZXlnB3TmOF5dIX3I7XthWiiGseEGkdGK1tNJ8gQ8KLODVTqX2EF7TUVZMHSFZZ6BC7PIFsGeRFxVyQ6HCb1bt2ddYYpKuZDKjU2KMmr/uDgTCXXXFxSFWVwNR18p%2BcvRlSWM1kf0roIrdi%2Bb9Qrei7vmCKuuu9Sm8lSULElzvHr%2Bd7SwhX9gzPjJxqLPV7d1FWlzM79svRkccRvr/oO%2BcAOHKZNrn63IDsAvu0sDT6Wz/36L4gVl8Q2vXu4fhk2ic3/dPZ6rI06e6xV/KN8MBKpA01nn0cR0wmyAe5tbPURFMyrnhu%2B/jrUNpKS52ApriS%2Bhlm60ApL5H9hVNn1oTmsulOX3G%2BJaQYLwpnd5CMXXi/RaR4ljlM6WZgH4dvOBHrGlN3b/xFEzN1nbO1CHr7XI49LIpyBFgGAEXI1znv5Wo8PwakJvm4OXLQ%2BMVpSH09W0YPgkuMZOJWp8ON0VOMnDZFSVnZdmzvzUOOkJw8Mg0xRPocvVgYokTYyKCsh21%2BElQbuIEXKweO1OOA9hfKhlClf70NW/baFULnwt23Oq5pwVjGSL/z3%2BvzYyrDG1mk3gxFfhLhFkwnfDcw6mUI99Aok4bzQ59JX0xPhVME8WDp9CneinJYzsrT9MJrAQ7eOFb2bqBMd23cpPLUfJGUFp5rfMwBXwCYcXu5oThQZvZ%2B/DToQfCgWS%2BfFG9o5G0cYicSxpxVO%2Bp0Ty/c%2BWOj%2BiL/KOWu1AABCmzuZUVH6QRPvqeOR1w%2BFHFxJ9IvUqNN6u2tjxaODQQDtjweLRkXxJgrx79/IopJb/3EDDZm%2BZtPt2%2B/f8yZcayCm9yOnSnmfpzU2BWkq0GdFmCEUrxTRdUlRIsj/8Kyp92CSmkF6CzxQ8%2BrQJaWjtkva29W3j9Ojs6S470N8Uzcwt6tBOW0W3U94Ibxpv6VHxcDcwABErfTHnSt3IBNVnEDsyQwOT7mYCuiFH3na8rHXzyrGlWjFVIkfqkC/OCA6/VY/9/sbSjTymxcbfyY0zhzD6lodqpUlTZTCTh/doP4YDAVPDp1vm21EGL%2B3nNkIh5bmdzet9SS3CSvSroRRzc9TLCst7zWHTtP%2BB7LqXPwSLkwhsTPqT32Fz3To5pT/avGLz884IyJIGD1V/2JpBoua/RGBmfTYVEAygxo/bdEBql1opGN0TwryUoPLTHpqGtUdB6/cFgfggjDP8PLcRxLDY43/BT7Oq3t96izzXVx%2BiBCnClmFZutXmKJ1YA0OIvWBnAij/vwTq3x/Oy2xc6mZY3W0iBThNEkCGCvUjpxA2n5owojuH9xEssDVH5Ndpy9K%2BP6IQ3EGq12iR40yjbs%2BXYyUlTqypPwnS7SkAeK99DJ4p%2BwnRX1kp0VMDZH7AXby7lTBqi2t4ujFhUzkEDb2dfbDv1aM54ylo4CGZ/DB9mPYiiUFOwcz6Q%2BDnPY3dxeTHZKfpDPcS6SlY6CdPs4W0XfB0dBNBDToSGUQUcxUTOc0XCXk86ttI60RBd4aijSG1oX22ddmaEHF80SnBriI4z6HnQ9Lw7IfUctaEp4fxLEKCN%2BBkZKb3H4v7ZBcRVs%2BoAm1FL4MB70alt3mTaLWIkl46O1e%2ByB6cKKk1JEbA3BNl9JrW2PovWUTnSk7UEIUoou/1uAVV4aoRPbFNufVCkLzREbssed0DPof3cE9HG%2BuGsHtmHffYe/UC7DZuq2JlkLgPY%2BGMoPB6X1jy/las4LzGjacudNSv0Br0Ia4CKFeu2KSf39aaPqJhurUvdU%2Bfcp7e6GtZ7XK3CjMsxxdlhsZRVO6nmCoUPpGHolsCZv1HqcVTsdP57rhWZiKtNfnFgGHjV1ESl%2BDAZYW1U4vOEuEbAXTizrG%2Bkp7srOAksNEgCNqV1OY0vd5pwiQ5xdEuj6wAXgXySIEvvsteEkTBb1sQTa8WB3zPTHkf/E/ujNsEM7j7lIhNSxcTy4P26KsnLDcfZL/u6AQHnqMmB/xNio/6RX9Fc6utTjYo2UPOX9c5brkqKIAEMlxhAL89UJLa3tSAYw1A8YZ8su/xdR6tms/VCLN7bt/mUCIBUWg/2LL4qBxqlsuVkqUqHIWMXss5AdyAiE/SeY4Nat/wREc3ehd6ya1HesBaPjgL1Lyjd0mEU%2BSoQFrW7GDw1B3mlKk2ErlwkE586N4rwiH%2BcNMLRWR/cXk/Tz2WjVpdNfS7PDhyqsUigF0b4uMyx09y9nhsSaPwI7nqyO4NMI3bDIg0PSjIBqZjCSIoC9LUuZg2kKEOTPyxrhTBExtpDUKJV/WAlJRQACBLtiDrGyb9Z1ufG4SLMfJnFn/E%3D; MSNRPSShare=1; MSPAuth=260tVLWR2GX1XeELFfpgFPAI8WoYe3hMemb7rE!2CbWJI82b6iwE8e1LZm8ZTcQU2CtGrAbnnXxWPcNazhlr8Y!kc*KUc0ZJXw*Mwd*zs1ncogxr!t34PSp0cPS3ze*1R!AO1XzmT3kSk$; MSPProf=2j!wjAV1vFSqF43!HWFuvBNMMjGFHnQhAfKKNeKMBll3KwrLQKwiQlvXznffDtD3wNlWJiDUzzNC*bH*4NAucrjDbbb*UyXMbGu5X!Y3uT2Y24JLD2SLyrOlFlYFcD4IMuz9sMKB3l2EXZe3XjZPVUJMhT5549m43PGdnqE!2b7G4F8ipSO0UTtHcmxzkZcllKKNMhMqnKgDsOF!jW7RLnFd05H0x6wsJT; ASP.NET_SessionId=gd001oaef5oagrbh0pgkrkau; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=9KEYIOy98E6nQC4G.3.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}