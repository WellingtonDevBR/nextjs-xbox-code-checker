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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=76f46cea92bdf767&xhr=true&X-Requested-With=XMLHttpRequest&_=1624455612225', {
        headers: {
            Cookie: "MC1=GUID=acf715d29bf84b30b613e58cf87c16fe&HASH=acf7&LV=202104&V=4&LU=1617670187618; MUID=04DBB9538E3269A703CEB60D8FE768BC; display-culture=pt-BR; me-ct=1; ANON=A=500A563F43180AD91138FB5CFFFFFFFF&E=199f&W=1; NAP=V=1.9&E=1945&C=SNAgst7X9TpH3btEc9tWMMjHMz604wF4TjIO0ta3Mw2iFXw_yX4gkw&W=1; ASP.NET_SessionId=tzhh1aixgu53pdvhbsjflkmm; MSCOMRPSSecAuth=FACKBxSJK4YRnp0%2B%2B4Mpqw4HWhSmhVMzgQNmAAAEgAAACLW/SdxcPfSRSAfE7fS6Gl0xaTfwrbw1H7qshevsSRfZUggMzzfMCH79tEHvve66U3isErDnljqjVjbWOIGZa9nntzrbEr4kfrXD%2BCrJdAcBgBRhA9fjHUBZXvOdeb3D%2BqGQ1LY4Evr5cCruOdHcyz1npNSRCWJX/AmUNhGJJTDI%2BcsKjUSWTK5xohO7GYM/aj74%2BGuHWM/JdFDkLNbp4gZMbystNrGk3751AAnVjTsfMCYf226mcbg69XscQ6V3t6EqsnZyQR9Y037jhhY0ga2eVjqTSUSjfnCUWXhvAqnDakxuESYRhS/QmW2Lm%2Bc0q5pPIsfq39GqSStY4G/wS6/Ue2N9FuoKeekv7FlLi8gz91UXfPEG0Q6Wav4LNwXj/%2BDJOoxVXQvsj1cew30re%2B7bmDW4UPzy4R8nb8mSFEHSeC23iV7Ep9AIK%2Bo7FuKNk6TGVye73x1XDT8XEdipe14uEweA694SE06SiWpJKzoA3K1QTnzJO92q4rcBj1ig2tJoTX8ybamVz9vJuiAD3qnCsZtbQN7MPbYjCS0SWf2LtNje1aR%2BHqLO9O47TvDAYfwKGrWeOcQRbA1JNPnezqTEUwEPDamzCjpBqkJzai1v1FF7oqpI1EupP3KBwAYJls94sG/PwdatYKulJoS35aftvaig2P3AyIc5UyCAv8juICHwQz/Fqs9TNPtUQOdCm6VKykyu/Kg0OTi8it7gapywd73bRN%2B8e9X7rGkmvmHeSAmXy2hb28RyzdKQEDzrNFrrlbw8T964yEUC9aLFatT0cGqtGUVuuTlu59jWmP8WlG9IiDagiifXZiDQHUDZLi302WgOgGRjK8OFzDqDDnuNjhgSk3tzUwhO3gMz7w0aPNh3TPbf8nf81wq/8Jkow%2BQDrFW1tZCanYP255TO/X2DEH58mQvl9bWqSNsEIXpOgWG1o4I%2BgyW9J2UlV4Q0NOOO8TPOfO1yKu/ywL%2Brj5Ya2hNq/AnCf%2BtwT49Ybg/ebihQWZbHLtSK5W2DJ43cXgumaYLx05nFeUvOV9fERWbn4nyxE7zh93AnO%2BDPSqKjwdCBc0SrWv4pOT7DwYKvXor/gBShg54kEHxQ3lb7TlvlVDHQrPHSWTtNg4pcinCNcR0414LCdf605A9VKMo3114R%2BPCxW%2B0tJ38xxKeCTKsuZ3DhQjFoby75Mw821qB7Xsxk6vXNY0l/FGV%2BrDv6QsQDgyzOOdhaCxiNyhGezQDEl%2B6QR1EH%2B4t/BIpe5PX2OcLEijtO35gj1VJYEIqFzjgXoAOTj7ovmcq7YUSnCOEoAu3ojiBlenUIN6qY8EOrteAZK7eoXmRONGcjvNY1gi6BRIt7h2dgKgPYzpvF3mcVUr6A3z%2BqALsEppTWMj6mqDR824qv2BcHdpnyVMHeGG76Q9rfzbSRod9K3mhEzDGKiLCMPH09i2tIcep6pFNaKZVJT2cG2RbC965PKIGhwsEv2xoknDCLYS8O6bKog6rwO3O9rIsMGK/1U3iqMuGj7g0icFADtzLgnWmhpvzAUSMFJhLsbVgygWj7Z2aXU9l938LH1Yxm65y2SNn5281mxP4PNY/zFwR7RYZJ97CbS/qMGvSRU4YmMixnwkuISTHaLa4XsTBQ8fVr4/3g5F%2Bqs7mijTIPir/mWYfUrv9py3xp75oqbHbDkVNe15CLFyV/W1sRBQ0glvkjWqfqhBxCXVst020lN9CGElOdAGsuGPSGro06e25uvwSb763%2Bkq/ms61ucnu9a0cznCOvVdMxrml%2BeBNqJFbV1tK05N%2Br5DJkYOLiJBHuVBAFru5HhOi7VPeYL2mfLzJVy7tbEIhYwXsNQh4XwSx1wgjv1SZjh%2BPJjIUWjjqrQiNcSspL769nAVYwpVaJoGx8keaarmBmpYMJvwjjaXNgch2cAuj7TYCN/hvlekHGjdREdBFITY1QvUIw24qfuOW66ObLkbGaS5i8LVzeqWKw5Qb0FqkdQfo3sj4bmAK6KcZGrtAPjdurcyodMirzNHZ8xFJblF2/m7CvU3%2BCtAqVxOkWc%2Bv0LrYq7Q%2BOCCGMux1QqETMsd4tS8FiIqD0lbDwa/cCBW61F1pqgEz0LxL//hnRZRonjreglojEPEpebbTWI3rjCvA2fj5umm/2iATw8AG2pBwQ8ckASZlmdHy0l0GtUhhGZdL2OuY1K45UpOlqtYhlP55UiITIWsQqUMzrqAsHuabtBY1oaUBzUpmYw2FX9aSjiLkN6tRd5B0dqVQaal2jW7TuLiXbTlWvziCmN0DHOcuhhVSb1uD%2BpjKGXn6RknBXbcNWI%2BQsi9oNV8DIfhWyBuyzvthuQNUnM16A0Bpiua3PKDSSSWjpJcyrglaEWpBSAt0u/hMxzLAWTqf/N0j2Xb7%2B7%2BNFU/70%2BuTLfxAMhLs4hjC6kqjoZuDV10TfepupSHw0aMLoSMWTHBCqLTzB1y5fFLc97kBR/YMd16kNi2U0alrivpxB5vgacBD%2Bl1PyAWI4FADcmKbeJ%2BsZEAVKSXedA2ID9Uh%2BUg%3D%3D; MSNRPSShare=1; MSPAuth=22aTZrAoDFkptyBcGoR8pC1wDKGiujDEcU6ubnnJwE0dGp8WO2Ai5b6G31xwggtvGFbABd8iKLzhl9g3UsvpzJGM*ATbJBKNZcNwLl1lNOhwMMPutQ!PneKRnlOpFv0gFV4LUdZwqn*3c$; MSPProf=2FHo2sJeXA1X9bgtbb4g6xJeo3LCuN6aNurL8!kocvcEe5MQKD99Of!qU1KiUWbcLS3crXTa6rCXX*DbYXddeFV05t7rnmGYxgD9TARu5RoDKoZtCdM4gV7eeIf2ce4bKWHE7qs4Z6CjjcghJEWgSjWM!lq!jNUvwo7cJWmrnoNWSMB7z7iuN7Vfzqs1yRmkWqvLUX!u5wZ1tpmEGO!Fv9ww$$; ANON=A=500A563F43180AD91138FB5CFFFFFFFF&E=19a3&W=1; NAP=V=1.9&E=1949&C=6auIw05glm2OTsUhhNroEtu4qasz50QFyjCJeBHQe67-YFnlvyhGIw&W=1; InsiderGroups=76f46cea92bdf767-; MS0=04dd42df54ae48258b068ad37abae805; fptctx2=H3ihr9e92IdW6yd1ZgQ9S1THFw%252fCA4%252b39Yv4fT4Lf4BGItAOgZBNQD3tH71KUAJAs3XHKOBy0ZvuQVXiR2SbigbU3WQ5T3L%252bRGPDLZEJo6DfsaSFZh0H4lAP4D0eal3nhhhivgVgQ7Cj6%252f7niAeNe0Q7t49LAioTTq1Eoy5ypCBMy%252fnObOcnaatB8TYjLDumzoOvVCIPsDERZzOR1CHQy4%252b8XcsfYwBZfi7628rejzbSq1Zg%252fiTE%252f7FtHtF%252bcfkmn9vE1NlAAR1Xl8AYHNtaergxJEyyYWA9w7430r%252bGA7Y%253d; MS-CV=h6lTxu2d30OQqc1i.5.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}