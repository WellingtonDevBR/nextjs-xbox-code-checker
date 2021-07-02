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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1625230427872', {
        headers: {
            Cookie: "display-culture=pt-BR; MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; MSCC=cid=vzsd4vh2af1mtzfydvgnvs6z-c1=2-c2=2-c3=2; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; _cs_c=0; WRUID=3309642234806449; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; _ga=GA1.2.1205331116.1622517766; aam_uuid=11062451314358537881498287062699608140; aamoptsegs=aam%3D12322074%2Caam%3D12321301; _CT_RS_=Recording; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.14.1624345090.1624345079.1613561419.1656238930741.None.1; _fbp=fb.1.1624584421901.1136163943; ANON=A=3547CB54ACF2832A5CCBAE8BFFFFFFFF&E=19aa&W=1; NAP=V=1.9&E=1950&C=Smmd6Gl8HEXr3UMK85Pyxt1QScDsBNbSxUq7f-uDepPsRu0uuW0_yg&W=1; me-ct=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19aa&W=2; NAP=V=1.9&E=1950&C=9tRhCmoNpkvzZ0nscdlGFANR95GDPe6NrZNB9ST_ecM3EeaUyvbbPw&W=2; InsiderGroups=a78287f79f56ddc1-insider; AMCV_EA76ADE95776D2EC7F000101%40AdobeOrg=1585540135%7CMCIDTS%7C18809%7CMCMID%7C11523789172275074111472328214423920963%7CMCAAMLH-1625770874%7C4%7CMCAAMB-1625770874%7C6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y%7CMCCIDH%7C611216252%7CMCOPTOUT-1625173274s%7CNONE%7CMCAID%7CNONE%7CMCSYNCSOP%7C411-18816%7CvVersion%7C4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1659352773|session#e4026d369de741c4bfc02ff01cdf0c05#1625167934; __CT_Data=gpv=35&ckp=tld&dm=microsoft.com&apv_1067_www32=31&cpv_1067_www32=31&rpv_1067_www32=31&apv_1011_www32=2&cpv_1011_www32=2&rpv_1011_www32=2; _gid=GA1.2.572374913.1625166080; ASP.NET_SessionId=hgy2pxkygcad2knwsc5lrchp; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACCUeBP2nRBhSWAfSZLMgH0Sv0IlGtUpRIhltSfzKS/bI4ynkQNn88%2BfrFRumyHGAffDjY7WZLl7w2cirOtAhdPxdpM7X%2Bzn328MCxC/h%2BcC18TLrlAvYg8TlXgZCqm0CV84ASrnn2Lxa18a7wQtZK2NLydT/G/gj%2BIbUmC0A9dJ%2BlYV9RznhO8MSpp2aiqvGF8ol7kG3aaqxPDX42rOLZrif7fOsQmS86zyv1GVTcfiG2YYTDNpvJ1Av5EpUN1IlgvoDstQvlIv5e3CYsCzV13YLiDur8xi3fuvk2SCbQ4emDW2r0x5hgZRCDVs81O%2BnabBi3JU7BYIH%2BM5vMm9T6NbHHegcrqVo/LE5QzXCTy1l297QaDCxhFPihSzGHVCB35Ey7BDms/9FUuc2DsFz19Je2ta%2Bao%2B7MZ0n1J7jiBQWFqknDipWdHY0bBdVleqP/ah2KwWiAF%2B/ZwK1Tettp0g7dXmvctxLVpmYjbVlDptOzFFg3VVKM2a5yFo/ONXPVmU/4sioiM5Tzh%2B0TQ1LN7TaI9IwGcdHaR2ZIlMijZiTG5/SRr3IDnAXEXHnEXICDgzqOVekqQUCafvMW9MP41pPFWDo0zNdjWatDRPLkSE4tcgJn3xrWkeOwdl/PtZlU/ycZ3IDZ3DgEdmUWlYTnE5wBmzVMeWjMQ%2B6fhT7mHPKd4u9atlXRUJIlBFz7QITjeDCjmQRgRe4QkB8o0ElkxB54TaNp4vTnzWJhAhndxVOM0rBiJ0yXqXa299HNZ15/NB5F3i14mDvsbmo79ZKeyYj0zD521IdqWhHhCSwu8YxKxjRN9Nw15L1FIiHSoMY96boym7VPmEBJGX3iCLFn08A2X5U2Ez7nQpmyp/LYu2OesHYyot71ibKoUH3M4wDD3%2BPG3rOGufQAoJlePXN3VnVz6Alp8QSN5E8BpkLMHHVGbyyCfGx3rqNOpQaNwqcR8w9I7whsvdrVSl8mJK8EUgRA1MJLPbrw/Z7k5lyLxocxLhZYpXKh/7cVY3HYMHictHwyoHbtM9kS5EmbTkZvWUO4v7lpMv7vnm7hzkb9KWNwo5UrJRbezwA/tugQrVbyUWN%2BYYRf2XJ1W3ykblGw8og0ki09xt37iEe5hD41iGPgbfm9FerZZagL7AGoLQ77QGHsqB8b9RPN//aE9Ki0gl8Dw0xsRTfR%2BsAgu4n6e5%2B06pdCYNXNJVImxMacfL%2BDq9yOypqMBNI4yzZK0jAtCJrFzfjUfMndEmGTKbnwRmh4yz1dyKAAr012l2l8kTipMlmqi7W0h%2BunqLi6FJZylwUuXidrO8Yil6FGfiXiz4bnIjeH3EHjZc5durUXIK7cBXvUcDFPJGA2jRX4yRtlLeIHjRU4FE/w9/r63qieqrGJlFjn1bhDqFJIA9Id1ETuiRf8%2Bq4RGUwI0NUgTCxtA%2BdLK9ps67c27br0pxF8iYhjhijk/QNMRR3bQ4VxqjIp8mOkVv7QNUoxRM/8J4ET5dy2wPcsaiz7Ikrp/XTWS9M7B8nCtglHOsElM0nibheJzRklczB25LdN6SJp9vNJxMtbFSc9LGM/PmDP318M17Q9WHZF6y7BBC/3/B397tb6bqFw2hK3Tsk97ood9JzcAHjLBUJaVAYqSve67EWlJhl31LE5WmvXU2X71WnpzWw6BuGVU/470bwdBmX95M0Il6A3l492MYjEuHr5DeWz1V%2BbgnKaIF6Dhtx6RXII/evycOGwWUw1vLRKr/WNs3q/DU8k7jrDInmEFkZAuLUXJkEGOvLtN3%2BzWyrLyPE2EtxXyMd5/vck0CDbJ8M1VjqefXFi42TCHbE0KFYDsIE5le5wtpNlsYZNwPlQj5CZzJ4436OEyPc6PSyjZj1POT6ZZ1VdF8lAEV1f%2BfFUh0eZ/dc58yIh5m1T02PAXa7U5bZrOE0SE46BKn9gIsBzx6NA4PUYWx6FWAIYY8IfbGR%2B3LgTTK10zFVUpaYSzQg56QKouAzR/x3XRXa1fKG7WkyNMLkO7VNk0MqH7ccJhZieajqtvDQkUrnVJBmlQZqexDAlh3Qy19cKvHxdnozaFpn/OA6A8ze4rBMs16iL5dzVXcdfADVxCpKJJIJCTlsU/dvY%2B7LUh22iRWaw8kNQjToTJjktt42M5f6yvzlYVhJ5wd8Dqds1DFD0MZXrzZfh7Tznlu4xuxPrgFv8rHRlCO4ABc5zwdpTwScI2fpcdFt8wpmdNv3nOqC/hq5MxdTkNnrmAubns01ejI70oFwgGyUy4rMy6CAVVL53TJkzJf/McktYjiWjOgeEX0YFzJQ27A%2Bxj1T1pn48PKqJ%2B1PBcXGitVwZjv1BA0Bw7KsF07JY6rZBdjaTsvrVqRJPpPBNeh/EZsjz3f8iGIld3a%2Bf5TOLUh2H3W2DYtdCEPB8jwJqvFz2kXPLMh1DlrSnstzIPgOcLm/YGC8xHY4T0vomnPEOqvSZ0/8LUp3fjH9MXMnX9q8C2SkI5DH/sXVFnE8jQoVjvh4yQj%2BozaFnGBiORNW9L41mBQANv/24SYWSai5wI9FchsUbWfXqa0%3D; MSNRPSShare=1; MSPAuth=24tpcmaxgGwznb2BhZsDcFEinPCHd!j*EwzbCm0tXQvDob1XmzmPJL52oW7e1DfWDQMaFcV4Q9w9ig!MUds5mqrYzXIKOeO6dw4!QyNKsGOk3Hu3D4jn3J1*Fe4PrwR5sdCqk!Y9kP0S8$; MSPProf=2aEsHtEbzFGu6ywXdKLZFVUBB74PFpkIS43ug*bS7FWyk83f55rBpDiV66Yt!8oXXpHB00CLHmHnQpSYeYIZV38C2*HESEFPNd7f3ZKIYzATsYp7JrELBdY8gdxACVzWGvescEZerQXv*PK3zifj!fTmVrDFC6hNhEWc9o9IE7rmsq8I2EPxhWWK6di2!LRBSZk67M6RhDoZnze4*h5cyIBv1QeG*bD8gf; MS-CV=Q+xbSBdR10ii6MOZ.4.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}