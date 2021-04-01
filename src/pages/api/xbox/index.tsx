import axios from "axios";
import { GetServerSideProps } from "next";
import { api } from "../../../services/api";


export default async function handler(req, res) {

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1617217164930', {
        headers: {
            Cookie: "MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACI7Axk1eG2X0WAcUV2h5b1jUQRlZGkTtF0zQK6TnDueXNKePLzPQXXKBYxFBCfQEqs/xtybJULzMueVMH0nuFVRE87luq3TMDJlgfI0En38JGhLw2hlWEZBe76f8DioKaKGVubXYLOyXuf/ZVjl3Qfpu1Bt4WMrpyIOk3DEueunaVhyhpsIDgmmINMVTkuNjfagLheJTnsqezUvQlC358laBaAwZNUCv040Ov9Ds4DnC6oMROer9GkaCRVpIJ/hChC7Mns4JZSUo6bQxLzDoYo8p2TGdOt6hfOOqWwHXys325fpu1JSdcVcZRsIDQdN6rWxI0sGO/S6yBE0gUrWKr76dybJknIWqpqyc055%2BmoUvEKbuTT0Amo8iEzqOM1GH5AUl/Mpb3dlfDhHo9WjyNeiofyEosqPFsZqfseNAl6ZAd8ADXWarUO0DJ4Sjj8bIJonWKe1PoQcNUfnxl0C1Vooq0dlITdCZqcvG3F8Q8wxZLdEV67LLX/K7ZLQUAbVPvIzYjP6PMlfYX3TQg5kg7FILwG4zWLeJouYKcaD03XbZLRz%2BZW1xbGxGcRK7hm71GvIoPB9IkE2HxTXhKtcCgzkNVPzJco1y28UG10O/tA74l2Kp6OXPSAVOndrJfP6I4K49UOhQ6U9SktUiT%2BIhEHMYEVxNEOVYpmvloM3QrRQDfmQbqz6LDIIdEEFvqFhIYNXkTOHlrfLGG7x8r79BpwKnLlpO5GSQxbqwWfW/qFtnFFKTvnMRtE%2BOJQJC0ATTdv3VanxJIpffyE2pSy0L1lJHAQoN%2BnDj%2BM0G0FkNb8nal4aq/4qefpwR6hT0lAHeNDTrpnbB81DPdtO%2BPsn%2BRsgBewxH06UtsjBI4BM/C42zGNjk761y5HOwfUsMhbMHmwSs17fJ939OV5SQiFRnV/yFOsEkaEBt%2BHTc8pgk8Z0ts1lbwQQei0EARXsOJNR2g6j1MkJ6JH4E1wVjJW70/IjpXsyXe8kcT5zUeKFzjy4RTMzWmrVdKbXPVC3nzp6gJxHnpoOIVtIJ0mtv5P35T7mTuc/F4iLThYxyj5TZA3wu2b8Qf%2BGoElM6MXetNm9/%2BBK3hWZBLYnDQZxuv19NeL18bW/RIiFhiJAOGyBSGQdYQOzRtULnxw5ky78tXGiqDFQbX1a699vY19p3a5eiVDB2vPlrnLJ1ogXZuRSss05ueCWXsNIkJMfVnEwbe1VK/CyZEcYROzI0U24tclnPUn6AhLqSXMsUPgQI3c%2Bxto2xLsesv85pgkY32VDTlCCzGxfzPXmlAaRFdZHqMcw3So2fquDYtIOp3ZXHNgJk9ymLLGVobLxYpjNB%2BO9aDbkWh8br7yJRunkU7ADtrNLDoaHBllcZ3dJHJ337nBooFd0nqDRaG2yBGGBJpzLTF/C2yFPbaFHNTY4igkP%2BV6DYwCF/3p/Zb5vCcxx86tJJdbbiRdP/sC8owszWdyX9sORLKv6D%2B9qh0/rRAz/e3W1L/Wh8gcky8qVChMjHtwrJbydmIHR9dpZhYsIsgfxGr6faZeNIXiEtmslQnsQABHcfzyih/pOxvZ2BsC1DH1RscdXkKVESOU8jK5x63wGVro6dyQwaLxPBXotvm1Lwdi6l83bYCBRlPUrurR/tKx66yZ0%2BPCMrCA3rxqfPHuQw519rHwaOLUETOxNFy7/Ycd69ocb9S5qSY3KXpuWUkMMcxMKoOoXPcGhvGMj2iNxl%2BLz7tPUzg6qAz1DlmDlRP12lXJuLssqQem8BDut5CpDa9ms91QIaIX9QAAscFvZtyv/uUODF1QYpjcId8g79DXtStVZh4KliAbK2KWWGdNPe6cm2ziwfYkoxjucUBzgQtSs9y04o/OcXmyyAMf4kEaHgRS/k6cz8B0xd%2BYfXh//ncKv9JksquH5%2BK/GdANkM5eYwcalEH56Y64KH2e1PecfDCGvYHsRGHsicPqcU7Vltpxqcq10CknbfISQgPts8f7fyWPEMPZ/7vp%2BRxFYu4n%2B4yAxG2SLBlIlb/d971qF5Q3rcZ1zAgVIv5eCVg1Y0i0VYWqM33I7WM5YN8X8NalLyuZBhBb4dOsx1iOjF4Dagr79CejDAcO1wkwQV54BOC/o%2B85dofIw4sB%2BuM%2BCNqI5Dy%2BtPn7N8iB3xLnzKG8dMmRZwdmzcbQH4siOxehMPyhGrr9rMdUi9v6oylpCqiY13mkvBcNp/KV/p96NG%2BAduW%2BLcdHyeXIkrYb7zKX1nd3SSlDVD9kHNiYrYduHRqGYOron5sk3MbIcMxEL%2BCtqFFh6rUqzA8fKjrrpKsg/cYE2TLcVxz2MDW%2B/jhvDWtVe9%2BR23c86PI7XkakKhLb6%2BlEuH4l0y03Q3%2BJa/XN5beIyPFLFaxqYV%2BlNQT3KkI3npsoBdkzZncv%2BwalamV6FmCRsqlUMnzjCxKtFNR7MZNBc1D/p0z5R/AoCU00%2BV%2BWaElh2iNHKdjGggWxLs8%2BL7pMEvqzgbOy5vvbM2iaSizp0mA3b3OP1VeMTpcwRYdwSJxe2IuBQAE2cuOAqPL%2BxZNPo1PsbQ6ykwQy4%3D;"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    if (req.method === 'POST') {
        res.status(200).json({'Authorization': response})
    } else {
        response.setHeader('Allow', 'POST');
        response.status(405).end('Method not allowed')
    }
}