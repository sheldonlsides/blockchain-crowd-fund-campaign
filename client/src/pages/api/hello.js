// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import web3 from "../utils/web3";
import CampaignFactory from "../../contracts/CampaignFactory.json";

// export default instance;

export default function handler(req, res) {
  const instance = new web3.eth.Contract(
    CampaignFactory.abi,
    "0x9274F6cF4013d0ce539A581DF072D78b957a8c04"
  );

  res.status(200).json({ name: instance });
}
