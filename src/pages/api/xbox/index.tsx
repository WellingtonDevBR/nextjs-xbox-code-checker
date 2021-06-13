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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1623608801790', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; _CT_RS_=Recording; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; aamoptsegs=aam%3D12322074%2Caam%3D12321301; aam_uuid=11062451314358537881498287062699608140; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9S5rgl8oOzJXlGHKxtZ4bVKrnCEhahk3B35wzI6et6yURNjZD8zIhawFkq2SxcFMqsoyXNr%252b%252fQxYxWZoPSvr0j4XPh1Y3LMIDW919WHEfn95AYoMrIUHiSWuOdGkQ1jM7prmO91Nig7D7KjShJgjeVSiyovlCfKsbrQEFZFpwNgZ3wbF1EM5W%252bqMtVojtlICVArdN%252b743IJIAmvOZLjoW94Hd9k%252fzK1X6GPBvbUdSZTj4CfVyQSFGQR7g8Xe7qwCMBu2PBTotDSG0bezsvc2RoNw%253d; at_check=true; AMCVS_EA76ADE95776D2EC7F000101%40AdobeOrg=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1996&W=2; NAP=V=1.9&E=193c&C=lFIY0lITDLmclX_dEAjpLoXEGzL4P2QbQNEsmVsAUqwbH-loyjQtTw&W=2; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18789%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1624035627%7C4%7CMCAAMB-1624035627%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C1839229455%7CMCOPTOUT-1623438027s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18797%7CvVersion%7C4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1657617526|session#bf249bc974f24007bf76e4d94829b142#1623432677; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.8.1623430827.1623430817.1613561419.1656238930741.None.1; __CT_Data=gpv=16&ckp=tld&dm=microsoft.com&apv_1067_www32=14&cpv_1067_www32=14&rpv_1067_www32=14&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1998&W=3; NAP=V=1.9&E=193e&C=izIbUW5dHS_x49K4U0tKYP1m9Kot6jjQ_HtrGBxfO9q9RCjtdVEtaQ&W=3; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACJOssdOqnK5nWAdPLL2ejRyDP7U0W%2BtDRjYvyy8wYjkcDq%2BVcgKT7ZFwym2yT5J9wJNMQN03MdpdpBdgJVlDG2DGHbqxnrVAAuKgmgCYhri0JhPo7cmncLB%2BOWwA9wzkwfddGtSu%2BUcxJCh6YX7EW3IXtF0bLn9gGIpAbk8bnmP4J9v%2BmGv0QcRO8LOZKPWmmkdWF0srUMDxAhhaIfhN5X9QirgzltdzDALQprH/6ZILiq/DQlh9Vav/PG7KyOb68JALTMBVuW8gjfpwZS66/4zSSlympdewL9ZDZWCHXNqYoIrYqmRMud6eberoVOHXLQ4ZNldSBjKmVPUrl1gQM3pESVS1WQ9IarjPdVjy2P7hpEGSIWK2zcDWwZzweC5dvjAlSSTm9CmI9GsFM/ujdy5quJt0yYhvwYuJXbkWxzCJrrJQAkklVlZ/2a7eTkjFklteQfXDT94wxExAdON5X%2BTgB8EtU7r1V%2BmfhmUJboe1vQgrDxeiuRTG7TJMhjxjAPuAACRYJboL2tFUHPKegsAU9bNsUYkx3v6lYik8F/cfs7bCCWT9trcxw14wkf2etet88UKMRJazLwiX5RsDDJyMC8QAvsIWch33e07pc2Gh0TFk1WaGVbbNI5PFKz53G0ZJfyuPf/IMm1t5azvbpTNjHnouuaIacaQRKF/fxpwbpjIwbZ3p4fNQDKKJnkPGYmm8QLT3vsQon/SaIfl76qVtSWbGfSoI8tQSsbNt%2BelUHbsKJ0bKr9ZmaPFX4YKIAILYQnTVKaaogk4UVycTJE34AplT2q/qS6gNYmnaQyWJOwnMEZqP4QduMMqoYERa6IGtFNy8iwliryzN8BuqqOzlBH3Esy4XEYXO4boPoWYimZcMoutYmvl/rezim4wVepbgspRDcKFbAvuDmYwaxZSZuxFNOMFftp1GyKJ0Dm%2BUvtfcGLgQUG5wL9yr3/azKjJDHkoQ7OZqy/3zYFNUb9PyPAzgAjS%2BRsbCYYxuCIfzajD2ulvVh0Emj36e8Svo/jTYgw%2BRaqjl7P/T%2B12jlNrjjcKdp4PhdWWs1EVeCW03JnlfkXsdQSXDB8adT5QNUhwGKnefucP2eMWtvvJ%2B93MTgnKyirl8rJ1R8L51Z/GQFfQdWvi3FMPr3H7HNvr6fJBQES14NgbT%2BhwkkfE/VwQtko/llB%2BHXbxbsWrxQVHW/XRtoohQikxzsc9zEKIO4Ao%2BkTH2uQFF3LWhzwfRAX55aW80CJFEY2raYRFjjhSLMqwXbo6Ro1X4qgcVl2yBKLK8OLqDCvOUdmyjM%2BXe/BrX/dLXHTf/OZlNXRS/8/1QSeHL%2BMNOOzA/AiBn4JLN7gszSPE8jWrf3ZNqNkiFNRcx2%2BRZVTnuO7bmy%2BdVRU1hwXSHUJ6dIUtKxzv86gWVnTzYoKOppa8xtCzcVqyj%2BiWhd4k86QTUiAaNgvH6lwaK03zOqTSlGM9c7BTfIthwl8qmSgBgFcaG7vLnJDCjz0hz/ljjD2wR0uegvATJoGYUiA/IP4azTSUZ4G1qu3AwMY1cUP92rwEMRpR/wJwt/TwaQA8GQoDdZ2kbu9AfzgVXyftET%2BCnMbP1VxX%2B7oclSYFZKpr3q%2BVzyBp9Gdg3c%2BeDIF36qLA%2BEQjKaJpFGjYWW0iBvsEuBgvmSfVKK9okrpcq9BLK2BFUrNAS7a/yamOOpSHS0/Ftsc2NVEdl6OmHDzQuxFv3HobU3JW2BUVxOWiu98nsAEhn%2B/kp1EeOoYu2s7iXQswNe80ofaVbCgQZCeMIqoSPRA8bf4LPqwlMqDO5dWPdb8l3RYIxs0/WgE6sUM/QGTV9m4Bw9DJjNblDtu8pyauKPp9Meve0qZJNbZxnksksH0QEopWnmEg3tHRmsacltydrBy/VsNbD9JKtGjasOKMFhvW58xfSlxY6/buaoP4CjqBaU%2BX0Yht5FGfHWWVzU4XG5ufBBNt%2BD7gwklNS/QgOK9ZJFwzlv5Ro%2BN/I5EgRymXkLI0zKup58LCQakt1wjgxy7Z6dUiF1pRK%2BLbnukmqL%2B1QsdY8GOLAHVGoiE%2BCwaGZgyn43tmelqis%2BOv6p2rxB367voBuP1foiTE1eR99i22F/Cz2D2E8tAldUONw6WaB7lKsbpjHbZsKMBBxW/d7z2WizZ9qMAmFqMpauFEOedSGX5ibi4/Qxw/abURRnmKNmGsA2q%2B/49IoS2oPFd0WNOaUYyRQwF/yjOKHhFWZfNfPYVsWhtreWZB0WzR8GAugpztQroWrhR48nztpdTzV41lAhfe86pgjJRSmu1gQriRbwgX5uT6IYad2nw0lmRWsTUaGwb8gPCM/KWjd7s7UL6hT%2BJbTEIoAvPKeK73bAqqO/hoCQtlb8a5Pj/Ik2rql7RCrv6D4/5O1DhPOIInhJ3brdQztWDqIZ57H/RIigi1lRKqcusZfErlay0WMFYp5GKAxi91NhXAEwe4/Wpby7Gt9Vc3PYEiG/9oRBbHGr/4ZDu6NboO6YxPd0RiBPJzzOUTueFwKebyv6RQAKKjp0LgoFUVz2SZQ7fRjEy9PZCI%3D; MSPAuth=2zDP!Fk8RGWnKz6BaGhZZKKkGJbxPogesHMAxMONcEh7w6WK0XZw1fPah4ityZzRrASQLixrYmgyoBjJxEqgDih7e!xOaLE6izlpp4Eej27G7!p9Q55JXNuiNbKgFHlxZVKhlinS4TyvY$; MSPProf=2!k4I7vfkFpskP8TqgJ5*pxhofwzr9WruARdWUJbkFl5uFTpx7CAZGNjKEUX7KdFkkVVkj0iwKD2KX5fh7m4Suma2uwsi*6IllFXTnIZ4hxLiYOouwk0KA1C39palXF0cUYDkxDR9BZgjBA6Xw68n1sfUWeTowuOt6*cKHebgSgQHnd*eo*8JzUNWLYrEUzQzCp4aZoprjpq03!R629IdUj66PC*gzeRz3; ASP.NET_SessionId=uwnhjijudm4pzni2dprq355w; InsiderGroups=a78287f79f56ddc1-insider; MS0=5d79101c99da4f70b6628b2cdf9200f3; MS-CV=iKxDFMG4cUe1L0bG.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}