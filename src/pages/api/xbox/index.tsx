import axios from "axios";
import Cors from "cors";
import { LocalStorage } from "node-localstorage";

const cors = Cors({
  methods: ["GET", "HEAD", "POST"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

//   global.localStorage = new LocalStorage("./scratch");

//   let authtoken = global.localStorage.getItem("auth_token");

//   const resp = await axios.get(
//     "https://purchase.mp.microsoft.com/v7.0/tokenDescriptions/YTC27-F4C4R-PTTVJ-2R4JX-VCVCZ?market=US&language=en-US&supportMultiAvailabilities=true",
//     {
//       headers: {
//         Authorization: `${authtoken}`,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   if (resp.status == 200) {
//     return res.status(200).json({ Authorization: authtoken });
//   }

  const response = await axios
    .get("http://34.227.32.18:8000/")
    .then((response) => {
      return response.data.auth_token;
    });

//   global.localStorage.setItem("auth_token", response);
  res.status(200).json({ Authorization: response });
}
