import axios from "axios";
import { GetServerSideProps } from "next";
import { api } from "../../../services/api";


export default async function handler(req, res) {

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1617217164930', {
        headers: {
            Cookie: "MSCOMRPSSecAuth=FACaBxRUzyIE6vaYt7Vsn1ezurwSQOtYJQNmAAAEgAAACNpuQ84iqxtmWAexWy11RthU/ITpc9kbAVo5TdK8OV39uWwDG2lRWLkI2twE9HOdniOm7uzPo5oU8KKJA%2BGUg2l2z4VCb6UveMY4IobHvw2ZpCqvRkOLHR0oJh6MyIiP5/T3pq2JfqmRcPypR91A6qgaPpgwWv92r3CuDOlmDGHC%2BYdWWFvPMoV4vuZWtd%2B62dp41Sfw0CTLfbSImd5zrSqBQ4/iKV/D9tL4b9GBKvNyA0jNsTYdNhQ27GlbIna%2BMkhfwP%2BPTE7l7B6hNpBAVXVGHIFbeGAsvO3wqjGzMa7SRvFIY570JsipVVt1FXAjsCkQLD%2BXbnQovfR39yyipbaLjOm91ON4ymBAhnkCYTjEAfr4XvgggY8Pj5haqrNKbsPzHBo8dcKIQwVvi7Hrjct1itWHM5TsXslwPP6SfL2vAW8ZSmPeW90rChUJCt6vi/NiobfBX4XA5/caqXONceCDGrJUy%2BkDnKHU%2BvR5WJ3KJANJchcgfUjY8faNovJyQA/ZwSI0pqwKrNcdV84KZ1n6I02LbmuGNKmpsSGBpwXroovBGpSHdD8jFXOIEPYneV4l6N3NCKX5EPac1AzNBIbUykAqUvzavyLGjBrz%2BNDyYTbjNjHX6obLhOB6X%2BqTc0tdrrO9%2B1sq7jf6W5RRIiuyfgBJTbkHROhSq71PPyq%2Bo%2Bsit8luTl3vYH5Blsevcm0B8TdvsaPlU9WrEv/Ojh6a%2BmsadXXoGw6yOtircNog5m2MBgxyJMVjaNq/%2BoMWRJbWK3FrvH3%2BXGq0Xhf3qPaADqQ84sornIeZOsbxdnoxdq%2BOOR5LLTdZU14zZhdx6idxlFyTznGJYlxGQqv5xqS28pgvbFXcG/XEGPy0du1AsQIKZpWZrJrWZIz6mP3N0ikBYp0BOEmt0TbZaHmOKuI4d1Ny6PuIpf7IRdPjSU2iaVSrsEQTCMFQjzto3f3idKOSrv6Sp2dj2nwbB552Fgar6d%2BACG5AXtSKqLqh9IFtBApUnki9vlKvHdCWPZa7uAlwEAYD%2BIKOZwPmH%2Bdxb5h/E79xeHBxxkgmTNsVHuM7y4RYiftL4KH/FYCNeORZlZze9KZQZWrjs4fFh6j6EP%2Bror8gVqaU/EHhkUSiyd0x2rERyFTxuLxkksd6x1BggMqB/yKFdDVQY6c93Gr4iFum1PNhW9waQaRycIGSEijeGZUX/8nqzbfJwFZLmAG%2Bx3b4QuaunQ2jCn6wAtUKo0VI0RpjCwe%2BaHVNBrEWqs9q0qmZn6p8ec5NkaErp2j%2BoKMvywZ9qnpQZx7YXLrEQDFVnNDkjQ5FHrhOkokhxobEc1uXdb7pM7%2BUx3K878uqmDuOSjuPjHt5hZ%2BY4X0EzJOYNX2CTaoyn1XtGXikb5BZqUscXWRpz7UGIe8kNQdcPNLZbQbYYfZVc8jqEu4eTQ3HeTLuGzoZijEywIIS4Ougp3GfpG4Lr5/OWYneids3mMLR8N2Oa0TkXRPIJomruapo53K/EnB6sV5o%2BdZTwWAkNQNX/sru8Lv0iI5q0QehKQ6WmxvWCJDCPZ8ZmhP5IzrRWKN4sv7F8E10Nr2tHGYNCQfUEFNQDWtyR/Hn5GjXzVAHD9Rp2WRM1ve1%2BOF37VbaGObpeoeQg/scRndvgUxs9Q3i9zbcBrIoI56HiP93qeYBGFWJ3Lv1STkbaA5R6uusIIAcBfI2poBatz2jMk4mCyVKku4/5ZF3ydiJBPYxjP6R0up5DodvutNH4bSNQgPRGAmXou8kLJqSUd2nuuKFn6qtxlhvNlcA/f0sLqxGOXwditSCgbIPlmDNQ7JamSf07OVgSlAcjGncwmLxPcq9hn0H6T/SlYjuLvaF616/3sec15q9AXbfMVv8bbT5dZHEuyklSSi5NS5kqMGfDcTAwWPfJ/h/H8DbNaox62ZBp8oG/OUNvJXXJ42gpqP5KiPhYW15VO%2BM/jNgeRz9yAtTXHdUmPjCuwDFpAamvY40QnoHG1w%2B9T0/cIE8O/ifraV%2BrU5kCREDV5aKgCojt2G5C6wbExl7IBSYfhzZQ2JdvgDEHCxsskjI7%2BPT5HdEGfYNLnvEhyeev%2BuMqkNI8UIpIwFjcM5gcmwEdcChQ8SudY96oWSjw0asegHBL2hVILXUmiH0aJ0hDQRb5s%2B/kniRUsmpgP/ab7I67nkW6D0RUjAeGQlhAvjRMiFD9Gb%2BJ/nWiytSf26BiPdiuetReuT4BGdaLNsrhql%2Bt6rVldyJmQl4H79ftf4wSkIbQV1948lkiSsxuQCXBoF1YyliqOCT%2BLEL02MXaeNo/BVyXVy/JpbQgiLcH2CrNGmXSW6hXsaVrJAPQlWWPCAe04MJIVwS8fuBUlPXc6pHEyWbqucDPGgxT2HHrnemKmm8bJgfHP7fKLYzaJwyBGktHCsB43WbOxFyeCVa7ZNgqbFGgE7ZI0pNU1s2GyyVroe1O6vuL12erRfk7y9lBAKignqGsBeIZ5IAk8xr53vCrYPwWE9NQSzoWaSX04ZD8SqfYH/hYhEzyhQAMdcpuzCOycv9rNmcsWyfqAIbuSQ%3D;"
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