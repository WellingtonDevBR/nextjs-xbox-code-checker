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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=76f46cea92bdf767&xhr=true&X-Requested-With=XMLHttpRequest&_=1625636541124', {
        headers: {
            Cookie: "MC1=GUID=acf715d29bf84b30b613e58cf87c16fe&HASH=acf7&LV=202104&V=4&LU=1617670187618; MUID=04DBB9538E3269A703CEB60D8FE768BC; display-culture=pt-BR; me-ct=1; ANON=A=464D94879A4A266FF5E46A7DFFFFFFFF&E=19af&W=1; NAP=V=1.9&E=1955&C=2XsyL2CzSYAsiIlalhbEgTKQjg34I3QXaT0E4XbbpR18C6YEUkZLuQ&W=1; ASP.NET_SessionId=htpefud0cbisd15rlu2oz0fa; MSCOMRPSSecAuth=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; MSNRPSShare=1; MSPAuth=2PX9ilBvKFItiqCf4ZffCbRRFxHq8VbCf2RgS0lZzDlhc37ZY2u4835g9g3tIPLopoXvxzqu4H447lvJ53MbJGTOe8DREkR6RVWBsqrG2*L4k8OjVUFHqaPxv*6s!0sYMorFBZx6diMQY$; MSPProf=2TCPlcYNgA1X9bgtbb4g6xJczBIucl8pu2W5gLP5jE5vM9JQLzPsEucOuiXnJSxb2HsAGgh76Sqj*1hOGudZSWCrFfW4wdQDi6WhtNB6D2GwFcbMa0Zt4!AAbiWUCLQW5MJVGpsbvdY66Gi66WfrZ9S0YLAGAPrPPIs!eyffZt2ruEmfZ5FUNiY51fg5DkwYCmqFNkJfJw*1ln50OxBKlFUQ$$; ANON=A=500A563F43180AD91138FB5CFFFFFFFF&E=19b0&W=1; NAP=V=1.9&E=1956&C=-kuZ_wO1DJfv3MlYmP5wL6IhgDeEjSc5UMlQnNTJ4suxAAo6i6pkaw&W=1; InsiderGroups=76f46cea92bdf767-; MS0=df1230ec88414e38a6931ebf2103a022; MS-CV=uZkXibZWH0CWFrdE.1.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}