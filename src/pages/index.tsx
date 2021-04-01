import FileLocate from '../components/FileLocate'
import { Header } from '../components/Header'
import { GetServerSideProps } from 'next';
import axios from 'axios';

export default function Home() {
    return (
        <div>
            <Header />
            <FileLocate />
        </div>
    )
}

// export const getServerSideProps: GetServerSideProps = async () => {
//     const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1617217164930', {
//         headers: {
//             Cookie: "MC1=GUID=3629e5ecbc22454c96a0f20fbb46526c&HASH=3629&LV=202102&V=4&LU=1612838124326; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1933&W=1; NAP=V=1.9&E=18d9&C=gR4P31D6q0gLM8NRlQ3HqUub55LM1Eo_wzzSmZd5kYaluQ4DvXPVFA&W=1; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=1933&W=1; NAP=V=1.9&E=18d9&C=gR4P31D6q0gLM8NRlQ3HqUub55LM1Eo_wzzSmZd5kYaluQ4DvXPVFA&W=1; at_check=true; mbox=PC#1a7eac0b94da469a92e9d07900847a86.34_0#1651051459|session#890a45acbf814b0fb79f527ecf9566f2#1616866620; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1616864760411-61369; MSNRPSShare=1; MUID=0A9FF8FF7FEC657E086AE8FA7E5A64CC; me-ct=1; ASP.NET_SessionId=dxzv2hxjppiw3udst1yfn4ot; InsiderGroups=a78287f79f56ddc1-insider; fptctx2=H3ihr9e92IdW6yd1ZgQ9S0kvtvZRuOxcpRCTIW%252fmvgy280xM8oesyITSZQ1J6BmbHnV3TAvyUbqUZEKK196lr42C6Jdyvfw88awAdsul5yTCVaIWfnvI3lnwhah2A8R06DfEvGZBxlP6ptKdbk3xqzyau%252bdGjvrr%252fMf0zaoMYhMVUjTJMFq9Ata%252f%252baK%252brMqumowtcxy5ScWCtZcma%252f4hLhLQsTswn2NyaNOmHssN1hTVhbRyhDTSihc%252bTOXbr2bM9KT0cNYMGHnZ%252b7i8lP4fxZ2FSj6%252bOM3wWXIHSFxfjgQ%253d; market=US; ak_bmsc=5A1D0E7F2E0E1F7CC67B91E6607A9866C91FFF9CDE7B00004D8B6460BB7FD111~plBPNh68Nz11x7FDDDtEL8EGz48qjqsHijiS+oexkExq60HN7sYoK0Q+fyL7333lczSLogtTbQSDIA4rnO6qa7Y6X4Ges7szQS8cjK8NsR8N7NBVUeSmaqQfkmn/aBvPbeX8Jceo/U6od3WTpwZh5HacdM4kAA9O6elJj7ZyecnBVpwsS911ZGrbEKliFATZalYShW3tWJqxse5mBn5a9Cj1l8rppmFtSgUy72UEScEwM=; bm_sv=103E025D6C789A80665439FC36ABC6D2~Nqu3DmKnNi/lIiU0IdsdFxRbCZgFJMwpUKwVM/bHWZumLuMNp1hW7ro6Ehso27e/zHtPCh2BkS4cMgwxrETyjC4u9ntQOgRYTCRElwWu2BnFs/URbh6iTu5KBlcF3CuaFd6rzeCBT5aarymzuW02ZQl/LPvGAuYaZo8aoX/vFow=; MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACN6yBQkcr6%2BhWAc6NXbyS%2Biqdw60ZWQqa2k%2Bc6Q0ZRlnQm/j7hRxHn0kej%2BculxLYTmm4afALQpp0uTP9I6P3Y3zwBe2J1j6xlfSzTpjP9qfmLgD7f8vQguT44x8cjVDPr3Jk8wvP%2BM8EY4u3JCdbv7tfSi1hf44Lb8BQW7fXUFu0rSv8hKq0eYQFrvOnXl%2BeiLxrEn8ty/KgJt08Om1Qx8JjEX2/SxaI%2BkElsFsTXnCLxYh10ATwI1vXgS6kBekwBVkFvBM3fixCO3HY2gvRwh2aAi4gVTdIPxxYoneoF5VqWMFpK%2BRPyor5sdJJQtJE%2BHXMPbr7RdgNivhLAs9Cdx5%2B7lakIa3u7%2BI44v/OPypBhpUKOxvP54D4JDVH3pfqmssOlfTIhE6Uq5VlZTh68ozFz5TlhoqUEvDeOX4MhklWTmxuwn6kHjUtKyJ/aw6ioRmyoBIhzO3a71msCxchCtPuPqAyTqUMUba08NBjz%2Bddp6J2F405Jo0%2BvSmI%2BzkC5rLrm014DR2fYMpRiWaYderzIm9iYGUZTeymhNGGKIeVoVnS03v/OvpgGGrBee2inga8Dl1U1fvpWF3Poo/CDz/Afbm9%2BL88xSyHOoUiCgxbo5aezmB/L7ZFqUQqnNZ3DAhWhFSUTvxO%2Bq0eF1VVV77ocr3vUYqohYKRngzCWKyw20dyTfr6yqeBRRIaUY6W/pb5aFGZyO69dgDzmMpaKryLKRg04/ecs6q1JA5ifj6Vmd8YLXF8LshYWVWmDXZrSWfKee%2BUs3wsoXOb%2B0w7yqXpAqFE0Llg%2BeaZRhQi4HvXvIvh6TgGHWwIgmU60O/PlsMJ5mmWg0R053YSQc4NKC3GdufDWOV3HLrwEa3AvhDPDctA0hC1vWFqcNcISZWXwBa9NwU871Ikkjf9aZ/M6iXzg4dfoHp1cy55r9IicLIWZHfB8vhx6ZcTezfjJX9fHSsVwNQVR%2BL7WV676jnu1MNroPLVfhv6cGKmvkeBO0kr0qtcFgFcqEl9a/q2b9KmRn2qki0Lbt2vrtsBBEjCnZFzkE3hL35246SedvdesDhe5Vto9y03C8PFy3actnPtn35tL9iZAy/AfhXRgP6ZV2gsM2TGq5m1wEWp3rE4VnzDBtTKHAV9tm8y6drboLxOclQc3GXU8mZx7FBD%2BUW1EcXaPxPZp8kJPhOB%2BXLYO/qvDEJWnuSH7JCvDERfMtyTSS5l3wo9pF7XnXLla4fU6qZM2EzKhkFjfyGj8IQK49wJ8f34J8ywFzPGGN7DTugZgkc9QuJymNVSW9Onq/zBaYDyMT1a4c/eZFAS8NcSLJOaL5yvE7wbcD5cxxyrjEKrgKFnHC4jC68RqLYeQqOu%2BpIykkirN9saxxkpxBMrkjHXhE7Y3fjFik6wihjJt2wnPugM/ZBb7QdCh2B8daMI6z4gHMZYSmjX8%2BXjzynIXfZ7a%2B95zEddyRXysi7URixQ5ykzQsMw%2BYSeWLUR/EzW5JBmedXaYjxF3HuPDO5ZVx5JbarHJnDdluYi8L0Trt9Ar6gbAYC2iw9fDgtHtgiNue6Eg5zCaAQ8ZphWsTX8rmfkJ4buEfO773%2Bk1NIfdrmiCWrkqccE9mRoph8z8AhgMOQ2bPmBuAeN1qU2/OuDn9PggaiKW/%2BjO%2BqLqE4ulGIvdSDxWm3pbPnN3iKdZPqxxif9iFCWm8Ld04PQgtfAkSFwZX/o7Mq1s4cTjsI03c5ttGtWfo2dFg57gZmgdznukiDffnNeNjc08T9ZeGuI7n0Oujl21JuQ3vpVREJYxdYkDcVIOFes68GFWfiiJPH8lJbVTD5isk8cKpsC1ANhR4ZN3akDgYGQGjtmlCCAJMHSPwabQsMP%2BGKk%2BM8QEOw3S8dzA90X5QT1jd0i522Dg3JjbgxiA0XL/ZVB/ajhxgwUYhjeAdFwcj5oBuscy/U0BaNkbecpx9tuInxVmJfygtgzZkLVJxR7dCeUjWt/HcjKmIZLCCUmI5kDUmLHCtSvUctdK1uHwjkD0RXKf64vaPPOV7yc8tYFTPZ2MmN9WieWQE/dpWwX%2BnuwgmB6op3wmchq1gCzFGCOMmfmusTgolWmx//GbzNKMoBl6s9CusJYrR3puFNG%2BsxqRpVKMWcVrU24kCDoHeXq5o3bXd1Yl5IgU5yxri6DyCj1lNCVOuJrrthPGMADt58sTe0VI/NKMgStcijS0JuPVH2QgJTejXN3jcm4CpHLFi2ljzfLiWo4JhAsYzkjk%2BjKmgUdqcwCI9mmjx7%2BQrCj9qLM9TC3mUo4ZJw1LApdDsVe3tvJqs5gCwcjWuvs%2BM7eVKGlkauE0dLMg%2B44I9ssLtDi/%2BuSTwNOqJqcbz4MZYhA7Z3GybIovOdWkYvkvaMEJQXiOUikE9eNxbB7aiCYOqPEJHaAIHiNQ91zk6aShIIM/IAQt9hFGH0TfE1ThBxMRseelagLmzCQ7D9x0JfBFWoLPQ1K6EVhyp5WOHflHi/yg/uxeolmIc8Dua9jrQSEDLzMHxxOGb4IhQAjhv3j%2B4pUP6Cv/cSaoY6ScSF0wY%3D; MSPAuth=2dMPxivh7Gm2Eo8qUeKs*J2T!C0wwAXoWGrd0HTuBIrw45Yx5j4YA3mlBOMjdjVgu6vzvSFyuBpiY2EPFxJ*kT3BFU7t6atb1yKcms*4c*sltYRtHDfKz1i7C91IV*Yuf6SbMuyPYAQWM$; MSPProf=2XautRssrFnTYTDHnMFLpgl1BWa4zXU7pdgPdpDL*yhUcytOxlw2*nxMIryrAuOHP1tHNndQiMhyyDI8TKPT!LeF2ZBVhbRRU8m4sPxp!UyIqvgP!OhHljDHvn!YpLloM9CyyiPMu2dIW8fCiJ6ojjUJqhNhc6JbBJpqtrOjlGDAWe1mvk94qWtlKitEAVH*VakoHTuWCYWpmBnnXXdK!WYLQR5rxoibgf; MS-CV=LSTFkBpbyEax8sCV.1.0"
//         }
//     }).then((response) => {
//         return response.data.metadata.mscomct;
//     })

//     return {
//         props: { response }
//     };
// }