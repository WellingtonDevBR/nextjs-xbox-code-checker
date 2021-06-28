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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=2747c49045b247bc&xhr=true&X-Requested-With=XMLHttpRequest&_=1624882722716', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; aam_uuid=11062451314358537881498287062699608140; aamoptsegs=aam%3D12322074%2Caam%3D12321301; _CT_RS_=Recording; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.14.1624345090.1624345079.1613561419.1656238930741.None.1; __CT_Data=gpv=33&ckp=tld&dm=microsoft.com&apv_1067_www32=31&cpv_1067_www32=31&rpv_1067_www32=31&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19a3&W=1; NAP=V=1.9&E=1949&C=yrKQqffXFyFP_k_xf6JBdWpCCuUWdeukNxquY2OV7aPCflBsyidOCA&W=1; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18804%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1625189220%7C4%7CMCAAMB-1625189220%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1558211478%7CMCOPTOUT-1624591620s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18807%7CvVersion%7C4.4.0; _fbp=fb.1.1624584421901.1136163943; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1658771292|session#6a8855b1c18a4cdaa63e6d8897350588#1624586280; MSNRPSShare=1; ANON=A=3547CB54ACF2832A5CCBAE8BFFFFFFFF&E=19a5&W=1; NAP=V=1.9&E=194b&C=3OcrnS_knN547a2GrmTC0IGvOMH7-O-oAKGExsOut5D_-O-LlLf9qA&W=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9SxGU2kHjwZ7iw8GMzWb%252baYJv43KMuzb2%252fLvRd8D7Qp6X4xwIfe2si%252bulqGqG2qZ0tmUgtw3ups%252b29EkPszoAVV92kEtHRyF%252bHIMkWMH2k3wRdu5iH7sigItyOztikJ2%252f3aDY%252ft7OWwVQ4xE%252b28vLtHYDg2Dtqp7Dymh26eWFPggg2Bcvny24g%252fJEEe7sk51s%252btDOPvu2q8zpMWWA0suBmVCNkXoH90SC%252f%252b%252bWfGzEN6YQuXARQ%252fGnf%252fpKJzmzlpgPzs22D6OE%252b1jXJGdWmdcSQvw%253d; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACLrS9PBwbSk%2BWAdxZnnBR2fC84sjJaf1uYscEb9rhD%2BISvJa0V4Kct85NxNO7%2BWCzBr44AmFDw3qAMvfeNzHzrJr67lADO6zqukH4N9emTQqZsz/5wnNmye1ZQEdMmfiKehuwMYQfxZhumGiF567aNiSenmmoZOS1oG/9xCoDrMu8A5d0ZQcp%2BPHNShuAvvcgMT9OlCUagkRUec5TR9F6JDdAzm7tvYc3vN5sPYQPm4ZziNGTiyu15lvnEHnhj8e2DO9HPehPdWObWJ6guXDrWFOZy%2BOzUJsJilNySjNQwWFKNnqB2/yiQEsvFAzCgMYNc6zINExan3YlyjXONhBaFrfFxvdW9wPunzSUya69E2m6dhvF8fhjmcwx1xJzDJb7OdcSNjVkzYaKb9usjv2tyhMDqiaYvHPouITLl1y02RaSTEehuEZA4vLHWWGzm4OXQU//wQbDPFzHCcCXNtvq4xsPe7atVeQ3WENw%2BdwmcwpHt6mCn3fTWWEk8CWCjlyxWdyATRUtrs06RkUahNsBNaoQXHkLiXY5MZBRgV4Vyvq7cVtqpLbcycDQLanYU8egBlGnhdW0/ofCu3kysY5HoDCENCdiIg5mZDxmOgTSpRDXqOH%2BZG2XBv%2BhJsVeOCp4lhfeeKnt5vmvoxHRb99W5CqTW1tZp%2BCDU%2BX4cRFDLzcueYHxzXYLjBXzbVYqR0MfAF/ZmZCKdgtHO9A/dnP5e5VDJPMNc7LlWyOY9j%2BWdJNwh1eFPDnFeqUOL0VA6MnYVr/62txRKzWFsVjLFd19JUxBW2DX0iGfvuPP6wpQRJfIAgjUWkICG8a3cuLHCcx8hJplDXhTQ%2BxsUbA0UsM%2BNindSia75wLivnOTalqHJygHQVZGPPMTk8MeKziZE9jBJi/Atmr41kant6y4aLRTRyAKxosIP4C34ECNNpEqEfGKaMzUDTVAP26fz0HNLgM4cAcWOGl1J1tgQjoo4CqqdKn%2BalL13Vsp3xH4HQMiknz0SGIJ/21VuZqNhwB6hogoeozk2Fu01HOuUj8cU27V3eVVx/mmnTHb0dn40wF0GkmUp/O66csW2O3IsYlZpiDytgUWwxICkWahhooMmQTXqD0HvTcHf1R6LKORRN0lG07LjVcz1awthU33uM7vM9rcE0AEK%2B7pVncop9W2%2B%2Bo1ZCKv3NuCsla5yOJxX97DYS9leDo1ebtDzNJrphX%2BC2%2BQbeg1wm34mGJhpLdxla3cxnn60bY%2BuTsW9bgu1zvt3iW1zjPC/82l0PqObHtRgBndTh8DQq5iGkqsW7QyQxixB156iy1kbVM8AfNjrihTW5S3M2fmiDaqKPjEMOupu2Gt0kI09RoEQ19SkBJ6Ln%2Brlhm84kigAF8ATMC2JLxt8Gl7kW4mfkQFvtMlXyQtfwunK8rPznYMjGZpa6rDsYbIDanUDKu7Vzjd98A6iSO8qsGOqwFC/VOt1EugibcwkZYaFbuxQqo1KFP1UY8vjWgAlvikb7fc8WF7jgavxR6nvFl4duFxD/y8paqR6sXN0cKj93zZfWQe6jbuwjXOF3zwRmXGlmYoPKjsOCm0Sjdf147QLlrjfs3SE6P6eGcUKPOhxWKYD5bQXKyAR2Wii9oDu9UUJSLBZfbK%2BZhtNpQmorbRgvSvNFBQl1hUNbvCVT8J5T5mxvWyzetOqrTHceAd58htgq%2BLAmkHUnQoIQznwDEQXJMwCkCSZWcmapJ24rog4WFShVuAda8vovejhqgL3CUDLyAzKipPzdEgs2OnPvtk735peiqJKb5ODmgCZSkhV7Xwnr37/fPUx6K40UU1bF4ycGBB/a/hsXqwv74PkiPLXJAjBh2/gXPaKh19Z%2BnMtDAXLMlb0/k02Py758Cb1l7bRoJq6Zti5JU5IuTpvpz3RAJB%2BmJf59IZ3Og4atGTtt3ZdWBx5%2B8E/ssZGuGp2IQ9pPFHiVLHWotGxPl9nAKsdja5kX8u14mswgaVN9PvKomPOfACvYCA7fwlPhUYhZmg2fzqXNYDMXAtlXbdDmNL7MkctBb6iqtP2qhO2Db6c1mylE3Mqobl8rCauDNuQuE2Zj8X/AzDceXPsiHJ9LC0z/yRww7K4fghpzH5xcs9U2Uhx6nEBAgu6Yukw2rrL5DxZOuvXkTIEDARgJjoedmzOYOT0V2UeZ9oiTbgJiU7aZtIqMVPyrrVMltqJc7IUNX6%2BCpRYvsK6gCl/t54pAHw2nswANOw22377JrZdYgoyA6QWigIRIVLMAXh%2BCPe5PjxCmaFX/hjj%2B%2BDa%2BLRT0XkTnJOB9SeH8jJOVR9yF9mtSx069EBGM7Xd/sTJu/8k6wZo16rWQ6AXw5Kc1ia2zAr34siCRpVdz8I1LElT11UqRaPf4FXz3FE0PoxOPpFT2EHntL915mwNPwxtZ9zVeHQ7bPU/GsLRDkGdtvGvXz4zXNcxM4AYijO8H0BNJ8Hj0sFAUwgdvdvcOOdk1EGrjmrufDjtI3Iid1j2xAOLnj98EO7MK/cISFx%2BhDuRNEVk2VyhQAKewlQOngG4p/sb9TQnDAT6gG5Gk%3D; MSPAuth=2T!s1MO2ZFoRJh3mE13CARmqm3LGed9v3405aHV0LVRBz55eo2j!jmZRi0!Fo1KteBNH3DzvrxkmC9mLhvHIlxV1nqFm5eaGJL3i53UMGmDLoFcpq3PzRipZ6*L0*m1v1v7lE1*McFIrMhsN5LPj!gTPy1JkZVQC7D; MSPProf=22!rWhZ76HALHETAqx6diKIo*pAsMhoGIjBkQtPcW2J*psH2qs8sf9UMw1b41awA6MVYqpwWrIWpQVHwXMhzt1C6kf3eXsU556*ga67cUZmsw7pLKaqLVR056uFSY35c2vMR*hmxow5atlN4SqIlBMFWIjjnAoR!hmg7mFerdZUuA0oeFUTh9RVNTMlLJjMUOhumzbnpoA2EK!dVgBy*lfpg$$; ASP.NET_SessionId=mb2pcnfstuy5vle2thp1atlb; InsiderGroups=2747c49045b247bc-; MS-CV=I40OP7srfkitndRa.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}