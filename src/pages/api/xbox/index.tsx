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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=US&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1621442242004', {
        headers: {
            Cookie: "MC1=GUID=f0731a20bd1c4a7ab7e37478560cf1d5&HASH=f073&LV=202104&V=4&LU=1617311531814; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; display-culture=pt-BR; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=5; NAP=V=1.9&E=1921&C=0OXmQzPDpG_QN3jYYeBpwBt1S0g6Ll2UTrsxt24cskQGPMsUrNqpfg&W=5; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=4; NAP=V=1.9&E=1921&C=NjqxyY9rxkbWShNvZsVfEHY6JoJopBqi1jLPNnUyK7S6IoaVsezY6Q&W=4; MSNRPSShare=1; InsiderGroups=a78287f79f56ddc1-insider; ak_bmsc=1591F0D8318996F40ECCBA61995CC1F3BD356F5F9B7E00009F2DA560D6ACB150~plAuDwzqO1Bxv9lOR3E2gYJndtPg6zo0+0jh252UBKTYWR9RfeUSI5G6cSQS/emr90yarmOIHyhbbbaqC7uEL/Gap+v4opQp0Jws0yAdrgMmLJotAr4jrYMgBjMyWF1wDZqshQGUg7HvA2POLqZw64DTnoMaHIwcDcYOTbzrwIcaFG98FEGQ9yyBEFLq5qwlhl20GL0s3VMOiKVJDwLZNroTpgcbzZcwgeCUpU0nNf20w=; fptctx2=H3ihr9e92IdW6yd1ZgQ9Sz4bj6XMGo9empP83sM5ewdZ47EVYHUoMOmb9O13eb3GSCxFUXsZ1jhriiMooH4T4zn0%252bB4NHzVLI5Ktxk%252f1Pb5vSkMHk6iGPb%252bk9dqLjDZolPV9uw%252bGrhLYtHVelumcT9G1Jx5KE61ncJZe37PFPyG%252b129aQONAy1Za2mr7%252bGdF%252fwqXBnswrFrElSDwHz8PTxANIyP3rVho0UtaccbUyGatICrYBVDWMoLRrLukfpUxo4oiuBQghPetT9E3FGL2DgU89ZOAYKo6nTEikOYW91M%253d; market=US; bm_sv=49260E3447937F0CC1B3909D7750AB97~JjzRJy7PprJwYVaJViKubpFal5Q2hwM5A0Pf5UhQyW99OOtdSjP+rzSkeu2kcd/ecwn5xOpihjsyWcXcQS2Vdlj1yC27NvxRIZWPE5bA/lhGgo2RXmFq1RK5pYOolL1HFajxiLpKg+qeLSQt6p3ZhRgFUkBKxU6xUN5r+i+UVOI=; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACGWzCErwD4KtWAc5h/uanVtTndYb0H/FOLHlKRkJ40E6LB2c8DNemoTTjuykFAI6GqICjH05VRqLYkZAKfriukE15K9KNkRw9m0a0HXsYfPic7U6v3A2cuCVagk2TInbTpsEKvnTSPKYcI2CAcHHaLQRGnnd0Lfv3f9D8UfMNaMIFuSDQ6s6oGLdmuGIc1wPu8dEGCYWKXUiRWM4J%2BpaA9PTDoEJxWc/bjPgAjaoA6IFKtI7Zq3y4Pf6IggBTWeFIgCNcjUGtqvmhxdQkMbKLjAAxkRGMufue98F553P1kIVITQe7IH0YmOx3t9xN2XK8hUgSc4fTixuBBwKGpwQtsVmjlGgZvm9hf%2Bmq2XpXX20xvpNkncAHEYFuV3y96P4RDzfgNOgYJjpj%2BWQYWtorVH2mupAMJ0fB4x4fWlRi0YfRCbFxxx6Cu7ucIIilxiviIcD4VyjqbMbJh9SaiWJEjbCEDQORaYXQHdqrJWyY5ha3GUcuWDPSmP1ZvnlyN/mwDSHVjWbxkgYBvMnFWwy8OlzD7wsTFALaqWjRh115gWtJuy7GprglfRmQHFu4axfQw2gbm0H6Q4NXIXPzxMlVg4cdxIr0xpEQ5myddCfChqXTG1rebzi5dJzO/Ix7fCy6XTLwIfaNMkIGmW2ullH3rAn7eV9FgzAN59%2BL1nHHlWoy1905/yXcn6g4iGixgvr3NCqoYwd4VIC06mxWQUccB/L6G3NP%2BCbptkEpfmrraErEtk4eelpC7oxVl%2BDXJJniZ7KQgSMmIdQo%2BfvwGGx/IIwqFyBNPBD7cvMwnhGJ8osl6ENOOr4EKzKUm1P4/QAPxwXvVfjwseFmugvrSpd6VZNcmxwf8h6cPcSSy3kq5UF1MNe3/PRGMShUbfBB3YwoJMvI%2BCxQHFUFYcc0jQbUkMkDGBc81b0MT80JLazhzOaUE7QdR6QRMGVdN7lHRbGyHAyVcmJ6i1ABywdiNkNetURDlRbFUGBDas9Kzuv4IuS6qD4ce%2B/0jl08tZWTogHWVhsoINRbzPn1PUHJeE1OyN/XV3D53b15saVJFWV8mcqnu1luIva1xnLM%2B3iY2c3ISLgyheqZ5Slpc3VQqmBp3CnocxykDVKyZsJVXzUpEbc3oCfhGTTYXbC9O861JKbB8bZ5teLlQsFCa9NL8f2EHOzMxXlpDPXcJNB3mKDB9%2B9lmv7sYcpl0WInPJ4E80px7ywUlNPQ35THnhZQk0JQ5XTEmIGwckd7uX2%2B5WGmgDIeS5VHb3BLWmcIslwrf5DEChTcxWf/k/F1dzAJM0hToG4/WuyIIiblcpuTdPTSV1hsX5Res1YV6FC9wl4Hcu6G5VbJ/6l1wwePMdLRhbPvnUbeHxFnBSPQgSWce57G%2BHzu%2BuUBa9XfopknuveMERu2bbVnKaaemhk9zbF44smKwRFm6U6jYFy/phfyCFAFcr6ZC0%2B8OgxcfbehbH1rXAEFuAMkTm93xGu760axUClxUoWIZUczHIgDu88M7M2F8PG6V%2BoKiVigTvDgJ1O/zxQ6ExYnZZcpqSBlAVXbcNMDrgJPnq9d1GzXaznZergUYPZ8qJGiACSZe4NbpfbVhWJY1d8imOecXC5U5tQvY8No9IRmlE%2BngjlpB1Z9l%2BeDk7uO0siWRpRRj5Mpe5K6uz%2BzLS1OB7o0FWCjtfA0yK9HGd3tycTWyZLwX7fuPfthzguPMXGnsBMG8fpAtYiuf922%2Bt0jrqLFEwdZXKOSeeSG85cdLT/O34fINPxfzYBPe16qh3qFdWqOkmAHqSXrmmnyg1p5spsE2IuUTm8zHGRPrPHCwXaQSdgR6WEcsezq8XUXPMrOnp6kL2a4AQdymwHjb8nACzvmh8TB8WKnb1zaB/DkEdNkCL0iwkIJX3o6Pnnq0TOPy1BbVWKG9x9MOBsAqY0945XvZs5JA3OQ3PPOTohluch8E1eFdvHuYDNvM8M5sicJitqQJKwvQqXz5yzpXrdXxbCfg1IwEiQQ2CQYtLqNyB73ymjpsVdfTPgHaXGoZ7yRkFpJ1vPi0XoQxjUZ1nn63gfJnHfs7F1ovyPQ8uCwu0wCeo8kxeib/l7QAS6Jqu0PIgX7oT%2B6D3dEEWcI4%2BhQJIKaYkYI8WLZ0IfPRtIixUpAxrzlYnJIAuAc68VTIYU1a2tz72A1qU2JE/uw2aISLBcjweCJghiF95rOKSmdWeoTNX//FiUTd5rs%2BVmrC5Y9%2Bwje75OylMiELOSpBzwdca5ZNauLDOuO0UNhoUdVkQjrZ2lVi5KaVFP40XZQnEJJoPyPBpdKZJpXTpvfq5t%2BRquiKXVWyGHbL4TugKfcejakMCzttJIrar1jYY3jdgycTY7/vm1KDtyvj0NMO8%2BXWVlGRgrhK4ojObGVqeG0DsvPIwaKmzX69Lf7u3TbIIMEaGtvrAQ40FbiDUbbXiGCbseh9xH8dCIOG506wD3oSUcxP0BcMlm0zvrHEIYtC7n/JiUAj04d6x/5Szh9zgHuLjkB0NhAZjac9nEb9rzKBQALZK83c3cA9Gf%2BwM3eDENXXyeU6w%3D; MSPAuth=2AZm5X8AJGewjc8P!w3RHCqnciCnZN2Qm4EyRAfXd7*iWhhzfEze6VFlTwukK!4DpAagbApkew50tLdJaETRhBsqWoI!pzk0hc412mOZC5FzV*tPRnaCsRH2aLyQa6rll3k7KJXBrK3!A$; MSPProf=2BqkkzyC7FzzRsNQr1Saay7Iojlfmff8N3grydrvtGOrVpfaJORslskRj24llOPNpoyRrOcKbpkra*yKjCBrZBxwAmvExIYmay*TsJhz1pHGuWSbTXUU8dgnx0Bn*bIYXTW59DdE7TzaWuRbcLJD2LkeZ8tluGrx7gqZzCCj!wLUOycHvc*T1uwFf4gUiOQol*06WTuGiO78Zpwcr6n8yu*q*80ctdWDzO; ASP.NET_SessionId=deof2k52a5e5skvmtkgjwsv4; MS0=e33d218ca5de419fbd442871fa495976; MS-CV=aMHhaPYPoUSN587w.5.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}