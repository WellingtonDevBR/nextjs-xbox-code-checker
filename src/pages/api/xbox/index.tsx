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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1621960854454', {
        headers: {
            Cookie: "MC1=GUID=f0731a20bd1c4a7ab7e37478560cf1d5&HASH=f073&LV=202104&V=4&LU=1617311531814; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; display-culture=pt-BR; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=5; NAP=V=1.9&E=1921&C=0OXmQzPDpG_QN3jYYeBpwBt1S0g6Ll2UTrsxt24cskQGPMsUrNqpfg&W=5; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=4; NAP=V=1.9&E=1921&C=NjqxyY9rxkbWShNvZsVfEHY6JoJopBqi1jLPNnUyK7S6IoaVsezY6Q&W=4; me-ct=1; ASP.NET_SessionId=pqcdgrg24yrl2fvicdiwxr4i; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACMMjFktvH36yWAe7iABOs3TgdZ6IC95sXgyZ6p0sRQ/kg3heylzXG5sX74hlynVA98u%2Bpfhl1L%2B8vk31wLHldlLKUNjMXMZOcqbdixut%2BLhGzJydw7iyK3JjRlIfouhNQsp7suYHdHkBl1jlyO/vL21rPqNd%2BoMgnyrSaWfW2MuK895o%2BysnjnHtY/wbUrp6Bx9vUlkSlwvPsJhmf1CcjUkufwzvubeZkZkNpEknsIs8v3b83EkuZFexlgI0J24vNpMPWAZCFwpdrAdh9iKYInl%2Bze7otDSLoCv203dRaJhfDuAttOqfb/G7GKfap2aBUQJEsZK4z1JoDCT7xEwRLrNOvK%2Bs4ZbD3FPIoSx0EhBnoC%2BE3NnvfNtwkd7DcglfK2hIu24bTyfg3gATxMtsOcO4CJCaTY%2BKhfmDi4FRG%2BvQTE0VaSuZo3O8EagQTAmb%2B9UamwZteI/6NixfS8W3XwOZAktmkjqTkY6G5na5DvfK/6mv46UHAoUfe7YEHbmW6mEQ1Q%2BElFrg9sNwufofTeGLb9yMe5Q1kL9Mfy8cmIHBa0G7WQu99WNhz/VUCy6JoDBnZ8RcsbKTveWS%2BywNCIwyfX5olT2guGMKt9xIpPkMQ6ZfbmHC35645eFQhYV0n/6Ez9rcIOoUycD0Y6Yt1bhTr7uv%2ByiokEtwvT4En5rVbl/IyX/3LctfNjbYouHvwlla9eImcJIqYW0kGuloKHc4I%2BjFYR6ySPZN%2BgTe2trR0SzUrFesEwCKjKnOE/KrRCSIdRl1ry1WVTdcxUtuHqC1K0/7vhcuOpvA%2BuH7TtUJN4UyIm0xi/fDwl4gYtPeQGwHlZG/VS1IT0SP9XYM0iC6zP/OxTDJjkl9aDp9KFpK5QfcVNUzT4RtRfnhXjLU9ATJUGVo4%2B2U3rUHcvfs8rpqIHdUXS8W1a2voU1U9TAMhjnWfFGIGaSv7KjCdiaFa%2BtmsdOuJMzeCVLkpzhXhOBwWx7BFNKEbLxehhV5CM0RwwYlNTG9dccz%2B6c2oFU4%2BFZ98krZ8eww%2BXB9N2lccQHWU8vOjqoCQJPTMVqFjbWxaHvUTh4jhc1ZmoewuMz0XBQy3Mit1sc8g%2BcwGKODKB2ibzh/FpJ8mMoTQC6TPbgcIdQ4K7aLdQ/lkzEIQ4JGyyMppvFgE9Ig3z%2BEnhf78Z11ZdpDXJwQVB6C3nXGK7BWJgUZDys5ABa/eYhFW5hBKlgMjKX891IBkvSPrNK1AR/W0A0/G0n/eRAN8icg9ZNHfJXyrN9OA703V6t3TrD5I0zSbI%2BugpvyYhjDDMxBuQJHZWvbH9d%2BAIVbyoGNjPg0a54MlCxDNPTrGaE9bb97CDcVEwr23Di3JBJgfGtQHwDg6IXcFGqy2r1e5zUgd94g2I2apI8jgs1WXyTe/k2gStnHdPCgNBi1AHffC7BhaId4RYnMJD3JFUCOqScvax36QyNb2GowSg3sNX3%2BJ/%2BJ8vUkm%2B9XnKQcMMjbzTzSqOt0pblQpG4inq0yag8ZLnph3GiqYJt4p3BpEaX2QsV0zzB6zm/PFrUq/vuGtrcrrE/PDocvrcmBYnoX3u83cCto%2BcJNfwz7TuZ5JJDUouI36mIpGCXOLuLcVUxJHZbbzjqIrAFEo/snHCtKpn8PxWtoWCYBei862AxrKfTT8BCibcw8nUUzkN%2BZuB2OTaZZK8v9A2B5T7FqgAz1valYMn4vn3pRDZ2ReDHpp3ksPHkRKOqVPpLTXyvM4rpFI1ndHzTreOoSRgkuQqCihyn7Kfb6nzPJFVyi/QVNNpRBc2JHYq3DcHAevVNqCn8aAIA1kbp5cy8I%2BrboBrY%2BrDYTzECPxA0LqrA3F7geuJVwbNIGdH69Wgyy2YIqkDVTfLYY1SjNKz0PwKgtZWjbOcrAp/TIX7RSMhxB/M4YIWODLQkcTlflpdZCstA%2Bc/KohZf1S/jwD71tohYKlWwGIQJEPrWDV3aAiQBVloxVjnj2mLXSyuqya/xF0OP6Qkn50sDp7N0bKjZtNj9%2Be54FWtDlrOsi0VlL1gEahwV5WcTEmXq3Ehvoevjn4FeXEdIRqH/5%2B%2BBnHbiboAXxJfDyC6r8ij5ckNffIu3pUaAjauoPmxSmPfl6kJ74/0rHk3plnrQ5Hzi4HOPA8%2BuOpnhtwV6PtRUYApCeW5nrno%2BZRlcfMtHfEqeqe71T17zd2GADn%2B%2BYlVQSBrEf01CCRwTWPTrdlL6SY5Vtq/%2BfwPboqzgXwV33uBMVX10sPFSwmxIaqc/q5lTe8o26Xf1LMreXZZlJ5giUtqBahcuaMuDVbMeapKdkduIN4uTldSPxGtFiPDqmIHoy8inZlpfIK7s1UdumR6bHfB0VvPwTvFqGIpgg94RKcm9udvJ279Wlnbuj4xtrjywlYdOmyV1dOqy%2BNxYMYDjlRhCo9oHMRA1V/HG7G3Mj0QGnPV9ozmLyeJtHNWbcapB987rJ9hjVbypOsoofKXxMPTIzg9Ia4PYfuzHoFddcF8BBIlAx4nW169z93UA6Ls/4dRQA1wEoI03e3Qal/a4ZoRwy2YZ2nYs%3D; MSNRPSShare=1; MSPAuth=2mPrMeziQGMxqwHV6ht878I2i4gYLb*1eAifb7vBbNde9xLu7Kho0wHCsmmKsWSFOwaJwumz4NWDewwQU8uvhgSV3x8kLaxn4*Z4YBUQrg32MEFWUr8rtksuaN7qDZWrhSvAp8Pk3N0R0$; MSPProf=24VXp3wcJFbczeGxCpLZo**NtHmtucgBpQOC0pPW3RPf4qeAG9hPf1Vddag8xXXRvsgxHFU!Xs0HApbi92X3MpykcqcYA*bHNhejmU6M*Bh30VSi*7gSFiSEVhBhnpfQrQh*2ZwFkeJ5XMjwsQDlRmIu9JJ3rpMCNBLm8kP7*3r!jSTAszMdexYYNBS314O42rPrLEsB28yzWy9hB3Ga4RQdvxMXKLxZE4; InsiderGroups=a78287f79f56ddc1-insider; fptctx2=H3ihr9e92IdW6yd1ZgQ9Sz4bj6XMGo9empP83sM5ewdiJz3QKClGa%252bx5Cxza%252b%252bFICp1g1q3EwLuBA6OkF4TF7HfVXwhn9pRLAtshABS0oyZu4pNcnElIYBiBCPwfB2j2FZt%252fkmyMsE9seIySqYn2L3TT5VcIaPbYSCrFR43hij5UVpIVG3pi1dAZ9KbEXJyCDLRmgxYOycK5VCbR7rEJN81EpylBFi6z00Hkr4VyriKRh5AbuFuGxz%252fwJUn5uqkLijBg4RNKFRTZheMhV5O04jUEM8LGEpGloa6m1nZxtGM%253d; MS0=35f08333b5c44bc5b9cd3f87046e39e2; MS-CV=01A2LrU0H0aG6Wm7.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}