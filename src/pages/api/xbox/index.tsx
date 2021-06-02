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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1622658451935', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; _CT_RS_=Recording; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18779%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1623169799%7C4%7CMCAAMB-1623169799%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1839229455%7CMCOPTOUT-1622572199s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18782%7CvVersion%7C4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1656751698|session#b69abc0a67184e558c4096e5a10005ba#1622566639; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.3.1622564999.1622564779.1613561419.1656238930741.None.1; __CT_Data=gpv=6&ckp=tld&dm=microsoft.com&apv_1067_www32=4&cpv_1067_www32=4&rpv_1067_www32=4&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=198d&W=10; NAP=V=1.9&E=1933&C=OuEM5g5IwTnl-t_g1tXYYNmRP2HYD8G4SD2YZzsc5m7pU6_IsW0avA&W=9; me-ct=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=198d&W=13; NAP=V=1.9&E=1933&C=5MEQDr4iPQWqZUp0RYwqXaagsQEmjfXixA5NRJ12pO6zazpJetGz9A&W=c; InsiderGroups=a78287f79f56ddc1-insider; ASP.NET_SessionId=feucunujlbdp3hytsxb2sqwz; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACKVVYNNRxGltWAegV5a49aKIPryHPEI3vyhu8PjBUuLM4lZphhJ2c7MSBm/h0zav0wroDby7VhsvfCV6pgEipLuBb2mdkYQ23Of1%2BMsbpKwf73d3cPZzIy2ZRJBGBri384tVHE7GWSy3tUOpVYNBLGeFwRrwYqy8XTPt91KIkiOHbfbJzZ3DRrB7ZkWZmRzzzNnRRzlcA0CVTincbC3bn667tCW8yfLbJCi7EADWwcwPlQv8ob%2BWRhyjyoCbeevaUF4Th5RRHXr3LLzqDhzUGSFh9nfFw0nyWuLF321WbCPJTCIFa1p/CZYI0BKc%2BMxsZuW2zvNpS08vqcIc7/NIEKF7sBxR4dwwAhpBdJUdNem%2BYjEfLxNlams61F/RA5yitgyyUbAZqzE8gSXGXmOPB5%2Bf8zsMiL%2BUoa6WJASAFEgvm7WGOPPsRjsCapESaKcMuD1z3yxLThkMDLbXATxSHH5/OBYjHl4OmFJCMjrRCjefKwRaJVKOKNaE/v3duFfyS8l3brWxrtHh/SFxYahTtLtZU3eQ1gDwzo%2B4R%2Btd%2BOISvrrXQ02u57lKKBlLaGNy%2BYSxA2e8pc7JYyCfdiph9iYSnRCiWe6wjjAjS6vIa290qnqc/ngxispQJgcHa0hmBSQw0XbIOchO5Hx4XiJJJ5TQquEQvb6uc3sHcjbh8XfD/lv9/tNoC0rbBcbGNtgXJog//BhhyoXPyNgRy%2Bie33rsE3Rw9MXI4x%2BO8Hr006MlwLVFJIXcg36fqhhTwYRcHbI77F%2BFx6TAisj2j%2BswIJrPr9yCXt8M6og4r659dEReWYtvn2kEBScs1saWdu76etiPPIwRl28wht4OMSYwYI1LyVsBc%2BlqIQ9Pxt50hlmiTv%2BdHy6Fjv98M7ByCjGMw9VYVNzEgXLhzxQIy%2BB9ypqHlsq5d5cOw9wNIjbDz74UmP%2BnFeJ01dwVQlKbAYjnOhBlA9r3GQHUKdA2nIgbDsFMEX%2BAX/1dAUu8V6aMzk3lahTYxFQPCV/IQF6SJMF3GEHu%2BxPobsHgt%2Be6Z1c8Nr1Xf%2BJzRGBNmLwN9lEH6jGtYLZ%2B5wD8NHaVUpqQ7xhGCyHoLoiU3EDIr0H%2BBWKrqvHnHPsUyGHvqUrIpZDj3GPOSF2dr%2BmrE7UAYl3HxtCI6POeyqy9p8pDZgOIkQykTZ5/Huo4W/OUla4L1FuXxIW3JiGI7v7p5TrOFJg4PIBwQlRWPyRyM8OAL3aCQ6nOoPHXr294%2B7CQEV717/aA/VmvI9vPmdq/EG5OPDLGKU26RlPziFmii7QnCZVpO6iNzxDo0YsKHkUQcO%2BkBpRc0eGfUp/AFwOMkts3lHvFrIf8qwr/7UVa1t8ZwRSyIiVdZHx1iyG2xpwLPE1HlooHUFw8Eu%2Bh/GjoSnl57vztxSRW8nryIuwRAIP8CkGu7KdDcdhuZxT6ubBDHEMV18TI7Sbn29SV5/Yq2guUYvoaOjhyOfx9SIkH0mQI5Gevd/a90DaNEOc9uBexhRDtg1VMUXxds66f71t601z1x5o/Eabi6pK2yPEbuot09rJ%2B6nzG7uGOmd1Yamq9guWD3L%2BMkErsF4ayISLF0wGg/kNPJpcHoaNkGB65BFkrt%2BqSzppM3qCbqpaNqzy/CGDdOgAj0n%2BmppuxN%2Bxo6kFdvESylrueSvheeBIfx13f7vvWCkXPfuSW20onJSLBjbFWbu0rp4cPI5WFNb9rd1wyxokPQ9/S3tKgI%2BcWyWOyC416%2BuygnwjikpU3E3BNhRF4//FgdMc52zzwLZ806wp2JNqu/GY0%2Bmdekuo2UYju1W5soqien3JXvYJ%2Bg54wwYSmqVhzb1XqS7S3Hz2pQaNYT0XRyG6edV6aoFH4shCvGbScRJDnKC0jcgQycUTK8ZYKGvZnd2TgDcD9Dep0D3y%2BxytpvXoywdciG2k6D0T9grEWDRzOmxJzXubsRzRNUAsdxwF0fhe3a8OKIvFb0gxaFlyvlvRvc%2BCXihbhMWdEZBxrq2mLnqQeLUsp8VpUt/%2Bkezir%2BbgYe2n9geYSvUJQcnA49y8FgFF/GIaPFfomguozdj7C/FbCOHzrpSngDz7WOk6S7shabvvqPyILV4zt3EOGImYH7NVFCx%2BpCDh6FXF8KXDL9oNYBbGNvNgkpYjXweJgs8b7i6vCYK/Q%2B5ixQCm1FScYCmSU1rT7mTVQJlSuQjmZj7IwGzYNwVEnDM5BSLnhRypXIDMraDgvl84fscL3MQw%2B52y7W5iyKUx/xO9%2BTHVKLY3bZ6wIlvxev%2BzlizY4tjY/MkKUV46V6m2smvZ0%2BFKG3mLT9kmLndU/4Dz7fXeTF4f/4xF2tSptEbBK1l8JS1jHBV5WDCuK54XMsCP%2BVxP2qQbStrDE9giAiICzoXM%2BPBeECrsRLteGFJoIkL9B0cUDIwUyHh%2BFJLAVV02UK%2B8QhLqmBJ0opYZ6v%2BJZP27k55m2UHUj2QeSa/e/cc0KPahJJNAWXrw4EeesuZZU5Fudw7b5LjGoUXiiRt4MravxZfK4PxQAFeNJAujEQ7VjFxwsJyjy14hu/Sk%3D; MSNRPSShare=1; MSPAuth=2gFCOA6CPGvY8M6sSGfLVMFV*VLjoWiFTPnEkCoxjXq37y2uBK9kF6qlpZ0lPTUXmszSWJ4uVjtQVVLMxfMpuBsxe0Dre9urct3WKOr4*9WwEkutaDcTXu4uTjGK1tv!FR4pzFzPlWu9Y$; MSPProf=2Vbnkszq4FeCgjogJ*IUJrtM3ejSieHb*gt2LCAmLJG0yPqSvv2WvP98Gp1MjEvzgAhQPxPOfKp!mmIhHcXwPstjdlXv7gOHEYncGPzFnP32l0!6KEXaHGiJtJcfLi7a0nsH4vJlIZe3TOEB440y7UGtyweWENoJ2F0LsxivqyWuJKMFPscqj2D5wvz66B3WptA!wKdfwOFsQS32oJ0B9iiCwkLAfBxKvC; MS0=ca70f536c4b349d2a3b5ab9eb0a395fe; MS-CV=SI1NXYKoFk277P0a.5.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}