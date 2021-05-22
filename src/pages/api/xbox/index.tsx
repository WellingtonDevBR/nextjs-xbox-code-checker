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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1621662455423', {
        headers: {
            Cookie: "MC1=GUID=f0731a20bd1c4a7ab7e37478560cf1d5&HASH=f073&LV=202104&V=4&LU=1617311531814; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; display-culture=pt-BR; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=5; NAP=V=1.9&E=1921&C=0OXmQzPDpG_QN3jYYeBpwBt1S0g6Ll2UTrsxt24cskQGPMsUrNqpfg&W=5; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=197b&W=4; NAP=V=1.9&E=1921&C=NjqxyY9rxkbWShNvZsVfEHY6JoJopBqi1jLPNnUyK7S6IoaVsezY6Q&W=4; me-ct=1; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACHX7OB0ubXtAWAeY6mzc7ywg3nTDl5e1RuXvK1sRRfNruQZUo1WCPstd5ru4RTJgbk/qx%2BYkXvVoEMmldmAsgmOh0uTIt5x%2BQBQbVIoGPb38No%2BOK7jssh5plVw8kD4l2sU1Fg33F2p8eSh21J0MbUqW6jvWaTmEi/JLmGj7sMn3v3CWFLngVytsFRLOuoQyJtW2hjKWRix6yqAeMXu%2BATS%2BNI8cx5WtOLQznz%2BNGp5mJ3YLNGHlm47nDMALvJ2z8nQoHbHhgqeCd5kEOzzm9kfcAaVvd46kBWcPEAjmX7hf6VfyTSl8f9HMhb5APswX34BBgbgVCsTuoCSasqgkpc9yZqm5arHBvYiEgujmsy7U9PBkCm91mBWDYM%2BkLtJJYTp%2BPNGZjTY1WGj/a2BbjktB4ShLpwpPaWrut28dIq5MAUEzyXro/91XvwnTpiEzwgIJRUbbh4S8asKrE2nHFlQvVIuAllWK9Jj5dk4g2mKBMvxmGA1YdttPcIG1zVdQ2f5%2BX1GXLbGsiAAZsIxgTID/NjOEsjaciAtbluyUFmC4N9jk50yjUnLd2RWQ6dzp8s8HaVtRpKm79UCt6wl3l%2BP02P4ZT20RKG7Vl3ttHjMO7jx4IDX9R2B8fUEKZdsiWy55k9zqMoAiiJraqTHHQ6XT9nBurUitS6iwcGefOBDnJg0BUUhnOwv%2B686FlcG95NpQRV/t%2BoQAwYSjONTk%2BtfK5Ss4NbkZiPdmoe9W0ui4rPf0GsFGKiZH5iWN1qJDDDswlbOutt/CKQ4YSxCeZdKvoRDBW0S/aafZDNg1PNo3Ylt/n9gVF2isON8ppNTAHrF2Heg1Yc6/n0vNqUGOIGs0SY%2BwczHuHrt0VWXHHTMa9gjjkObuPF1Eu%2BI%2B0FkjTOU8XHZyWwPklAZTsCMeckguJDILlpM43LPNM9Cw1zpixc10gkBX9qX2Hz3OmvXzhdAOOvoo4x7L8Etm24fpMZCbIXkqeqP7UwEMSy5stzoadIMHQiLecWkRubSFcyQCz/Z%2BfhQ3wfBUEetE9X%2BepbzHG1wI4ySC/9GcvEVaTnPCHz8%2B40vOaCOQNCXnmNwM15sDQdIm8ly0gAnuDeySuIKcQn0r8n5VduDLOztvwz5oz%2BqcCII8E%2B20Nh0xp4j8lmdnmfCoam9MbT8SiEZrKBM2IZtsmBl2QJOyboV7%2B4vd/5YL6I%2By7fmhL/1pITFrliXC3kmfdnS4s1dXwqBdDIiv6f2Gk6/U/4vGYVzPn81MKq/OaYRn/UZmnLpZcAvG44JaBhIKywMMFE8oPgN78eIPZy%2B5j%2BJ45AUh2%2BI70kMzPBjeQYKX81Tlw47q0Qy0uJtHiiNW2MLAUmQ7GMEjGB9yejxdcr5BG14oiHVk4Sobeg7b1CdxQI5fa42qUg/abtLjqVmF0EgZ4NmqqF8s05N6DsZQ8Qu4VXgnV3VddjeKdPFDd607fsZxiKWYbD4KCVTi3mi8AKuk0C6QnhtxL9W3emv7lS7ymLf1ovtX/TMklwkN9NChIm6CGItFmA5xXYoTLpq9DYIjKqMYWDc5pdgB%2Bje/wremEha2MkU%2B1mlYSjmQlA47HEydqlvFPHnFAymh8DyDDa/ARe2UvkaiUJmcps0Y4lVPSYjIbU4uYhzuKT4CzKUPP2vG2MK4wNYze9EAu7QNLTt2sEuFNnq%2BHHDcnhnA9NkZ6RFGcWgJQhJTS%2BwknWRudBrxZpcmcy8/iZFikqpV6Dj2QFDZ3Ie3on1q65uUdq69LqNvUTloioJoZpNwTbV264F65Fyis52asiqvk8wDUkZUatxsiVH66920lk%2B0aMMV1/CHLBfCuUrlxjrobg7d/ncdnXxpmZHE12LUDyiCEEc0SRUIVw5ahyNg%2BeC7HNtltFiscfBFZqITdze9zuBY9rOcLKSwbztOolkTPp3k6kQgNQMuDssK6kTku9oZL9xCba8IDuYVnNx6uRNGzhBkUBI89IBxdngEdG0M%2BKrIjlNLsSf%2BS8qS6IK0qjmsV7b13bxwk72hc0CyPk21ugsfxcSo9Iya%2BLEn4TAiVwhZ7VUxEwQTMBih7fnlaq%2Be8kg05JaNRqXCiwGwaEpNTHNtBlGp6Au00GikiHwEFNejAy0e977jgnFg6RAfKLku6zEwatj6QhgELRm5YdTs8FZ7BDmCk5tT%2BbTaUbRZH%2BGL3VHpiSNF2kGiqXIPWcCXvVMBoUmccL9EhiwH3p4/5Q7KhmDVEUN9mzXu5p1f4zHGfB/coHdNCfkLQBqcNlWcv8BZpqCwRNfSOFLNHb4iKwFNUXzB6wjCUSavuDKpbr9zD2xqLL8G2XUCCwv4uz2zqFWxkPMGetMJ4jZhg1QEnpbBh8KQfnDRzuJp8vcQ7cRfb%2B2c3uI7Y0dkWoBDGUP3NXrKcgzkyXfoBREBTuSucGBKohE4/01p3f9pjPtU5qCmVMYE2wmTFLDqOzQ1wN6X2mJVL8BIx3UYVSR6D2%2BINPvuzzz5vW/agH9g7QFSeSPs3rHRHQGAgXfLd3TLphQAJJqxSfMsCFfsLFrM9C3UhS1zdUU%3D; MSNRPSShare=1; MSPAuth=2*9vorZ74GtoyfnsIpplsbCWAmBQQinyMBsa!Jj3PLVkZ2K!I1YY8GBUR6vzlraatOeYWxSH6mC0oLzboDwQ1025OxR2kvWbrj*kxpjjFWTQkAnfNcECpcxTwzoFn*XCDKBKcqCEndKMc$; MSPProf=20g1Gbhk9FKZfqzDkPno6DRKXeRNjOs*fkEQfoo7gDCXtM*!6DuLrR*qvi1thEbQCcCYj4veWuhsMqA2KzlDU6yeXZs6IO7VrNDxOB4mKnKrIoZ2cmy!*dZH9XoqNfmba9b8ErR13VyKW1yTe*FMZ6qElMnbAgwjWdEvUqMm3BMVaL2Q9VzVMMe4I*NkwGdUpW55fresemdAMn1Sl4fd7DV7I7gxravC70; ASP.NET_SessionId=2j25nuc5i0d5ao0ueantl5sz; InsiderGroups=a78287f79f56ddc1-insider; MS0=ad6553acafd4428abefbcd98e53b7f4a; MS-CV=VWv3c/SwyEapirb+.2.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}