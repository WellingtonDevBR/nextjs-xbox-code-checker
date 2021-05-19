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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=US&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1621440887889', {
        headers: {
            Cookie: "MC1=GUID=f0731a20bd1c4a7ab7e37478560cf1d5&HASH=f073&LV=202104&V=4&LU=1617311531814; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; display-culture=pt-BR; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=5; NAP=V=1.9&E=1921&C=0OXmQzPDpG_QN3jYYeBpwBt1S0g6Ll2UTrsxt24cskQGPMsUrNqpfg&W=5; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=4; NAP=V=1.9&E=1921&C=NjqxyY9rxkbWShNvZsVfEHY6JoJopBqi1jLPNnUyK7S6IoaVsezY6Q&W=4; me-ct=1; ASP.NET_SessionId=t02n1qxibf1njyrlqjhcf25l; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACNRcPxIRxjLBWAdksoo0R8lOBB6XYAaCrTUBFLmJpPYSoq2jg/GxB2jW4FlsiH2I4MSEdmGPPHi7/09jjHsELonPlXuAfE8qdgd9wA1WttiSYa0AMktEV%2Bzk/qXxkslpdjmZ2eBYxphi7lKG8ECC7GhSbA74bKMr7fgywPuCkhVc3%2B8ZJciazSzSGQJQdYhI%2BWCki56ZoIRHSRXvvB%2BS9anq7juKCk2gAxHEOqK4k9s1MVuBk5qYO5LPxBMkB5SRl1f1WOd3/Pu1xXHQ/enCB/TY9R9ut7faDG6iyDqFgLLEncmt%2B06BDA5cEMNCK8ih%2BJuJfSz/QkuUNbOWOD0gDK2FZ%2B9AEJqQJWWOEja6c8o8lreMhVCIJhb5%2Bcl2sKPY8LSifKUuDCT3HPd2KbITusmNxa4YlQ6psV/SsKto0n0XKh1jVjNpBEQNdPRJq68mKdfpiQ4%2BwnE/1jt8nq0wG0ZIfxj8Z3/6y54C5laVfYXd68HfjDeo7kP%2BfpDMCiq8fFa1hiZ/rubptYBSSp435hSPN0YFoZU6SVrAOjzfz6iBah/2oLP/tNSaHz11hNCMHgWaWOwzAGor4QudCnfuSyu1685JNgq9nHdF7uB9KPMEgEYhcf1JebRbosVzdvC9CqkrLJawDUJ%2BKeSz4fi6qcZwCvR8WrUDLX9wu23UIt%2BbooR6Eav0MRhynpikEtKBkJs7STiiRi1mm9VQnLa/gRdRHctaNbyMkjGNftdwQOUJWrOvhm2ggUCBmjMCuMaErGNtob8lD4%2ByYFxTdXmgys3QY/UC7gXc/jaFMMy30g2ey0Ywljha4gY0JXAR0rdVnqM171DWo7XtmFYmHy82I8zNjbcxVocYb3piwvlBbEXAyyB%2BdzUEWncOOngN96tDz2K7v8c/V9LEesNp5NETeHKuvR8vXAOATBEJ1uumuPqszYFbOnDwoLxBw38JAgYigfZWx%2B3pPZCK10WgWtSGiFWXW76CyBw3ko8AHrOMD4f4mG6yoEIbDce294VaiW3B6apcRXuDxrqDn1NRIP4NbdCxaX2lQSRjFrTKiy91SaUApeHOG4l%2Bhj1/9Kc7miV%2BZB0zhWBAhINQSXahdrl9RZ3t7kQQBFSYaa3Rv6wHf1pz2iTb7IRx/kUVomCFz59AyhLIE%2B9HCrLtZtEXU1E9XwgqF0f4OubFpjS2OtdeiLsq2rOX%2BOvcXGg7Us3D/F1szvJlI/zU%2BEPBTU8PM32AppFpRWhkppZYX2CSpi%2BnHK889EkkU3NsTNaDc2q1G2HhE8BbCfm9BbbQXlPhnr9JHbca0vCaiGYZ9xc2abUdP4KqkjuSCZJuKYZ5bJHT5%2B99phRahqt0UYAln/p8Ldt/EUop%2BnJ2XjZ4fR7U9h4vJPBEERoKSAvR5ZZ3kfX1VNxUxACaFa8xv1qmmfmL0zjcQGKPqbrlThCT5RWPcDw1YnPD72wa4k7gHwmdckV3JZlVVQwopAW8siDUY85L8H0ruI1n7xcmnUN5cLUsnY22JE8uUAYJ7DJmlu8HaWSSvUMTFTERB2%2BHudKq%2BXleREaNZEBJsbw%2BB7HKzq3paFp4FyXlMF6dlBdfA5TGhDBppKiPONjbKZVS/oCjDiWagXe0dEvbBkclw2QzhydwRUDAq7bn3pjeEsUMdjyLlbqD4yPTQSVQ/WBq4DISPIt7hIixLnsPLte0BwVoJTqsoljspnmfqUXTaXGXdeWxcIpvXgtZraRTZOwqnhpgBx%2BfYkqN2tGkrpRlAteh7gGogpx3zUheUvKq0wjvWBbHOAHnmB3xf7g41T9eb/G9UiiqjYukXvaYMj32U9NezDkPApJSMJ5XzsFBF4jBMxV9gEgzBA3H30Bih9O8%2Bj0wgVAowCIJLQiqeXPq1UwyGlwmAHlOSSTbLc6DXyaF0K2T67/pp1OlE2w/XBCxm%2BjzvHfesfl8xYsr/oL7T20DxtMx/EUNa1fuNP2zb7ygYy3JQOGe9znEKVHw0DaDWhNHVPOub6R5uhqSkzqbt3CF8wgIkMopgfOu5aXmuMQVSAcIcXan%2BXOWpx6kbGejnm9tmCDbIDRRu2KacJtgcTlgs%2BaTWT9VF/YR0OIhonE1ZJHWLKoJv/AuTacAIq%2BmJtv4qJTrN9DfZu6OCRg%2Bz%2BJTkWai1KRjD2EGGbLIpOq4SV4jp5AnviB5rpPA7LHx8zw4ff0s6kRfOEZBwdcBmwZpjDnG04MqVjISBx7efAJpmloHRG/R%2BKW7mPA2PiB5baYBOEJn00fFP0pogRfMc38TvfKaYC1oX8R%2BBlOSIVGdSS%2BpJZOdxHw/mcXEwhA7RC%2B7nPHKJPsjGBkhmRnJoFExcbR7HvMredUp/1sBRgpqfj4viYQ6%2BGWsF8SPInQAbLxJN7TkUXq4FncWO1YJj386qoAaCIdybIbLd4jk/5APynxBEd73/ANO5%2BWllE97q%2By9YvBasKRO/ICFJyEkV99Pi2bQ1v6ZZ7dis82wAhfzkS1jyFbAsoqXJF7w7oVqCDYoFoQGARhiuYtt4BQAubbBZuYH89Jb8qThrA%2B/f1751SI%3D; MSNRPSShare=1; MSPAuth=2bonuHSlCGhNhaqSZt3VsIDLtuOUbIGKnmR5mLOkl5VIlCnmSOzVkq1xb5J1pgeOvwp0NUIyW*zTcunneDSUzy9QmpQaozcidAzjfgTYQk!GC6w9ElkeFEQL9fl2OSKL0q2Dp7ox3nH!g$; MSPProf=2ajaKmXlgFnKN6!eO20pmMR*Ou92NVHbOIOS9U9bPS8WIszYFR4S!FFV!xcE4*0Jkx2j1iSRwhqqMvO26eb!XvHF76oRQx9gOdQw512EA5tsxs3YOpEojQcamhska8awLQ!hR7KGrWg1VD0Boi08Y8ApVfbiKDyYxBl6K2t5ywjwM9PiIp8EGVwscUklIQLGXPQkHu*n5JX4HYAF!ioEa9SZGT5orgRmtx; InsiderGroups=a78287f79f56ddc1-insider; ak_bmsc=1591F0D8318996F40ECCBA61995CC1F3BD356F5F9B7E00009F2DA560D6ACB150~plAuDwzqO1Bxv9lOR3E2gYJndtPg6zo0+0jh252UBKTYWR9RfeUSI5G6cSQS/emr90yarmOIHyhbbbaqC7uEL/Gap+v4opQp0Jws0yAdrgMmLJotAr4jrYMgBjMyWF1wDZqshQGUg7HvA2POLqZw64DTnoMaHIwcDcYOTbzrwIcaFG98FEGQ9yyBEFLq5qwlhl20GL0s3VMOiKVJDwLZNroTpgcbzZcwgeCUpU0nNf20w=; fptctx2=H3ihr9e92IdW6yd1ZgQ9Sz4bj6XMGo9empP83sM5ewdZ47EVYHUoMOmb9O13eb3GSCxFUXsZ1jhriiMooH4T4zn0%252bB4NHzVLI5Ktxk%252f1Pb5vSkMHk6iGPb%252bk9dqLjDZolPV9uw%252bGrhLYtHVelumcT9G1Jx5KE61ncJZe37PFPyG%252b129aQONAy1Za2mr7%252bGdF%252fwqXBnswrFrElSDwHz8PTxANIyP3rVho0UtaccbUyGatICrYBVDWMoLRrLukfpUxo4oiuBQghPetT9E3FGL2DgU89ZOAYKo6nTEikOYW91M%253d; market=US; bm_sv=49260E3447937F0CC1B3909D7750AB97~JjzRJy7PprJwYVaJViKubpFal5Q2hwM5A0Pf5UhQyW99OOtdSjP+rzSkeu2kcd/ecwn5xOpihjsyWcXcQS2Vdlj1yC27NvxRIZWPE5bA/lhGgo2RXmFq1RK5pYOolL1HFajxiLpKg+qeLSQt6p3ZhRgFUkBKxU6xUN5r+i+UVOI=; MS0=f29ccf498f854fa8aab2c0bba93d797e; MS-CV=aMHhaPYPoUSN587w.1.0"
        }
    }).then((response) => {
        console.log(response.data.metadata.mscomct)
        return response.data.metadata.mscomct;
    })

    if (req.method === 'GET') {
        res.status(200).json({'Authorization': response})
    } else {
        response.setHeader('Allow', 'GET');
        response.status(405).end('Method not allowed')
    }
}