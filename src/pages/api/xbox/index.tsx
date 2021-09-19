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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1632082656382', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; MUID=10E1011E62B967790FF01189636C66C0; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; display-culture=pt-BR; _CT_RS_=Recording; WRUID=3462427315635251; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18882|MCMID|32606165887524311583660282503796334325|MCAAMLH-1632004992|4|MCAAMB-1632004992|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1839229455|MCOPTOUT-1631407392s|NONE|MCAID|NONE|MCSYNCSOP|411-18889|vVersion|4.4.0; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.29.1631400192.1631400190.1613561419.1656238930741; __CT_Data=gpv=2&ckp=tld&dm=microsoft.com&apv_1067_www32=2&cpv_1067_www32=2&rpv_1067_www32=2; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665596992|session#56a892089c264316bef00036a6ed6fc9#1631412153; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19f4&W=10; NAP=V=1.9&E=199a&C=ofcw6aBFNV2dWQXa4SWg6RvWmKey3Egkx4iv1nL6zwOlCYGhU7DuEA&W=f; MSNRPSShare=1; me-ct=1; MSCOMRPSSecAuth=FACaBxSJK4YRnp0++4Mpqw4HWhSmhVMzgQNmAAAEgAAACE0p9VCixLxxWAeOOuiXyEAQYsjNXutaWznoxkdrKD7utT5GXMQeLsM94obtuvvRlweoLbBrp9m4c+QXLdCVTgAaTQ57YJiEv8afLh3KxtmkQFccI/k8PR80d3JTsJgxXXmGFyVp9q3OBJ+4TucApuKlKfaaU1pmpXbN5t/L3d4cTw7bmXVUdY6VlTq2EL9bX7o9UDRHc1uE7ifQ43VkXXu4yKX8PZNNOlPU5/3K2OA3AFBqTt6vHrVtUt9diizAIYBaYTFKL+7I1eMsl35QEdPlnyD98cvgp/icKucaJVWidWwXVOb6Xf62wtca0jSx9VmPPeCBFp193KDsBM8Id5ZPX9peiq0ZT0H3E7JOX9KSkasRVE6/ooGDQAo75ungJZNz8B+iiZJmNZGQu9/CzIAqzFs72NsR7WWbaJPpQNeimfun1XeJ1GnzFlziZFQPc2UbysP+WaiQgyKXpTzCVygqZZqY8HO0XfFFekDWicZ//3sufLprreeJIHUUuy6NDgJ4w56fn/62ovt0iyg5zcPIFcLmcBkFhwBUrhLL1xEzl/kz3wEp0esxLCrUhcJ08zeA74qp/TALbwB+nlStYpFsyHyr6eLqV6RliEZu+hvpcREl+f881QaHDOfml0kvaDPQ51H7yWsaC0IXRffZDYeXqrA5lW7gl6AsmHuodZ+Mo2SwEfqXLEN4y6XMa1zcElOnO7vS1m0aki95c+26R+VYMFlpmsezTsmX1s+q7I/JbFpYrnL2Dd5ptCbQyEuGmzFeDOMydVYg7ACc/ICtDF/BOPqhd63xRW9Wwfmqan1KQw3HurDe0FrH3y0sluEbmMZ0/28qYRa5WrNHUeEV3vkutbB/STE8cF1BVaC49ofaO4CFEffQQYb/Yl+szQv7aEkePyuGX4mUOIHsLCSacvK8LaFnvr80d6JIygabB91fSnyjKezXjpSMF2u9obMWuuz+TRblzEJM290//iUgxZn4wJ+oMqXbIOMA5eE3zjjj5A6dlYv5NF9yvqXmoEv/3shL3cUesIypGXHNzeEBUYB5uwu9TGdRMR4TDv6MrDnsP+d3htiIPYwMBN7xFS3ViShUvkULKsuGMvZsm3vYwF2/xTKpnqc7Jfx2hsyJ96v8leJiCchxCVaJ5lpyBQJrvErWBnQFgOxclmcGAIt2ajjM01ksEY98YQMuF9GwSSbxvlr/1VkcgXoT6IOuD+S3vRyrkxeZQh3OCauuIEt8IN5kn1nSGXRS2IOpyVdWKjHgS7Z8+ZPgfty1H29eY2ZpqQHtlmHMdf2TD46v+fmbgZk+RSQuHzYF8zHIxVCwxrI/urBGyYUPCbKjQFWEUIwwyfz3Zvdg5GxB/sFl04zKO5TKmSUStECnN1hZXQeUNPenI6ldlNIejqwbZBLA7MK8pHE3m9BU0oq1DHx1ZW4k6kJ8JlJIsMciU9xggC870uXfHR4eDOfcnctkHoFxjJRTocVWJSHHq1WTtvQntRbEoEPOOwh2HlFtYFyrhPLJbd18LlYPgGQ7YMuuNK2294TdYnKpK5gzchmUopd9PguFFqbDjVMJACPDIKG43uBQutZTY56B0wbCjG5rsyd5SlQ9QXGbptD0e/Pv2Z6py4/EYTwY0kLCno7c1ReG/Nxvf9hAFJGY2twhGOB7AcGNcCXosEa9zSwERev5DbCdFJF+JLmyG+XDGnyzFRmJGjWvf9A2d7KCHQ3sU6T3FUI2mGnAenhfhLU3GITYh58DfJe56FF6maNsU7fFkZexw9OG+GxZN9XadDB+AfpU3c/8MCcHkhPTQtaWD4ZwO2ApY1Hnxkb5wpNEd1K/RSb9oz3ySaiv0E2ZrN8D6Wu5TbQOYLXF60nPLUo8lLuNoWdABlai5Y9luoPRQlv2F6oy73JajG9QIFfvLOBxKxAam/xWN3QK8EOe/6+AEbRLG2aivzvAig4lV2OMfj8k1JBD7rhww2fnUvXlXNOAWcgrKCfJNoSKaOOD6+QzFzzcGKLSPBkJNG0IBos2F/jGWZHMjfxNm99D/DPXdpeMSr+jwwiTx/0irlL5J+cuxCA2W+k+TDeSKtyhZo3kLZcc3o8ZwSkYf+20uswTLzmHYuDQaAI7zAmoq+iJexa4daFQt0SAJdAJ7J5QyX52M5narNZbDXIOOZwhaoQyJU+2zyYdBGt49gk1zPdRWy3tfFfldHSB1yb9UM+Kq/5eVaGvtR5gVuLjQdTdKJbBItwgip+0929or1dFKnJvCA+3XKeinXC0+hCJFkHWELjPGMje/0fjrH86DsLMKZOXN15JBpz0C7LlUPp/vpAKMPI9+hQ7jiJHNyLx79TIbhvW+HbAPlg+To+7LYK5iFJOTzf/nCOYK4NQAwJnylucsdn/Gx9KZjvT2/GkerI9Utx0rf8jBY5QXR3BVO2ZwCsJVbc7MNUD3OARvAUEa10cvUI28TMX6MTMfFjxSnT9z1geZxzFlyU0z3pZCgaBHmi9uijjBdC+FfvBiagHJTqobtYZYtUUZ9f7Lbz7nUUWWBQAVE3p38nGECRWhsTX6sl/DHTpGjc=; MSPAuth=2r67rd6UhGYLTINtpVTJuFMKO2zO3FmDmyg9mXsfjiT1kVs8Qk0yA!6ERNoSMc*7NHhgP6r6xvQL6BMnyjHAffUkaK1OlAU1jF*wZ0dhOyYmi4btPk91bKUBe1hRCWL2QkLPtgWhcK9O0$; MSPProf=2rEuFv24UFK6QCbYoJKQuYXOZcAJfgK8*RSMUVKq93ucnn4ye7oGyPPSiJgZqlgftfXQ0gORuFc1H4bGBp!WQ8EwVVdT13AUicN*Kv!rzQ6nvdGslDqTmQwK*qNNYZ86EOUcDsqlRDtwv!9*eOXZvZ!MQDaRCigaUgy0mvbI*9G5OzxTzTgzb7cLwR33c9mJkFJwAP0mRj7lon4OQ*lTDaUqJzCtRO6UU4; ASP.NET_SessionId=pp34fm4qr4htpeywr1glywnd; InsiderGroups=a78287f79f56ddc1-insider; MS0=f30f390c90e44a038edc24282ce3928d; MS-CV=rg4Lqp5R+EK5eXkV.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}