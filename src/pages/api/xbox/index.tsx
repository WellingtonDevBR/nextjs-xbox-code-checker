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

    const response = await axios.get('https://redeem.microsoft.com/webblendredeem?lang=pt-BR&market=BR&control=redeem&mock=false&metadata=mscomct&lang=pt-BR&cid=76f46cea92bdf767&xhr=true&X-Requested-With=XMLHttpRequest&_=1626468835630', {
        headers: {
            Cookie: "MC1=GUID=acf715d29bf84b30b613e58cf87c16fe&HASH=acf7&LV=202104&V=4&LU=1617670187618; MUID=04DBB9538E3269A703CEB60D8FE768BC; display-culture=pt-BR; ANON=A=500A563F43180AD91138FB5CFFFFFFFF&E=19b6&W=1; NAP=V=1.9&E=195c&C=vmQBEzUUOvXWFxlwLtKvvFE79Z3zX365tUSUcOWRy-7o59adnAwYrA&W=1; me-ct=1; MSCOMRPSSecAuth=FACKBxSJK4YRnp0++4Mpqw4HWhSmhVMzgQNmAAAEgAAACOrq3OOa2GSNSAcDaGDZjDTO5IZTB0aRKzuaV7lm5GzY8s9BORRwpYmeqo5MmiPrA2/k/JlhHYdeRp1YZxOa8kmCXFRrXiSGNxPoYbek1f2n5p/xBbPkjCUlJOISbbrV3gXX4wif6jS6lGSdxb611Abtxr3Ioj36AauEG+MFKl6byXDvebh75A5wLwd+P7RysKlQSuwyJ0bCI8zShfvOfKX7WNC+29pt/0it288067lOCr2y5P2aG36+JTGqF4QAiRXf4MNKzrnZ9OXwr4yKoRktVJBpslG8dI1dLxloCA/bgB/aOo2zSKrWl38oH0OiZSKyEJB/YIscwxbibXqPaPo4EA+RNUTiixTP3d7ZbUxVoTzptZg2plIVdc1SOGe5OjFn9/qHlQlP8cyguaVq8qO+XthynHZeSCkMi7JSe/+yn8kdvtSI96KfJsWhs+mwvK6/7fTud6o1ypGqMuYJHgmxwfMB70o4SfkxIkACYPJCW4c2QoUe1WgJRq3InYwagg8AXY0wip4PH8mFKGMqt5Rfx9dwY3BzL6Ac0bFzcIyhFpUKySIpWddJ+VgjEg6wJoFC2LweBCZhpp/MrQeEYG3zJiR0YM7LYAWyfc0WThqYkaGthZKy+B93EM96oQWYhxEUtjg5IYFQHvc/Fw8cQbI4F78Zhq0jq/+5+ChKKSYRRMnKhY2Hw6Ig19zhV84NSfCxlZtifYbL7YJ93ZSdtKWQ3hLuCQ6YKEmcskyLO6c/iHApimkpW2KNR1KYyxneWCGX+RRnkY3PuFwfDcew1+NunZQlkeOc/lAa1VHMnZbiNBMTHzu3vQClbZAQGT1FoAKJb6b06m9vkm78YL9aaTBWkGQZO+h6V2aVo7SEY/5N+aL79IVjq0wxauVtR0V5OKyuInF+yOR62hTZHDEDLmQL3EkpxNW4OM09tA2CJAkHDVlzbJOigHE6xRLvzbfnEX7PlvMmMLbDAGmGocq/DYOCUY8i3C/W1LGSUUdac1jK06NKHmuMaMa4kv/UJeKcZH1tC4Zb/udUHV5Nr8pUVxghJJkXDVqB3eu4tiA0Brp7ne+UcQADQQQ5RbBD3L3CsdcoHfWWxlFCLg215F4CYCLzn/h7WEbSrDCAfhlvvcTXDif7hRxX/TkbMRGPkGSwEJC2l7CooAkveIZjyyWl9rv2sg0nPIE0nJxZOjyy1k0rabOvG5AhydljZHu3NJtFpDkstavwrhsePOK6SaPhUz2mRvylc2veZUHqMI2lTdynjBvma+CEhurcuMSzl0QDxCskzb0+SjFEyEDzqV5v/PrELnJEPPj0Bf2eIVpOSIywrdEE6q69On5ZDMvbJPUK66PEgHCEo2ZHqj5tKtrSqZkWttop2no3KLtBlkWyMHMraUnIhYxAsXhAUwVmqXBUa0KQCGQUOxSKIi8Vh5JkuinA+hcKxmwuqkTA3ZQckKz6wmz9x49i2tj2v+HvFlyXsubcG5l5XDVHMJmXLWZXwl5ZbHJF65nlJa4HBJOXtbtl7ry8wenaYxT4qlEo7CKLjU9wxyYOAFQvfLjsM2lRvNCGHKe3TTrk9gSrUOHzDjvpJvP27E7wdam+uJqdPBxy5z4KEWg70sjIUKDhXxUy8or6cCCSXkRdfxg+ZDAhtn5cd24/vu76jzFeuR57NFk+j39m3RtnmyH+K+Pw8SXrgOc+Zo5k8cIXAlIWl+tZkai7ztlFe01LMpHlf7MFtfykbvTCF7I6q4LQ1f7oBV7qvelWeVKWjwedNmOcGJ03y0og/c3i+NG1WhjTqy3dsn36JQbmVW4eKrQ6XFdkbc/GVWSaM+UGYc8Bp9DLRgsDbiRpBWbFZj+cqhffsI/CMKkBlXEkk4EMhLPJdOGG6hOViFkgsdZ/4QpDduYWFLGirQ36JIcfpMKw4fwJiX5o1lVvYGZAeRiNrz7NgSVo6cHAkt8c0RvyYQ5j4xmZI6jDDM9jNwja9xhhY2pF105bK9TAqoGELxf87cGtuM7emJ437UVEIkZDU+vacOrTLGTd4jWYRJQO1L4Of5ouEE7vo7m2PD5jY2p4dA8NyOCyQZh5YzNv6hfWiB/kiHekYCfUW+4wTRxufCu5K/k+fnX/T8xDuA/oshwOaZjCp8+Y7GSxvJ2qOCb8gkyEL3NcK0PCFXiMSMGUMCVpmIz3dtVxA/+ebvJ7tXMJ3eXg3ZAN53YJP5wYd9ZkT/1kVCGOzjaYELEcE1OiPmhl5qvvY/1nzy83OAR526G2KfJixS2/mxUwl5kxTKeXhtzFljFKDFMX/Ai9zeHXFOUyw5knaw4DNJDRqIWe8hgudqE3bLUnykRo6JOoLaUhFxKaVQ3cO1Qtem+SxLap2YR+CKnmhCzpgahZeQSsGBPe6hwenA2kNxO3TNa/Heb1FPZ9msHCYIfQ9YU6xVFrSKxBbOfNK9MUjyFXNx+iw1Sca+zd7YtV7VSYKxEq4VxrkiJ2O6aXnfg4ZUWG7vmNWuaNkvNFVA54hUcnh94oFAByVIG7l4GDOM1tokfjywHvlEyMVA==; MSNRPSShare=1; MSPAuth=2De!ssEvgFU5ouVjyT*DXpppwLp3ZPw3KMFovYsHt7!AKjazMfC4MAWfTHYSDf67wgIYuJzWIHZZuj5HKGiqmvVRKrq9b0wq4N8Ial*mGr94rQknw5BvQK2g94aIrCwoutE0PceQHqOf0$; MSPProf=2UfnuLCo2A1X9bgtbb4g6xJe9N3iXFFbf2L!NiQFEAjkT7xv!Xb4f49B1NpUXls2xCS1w6VWr9Qok0PPJ6NqY9tN*QCYQlXY!81qIXP4l6TlHomMXnhhoDc0vr7BsVKWmscKzvIl4trA5sOr49D0NfiQjBFnomzGu5adMNg*TjexIHwjFUAwKwUg5yaf6d6Qj!g7yMv22ntfwLT1RKoVsBEg$$; ANON=A=500A563F43180AD91138FB5CFFFFFFFF&E=19ba&W=1; NAP=V=1.9&E=1960&C=tI9U3_9feMS9gE5G4iln3KlVxpSXhHlwCRSRa-N_eUzRyRWpbB5NpA&W=1; ASP.NET_SessionId=ewuqomwi4is1askj4n1emrfl; InsiderGroups=76f46cea92bdf767-; MS0=3ae9c5363471456cb29b138cf8845989; MS-CV=swWZnH4/AkqlfC87.3.0"
        }
    }).then((response) => {
        return response.data.metadata.mscomct;
    })

    res.status(200).json({ 'Authorization': response })

}