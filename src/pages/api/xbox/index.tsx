import axios from "axios";
import Cors from 'cors'


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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=en-US&market=US&control=redeem&mock=false&metadata=mscomct&lang=en-US&cid=a78287f79f56ddc1&xhr=true&X-Requested-With=XMLHttpRequest&_=1631293828900', {
        headers: {
            Cookie: `MC1=GUID=c16b320d2afc4ddeb22394adbfc0adab&HASH=c16b&LV=202105&V=4&LU=1622066764682; _mkto_trk=id:157-GQE-382&token:_mch-microsoft.com-1622074930494-30943; WRUIDCD03072018=3316667864219931; ClicktaleReplayLink=https://dmz01.app.clicktale.com/Player.aspx?PID=1011&UID=3316667864219931&SID=3316667864219931; _ga=GA1.2.1205331116.1622517766; _fbp=fb.1.1624584421901.1136163943; IR_PI=a0a71ceb-ddce-11eb-b30b-a123e6f5a3be|1625602909297; display-culture=en-US; MSCC=cid=ts7b2c5higvuiw6oldujkkcs-c1=2-c2=2-c3=2; _cs_c=0; LPVID=EzMjJkODc2YTEyZGEzMTdh; NAP=V=1.9&E=1972&C=EbN371gzVf4yHezRELAcVpVGVBxL2tN6pCMWE4ZLTjocISOkUJTbrQ&W=a; aam_uuid=33068285850847972413634353341059332090; _clck=1nikvr0|1|etu; WRUID=3309642234806449; _CT_RS_=Recording; MUID=10E1011E62B967790FF01189636C66C0; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; ANON=A=CAAF345D8AE8E86C46311BFBFFFFFFFF&E=19db&W=e; NAP=V=1.9&E=1981&C=v4Yzc02Ce4DaCX5tiZiUJKxSi0ndpRbBZXR18VnFPMUnSPZrk-YDHw&W=d; _uetvid=f9c629e0c26711eb9249a155e0aad6cb; AMCV_EA76ADE95776D2EC7F000101@AdobeOrg=1585540135|MCIDTS|18878|MCMID|32606165887524311583660282503796334325|MCAAMLH-1631587963|4|MCAAMB-1631587963|6G1ynYcLPuiQxYZrsz_pkqfLG9yMXBpb2zX5dvJdYQJzPXImdj0y|MCCIDH|1558211478|MCOPTOUT-1630990363s|NONE|MCAID|NONE|MCSYNCSOP|411-18882|vVersion|4.4.0; mbox=PC#570cfa7d5e7e42c4ae0d0d71227db183.34_0#1665169863|session#f5b172bb07544d59bc01ca50bb7cafa0#1630985024; _cs_id=9e573d8b-16c5-a65c-f1b1-125df70667b4.1622074930.27.1630983167.1630983167.1613561419.1656238930741; __CT_Data=gpv=54&ckp=tld&dm=microsoft.com&apv_1067_www32=43&cpv_1067_www32=43&rpv_1067_www32=43&apv_1011_www32=5&cpv_1011_www32=5&rpv_1011_www32=5&apv_1009_www32=4&cpv_1009_www32=4&rpv_1009_www32=4; MSNRPSShare=1; fptctx2=H3ihr9e92IdW6yd1ZgQ9Sz4bj6XMGo9empP83sM5ewdWRaoc8v%2bx2Ln3HD%2b1F8wT7kUvVJOPUrfECjG8WNSY52ZHAciF1v4ni23%2fd8Ptrc6uBsUQykhLZoRcwBCzEuIYpRG0u2bAL6Qx4%2fPQjK6FkjsjfNm%2fyTr%2fwaWc%2f7W1OQSPDNj%2fC1sNkU%2fZ2jZj2XST%2f6KRlcxkcL6wY8IpPD8v8d3%2b%2bJvNZ3w%2fA2QeQIpxpckSvZGJnZOhR%2bQ8GswMjNfD6wxgg%2b1DTEZ%2bW4oAQNCscWB7Mlzfmrn%2bauaEkB2kGf4%3d; MS0=d8cb235d1cea47b1b60e731ea95b869b; me-ct=1; MSCOMRPSSecAuth=FACaBxSJK4YRnp0++4Mpqw4HWhSmhVMzgQNmAAAEgAAACM2pRFdqC3fOWAetB2vJTJMqaXdkHOucSd8xI/CxZixeJ2w/RN3ExAWhh+ve/bABwgOunN485FK/YnByKNysolSizuQ8J3SQUxzTz6+TtOYPJttRGgL9YRjXLbq6V7TVsQJhkbYjqFdtjmCuc6KfzQ4hkTs+xMyhWLpdf/2dTIpXvkXW57GtPogouH64rZf2nSPPIE6M07egzPRdd3MXpby7JFD+t86eLfzFAEgtWHGddsjHuCL+S/Dmnp0q9SToj1VnIulbHde4J0ULlDnmA7j6zyGMJno+z2LuTPveJYjutKJYmhlxFrN1gj+SnX7HTx0+JimZ29GHnvTVA7HxhzUx0UY4O7hnubqXr1/zsOiPzMBFwmhz+HmRto8NCrNJC/iF0+C0P4izDcFGl6e4G0Wj3sE+BNUPKOqXoUJQ04V64nVPQNvs43KvuZjt/HWclvWTlSHcjT0pjp3N0p3LnmUcHrRDPY/Py+PMCZbck64oXuon9jV0r1V0i62iwGfXNfpX6Nn4M4K31/iIplRMLYumcCgA4Bi19G/mJf3BdxhZeXHLtRYIJ9YrccdvJ9Hl44uUrnQ59obtgjOFJY5fVEP9NYNJiur8F6C0m0pQiB8iO5PBeBjqyKum3QNQ5jGVtOcF+DuRGqpmDgeB3hHOInwVxKWNOMU/vuveLURwnDy4vd1Z+3Tj795PL/B5BVdaTfD0gjb0BGE03iaMgwlB52q52AoIeiFtqMHL1l7dIl9evN80x024L/EHDfw5pmQ2XXA+AzS90rdC6yrUB6FC4xj2fFuEHKPA7eTcM+0qMrsOPlLBT/iT5+l03MoSBvoBTPyA2QkZVd1rcBsBTvXhCoyLdOupgjVrkncVwyvtuJOvYuxUoknnYqsuaaVGTF9RPDR9HtbuKVAWDQgAaXAvc0MyEsKN7/vD4Prowdd+djK5D8HeAfJ/8orSGUoH6g/xXk3Gjz+b4sp2wi+nSJ16usCq5AcLt/Tyu+yRzeyGWZMMyRuEE8Ym+DSAX+PTopLqAwhyNEvDKlWBaRL/h4FfpOOH4YXit/uQiEkOqEBu45k/d3lbj7RtrF0QjKEfXjkmVBuTeuL6FJ7MmVYPaFAQa5nfq6AzuMC8/Z7/srOdMC18SJoJ7A1HllgzmHuGygr6cDzMDc49lbAl+s7uqB+DGUTN/mG9wQUpk516KR4TeRz8kHz03I5R7lOvFgfkdVbnpgcw0He8P24wQC8pRrrI8hORPKcNXQRP9/Rcn2FgWUOmANInU+G7Fpy04W4S0du3Xm0JtHlq+GndQ1Z4altv/mbT/CM1ORr0eEaG5p3uJsdiJgfZw49nnytxBp1rzx6InbXh8K9e1WNJHz9+MurOv8eW0Ht8AYJmuTs5HMliDTAzszg4wlt68I/HWG/ybP4Fh3ecuATlGGG9R5OmeX1S6bWo4+/0CjRDdz4D8ANXqz0it3fhx5/xjt13xBCR4nksfOlpEbcQ3NsNkB9cH7g8Oxq+VDsAG2SiVMrE9rIy57F8/RCp74Ma2SW6uiKaA1+CyLbRVJeiWmmGFNZPvUinmmF1UZmORLOxUQqhgLmvlsR+duIkNxHi6sprL0yMIbKJDtI2A5M6NFWlOkWYooWWp/U1/UezfsN/0YwrkVF4EHQkh5IJLg9yvYXrIQeMaHKprFJ9b6mzcjvdo+Gfu2Vi5PqlVfyzLozXD2dVOQUAsJzKP0kitACbOB5lF9OWq7cVnKBsw2WPo6LGt1GbTaqcEgKoJpoUkbBdbigAA23P9KArUFYQMf5Cx535vRMtDAZUoNw1eFfhT8kjwLCVveMYjlfUSMv3KfnqdAmBJ1+XuiMnuoCVx5ygr1gEAeFWmKIyTEgRfnNHt44t1j3/cjnxu/aZ9NTvwX9p4gizbInyFZwGgvytyoFXDV6C76uCeo0Ru6mV8D5SHQVUo07VKImORTs8EeNAFfmRmjERGdP+s82tLCxflEDRsjRylxl6jPQC+88KpUGU2x0hg6/WXkvZwpAispdouqLQJiStH0ejHiGJp4ILl90Dpoo2iPVrmrJVaqi7u9Xa2gW+M4HlzdotmZB+mUQLW/BXJn/noBQDU8wT56xd9jwOZ6Le3SxqbhhZE0mC/chyLnbqG/foUKKuW0PA8xUi+CB7do/kOhXnOsW2syuYlMxShFc61uRt/oobWjWQ1/R6ZawuDLd8COtOhfHi1ofBPRAxCju9qT1YzpKJuMAcPqeT8ueCu4VX5pC72Q93AnqbiPlw8/c8CabG6WYMNayiQWO2inFfxf1YmlKDxQocuYL5K9NSE9Sh9HDSFYlCeMWPGPtSTSNOKKhgCNQOm4giNf/2D0DqyiVNqnkFKDSAsV/7qL0MLqn90mkrbkAsRPSfGb520zkRzFIUcNeMAL58h9JSHez6Ab/VUg3trLhE5BendkeDvhObiji0sbreAjLEW315XoHzUjTrJLyy08vPY/cz5l1sbK7N1IdW+nI7QhNkuSaZyjG3PUEfM/n2lWw2HxRW9WJPdkjIUKABVxQAuZkef231s3hagevtwVMqbSAMWCs=; MSPAuth=2THaH5C8oGTh!9Oy6lDFpwDotXXwnjqx2LykZXWtxtithV9rps6DbsFA4wGaI872TAd!vETCSgnuE!Kr0vVcZLPd41pYgTZUosbICorPNtCKIUxPiDWJmfPi86HMXcXitqII6mW57motM$; MSPProf=2Qz9gEJYKF4BjQU72ZYrIi5Si97j!bBhwbF!Ltz3d!WKCwl7Mp4o!gvWcIbfj5H3r5UjnPoBETrbESj*W0ylR1KtYRPGExnMuvGUX4NHi0gQtiE17Wmg1cQ7TKEffJxU5Xto3gkE5FdcOWkcpEOa1x!rLm2L6Z4M5rSTiLzOcbOKw4EtulnUrvL3tDbRIwF5D4OO3amC7Js6kMVuYei*Cm26V*E5M78X!J; ASP.NET_SessionId=lcqnxxewevwnebdpyuqw1scn; InsiderGroups=a78287f79f56ddc1-insider; MS-CV=gVViEdLWkk6LkSI5.2.0`
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })
    res.status(200).json({ 'Authorization': response })
}